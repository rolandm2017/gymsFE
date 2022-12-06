import React, { useEffect, useState } from "react";
//
import { getDemoApartments } from "../api/queries/Places";
import CityPicker from "../components/cityPicker/CityPicker";
import DemoMap from "../components/map/DemoMap";
import { ICity } from "../interface/City.interface";
import { IDemoHousing } from "../interface/DemoHousing.interface";
import { IViewportBounds } from "../interface/ViewportBounds.interface";
import { SEED_CITIES } from "../util/cities";

const LandingPage: React.FC<{}> = () => {
    const [apartments, setApartments] = useState<IDemoHousing[]>([]);
    const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
    const [selectedCity, setSelectedCity] = useState<ICity>(SEED_CITIES[0]);
    const [centerCoords, setCenterCoords] = useState<IViewportBounds | undefined>(undefined);
    const [neLat, setNeLat] = useState<number>(0);
    const [swLat, setSwLat] = useState<number>(0);

    console.log("here");

    useEffect(() => {
        centerMapOnLocation(SEED_CITIES[selectedCityIndex]);
        setSelectedCity(SEED_CITIES[selectedCityIndex]);
    }, [selectedCityIndex]);

    useEffect(() => {
        const fetchDemoApartments = async () => {
            if (centerCoords === undefined) {
                // const apartmentsToAdd = await getDemoApartments(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
                // setApartments(prevApartments => [...prevApartments, apartmentsToAdd]);
                return;
            }
            const apartmentsToAdd = await getDemoApartments(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
            console.log(apartmentsToAdd, "34rm");
            setApartments(prevApartments => [...prevApartments, apartmentsToAdd]);
        };
        fetchDemoApartments();
    }, [neLat, swLat]);

    function updateCenterCoordsHandler(newCoords: IViewportBounds) {
        // because apparently dependency arrays should only contain primitives!
        setSwLat(newCoords.sw.lat);
        setNeLat(newCoords.ne.lat);
        setCenterCoords(newCoords);
    }

    function centerMapOnLocation(city: ICity) {
        //
    }

    // todo: when map is moved, get coords of new location, load apartments for that location.

    return (
        <div>
            <div>
                <h1>Apartments Near Gyms</h1>
            </div>
            <div>
                <p>placeholder</p>
            </div>
            <div className="">
                <div className="w-full mt-5 flex justify-center">
                    <CityPicker choiceReporter={setSelectedCityIndex} />
                </div>
            </div>
            <div>
                <DemoMap
                    center={[selectedCity.centerLat, selectedCity.centerLong]}
                    qualifiedFromCurrentPage={apartments}
                    activeApartment={null}
                    adjustedCenterReporter={updateCenterCoordsHandler}
                />
            </div>
        </div>
    );
};

export default LandingPage;
