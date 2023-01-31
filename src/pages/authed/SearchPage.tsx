import React, { useContext, useEffect, useState } from "react";

import PageBase from "../PageBase";
import DetailsBar from "../../components/detailsBar/DetailsBar";
import SearchBar from "../../components/searchBar/SearchBar";
import TitleBar from "../../components/titleBar/TitleBar";

import PageNumber from "../../components/pageNumber/PageNumber";
import NavigationBtns from "../../components/navigationBtns/NavigationBtns";
import { calcTotalPages } from "../../util/calcTotalPages";
import { ILocationContext, LocationsProviderContext } from "../../context/LocationsContext";
import { getCurrentPageResults } from "../../util/getCurrentPageResults";
import WithAuthentication from "../../components/hoc/WithAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSearchAPI } from "../../api/placesAPI";
import { IHousing } from "../../interface/Housing.interface";
import DetailsBarContainer from "../../components/detailsBar/DetailsBarContainer";
import SearchPgNavigationBtnsWithNavLink from "../../components/navigationBtns/SearchPgNavigationBtnWithNavLink";

const SearchPage: React.FC<{}> = props => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [resultsFromSearch, setResultsFromSearch] = useState<IHousing[]>([]);
    const [activeIndexForHighlight, setActiveIndexForHighlight] = useState<number | null>(null);
    // values from search bar
    const [activeCityName, setActiveCityName] = useState("");
    const [activeMinDist, setActiveMinDist] = useState<null | number>(null);
    const [activeMaxDist, setActiveMaxDist] = useState<null | number>(null);
    // we don't need the qualified list
    // const { qualified } = useContext(LocationsProviderContext) as ILocationContext;

    const [searchParams, setSearchParams] = useSearchParams();
    const mapPageFromParams = searchParams.get("mapPage");
    const cityNameFromParams = searchParams.get("cityName");
    const minDistanceFromParams = searchParams.get("minDistance");
    const maxDistanceFromParams = searchParams.get("maxDistance");

    useEffect(() => {
        // runs once on page load
        if (mapPageFromParams) {
            const integerPageNum = parseInt(mapPageFromParams, 10);
            setCurrentPage(integerPageNum);
        }
        // sets current page on page load
        console.log("HERE IS MAP PAGE", mapPageFromParams, "47m");
        if (mapPageFromParams) {
            const asInteger = parseInt(mapPageFromParams, 10);
            setCurrentPage(asInteger);
        }
    }, []);

    const { searchResults, runSearch, totalPagesForThisQuery } = useSearchAPI();

    function makeNextPageURL(currentPage: number, cityName: string, minDistance: number | null, maxDistance: number | null) {
        if (minDistance === null && maxDistance === null) {
            return `/search?cityName=${cityName}&mapPage=${currentPage + 1}`;
        } else if (maxDistance === null) {
            // &maxDistance=${maxDistance} has been removed.
            return `/search?cityName=${cityName}&mapPage=${currentPage + 1}&minDistance=${minDistance}`;
        } else if (minDistance === null) {
            // &minDistance=${minDistance} has been removed.
            return `/search?cityName=${cityName}&mapPage=${currentPage + 1}&maxDistance=${maxDistance}`;
        } else {
            return `/search?cityName=${cityName}&mapPage=${currentPage + 1}&minDistance=${minDistance}&maxDistance=${maxDistance}`;
        }
    }

    function makePrevPageURL(currentPage: number, cityName: string, minDistance: number | null, maxDistance: number | null) {
        if (minDistance === null && maxDistance === null) {
            return `/search?cityName=${cityName}&mapPage=${currentPage - 1}`;
        } else if (maxDistance === null) {
            // &maxDistance=${maxDistance} has been removed.
            return `/search?cityName=${cityName}&mapPage=${currentPage - 1}&minDistance=${minDistance}`;
        } else if (minDistance === null) {
            // &minDistance=${minDistance} has been removed.
            return `/search?cityName=${cityName}&mapPage=${currentPage - 1}&maxDistance=${maxDistance}`;
        } else {
            return `/search?cityName=${cityName}&mapPage=${currentPage - 1}&minDistance=${minDistance}&maxDistance=${maxDistance}`;
        }
    }

    useEffect(() => {
        console.log(searchResults, "42rm");
        if (searchResults) {
            setResultsFromSearch(searchResults);
        }
    }, [searchResults]);

    useEffect(() => {
        // load some data the first time user gets to the page.
        // confirm its a blank url without params, so its REALLY the first time they're here, not them navigating "back"
        console.log([mapPageFromParams, cityNameFromParams, minDistanceFromParams, maxDistanceFromParams], "43rm");
        const noSearchPgParams = [mapPageFromParams, cityNameFromParams, minDistanceFromParams, maxDistanceFromParams].some(param => param === null);
        console.log(noSearchPgParams, "45rm");
        if (noSearchPgParams) {
            console.log("running search 47rm");
            const minDist = 0;
            const maxDist = 2;
            const pg = 1;
            setActiveCityName("Montreal"); // so "next pg" gets you where you want to go
            runSearch("Montreal", minDist, maxDist, pg);
        } else {
            // next 4 lines is satisfying ts.
            const cityThatDefinitelyExists = cityNameFromParams ? cityNameFromParams : "Placeholder";
            const minDistThatDefinitelyExists = minDistanceFromParams ? parseInt(minDistanceFromParams, 10) : 0;
            const maxDistThatDefinitelyExists = maxDistanceFromParams ? parseInt(maxDistanceFromParams, 10) : 5;
            const pgDefExists = mapPageFromParams ? parseInt(mapPageFromParams, 10) : 0;
            runSearch(cityThatDefinitelyExists, minDistThatDefinitelyExists, maxDistThatDefinitelyExists, pgDefExists);
        }
    }, []);

    // function changePgHandler(currentCity: string, newPg: number) {
    //     // need to involve currentCity so ... ???
    //     // fixme: currentCity is needed why?
    //     setCurrentPage(newPg);
    // }

    return (
        <PageBase>
            <div id="searchPage">
                {/* Results */}
                <SearchBar
                    runSearch={runSearch}
                    cityNameReporter={setActiveCityName}
                    minDistanceReporter={setActiveMinDist}
                    maxDistanceReporter={setActiveMaxDist}
                    chosenCityName={cityNameFromParams}
                    chosenMinDist={minDistanceFromParams}
                    chosenMaxDist={maxDistanceFromParams}
                />
                <TitleBar />
                <div className="pb-6">
                    <DetailsBarContainer
                        apartments={resultsFromSearch}
                        currentPage={currentPage}
                        activeIndexForHighlight={activeIndexForHighlight}
                        setActiveIndexForHighlight={setActiveIndexForHighlight}
                    />
                </div>
                <div className="mb-3 flex justify-between">
                    <PageNumber currentPage={currentPage} totalPages={totalPagesForThisQuery} />
                    <SearchPgNavigationBtnsWithNavLink
                        currentPage={currentPage}
                        nextPgURL={makeNextPageURL(currentPage, activeCityName, activeMinDist, activeMaxDist)}
                        prevPageURL={makePrevPageURL(currentPage, activeCityName, activeMinDist, activeMaxDist)}
                    />
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(SearchPage);
