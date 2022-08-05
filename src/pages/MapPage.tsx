import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import Sidebar from "../components/sidebar/Sidebar";
import ApartmentCard from "../components/apartmentCard/ApartmentCard";
import Map from "../components/map/Map";

import { hardcodeApartments } from "../data/apartments";

const MapPage: React.FC<{}> = props => {
    return (
        <PageBase>
            <div>
                {/* Results */}
                <SearchBar />
                <div className="flex flex-col sm:flex-row">
                    <Map />
                    <div>
                        {Array(20)
                            .fill(hardcodeApartments[0])
                            .map(ap => (
                                <ApartmentCard {...ap} />
                            ))}
                    </div>
                </div>

                <div>
                    <div>20 of 200</div>
                    <div>
                        <Button type={"Transparent"} text={"Back"} />
                        <Button type={"Opaque"} text={"Next"} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default MapPage;
