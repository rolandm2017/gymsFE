import React, { useState, useContext, useEffect } from "react";

import PageBase from "./../PageBase";
import SearchBar from "../../components/searchBar/SearchBar";
import ApartmentCard from "../../components/apartmentCard/ApartmentCard";

import PaidMap from "../../components/map/PaidMap";
import PageNumber from "../../components/pageNumber/PageNumber";
import NavigationBtns from "../../components/navigationBtns/NavigationBtns";
import { ILocationContext, LocationsProviderContext } from "../../context/LocationsContext";
import { IAssociation } from "../../interface/Association.interface";
import { IHousing } from "../../interface/Housing.interface";
import { calcTotalPages } from "../../util/calcTotalPages";
import WithAuthentication from "../../components/hoc/WithAuth";
import { useNavigate, useRoutes, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavigationBtnsWithNavLink from "../../components/navigationBtns/NavigationBtnWithNavLink";
import { useSearchAPI } from "../../api/placesAPI";

const MapPage: React.FC<{}> = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [active, setActive] = useState<number | null>(null);
    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const pageNum = searchParams.get("pageNum");
    const city = searchParams.get("city");

    useEffect(() => {
        // if mapPage, set as current page
        if (pageNum) {
            const pageAsInteger = parseInt(pageNum, 10);
            setCurrentPage(pageAsInteger);
        }
    }, [setCurrentPage, pageNum]);

    function getCurrentPageResults(qualified: IHousing[], page: number): IHousing[] {
        // Function is placed early in the distribution of Qualified Apartments to components so
        // the power required to render the chosen apartments is lower.
        // Page 1 is results 0 to 9, page 2 is results 10 to 19.
        if (qualified.length < 10) {
            return qualified;
        }
        const startOfPage = page * 10 - 10; // "1 * 10 - 10 = 0", "2 * 10 - 10 = 10";
        const endOfPage = page * 10 - 1; // "1 * 10 - 1 = 9", "2 * 10 - 1 = 19";
        return qualified.slice(startOfPage, endOfPage);
    }

    const qualifiedFromCurrentPage = getCurrentPageResults(qualified, currentPage);

    const { getDefaultCity } = useAuth();

    const totalPages = calcTotalPages(qualified);

    function getNextPgURL(cityName: string, pageNum: string | null) {
        if (pageNum === null) {
            return "/map?city=" + cityName + "&pageNum=" + 1;
        }
        const asInteger = parseInt(pageNum, 10);
        const minusOne = asInteger - 1;
        const nextPgURL = "/map?city=" + cityName + "&pageNum=" + minusOne;
        return nextPgURL;
    }

    function getPrevPgURL(cityName: string, pageNum: string | null) {
        if (pageNum === null) {
            return "/map?city=" + cityName + "&pageNum=" + 0;
        }
        const asInteger = parseInt(pageNum, 10);
        const minusOne = asInteger - 1;
        return "/map?city=" + cityName + "&pageNum=" + minusOne;
    }

    const { searchResults, runSearch } = useSearchAPI();

    return (
        <PageBase>
            <div id="pageBaseInnerContainer">
                {/* Results */}
                <SearchBar runSearch={runSearch} />
                <div id="middleContainer" className="w-full mt-5 flex flex-col md2:flex-row">
                    {qualified && qualified.length > 0 ? (
                        <PaidMap center={[45, -73]} qualifiedFromCurrentPage={qualifiedFromCurrentPage} activeApartment={active} />
                    ) : null}
                    <div id="apartmentCardContainer" className="">
                        {qualified
                            ? qualifiedFromCurrentPage.map((ap, i) => {
                                  const address = ap.address ? ap.address : "Placeholder St.";
                                  const associatedGymsWithDistances = ap.nearbyGyms as IAssociation[];
                                  return (
                                      <ApartmentCard
                                          key={i}
                                          apartment={ap}
                                          addr={address}
                                          gyms={associatedGymsWithDistances}
                                          activeNum={i}
                                          setActive={setActive}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>

                <div id="pageNumberContainer" className="mb-3 flex justify-between items-center">
                    <PageNumber currentPage={currentPage} totalPages={totalPages} />
                    <NavigationBtnsWithNavLink
                        currentCity={city ? city : getDefaultCity()}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        // change active card to null when change page
                        resetActive={setActive}
                        nextPgURL={getNextPgURL(city ? city : getDefaultCity(), pageNum)}
                        prevPageURL={getPrevPgURL(city ? city : getDefaultCity(), pageNum)}
                    />
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(MapPage);
