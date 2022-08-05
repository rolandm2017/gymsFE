import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import Sidebar from "../components/sidebar/Sidebar";
import TitleBar from "../components/titleBar/TitleBar";

import Cat from "../assets/cat.jpeg";

const SearchPage: React.FC<{}> = props => {
    const hardcodeApartments = [
        {
            pic: Cat,
            name: "Apartment 1",
            addr: "123 Fake St",
            gym: "Gold's Gym",
            distance: "1 km",
            time: "10 min",
            // apUrl: "https://google.com",
            apUrl: "https",
            gymUrl: "www.goldsgym.com",
        },
    ];
    // console.log(isOpen, "22rm");

    return (
        <PageBase>
            <div id="searchPage" className="debug6">
                {/* Results */}
                <SearchBar />
                <TitleBar />
                <div className="pb-6">
                    {Array(20)
                        .fill(hardcodeApartments[0])
                        .map((ap, i) => (
                            <DetailsBar key={i} {...ap} />
                        ))}
                </div>
                <div className="flex justify-between">
                    <div>Page 1 of 10</div>
                    <div className="flex">
                        <div className="pr-2.5 sm:pr-5">
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

export default SearchPage;
