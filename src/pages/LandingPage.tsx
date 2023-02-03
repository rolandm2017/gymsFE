import React, { useEffect, useRef, useState } from "react";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
//
import { useGetDemoApartmentsAPI } from "../api/placesAPI";
import SignUpPrompt from "../components/auth/SignUpPrompt";
import Button from "../components/button/Button";
import ExpanderButton from "../components/button/ExpanderButton";
import CityPicker from "../components/carousel/cityPicker/CityPicker";
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
import LandingPageCurve from "../assets/signup-pg-curve.png";

import ApartmentsCarousel from "../components/carousel/apartmentsCarousel/ApartmentsCarousel";
import TestimonialCarousel from "../components/carousel/testimonial/TestimonialCarouselMobile";

import "./LandingPage.scss";
import TestimonialCarouselMobile from "../components/carousel/testimonial/TestimonialCarouselMobile";
import TestimonialCarouselDesktop from "../components/carousel/testimonial/TestimonialCarouselDesktop";

const LandingPage: React.FC<{}> = () => {
    const [apartments, setApartments] = useState<IDemoHousing[]>([]);
    // city picker
    const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
    const [selectedCity, setSelectedCity] = useState<ICity>(SEED_CITIES[0]);
    // apartment carousel picker
    const [selectedApartmentId, setSelectedApartmentId] = useState(0);
    const [centerCoords, setCenterCoords] = useState<IViewportBounds | undefined>(undefined);

    const navigater = useNavigate();
    const { newDemoHousing, moveViewport, err, demoApartmentsAreLoaded, recenteredViewportCounter } = useGetDemoApartmentsAPI();

    useEffect(() => {
        // on page load, get gyms
        moveViewport(centerCoords?.ne.long, centerCoords);
    }, []);

    useEffect(() => {
        // updating the selected city will re-center the map.
        console.log("Selecting:", SEED_CITIES[selectedCityIndex], "43rm");
        const newCity = SEED_CITIES[selectedCityIndex];
        setSelectedCity(newCity);
    }, [selectedCityIndex]);

    useEffect(() => {
        if (newDemoHousing.length === 0) return;
        // add housings whenever there are new loaded housings from moving the viewport.
        const updated = [...newDemoHousing];
        setApartments(updated);
        // set default highlight id for demo map
        const firstApartment = updated[0];
        setSelectedApartmentId(firstApartment.housingId);
    }, [recenteredViewportCounter, newDemoHousing]);

    useEffect(() => {
        const fetchDemoApartments = async () => {
            if (centerCoords === undefined) {
                return;
            }
            console.log("moivng viewport 63rm");
            moveViewport(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
        };
        fetchDemoApartments();
    }, [centerCoords]);

    // stuff to help the curve img stay square
    const [height, setHeight] = useState(0);
    const mobileCurveImgRef = useRef<HTMLDivElement>(null);
    const desktopCurveImgRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        function reportNewWidth() {
            // run again on resize
            if (mobileCurveImgRef.current) {
                const divHeight = mobileCurveImgRef.current.clientHeight;
                console.log(divHeight, "77rm");
                setHeight(divHeight);
            }
        }
        reportNewWidth(); // run once on load

        window.addEventListener("resize", reportNewWidth);

        return () => {
            window.removeEventListener("resize", reportNewWidth);
        };
    }, []);

    return (
        <div>
            {/* // mobile header */}
            <div className="px-4 w-full  flex sm:hidden justify-between items-center bg-black h-16">
                <div>
                    <h1 className="poppins blueText text-xl">Apartments Near Gyms</h1>
                </div>
                <div>
                    <Button
                        type="Opaque"
                        text="Sign Up"
                        onClickHandler={() => {
                            navigater("/signup");
                        }}
                    />
                    <Button
                        type="Opaque"
                        text="Log In"
                        onClickHandler={() => {
                            navigater("/login");
                        }}
                    />
                </div>
            </div>
            <div className="hidden sm:block relative">
                {/* // desktop pre-fold */}
                {/* style={{ width: height }} */}
                <div id="landingPageCurveDesktop" className="w-full h-72 absolute flex justify-end z-0 ">
                    <div ref={desktopCurveImgRef} className={`h-72 w-72 w-full `} style={{}}>
                        <img src={LandingPageCurve} className=" z-0 h-72 w-72 " alt="lower left quadrant of three stacked circles" />
                    </div>
                </div>
                <div className=" h-72  w-full  flex justify-end  absolute top-0 right-0 ">
                    <div className="mt-24 w-2/5 flex justify-start ">
                        <div className="h-80 w-[355px]   z-20">
                            <img src={NiceMan} className="niceManImg mt-6 z-30" alt="a fit person meditating" />
                        </div>
                    </div>
                </div>
                <div className="mb-8 h-auto lg:h-[450px] w-full flex justify-center z-20">
                    <div className="w-3/5 flex flex-col items-start">
                        <div className="w-full mt-6 flex justify-between ">
                            <div>
                                <h1 className="poppins blueText text-xl z-20">Apartments Near Gyms</h1>
                            </div>
                            <div className="z-20 flex">
                                <div className="mr-3">
                                    <Button
                                        type="Opaque"
                                        text="Sign Up"
                                        onClickHandler={() => {
                                            navigater("/signup");
                                        }}
                                    />
                                </div>
                                <Button
                                    type="Opaque"
                                    text="Log In"
                                    onClickHandler={() => {
                                        navigater("/login");
                                    }}
                                />
                            </div>
                        </div>
                        <div className="w-3/5 flex flex-col items-start">
                            <div className="mt-8 text-left">
                                <h2 className="text-4xl font-bold">
                                    Don't Let <span className="blueText"> Your Commute To The Gym</span> Hold You Back
                                </h2>
                            </div>
                            <div className="mt-5">
                                <p className="text-base text-left">
                                    Our apartment finder service is specifically designed for weightlifters like you. With our easy-to-use map
                                    feature, you can view available apartments and gyms in your desired location.
                                </p>
                            </div>
                            <div className="">
                                <div className="w-48 py-8">
                                    <HashLink smooth to="/#try-now">
                                        <ExpanderButton type="Opaque" text="Try Now For Free" onClickHandler={() => {}} />
                                    </HashLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="block sm:hidden">
                {/* // mobile pre-fold */}
                <div className="relative h-72    flex justify-end ">
                    <div id="landingCurveMobile" ref={mobileCurveImgRef} className={`h-full `} style={{ width: height }}>
                        <img src={LandingPageCurve} className=" z-10" alt="three consecutively smaller quarter-circles" />
                    </div>
                    <div className="w-full absolute top-0 flex justify-center">
                        <div className="h-72 w-80  flex justify-center z-20">
                            <img src={NiceMan} className="niceManImg mt-6 z-30" alt="a fit person meditating" />
                        </div>
                    </div>
                </div>
                <div className="mt-12">
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">
                            Don't Let <span className="blueText"> Your Commute</span>
                        </h2>
                        <h2 className="text-2xl font-bold">To The Gym</h2>
                        <h2 className="text-2xl font-bold">Hold You Back</h2>
                    </div>
                    <div className="mt-5">
                        <p className="px-6 text-base">
                            Our apartment finder service is specifically designed for weightlifters like you. With our easy-to-use map feature, you
                            can view available apartments and gyms in your desired location.
                        </p>
                    </div>
                    <div className="w-full flex justify-center">
                        <div className="px-24 py-8 w-96">
                            <HashLink smooth to="/#try-now">
                                <ExpanderButton type="Opaque" text="Try Now For Free" onClickHandler={() => {}} />
                            </HashLink>
                        </div>
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
                        Use a preview of our apartment finder service for free <span className="blueText">right now.</span>{" "}
                    </h3>
                </div>
                <div className="mt-4">
                    <p className="poppins">
                        Stop making excuses and falling short of your goals. If you want to become a true success in the long term, signing up for
                        this is the first step to taking control of your health and fitness.
                    </p>
                </div>
            </div>
            <div id="try-now" className="mt-12">
                <div>
                    <div className="w-full mt-5 flex justify-center">
                        <CityPicker choiceReporter={setSelectedCityIndex} />
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <ApartmentsCarousel apartments={apartments} activeMapMarkerApartmentIdSetter={setSelectedApartmentId} />
                </div>
                <div className="px-0 sm:px-12">
                    <DemoMap
                        center={[selectedCity.centerLat, selectedCity.centerLong]}
                        viewportContents={apartments}
                        adjustedCenterReporter={setCenterCoords}
                        highlightedApartmentId={selectedApartmentId}
                    />
                </div>
            </div>
            <div className="mt-10 flex justify-center">
                <div className="w-72">
                    <HashLink smooth to="/#sign-up">
                        <ExpanderButton type="Opaque" text="Sign Up" onClickHandler={() => {}} />
                    </HashLink>
                </div>
            </div>
            <div className="px-4">
                <div className="mt-10 px-6 w-full flex flex-col items-center">
                    <h3 className="text-xl mb-4">Become the type of person who:</h3>

                    <div className="text-left">
                        <li>Never lets bad weather or a busy schedule keep them from hitting the gym</li>
                        <li>Turns heads at the beach and receives compliments on their toned physique</li>
                        <li>Boasts boundless energy and drive to tackle each day</li>
                        <li>Can look back with pride and satisfaction at all the progress with a dazzling smile</li>
                    </div>
                </div>
                <div className="mt-6 mb-10">
                    <h2 className="text-xl font-bold">What Lifters Say About Us</h2>
                </div>
            </div>
            <div className="block sm:hidden">
                <TestimonialCarouselMobile />
            </div>

            <div className="hidden sm:block">
                <TestimonialCarouselDesktop />
            </div>

            <div id="sign-up">
                <h3 className="mt-16 text-3xl font-semibold">Sign Up</h3>
            </div>
            <div className="mt-8 w-full  flex justify-center ">
                <div className="w-full sm:w-4/5 md:w-3/5 flex justify-center ">
                    <SignUpPrompt muteSignUpHeader={true} />
                </div>
            </div>
            <div className="h-24">{/* // spacer div */}</div>
        </div>
    );
};

export default LandingPage;
