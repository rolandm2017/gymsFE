import React from "react";
import CityPicker from "../components/cityPicker/CityPicker";
import Map from "../components/map/Map";
import { SEED_CITIES } from "../util/cities";

const LandingPage: React.FC<{}> = () => {
    // const;

    return (
        <div>
            <div>
                <h1>Apartments Near Gyms</h1>
            </div>
            <div>
                <p>placeholder</p>
            </div>
            <div>
                <CityPicker />
            </div>
            <div>{/* <Map /> */}</div>
        </div>
    );
};

export default LandingPage;
