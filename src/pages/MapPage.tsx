import React, { useState, useContext } from "react";

import PageBase from "./PageBase";
import SearchBar from "../components/searchBar/SearchBar";
import ApartmentCard from "../components/apartmentCard/ApartmentCard";

import PaidMap from "../components/map/PaidMap";
import PageNumber from "../components/pageNumber/PageNumber";
import NavigationBtns from "../components/navigationBtns/NavigationBtns";
import { ILocationContext, LocationsProviderContext } from "../context/LocationsProvider";
import { IAssociation } from "../interface/Association.interface";
import { IHousing } from "../interface/Housing.interface";
import { calcTotalPages } from "../util/calcTotalPages";

const MapPage: React.FC<{}> = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [active, setActive] = useState<number | null>(null);
    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;

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

    // TODO: make "page 1, page 2, page 3" in url (?) to show different pgs of qualified aps
    // TODO: make apartment cards use real data
    return (
        <PageBase>
            <div id="pageBaseInnerContainer">
                {/* Results */}
                <SearchBar />
                <div id="middleContainer" className="w-full mt-5 flex flex-col md2:flex-row">
                    {qualified && qualified.length > 0 ? (
                        <PaidMap center={[45, -73]} qualifiedFromCurrentPage={qualifiedFromCurrentPage} activeApartment={active} />
                    ) : null}
                    <div id="apartmentCardContainer" className="">
                        {qualified
                            ? qualifiedFromCurrentPage.map((ap, i) => {
                                  const address = ap.address ? ap.address : "Placeholder St."; // TODO: make sure address appears on all apartments
                                  const associatedGymsWithDistances = ap.nearbyGyms as IAssociation[];
                                  const apartmentURL = ap.url !== undefined ? ap.url : "No link found";

                                  return (
                                      <ApartmentCard
                                          key={i}
                                          apartment={ap}
                                          addr={address}
                                          gyms={associatedGymsWithDistances}
                                          apUrl={apartmentURL}
                                          activeNum={i}
                                          setActive={setActive}
                                      />
                                  );
                              })
                            : null}
                    </div>
                </div>

                <div id="pageNumberContainer" className="mb-3 flex justify-between items-center">
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

export default MapPage;
