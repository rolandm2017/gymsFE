import { renderToStaticMarkup } from "react-dom/server";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
//
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarStateProvider";
import { IAssociation } from "../../interface/Association.interface";
import { ITask } from "../../interface/Task.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { truncateDecimals } from "../../util/truncateDecimals";

import useWindowSize from "../../util/useWindowSize";

import "./Map.scss";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface AdminTasksMapboxProps {
    center: [number, number];
    tasks: ITask[];
    // zoom: number;
}

const AdminTasksMap: React.FC<AdminTasksMapboxProps> = ({ center, tasks }) => {
    console.log(tasks, "27rm");
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
        console.log(map, "76rm");
        if (map === null) return;

        let allMarkers: mapboxgl.Marker[] = [];
        if (tasks.length !== 0 && map.current) {
            console.log("unpacking 80rm");
            const taskMarkers = unpackMarkers(tasks);

            addNewMarkers(taskMarkers, markers, setMarkers, map.current);
        }
        return () => {
            // remove all old markers
            for (const marker of allMarkers) {
                marker.remove();
            }
        };
    }, [map, tasks]);

    // function makeBatchMarkers(batchMarkersData: ITask[]): mapboxgl.Marker[] {
    //     const batchMarkers: mapboxgl.Marker[] = [];
    //     for (const b of batchMarkersData) {
    //         const marker = new mapboxgl.Marker({ color: "#AA0000", scale: 1.4 }).setLngLat([b.long, b.lat]);
    //         batchMarkers.push(marker);
    //     }
    //     return batchMarkers;
    // }

    const hexCodes = [
        { colorCode: "#FFFF00", name: "yellow" },
        { colorCode: "#800080", name: "purple" },
        { colorCode: "#FFA500", name: "orange" },
        { colorCode: "#800000", name: "maroon" },
        { colorCode: "#FF00FF", name: "fuschia" },
        { colorCode: "#00FF00", name: "lime" },
        { colorCode: "#00FFFF", name: "aqua" },
        { colorCode: "#008080", name: "teal" },
        { colorCode: "#808000", name: "olive" },
        { colorCode: "#000080", name: "navy" },
        { colorCode: "#FF0000", name: "red" },
        { colorCode: "#008000", name: "green" },
        { colorCode: "#0000FF", name: "blue" },
    ];

    function unpackMarkers(tasks: ITask[]): mapboxgl.Marker[] {
        const taskMarkers: mapboxgl.Marker[] = tasks.map(task => {
            const colorChoice = task.taskId % hexCodes.length;
            return new mapboxgl.Marker({ color: hexCodes[colorChoice].colorCode, scale: 1.4 }).setLngLat([task.long, task.lat]);
        });

        return taskMarkers;
    }

    // function makePopupHTMLForApartment(apartment: IHousing): string {
    //     const nearbyGym = apartment.nearbyGyms ? apartment.nearbyGyms[0].gym?.name : "No gyms found";
    //     const distance = apartment.nearbyGyms ? truncateDecimals(apartment.nearbyGyms[0].distanceInKM, 2) : "No data";
    //     return `<div>
    //             <h4>${apartment.address}</h4>
    //             <p>Near: ${nearbyGym}</p>
    //             <p>Distance: ${distance}</p>
    //         </div>`;
    // }

    // function makePopupHTMLForGym(association: IAssociation): string {
    //     // gym: addr, distance to ap
    //     const gym = association.gym;
    //     const name = gym ? gym.name : "name MIA";
    //     const addr = gym ? gym.formatted_address : "addr mia";
    //     const distance = truncateDecimals(calculateWalkTimeInMinutes(association.distanceInKM), 2);
    //     return `<div>
    //             <h4>${name}</h4>
    //             <p>${addr}</p>
    //             <p>Nearest apartment: ${distance}</p>
    //         </div>`;
    // }

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
