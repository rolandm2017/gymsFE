import React, { useContext, useState } from "react";

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
import { calcTotalPages } from "../util/calcTotalPages";
import { ILocationContext, LocationsProviderContext } from "../context/LocationsProvider";

const SearchPage: React.FC<{}> = props => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;
    const [active, setActive] = useState<number | null>(null);
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
                            <DetailsBar key={i} {...ap} detailNumber={i} active={active} setActive={setActive} />
                        ))}
                </div>
                <div className="mb-3 flex justify-between">
                    <PageNumber currentPage={currentPage} totalPages={calcTotalPages(qualified)} />
                    <NavigationBtns currentPage={currentPage} totalPages={calcTotalPages(qualified)} changePgHandler={setCurrentPage} />
                </div>
            </div>
        </PageBase>
    );
};

export default SearchPage;
