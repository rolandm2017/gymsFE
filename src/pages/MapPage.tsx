import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import Sidebar from "../components/sidebar/Sidebar";
import ApartmentCard from "../components/apartmentCard/ApartmentCard";

const MapPage: React.FC<{}> = props => {
    const hardcodeApartments = [
        {
            name: "Apartment 1",
            addr: "123 Fake St",
            gym: "Gold's Gym",
            distance: "1 km",
            time: "10 min",
            apUrl: "https://google.com",
            gymUrl: "www.goldsgym.com",
        },
    ];

    return (
        <PageBase>
            <div>
                {/* Results */}
                <SearchBar />
                <div>
                    {Array(20)
                        .fill(hardcodeApartments[0])
                        .map(ap => (
                            <ApartmentCard {...ap} />
                        ))}
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
