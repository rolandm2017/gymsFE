import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
import { ILocationContext, LocationsProviderContext } from "../../context/LocationsProvider";
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarStateProvider";
import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";

import useWindowSize from "../../util/useWindowSize";

import "./ThirdMap.scss";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapboxProps {
    center: [number, number];
    qualifiedFromCurrentPage: IHousing[];
    // zoom: number;
}

const ThirdMap: React.FC<MapboxProps> = ({ center, qualifiedFromCurrentPage }) => {
    // The problem: markers are being set multiple times on the first render.
    // The solution: A counter.
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    // const [timesSet, setTimesSet] = useState<number>(0);
    const { isOpen, toggleIsOpen } = useContext(SidebarStateContext) as ISidebarContext;
    // const [markerHistory, setMarkerHistory] = useState<mapboxgl.Marker[]>([]);

    const [width, height] = useWindowSize();
    const isOnMobile = width < 768;

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

    // initialization
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [long, setLong] = useState(-73.554);
    const [lat, setLat] = useState(45.5);
    const [zoom, setZoom] = useState(12);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: zoom,
            attributionControl: false,
        }).addControl(new mapboxgl.AttributionControl({ compact: true }));
    });

    useEffect(() => {
        console.log("Runs once");
    }, []);

    // plot qualified gyms and apartments
    useEffect(() => {
        if (map === null) return;
        console.log("inside useEffect ThirdMap", qualifiedFromCurrentPage.length, markers.length, "92rm");
        // remove all old markers
        for (const marker of markers) {
            marker.remove();
        }
        if (qualifiedFromCurrentPage.length !== 0 && map.current) {
            const { apartmentMarkers, gymMarkers } = unpackMarkers(qualifiedFromCurrentPage);
            const allMarkers = [apartmentMarkers, gymMarkers].flat();

            addNewMarkers(allMarkers, markers, setMarkers, map.current);
        }
    }, [map, qualifiedFromCurrentPage]);

    function unpackMarkers(pageMarkers: IHousing[]): { apartmentMarkers: mapboxgl.Marker[]; gymMarkers: mapboxgl.Marker[] } {
        const apartmentMarkers: mapboxgl.Marker[] = [];
        const gymMarkers: mapboxgl.Marker[] = [];
        const duplicateGymArray: number[] = []; // holds unique longitudes.
        for (const apartment of pageMarkers) {
            const nearbyGyms: IAssociation[] | undefined = apartment.nearbyGyms;
            // console.log(associated, "95rm");
            if (nearbyGyms !== undefined && nearbyGyms.length > 0 && apartment.long && apartment.lat) {
                let mForAp;
                if (apartment.isHighlighted) {
                    mForAp = new mapboxgl.Marker({ color: "#ffffff" }).setLngLat([apartment.long, apartment.lat]);
                } else {
                    mForAp = new mapboxgl.Marker().setLngLat([apartment.long, apartment.lat]);
                }
                apartmentMarkers.push(mForAp);
                for (const association of nearbyGyms) {
                    const gymThatDefinitelyExists: IGym | undefined = association.gym;
                    if (gymThatDefinitelyExists === undefined || duplicateGymArray.includes(gymThatDefinitelyExists.long)) {
                        continue;
                    }
                    const mForGym = new mapboxgl.Marker({ color: "#f7685b" }).setLngLat([gymThatDefinitelyExists.long, gymThatDefinitelyExists.lat]);
                    duplicateGymArray.push(gymThatDefinitelyExists.long);
                    gymMarkers.push(mForGym);
                }
            }
        }
        return { apartmentMarkers, gymMarkers };
    }

    function removeAllOldMarkers(markerHistory: mapboxgl.Marker[]) {
        for (const marker of markerHistory) {
            marker.remove();
        }
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

export default ThirdMap;
