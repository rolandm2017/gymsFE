import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
import { ILocationContext, LocationsProviderContext } from "../../context/LocationsProvider";
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarStateProvider";

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
    const { apartments, gyms } = useContext(LocationsProviderContext) as ILocationContext;
    console.log(apartments, gyms, "23rm");

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
    useEffect(() => {
        if (gyms.length !== 0 && apartments.length !== 0 && map.current) {
            const markers = [];
            if (map === null) return;
            console.log(gyms.length, apartments.length, "Adding marker 74rm");
            for (const ap of apartments) {
                if (ap.long && ap.lat) {
                    new mapboxgl.Marker().setLngLat([ap.long, ap.lat]).addTo(map.current);
                }
            }
            for (const g of gyms) {
                if (g.long && g.lat) {
                    new mapboxgl.Marker({ color: "#f7685b" }).setLngLat([g.long, g.lat]).addTo(map.current);
                }
            }
            // new mapboxgl.Marker().setLngLat([-73.5, 45.5]).addTo(map.current);
            // // sources method (doesnt work)
            // map.current.on("load", () => {
            //     map.current!.addSource("places-src", {
            //         type: "canvas",
            //         canvas: "mapContainer",
            //         animate: true,
            //         coordinates: [
            //             [-73.5, 45.5],
            //             [-73.5, 45.51],
            //             [-73.5, 45.52],
            //             [-73.5, 45.53],
            //         ],
            //     });
            //     map.current!.addLayer({
            //         id: "canvas-layer",
            //         type: "raster",
            //         source: "places-src",
            //     });
            // });
        }
    }, [gyms, apartments, map]);

    return (
        <div id="mapContainerOuter" className={`${decideWidth(isOpen, isOnMobile)} w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default ThirdMap;
