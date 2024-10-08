import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarContext";
import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";
import { IViewportBounds } from "../../interface/ViewportBounds.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { getMapBounds } from "../../util/mapTools/getMapBounds";
import { putAllMarkersIntoView } from "../../util/mapTools/putAllMarkersIntoView";
import { truncateDecimals } from "../../util/truncateDecimals";

import useWindowSize from "../../util/useWindowSize";

import "./Map.scss";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface PaidMapProps {
    center: [number, number]; // todo: replace with {long:x, lat: y}
    qualifiedFromCurrentPage: IHousing[];
    activeApartment: number | null;
    adjustedCenterReporter: Function;
}

const PaidMap: React.FC<PaidMapProps> = ({ center, qualifiedFromCurrentPage, activeApartment, adjustedCenterReporter }: PaidMapProps) => {
    // initialization
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const long = center[1];
    const lat = center[0];
    // const [long, setLong] = useState(center[1]);
    // const [lat, setLat] = useState(center[0]);
    // const [zoom, setZoom] = useState(12);
    const zoom = 12;
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const { isOpen } = useContext(SidebarStateContext) as ISidebarContext;

    const [width, height] = useWindowSize();
    const isOnMobile = width < 768;

    useEffect(() => {
        // on page load, report viewport so the freshly loaded page knows where to gather data for
    });

    useEffect(() => {
        if (map === null || map.current === null) return;
        const centerMarker = new mapboxgl.LngLat(center[1], center[0]);

        map.current.setCenter(centerMarker);
        // report new dimensions to parent
        const boundsOfNewlyCenteredMap: IViewportBounds = getMapBounds(map.current.getBounds());
        adjustedCenterReporter(boundsOfNewlyCenteredMap);
    }, [center[0], center[1]]);

    function resizeMap() {
        if (map === null || map.current === null) return;
        map.current.resize();
    }

    window.addEventListener("resize", resizeMap);

    useEffect(() => {
        resizeMap();
    }, [isOpen]);

    function decideWidth(isOpen: boolean, isOnMobile: boolean): string {
        if (isOnMobile) {
            // because on mobile, the map is in a fixed position regardless if the sidebar is open or not
            return "mapWidthSidebarClosed";
        } else if (isOpen) {
            return "mapWidthSidebarOpen";
        } else {
            return "mapWidthSidebarClosed";
        }
    }

    useEffect(() => {
        if (map.current) return; // initialize map only once
        const currentMap = new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: zoom,
            attributionControl: false,
        }).addControl(new mapboxgl.AttributionControl({ compact: true }));
        map.current = currentMap;
        const boundsOfNewlyCenteredMap: IViewportBounds = getMapBounds(map.current.getBounds());
        adjustedCenterReporter(boundsOfNewlyCenteredMap); // report on page load so the apartment fetcher knows where to fetch

        currentMap.on("dragend", () => {
            const coords: IViewportBounds = getMapBounds(currentMap.getBounds());
            adjustedCenterReporter(coords);
        });
    });

    // plot qualified gyms and apartments
    useEffect(() => {
        if (map === null) return;

        let allMarkers: mapboxgl.Marker[] = [];
        if (qualifiedFromCurrentPage.length !== 0 && map.current) {
            const { apartmentMarkers, gymMarkers } = unpackMarkers(qualifiedFromCurrentPage);
            allMarkers = [apartmentMarkers, gymMarkers].flat();

            addNewMarkers(allMarkers, markers, setMarkers, map.current);
            // putAllMarkersIntoView(allMarkers, map.current);
        }
        return () => {
            // remove all old markers
            for (const marker of allMarkers) {
                marker.remove();
            }
        };
    }, [map, qualifiedFromCurrentPage]);

    function unpackMarkers(apartments: IHousing[]): { apartmentMarkers: mapboxgl.Marker[]; gymMarkers: mapboxgl.Marker[] } {
        const apartmentMarkers: mapboxgl.Marker[] = [];
        const gymMarkers: mapboxgl.Marker[] = [];
        const duplicateGymDetectorArray: number[] = []; // holds unique longitudes.

        for (let i = 0; i < apartments.length; i++) {
            const apartment = apartments[i];
            const nearbyGyms: IAssociation[] = apartment.nearbyGyms;
            const theApartmentHasNearbyGyms = nearbyGyms && nearbyGyms.length > 0;
            // const theApartmentHasCoords = apartment.long && apartment.lat;
            // if (theApartmentHasCoords && theApartmentHasNearbyGyms) {
            let markerForAp;
            const currentApartmentIsActive = i === activeApartment;
            if (currentApartmentIsActive) {
                // color the active marker a certain color.
                markerForAp = new mapboxgl.Marker({ color: "#ffffff", scale: 1.4 }).setLngLat([apartment.long, apartment.lat]);
            } else {
                markerForAp = new mapboxgl.Marker()
                    .setLngLat([apartment.long, apartment.lat])

                    .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForApartment(apartment)));
            }
            apartmentMarkers.push(markerForAp);
            if (theApartmentHasNearbyGyms) {
                for (const association of nearbyGyms) {
                    const gymThatDefinitelyExists: IGym | undefined = association.gym; // ts doesn't know it definitely exists, but I do
                    const gymWasActuallyUndefined = gymThatDefinitelyExists === undefined;
                    if (gymWasActuallyUndefined) continue;
                    const gymWasAlreadyAdded = duplicateGymDetectorArray.includes(gymThatDefinitelyExists.long);
                    if (gymWasAlreadyAdded) continue;
                    const markerForGym = new mapboxgl.Marker({ color: "#f7685b" })
                        .setLngLat([gymThatDefinitelyExists.long, gymThatDefinitelyExists.lat])
                        .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForGym(association)));
                    duplicateGymDetectorArray.push(gymThatDefinitelyExists.long);
                    gymMarkers.push(markerForGym);
                }
            }
        }
        return { apartmentMarkers, gymMarkers };
    }

    function makePopupHTMLForApartment(apartment: IHousing): string {
        const nearbyGym = apartment.nearbyGyms ? apartment.nearbyGyms[0].gym?.name : "No gyms found";
        const distance = apartment.nearbyGyms ? truncateDecimals(apartment.nearbyGyms[0].distanceInKM, 2) : "No data";
        return `<div>
                <h4>${apartment.address}</h4>
                <p>Near: ${nearbyGym}</p>
                <p>Distance: ${distance}</p>
            </div>`;
    }

    function makePopupHTMLForGym(association: IAssociation): string {
        // gym: addr, distance to ap
        const gym = association.gym;
        const name = gym ? gym.name : "name MIA";
        const addr = gym ? gym.formatted_address : "addr mia";
        const distance = truncateDecimals(calculateWalkTimeInMinutes(association.distanceInKM), 2);
        return `<div>
                <h4>${name}</h4>
                <p>${addr}</p>
                <p>Nearest apartment: ${distance}</p>
            </div>`;
    }

    function addNewMarkers(newMarkers: mapboxgl.Marker[], oldMarkers: mapboxgl.Marker[], markerUpdater: Function, map: mapboxgl.Map) {
        // for (const marker of oldMarkers) {
        //     marker.remove();
        // }
        console.log("adding all markers...");
        for (const marker of newMarkers) {
            marker.addTo(map);
        }
        markerUpdater(newMarkers);
    }

    return (
        <div id="mapContainerOuter" className={`${decideWidth(isOpen, isOnMobile)} w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default PaidMap;
