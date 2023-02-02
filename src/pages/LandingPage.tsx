import React, { useEffect, useState } from "react";
//
import { useGetDemoApartmentsAPI } from "../api/placesAPI";
import SignUpPrompt from "../components/auth/SignUpPrompt";
import Button from "../components/button/Button";
import ExpanderButton from "../components/button/ExpanderButton";
import CityPicker from "../components/cityPicker/CityPicker";
import DemoMap from "../components/map/DemoMap";
import { ICity } from "../interface/City.interface";
import { IDemoHousing } from "../interface/DemoHousing.interface";
import { IViewportBounds } from "../interface/ViewportBounds.interface";
import { SEED_CITIES } from "../util/cities";

import Brand1 from "../assets/brand1.png";
import Brand2 from "../assets/brand2.png";
import Brand3 from "../assets/brand3.png";
import Brand4 from "../assets/brand4.png";
import Brand5 from "../assets/brand5.png";
import NiceMan from "../assets/NiceMan.png";
import "./LandingPage.scss";
import ApartmentsCarousel from "../components/apartmentsCarousel/ApartmentsCarousel";

const LandingPage: React.FC<{}> = () => {
    const [apartments, setApartments] = useState<IDemoHousing[]>([]);
    // city picker
    const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
    const [selectedCity, setSelectedCity] = useState<ICity>(SEED_CITIES[0]);
    // apartment carousel picker
    const [selectedApartmentId, setSelectedApartmentId] = useState(0);
    const [centerCoords, setCenterCoords] = useState<IViewportBounds | undefined>(undefined);
    const [neLat, setNeLat] = useState<number>(0);
    const [swLat, setSwLat] = useState<number>(0);

    const { newDemoHousing, moveViewport, err, demoApartmentsAreLoaded, recenteredViewportCounter } = useGetDemoApartmentsAPI();

    useEffect(() => {
        // on page load, get gyms
        moveViewport(centerCoords?.ne.long, centerCoords);
    }, []);

    useEffect(() => {
        centerMapOnLocation(SEED_CITIES[selectedCityIndex]);
        setSelectedCity(SEED_CITIES[selectedCityIndex]);
    }, [selectedCityIndex]);

    useEffect(() => {
        if (newDemoHousing.length === 0) return;
        // add housings whenever there are new loaded housings from moving the viewport.
        const updated = [...newDemoHousing];
        setApartments(updated);
        console.log(updated, "49rm");
        // set default highlight id for demo map
        const firstApartment = updated[0];
        setSelectedApartmentId(firstApartment.housingId);
    }, [recenteredViewportCounter, newDemoHousing]);

    useEffect(() => {
        const fetchDemoApartments = async () => {
            if (centerCoords === undefined) {
                // const apartmentsToAdd = await getDemoApartments(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
                // setApartments(prevApartments => [...prevApartments, apartmentsToAdd]);
                return;
            }
            moveViewport(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
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
            {/* // mobile header */}
            <div className="px-3 flex justify-between items-center bg-black h-16">
                <div>
                    <h1 className="poppins blueText text-xl">Apartments Near Gyms</h1>
                </div>
                <div>
                    <Button
                        type="Opaque"
                        text="Try Now"
                        onClickHandler={() => {
                            // zoomToSignUp
                        }}
                    />
                </div>
            </div>
            <div className="h-80 mt-8  flex justify-center">
                <img src={NiceMan} className=" niceManImg " alt="a fit person meditating" />
            </div>

            <div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold">
                        Don't Let <span className="blueText"> Your Commute</span>
                    </h2>
                    <h2 className="text-2xl font-bold">To The Gym</h2>
                    <h2 className="text-2xl font-bold">Hold You Back</h2>
                </div>
                <div className="mt-5">
                    <p className="px-6 text-base">
                        Our apartment finder service is specifically designed for weightlifters like you. With our easy-to-use map feature, you can
                        view available apartments and gyms in your desired location.
                    </p>
                </div>
                <div className="">
                    <div className="px-24 py-8">
                        <ExpanderButton
                            type="Opaque"
                            text="Try Now For Free"
                            onClickHandler={() => {
                                // zoomToSignUp()
                            }}
                        />
                    </div>
                </div>
            </div>
            <div>
                <div className="bg-zinc-100 h-24 px-2 flex justify-around items-center">
                    <div className="h-14 w-16 mx-2 flex items-center">
                        <img src={Brand1} alt="a logo" />
                    </div>
                    <div className="h-14 w-16 mx-2 flex items-center">
                        <img src={Brand2} alt="a logo" />
                    </div>
                    <div className="h-14 w-16 mx-2 flex items-center">
                        <img src={Brand3} alt="a logo" />
                    </div>
                    <div className="h-14 w-16 mx-2 flex items-center">
                        <img src={Brand4} alt="a logo" />
                    </div>
                    <div className="h-14 w-16 mx-2 flex items-center">
                        <img src={Brand5} alt="a logo" />
                    </div>
                </div>
            </div>
            <div className="px-8 mt-12">
                <div>
                    <h3 className="text-xl font-bold poppins">
                        Preview our apartment finder service for free <span className="blueText">right now.</span>{" "}
                    </h3>
                </div>
                <div className="mt-4">
                    <p className="poppins">
                        Stop making excuses and falling short of your goals. If you want to become a true success in the long term,{" "}
                    </p>
                </div>
            </div>
            <div>
                <div className="">
                    <div className="w-full mt-5 flex justify-center">
                        <CityPicker choiceReporter={setSelectedCityIndex} />
                    </div>
                </div>
                <div>
                    <ApartmentsCarousel apartments={apartments} activeMapMarkerApartmentIdSetter={setSelectedApartmentId} />
                </div>
                <div className="border-2 border-black">
                    <DemoMap
                        center={[selectedCity.centerLat, selectedCity.centerLong]}
                        viewportContents={apartments}
                        adjustedCenterReporter={updateCenterCoordsHandler}
                        highlightedApartmentId={selectedApartmentId}
                    />
                </div>
            </div>
            <div>
                <div className="mt-12">
                    <p>Stop making excuses and falling short of your goals. If you want to become a true success in the long term, </p>
                </div>
                <div className="mt-3.5 mb-10">
                    <h2 className="text-xl font-bold">What Lifters Say About Us</h2>
                </div>
            </div>
            <div>{/* // testimonial carousel */}</div>

            <div className="border-2 border-black flex justify-center   ">
                <SignUpPrompt />
            </div>
            {/* <div>
                <GoogleLogin />
            </div>
            <div>
                <AuthPrompt />
            </div> */}
        </div>
    );
};

export default LandingPage;
