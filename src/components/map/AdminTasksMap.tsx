import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
//
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarContext";
import { ITask } from "../../interface/Task.interface";

import useWindowSize from "../../util/useWindowSize";

import "./Map.scss";
import { hexCodes } from "../../util/hexCodes";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface AdminTasksMapboxProps {
    center: [number, number];
    tasks: ITask[];
    // zoom: number;
}

const AdminTasksMap: React.FC<AdminTasksMapboxProps> = ({ center, tasks }) => {
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
        map.current = new mapboxgl.Map({
            container: "mapContainer",
            style: "mapbox://styles/mapbox/streets-v11",
            center: [long, lat],
            zoom: zoom,
            attributionControl: false,
        }).addControl(new mapboxgl.AttributionControl({ compact: true }));
    });

    useEffect(() => {
        if (map === null) return;

        // remove old markers;
        for (const m of markers) {
            m.remove();
        }

        if (tasks.length !== 0 && map.current) {
            const taskMarkers = unpackMarkers(tasks);

            addNewMarkers(taskMarkers, markers, setMarkers, map.current);
        }
    }, [map, tasks]);

    function unpackMarkers(tasks: ITask[]): mapboxgl.Marker[] {
        const taskMarkers: mapboxgl.Marker[] = tasks.map(task => {
            const colorChoice = task.taskId % hexCodes.length;
            return new mapboxgl.Marker({ color: hexCodes[colorChoice].colorCode, scale: 1.4 }).setLngLat([task.long, task.lat]);
        });

        return taskMarkers;
    }

    function addNewMarkers(newMarkers: mapboxgl.Marker[], oldMarkers: mapboxgl.Marker[], markerUpdater: Function, map: mapboxgl.Map) {
        console.log("adding all markers...");
        for (const marker of newMarkers) {
            marker.addTo(map);
        }
        markerUpdater(newMarkers);
    }

    return (
        <div id="adminMapContainerOuter" className={`${decideWidth(isOpen, isOnMobile)} w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default AdminTasksMap;
