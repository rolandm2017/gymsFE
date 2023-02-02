import mapboxgl, { LngLatBounds } from "mapbox-gl";
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
import ApartmentCard from "../apartmentCard/ApartmentCard";

import "./Map.scss";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface DemoMapProps {
    center: [number, number];
    viewportContents: IDemoHousing[];
    adjustedCenterReporter: Function;
    highlightedApartmentId: number;
}

const DemoMap: React.FC<DemoMapProps> = ({ center, viewportContents, adjustedCenterReporter, highlightedApartmentId }: DemoMapProps) => {
    // initialization
    console.log(center, "repeat 2 30rm");
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [long, setLong] = useState(center[1]);
    const [lat, setLat] = useState(center[0]);
    const [zoom, setZoom] = useState(12);
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const { isOpen } = useContext(SidebarStateContext) as ISidebarContext;

    const [width, height] = useWindowSize();
    const isOnMobile = width < 768;

    useEffect(() => {
        if (map === null || map.current === null) return;
        const centerMarker = new mapboxgl.LngLat(center[1], center[0]);

        map.current.setCenter(centerMarker);
        // report new dimensions to parent
        const boundsOfNewlyCenteredMap: LngLatBounds = map.current.getBounds();
        const neCornerCoords = boundsOfNewlyCenteredMap.getNorthEast();
        const swCornerCoords = boundsOfNewlyCenteredMap.getSouthWest();
        console.log(neCornerCoords, swCornerCoords, "repeat 1 50rm");
        const newBounds: IViewportBounds = {
            sw: { lat: swCornerCoords.lat, long: swCornerCoords.lng },
            ne: { lat: neCornerCoords.lat, long: neCornerCoords.lng },
        };
        adjustedCenterReporter(newBounds);
        // i dont care what es-line says, the correct dependency is the primitive values center[0] & center[1]
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

    function getCoordsFromMap(map: mapboxgl.Map) {
        const coords: mapboxgl.LngLatBounds = map.getBounds();
        const coordsNE: mapboxgl.LngLat = coords.getNorthEast();
        const coordsSW: mapboxgl.LngLat = coords.getSouthWest();
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
        if (viewportContents.length !== 0 && map.current) {
            const { apartmentMarkers, gymMarkers } = unpackMarkers(viewportContents);
            allMarkers = [apartmentMarkers, gymMarkers].flat();

            addNewMarkers(allMarkers, markers, setMarkers, map.current);
        }
    }, [map, viewportContents, highlightedApartmentId]);

    function unpackMarkers(apartments: IDemoHousing[]): { apartmentMarkers: mapboxgl.Marker[]; gymMarkers: mapboxgl.Marker[] } {
        const apartmentMarkers: mapboxgl.Marker[] = [];
        const gymMarkers: mapboxgl.Marker[] = [];
        const duplicateGymDetectorArray: number[] = []; // holds unique longitudes.
        for (let i = 0; i < apartments.length; i++) {
            const apartment = apartments[i];
            const nearbyGym: IGym = apartment.nearbyGym;
            let markerForAp;
            const currentApartmentIsActive = apartment.housingId === highlightedApartmentId;
            if (currentApartmentIsActive) {
                markerForAp = new mapboxgl.Marker({ color: "#ffffff", scale: 1.4 }).setLngLat([apartment.long, apartment.lat]);
            } else {
                markerForAp = new mapboxgl.Marker()
                    .setLngLat([apartment.long, apartment.lat])

                    .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForApartment(apartment, apartment.distanceToNearestGym)));
            }
            apartmentMarkers.push(markerForAp);
            // add marker for gym

            const markerForGym = new mapboxgl.Marker({ color: "#f7685b" })
                .setLngLat([nearbyGym.long, nearbyGym.lat])
                .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForGym(nearbyGym, apartment.distanceToNearestGym)));
            duplicateGymDetectorArray.push(nearbyGym.long);
            gymMarkers.push(markerForGym);
        }
        return { apartmentMarkers, gymMarkers };
    }

    function makePopupHTMLForApartment(apartment: IDemoHousing, distanceToGym: number): string {
        const nearbyGym = apartment.nearbyGym ? apartment.nearbyGym.name : "No gyms found";
        const distance = apartment.nearbyGym ? truncateDecimals(distanceToGym, 2) : "No data";
        return `<div>
                <h4>Address available with a subscription</h4>
                <p>Near: ${nearbyGym}</p>
                <p>Distance: ${distance}</p>
            </div>`;
    }

    function makePopupHTMLForGym(gym: IGym, distanceToGym: number): string {
        // gym: addr, distance to ap
        const name = gym ? gym.name : "name MIA";
        const addr = gym ? gym.formatted_address : "addr mia";
        const distance = truncateDecimals(calculateWalkTimeInMinutes(distanceToGym), 2);
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
        <div id="mapContainerOuter" className={` w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default DemoMap;
