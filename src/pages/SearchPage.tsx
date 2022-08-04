import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import Sidebar from "../components/sidebar/Sidebar";

const SearchPage: React.FC<{}> = props => {
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
                    <div>
                        <div>Apartment Name</div>
                        <div>Apartment Address</div>
                        <div>Nearest Gym</div>
                        <div>Distance</div>
                        <div>Walk Duration</div>
                        <div>Apartment Link</div>
                    </div>
                </div>
                <div>
                    {Array(20)
                        .fill(hardcodeApartments[0])
                        .map(ap => (
                            <DetailsBar {...ap} />
                        ))}
                </div>
                <div>
                    <div>Page 1 of 10</div>
                    <div>
                        <Button type={"Transparent"} text={"Back"} />
                        <Button type={"Opaque"} text={"Next"} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default SearchPage;
