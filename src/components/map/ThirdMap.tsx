import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";
import { MapProps } from "react-map-gl";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapboxProps {
    center: [number, number];
    // zoom: number;
    width: string;
    height: string;
}

const ThirdMap: React.FC<MapboxProps> = ({ center }) => {
    const mapContainer = useRef(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [long, setLong] = useState(-73.9);
    const [lat, setLat] = useState(45.35);
    const [zoom, setZoom] = useState(3);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: "someContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: center,
            zoom: zoom,
        });
    });

    // const newMap = new mapboxgl.Map({
    //     container: "someContainer",
    //     style: "mapbox://styles/mapbox/streets-v11",
    //     center,
    //     zoom,
    // });
    return (
        <div>
            <div id="someContainer" ref={mapContainer}></div>
        </div>
    );
};

export default ThirdMap;
