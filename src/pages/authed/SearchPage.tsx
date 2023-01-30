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

const SearchPage: React.FC<{}> = props => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;
    const [active, setActive] = useState<number | null>(null);

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const mapPageFromParams = searchParams.get("mapPage");
    const cityFromParams = searchParams.get("city");
    const minDistanceFromParams = searchParams.get("minDistance");
    const maxDistanceFromParams = searchParams.get("maxDistance");

    const { getDefaultCity } = useAuth();

    const qualifiedFromCurrentPage = getCurrentPageResults(qualified, currentPage);

    function changePages(cityName: string, pageNum: number) {
        navigate("/search?city=" + cityName + "&pageNum=" + pageNum);
    }

    const { searchResults, runSearch } = useSearchAPI();

    useEffect(() => {
        // load some data the first time user gets to the page.
        // confirm its a blank url without params, so its REALLY the first time they're here, not them navigating "back"
        console.log([mapPageFromParams, cityFromParams, minDistanceFromParams, maxDistanceFromParams], "43rm");
        const noSearchPgParams = [mapPageFromParams, cityFromParams, minDistanceFromParams, maxDistanceFromParams].some(param => param === null);
        console.log(noSearchPgParams, "45rm");
        if (noSearchPgParams) {
            console.log("running search 47rm");
            runSearch("Montreal", 0, 2);
        } else {
            // next 3 lines is satisfying ts.
            const cityThatDefinitelyExists = cityFromParams ? cityFromParams : "Placeholder";
            const minDistThatDefinitelyExists = minDistanceFromParams ? parseInt(minDistanceFromParams, 10) : 0;
            const maxDistThatDefinitelyExists = maxDistanceFromParams ? parseInt(maxDistanceFromParams, 10) : 5;
            runSearch(cityThatDefinitelyExists, minDistThatDefinitelyExists, maxDistThatDefinitelyExists);
        }
    }, []);

    return (
        <PageBase>
            <div id="searchPage">
                {/* Results */}
                <SearchBar runSearch={runSearch} />
                <TitleBar />
                <div className="pb-6">
                    {searchResults.map((ap, i) => (
                        <DetailsBar
                            key={i}
                            address={ap.address}
                            nearbyGyms={ap.nearbyGyms}
                            // url={ap.url}
                            detailNumber={i}
                            activeIndex={active}
                            setActive={setActive}
                        />
                    ))}
                </div>
                <div className="mb-3 flex justify-between">
                    <PageNumber currentPage={currentPage} totalPages={calcTotalPages(qualified)} />
                    <NavigationBtns
                        currentCity={cityFromParams ? cityFromParams : getDefaultCity()}
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

export default WithAuthentication(SearchPage);
