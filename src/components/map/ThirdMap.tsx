import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
import { ILocationContext, LocationsProviderContext } from "../../context/LocationsProvider";
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarStateProvider";
import { IAssociation } from "../../interface/Association.interface";

import useWindowSize from "../../util/useWindowSize";

import "./ThirdMap.scss";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapboxProps {
    center: [number, number];
    // zoom: number;
}

const ThirdMap: React.FC<MapboxProps> = ({ center }) => {
    const { isOpen, toggleIsOpen } = useContext(SidebarStateContext) as ISidebarContext;
    const { apartments, gyms, qualified } = useContext(LocationsProviderContext) as ILocationContext;

    const [width, height] = useWindowSize();
    const isOnMobile = width < 768;

    function resizeMap() {
        if (map === null || map.current === null) return;
        map.current.resize();
        console.log("resizing! 26rm");
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
    const [long, setLong] = useState(-73.5);
    const [lat, setLat] = useState(45.5);
    const [zoom, setZoom] = useState(13);

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

    // plot places as markers
    // useEffect(() => {
    //     if (gyms.length !== 0 && apartments.length !== 0 && map.current) {
    //         const markers = [];
    //         if (map === null) return;
    //         console.log(gyms.length, apartments.length, "Adding marker 74rm");
    //         for (const ap of apartments) {
    //             if (ap.long && ap.lat) {
    //                 new mapboxgl.Marker().setLngLat([ap.long, ap.lat]).addTo(map.current);
    //             }
    //         }
    //         for (const g of gyms) {
    //             if (g.long && g.lat) {
    //                 new mapboxgl.Marker({ color: "#f7685b" }).setLngLat([g.long, g.lat]).addTo(map.current);
    //             }
    //         }
    //     }
    // }, [gyms, apartments, map]);

    // plot qualified gyms and apartments
    useEffect(() => {
        if (map === null) return;
        if (qualified.length !== 0 && map.current) {
            const apartmentMarkers: mapboxgl.Marker[] = [];
            const gymMarkers: mapboxgl.Marker[] = [];
            const duplicateApartmentArray: number[] = [];
            for (const gym of qualified) {
                const associated: IAssociation[] | undefined = gym.associatedUnits;
                console.log(associated, "95rm");
                if (associated !== undefined && associated.length > 0 && gym.long && gym.lat) {
                    const mForGym = new mapboxgl.Marker({ color: "#f7685b" }).setLngLat([gym.long, gym.lat]);
                    gymMarkers.push(mForGym);
                    for (const a of associated) {
                        if (duplicateApartmentArray.includes(a.apartment.long)) {
                            continue;
                        }
                        const mForAp = new mapboxgl.Marker().setLngLat([a.apartment.long, a.apartment.lat]).addTo(map.current);
                        duplicateApartmentArray.push(a.apartment.long);
                        apartmentMarkers.push(mForAp);
                    }
                }
            }
            for (const marker of [apartmentMarkers, gymMarkers].flat()) {
                marker.addTo(map.current);
            }
        }
    }, [map, qualified]);

    return (
        <div id="mapContainerOuter" className={`${decideWidth(isOpen, isOnMobile)} w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default ThirdMap;
