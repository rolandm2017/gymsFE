import { renderToStaticMarkup } from "react-dom/server";
import mapboxgl from "mapbox-gl";
import React, { useRef, useEffect, useState, useContext } from "react";
//
import { ISidebarContext, SidebarStateContext } from "../../context/SidebarStateProvider";
import { IAssociation } from "../../interface/Association.interface";
import { IBatchMarker } from "../../interface/BatchMarker.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { truncateDecimals } from "../../util/truncateDecimals";

import useWindowSize from "../../util/useWindowSize";

import "./Map.scss";

// Be sure to replace this with your own token
const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
mapboxgl.accessToken = MAPBOX_TOKEN;

interface AdminMapboxProps {
    center: [number, number];
    qualifiedFromCurrentPage: IHousing[];
    activeApartment: number | null;
    batchMarkersData: IBatchMarker[];
    showApartments: boolean;
    showBatchMarkers: boolean;
    // zoom: number;
}

const AdminMap: React.FC<AdminMapboxProps> = ({
    center,
    qualifiedFromCurrentPage,
    activeApartment,
    batchMarkersData,
    showApartments,
    showBatchMarkers,
}) => {
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
        if (qualifiedFromCurrentPage.length !== 0 && map.current) {
            const { apartmentMarkers, gymMarkers } = unpackMarkers(qualifiedFromCurrentPage, true);
            if (batchMarkersData && showBatchMarkers) {
                const batchMarkers = makeBatchMarkers(batchMarkersData);
                allMarkers = [apartmentMarkers, gymMarkers, batchMarkers].flat();
            } else {
                allMarkers = [apartmentMarkers, gymMarkers].flat();
            }

            addNewMarkers(allMarkers, markers, setMarkers, map.current);
        }
        return () => {
            // remove all old markers
            for (const marker of allMarkers) {
                marker.remove();
            }
        };
    }, [map, qualifiedFromCurrentPage]);

    function makeBatchMarkers(batchMarkersData: IBatchMarker[]): mapboxgl.Marker[] {
        const batchMarkers: mapboxgl.Marker[] = [];
        for (const b of batchMarkersData) {
            const m = new mapboxgl.Marker({ color: "#AA0000", scale: 1.4 }).setLngLat([b.long, b.lat]);
            batchMarkers.push(m);
        }
        return batchMarkers;
    }

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

    function unpackMarkers(apartments: IHousing[], onAdminPage: boolean): { apartmentMarkers: mapboxgl.Marker[]; gymMarkers: mapboxgl.Marker[] } {
        console.log(apartments, "100rm");
        const apartmentMarkers: mapboxgl.Marker[] = [];
        const gymMarkers: mapboxgl.Marker[] = [];
        if (onAdminPage)
            return {
                apartmentMarkers: apartments.map(ap => {
                    const colorChoice = ap.taskId % hexCodes.length;
                    return new mapboxgl.Marker({ color: hexCodes[colorChoice].colorCode, scale: 1.4 }).setLngLat([ap.long, ap.lat]);
                }),
                gymMarkers: [],
            };
        const duplicateGymArray: number[] = []; // holds unique longitudes.

        for (let i = 0; i < apartments.length; i++) {
            const apartment = apartments[i];
            const nearbyGyms: IAssociation[] | undefined = apartment.nearbyGyms;
            if (nearbyGyms !== undefined && nearbyGyms.length > 0 && apartment.long && apartment.lat) {
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
                    const gymThatDefinitelyExists: IGym | undefined = association.gym;
                    if (gymThatDefinitelyExists === undefined || duplicateGymArray.includes(gymThatDefinitelyExists.long)) {
                        continue;
                    }
                    const mForGym = new mapboxgl.Marker({ color: "#f7685b" })
                        .setLngLat([gymThatDefinitelyExists.long, gymThatDefinitelyExists.lat])
                        .setPopup(new mapboxgl.Popup().setHTML(makePopupHTMLForGym(association)));
                    duplicateGymArray.push(gymThatDefinitelyExists.long);
                    gymMarkers.push(mForGym);
                }
            }
        }
        console.log(apartmentMarkers, gymMarkers, "132rm");
        return { apartmentMarkers, gymMarkers };
    }

    function makePopupHTMLForApartment(apartment: IHousing): string {
        const nearbyGym = apartment.nearbyGyms ? apartment.nearbyGyms[0].gym?.name : "No gyms found";
        const distance = apartment.nearbyGyms ? truncateDecimals(apartment.nearbyGyms[0].distanceInKM, 2) : "No data";
        return `<div>
                <h4>${apartment.address}</h4>
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
        <div id="adminMapContainerOuter" className={`${decideWidth(isOpen, isOnMobile)} w-full mapHeight mr-2`}>
            <div id="mapContainer" ref={mapContainer}></div>
        </div>
    );
};

export default AdminMap;
