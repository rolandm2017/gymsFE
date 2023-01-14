import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarContext";
import { IAssociation } from "../../interface/Association.interface";
import { IDemoHousing } from "../../interface/DemoHousing.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";
import { ILatLong } from "../../interface/LatLong.interface";
import { IViewportBounds } from "../../interface/ViewportBounds.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { truncateDecimals } from "../../util/truncateDecimals";

import useWindowSize from "../../util/useWindowSize";

import "./Map.scss";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface DemoMapProps {
    center: [number, number];
    qualifiedFromCurrentPage: IDemoHousing[];
    activeApartment: number | null;
    adjustedCenterReporter?: Function;
    // zoom: number;
}

const DemoMap: React.FC<DemoMapProps> = ({ center, qualifiedFromCurrentPage, activeApartment, adjustedCenterReporter }: DemoMapProps) => {
    // console.log(qualifiedFromCurrentPage, "27rm");
    // initialization
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [long, setLong] = useState(-73.554);
    const [lat, setLat] = useState(45.5);
    const [zoom, setZoom] = useState(12);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const { isOpen } = useContext(SidebarStateContext) as ISidebarContext;

    const [width, height] = useWindowSize();
    const isOnMobile = width < 768;

    useEffect(() => {
        // on load, report viewport
    });

    function resizeMap() {
        if (map === null || map.current === null) return;
        map.current.resize();
        // console.log("resizing! 26rm");
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

    function getCoordsFromMap(map: mapboxgl.Map) {
        const coords: mapboxgl.LngLatBounds = map.getBounds();
        const coordsNE: mapboxgl.LngLat = coords.getNorthEast();
        const coordsSW: mapboxgl.LngLat = coords.getSouthWest();
        console.log(coordsNE, coordsSW, "80rm");
        const coordsButAsInterface: IViewportBounds = {
            ne: { long: coordsNE.lng, lat: coordsNE.lat },
            sw: { long: coordsSW.lng, lat: coordsSW.lat },
        };
        if (adjustedCenterReporter) adjustedCenterReporter(coordsButAsInterface);
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

        getCoordsFromMap(currentMap); // report viewport onload so the apartments can fetch

        currentMap.on("dragend", () => {
            getCoordsFromMap(currentMap);
        });
    });

    // plot qualified gyms and apartments
    useEffect(() => {
        if (map === null) return;

        // remove all old markers
        for (const marker of markers) {
            marker.remove();
        }

        let allMarkers: mapboxgl.Marker[] = [];
        if (qualifiedFromCurrentPage.length !== 0 && map.current) {
            const { apartmentMarkers, gymMarkers } = unpackMarkers(qualifiedFromCurrentPage);
            allMarkers = [apartmentMarkers, gymMarkers].flat();

            addNewMarkers(allMarkers, markers, setMarkers, map.current);
        }
    }, [map, qualifiedFromCurrentPage]);

    function unpackMarkers(apartments: IDemoHousing[]): { apartmentMarkers: mapboxgl.Marker[]; gymMarkers: mapboxgl.Marker[] } {
        const apartmentMarkers: mapboxgl.Marker[] = [];
        const gymMarkers: mapboxgl.Marker[] = [];
        const duplicateGymDetectorArray: number[] = []; // holds unique longitudes.

        for (let i = 0; i < apartments.length; i++) {
            const apartment = apartments[i];
            const nearbyGyms: IAssociation[] | undefined = apartment.nearbyGyms;
            const theApartmentHasNearbyGyms = nearbyGyms !== undefined && nearbyGyms.length > 0;
            const theApartmentHasCoords = apartment.long && apartment.lat;
            if (theApartmentHasCoords && theApartmentHasNearbyGyms) {
                let markerForAp;
                const currentApartmentIsActive = i === activeApartment;
                if (currentApartmentIsActive) {
                    markerForAp = new mapboxgl.Marker({ color: "#ffffff", scale: 1.4 }).setLngLat([apartment.long, apartment.lat]);
                } else {
                    markerForAp = new mapboxgl.Marker()
                        .setLngLat([apartment.long, apartment.lat])

                        .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForApartment(apartment)));
                }
                apartmentMarkers.push(markerForAp);
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
        console.log(apartmentMarkers, gymMarkers, "132rm");
        return { apartmentMarkers, gymMarkers };
    }

    function makePopupHTMLForApartment(apartment: IDemoHousing): string {
        const nearbyGym = apartment.nearbyGyms ? apartment.nearbyGyms[0].gym?.name : "No gyms found";
        const distance = apartment.nearbyGyms ? truncateDecimals(apartment.nearbyGyms[0].distanceInKM, 2) : "No data";
        return `<div>
                <h4>Address available with a subscription</h4>
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

export default DemoMap;
