import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState } from "react";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface MapboxProps {
    center: { lon: number; lat: number };
    zoom: number;
    width: string;
    height: string;
    onInit: any;
}

export default function useMap({ center, zoom = 17, onInit }: MapboxProps) {
    const ref = useRef(null);
    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    useEffect(() => {
        console.log(ref.current, "20rm");
        if (ref.current && !map) {
            const newMap = new mapboxgl.Map({
                container: ref.current,
                style: "mapbox://styles/mapbox/streets-v11",
                center,
                zoom,
            });
            setMap(newMap);
            console.log(map, "56rm");
            // onInit(map);
        }
    }, [ref, center, zoom, map, onInit]);
    return { ref };
}
