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
import { hexCodes } from "../../util/hexCodes";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface AdminApartmentsMapboxProps {
    center: [number, number];
    qualified: IHousing[];
    activeApartment: number | null;
    activeTaskId: number | undefined;
    tasks: ITask[];
    showApartments?: boolean;
    showTaskMarkers?: boolean;
    // zoom: number;
}

const AdminApartmentsMap: React.FC<AdminApartmentsMapboxProps> = ({ center, qualified, activeTaskId, tasks, showApartments, showTaskMarkers }) => {
    // console.log(qualifiedFromCurrentPage, "27rm");
    const [markers, setMarkers] = useState<mapboxgl.Marker[]>([]);
    const { isOpen } = useContext(SidebarStateContext) as ISidebarContext;

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

    // plot qualified gyms and apartments
    useEffect(() => {
        if (map === null) return;

        let allMarkers: mapboxgl.Marker[] = [];
        console.log(qualified, "86rm");
        if (qualified.length !== 0 && map.current) {
            console.log(activeTaskId, "95rm");
            const { apartmentMarkers } = unpackMarkers(qualified, activeTaskId);
            if (tasks && showTaskMarkers) {
                const taskMarkers = makeTaskMarkers(tasks);
                allMarkers = [apartmentMarkers, taskMarkers].flat();
            } else {
                allMarkers = apartmentMarkers;
            }

            addNewMarkers(allMarkers, markers, setMarkers, map.current);
        }
        return () => {
            // remove all old markers
            for (const marker of allMarkers) {
                marker.remove();
            }
        };
    }, [map, qualified, activeTaskId]);

    function makeTaskMarkers(tasks: ITask[]): mapboxgl.Marker[] {
        const taskMarkers: mapboxgl.Marker[] = [];
        for (const t of tasks) {
            const marker = new mapboxgl.Marker({ color: "#AA0000", scale: 1.4 }).setLngLat([t.long, t.lat]);
            taskMarkers.push(marker);
        }
        return taskMarkers;
    }

    function unpackMarkers(apartments: IHousing[], activeTaskId: number | undefined): { apartmentMarkers: mapboxgl.Marker[] } {
        if (activeTaskId)
            return {
                apartmentMarkers: apartments
                    .filter(ap => ap.taskId === activeTaskId)
                    .map(ap => {
                        const colorChoice = ap.taskId % hexCodes.length;
                        return new mapboxgl.Marker({ color: hexCodes[colorChoice].colorCode, scale: 1.4 })
                            .setLngLat([ap.long, ap.lat])
                            .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForApartment(ap)));
                    }),
            };

        return {
            apartmentMarkers: apartments.map(ap => {
                const colorChoice = ap.taskId % hexCodes.length;
                return new mapboxgl.Marker({ color: hexCodes[colorChoice].colorCode, scale: 1.4 })
                    .setLngLat([ap.long, ap.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForApartment(ap)));
            }),
        };
    }

    function makePopupHTMLForApartment(apartment: IHousing): string {
        return `<div>
                <h4>${apartment.address}</h4>
                <p>TaskId: ${apartment.taskId}</p>
            </div>`;
    }

    function addNewMarkers(newMarkers: mapboxgl.Marker[], oldMarkers: mapboxgl.Marker[], markerUpdater: Function, map: mapboxgl.Map) {
        // for (const marker of oldMarkers) {
        //     marker.remove();
        // }
        console.log("adding all markers...", newMarkers);
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

export default AdminApartmentsMap;
