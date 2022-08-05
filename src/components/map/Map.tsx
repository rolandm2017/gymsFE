import React from "react";
import MapBox, { GeolocateControl } from "react-map-gl";

const MAPBOX_TOKEN: string = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
console.log(MAPBOX_TOKEN, "5rm");

const Map: React.FC<{}> = () => {
    return (
        <div>
            FOO
            <MapBox
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    longitude: -100,
                    latitude: 40,
                    zoom: 3.5,
                }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                <GeolocateControl positionOptions={{ enableHighAccuracy: true }} trackUserLocation={true} />
            </MapBox>
        </div>
    );
};

export default Map;
