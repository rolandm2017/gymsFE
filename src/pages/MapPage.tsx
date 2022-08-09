import React, { useEffect, useContext } from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import ApartmentCard from "../components/apartmentCard/ApartmentCard";
import Map from "../components/map/Map";

import SidebarStateProvider, { ISidebarContext, SidebarStateContext } from "../context/SidebarStateProvider";

import { hardcodeApartments } from "../data/apartments";
// import FancyMap from "../components/map/FancyMap";
// import thirdMap from "../components/map/ThirdMap";
import ThirdMap from "../components/map/ThirdMap";
import PageNumber from "../components/pageNumber/PageNumber";
import NavigationBtns from "../components/navigationBtns/NavigationBtns";

const MapPage: React.FC<{}> = () => {
    return (
        <PageBase>
            <div id="pageBaseInnerContainer">
                {/* Results */}
                <SearchBar />
                <div id="middleContainer" className="w-full mt-5 flex flex-col md2:flex-row">
                    <ThirdMap center={[45, -73]} />
                    <div id="apartmentCardContainer" className="">
                        {Array(10)
                            .fill(hardcodeApartments[0])
                            .map((ap, i) => (
                                <ApartmentCard key={i} {...ap} />
                            ))}
                    </div>
                </div>

                <div id="pageNumberContainer" className="mb-3 flex justify-between items-center">
                    <PageNumber />
                    <NavigationBtns />
                </div>
            </div>
        </PageBase>
    );
};

export default MapPage;
