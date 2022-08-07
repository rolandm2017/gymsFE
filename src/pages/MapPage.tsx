import React, { useEffect } from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import Sidebar from "../components/sidebar/Sidebar";
import ApartmentCard from "../components/apartmentCard/ApartmentCard";
import Map from "../components/map/Map";

import { hardcodeApartments } from "../data/apartments";
// import FancyMap from "../components/map/FancyMap";
// import thirdMap from "../components/map/ThirdMap";
import ThirdMap from "../components/map/ThirdMap";

const MapPage: React.FC<{}> = props => {
    return (
        <PageBase>
            {/* // inline block maybe -- todo: remove this comment */}
            <div className="">
                {/* Results */}
                <SearchBar />
                <div className="mt-5 flex flex-col md2:flex-row debug3">
                    <ThirdMap center={[45, -73]} />
                    <div className="">
                        {Array(10)
                            .fill(hardcodeApartments[0])
                            .map((ap, i) => (
                                <ApartmentCard key={i} {...ap} />
                            ))}
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div>20 of 200</div>
                    <div className="flex">
                        <div className="mr-4">
                            <Button type={"Transparent"} text={"Back"} />
                        </div>
                        <div>
                            <Button type={"Opaque"} text={"Next"} />
                        </div>
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default MapPage;
