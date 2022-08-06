import React from "react";
import MapBox, { GeolocateControl } from "react-map-gl";

import "./Map.scss";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
console.log(MAPBOX_TOKEN, "5rm");

const Map: React.FC<{}> = () => {
    return (
        <div className="w-full mapHeight mapWidth mr-3">
            <MapBox
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    longitude: -73,
                    latitude: 45,
                    zoom: 3.5,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                attributionControl={false}
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
            </MapBox>
        </div>
    );
};

export default Map;
