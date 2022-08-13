import React, { useContext } from "react";

import PageBase from "./PageBase";
import SearchBar from "../components/searchBar/SearchBar";
import ApartmentCard from "../components/apartmentCard/ApartmentCard";

import ThirdMap from "../components/map/ThirdMap";
import PageNumber from "../components/pageNumber/PageNumber";
import NavigationBtns from "../components/navigationBtns/NavigationBtns";
import { ILocationContext, LocationsProviderContext } from "../context/LocationsProvider";

const MapPage: React.FC<{}> = () => {
    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;

    // TODO: make "page 1, page 2, page 3" in url (?) to show different pgs of qualified aps
    // TODO: make apartment cards use real data
    return (
        <PageBase>
            <div id="pageBaseInnerContainer">
                {/* Results */}
                <SearchBar />
                <div id="middleContainer" className="w-full mt-5 flex flex-col md2:flex-row">
                    <ThirdMap center={[45, -73]} />
                    <div id="apartmentCardContainer" className="">
                        {qualified
                            ? qualified.map((ap, i) => {
                                  const address = ap.address ? ap.address : "455 Placeholder St."; // TODO: make sure address appears on all apartments
                                  const associatedGymsWithDistances = ap.nearbyGyms;
                                  const apartmentURL = ap.url;

                                  return <ApartmentCard key={i} addr={address} {...ap} />;
                              })
                            : null}
                        {/* {Array(10)
                            .fill(hardcodeApartments[0])
                            .map((ap, i) => (
                                <ApartmentCard key={i} {...ap} />
                            ))} */}
                    </div>
                </div>

                <div id="pageNumberContainer" className="mb-3 flex justify-between items-center">
                    <PageNumber />
                    <NavigationBtns />
                </div>
            </div>
        </PageBase>
    );
};

export default MapPage;
