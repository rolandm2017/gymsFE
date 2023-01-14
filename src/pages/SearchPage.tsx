import React, { useContext, useState } from "react";

import PageBase from "./PageBase";
import DetailsBar from "../components/detailsBar/DetailsBar";
import SearchBar from "../components/searchBar/SearchBar";
import TitleBar from "../components/titleBar/TitleBar";

import PageNumber from "../components/pageNumber/PageNumber";
import NavigationBtns from "../components/navigationBtns/NavigationBtns";
import { calcTotalPages } from "../util/calcTotalPages";
import { ILocationContext, LocationsProviderContext } from "../context/LocationsContext";
import { getCurrentPageResults } from "../util/getCurrentPageResults";

const SearchPage: React.FC<{}> = props => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;
    const [active, setActive] = useState<number | null>(null);
    // console.log(isOpen, "22rm");

    const qualifiedFromCurrentPage = getCurrentPageResults(qualified, currentPage);

    return (
        <PageBase>
            <div id="searchPage">
                {/* Results */}
                <SearchBar />
                <TitleBar />
                <div className="pb-6">
                    {qualifiedFromCurrentPage.map((ap, i) => (
                        <DetailsBar
                            key={i}
                            address={ap.address}
                            nearbyGyms={ap.nearbyGyms}
                            url={ap.url}
                            detailNumber={i}
                            activeIndex={active}
                            setActive={setActive}
                        />
                    ))}
                </div>
                <div className="mb-3 flex justify-between">
                    <PageNumber currentPage={currentPage} totalPages={calcTotalPages(qualified)} />
                    <NavigationBtns
                        currentPage={currentPage}
                        totalPages={calcTotalPages(qualified)}
                        changePgHandler={setCurrentPage}
                        // change active card to null when change page
                        resetActive={setActive}
                    />
                </div>
            </div>
        </PageBase>
    );
};

export default SearchPage;
