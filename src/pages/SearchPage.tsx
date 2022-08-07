import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import Profile from "../components/profile/Profile";
import SearchBar from "../components/searchBar/SearchBar";
import Sidebar from "../components/sidebar/Sidebar";
import TitleBar from "../components/titleBar/TitleBar";

import Cat from "../assets/cat.jpeg";

import { hardcodeApartments } from "../data/apartments";
import PageNumber from "../components/pageNumber/PageNumber";
import NavigationBtns from "../components/navigationBtns/NavigationBtns";

const SearchPage: React.FC<{}> = props => {
    // console.log(isOpen, "22rm");

    return (
        <PageBase>
            <div id="searchPage">
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
                    <PageNumber />
                    <NavigationBtns />
                </div>
            </div>
        </PageBase>
    );
};

export default SearchPage;
