import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import PageBase from "./../PageBase";
import ApartmentCard from "../../components/apartmentCard/ApartmentCard";

import PaidMap from "../../components/map/PaidMap";
import PageNumber from "../../components/pageNumber/PageNumber";
import { IHousing } from "../../interface/Housing.interface";
import { calcTotalPages } from "../../util/calcTotalPages";
import WithAuthentication from "../../components/hoc/WithAuth";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import NavigationBtnsWithNavLink from "../../components/navigationBtns/NavigationBtnWithNavLink";
import { SEED_CITIES } from "../../util/cities";
import { IViewportBounds } from "../../interface/ViewportBounds.interface";
import { useGetMapPageApartmentsAPI } from "../../api/placesAPI";
import CityPickerWithDefault from "../../components/carousel/cityPicker/CityPickerWithDefault";

const MapPage: React.FC<{}> = () => {
    const navigater = useNavigate();
    const [searchParams] = useSearchParams();
    const pageNum = searchParams.get("pageNum");
    const city = searchParams.get("city");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [active, setActive] = useState<number | null>(null);
    const [centerCoords, setCenterCoords] = useState<IViewportBounds | undefined>(undefined);

    const { newHousing, moveViewport, recenteredViewportCounter } = useGetMapPageApartmentsAPI();

    useEffect(() => {
        const fetchDemoApartments = async () => {
            if (centerCoords === undefined) {
                return;
            }
            console.log("settings viewport");
            console.log(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
            moveViewport(centerCoords.ne.long, centerCoords.ne.lat, centerCoords.sw.long, centerCoords.sw.lat);
        };
        fetchDemoApartments();
        // note: if you put "moveViewport" here you get an infinite loop
    }, [centerCoords]);

    useEffect(() => {
        if (newHousing.length === 0) return;
        // add housings whenever there are new loaded housings from moving the viewport.
        // setApartments(newHousing);
        // set default highlight id for demo map
        const firstApartment = newHousing[0];
        setActive(firstApartment.housingId);
    }, [recenteredViewportCounter, newHousing]);

    useEffect(() => {
        // if mapPage, set as current page
        if (pageNum) {
            const pageAsInteger = parseInt(pageNum, 10);
            console.log("setting page num", pageAsInteger, "57rm");
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

    const qualifiedFromCurrentPage = getCurrentPageResults(newHousing, currentPage);

    const { getDefaultCity } = useAuth();

    const totalPages = calcTotalPages(newHousing);

    function getNextPgURL(cityName: string, pageNum: string | null) {
        if (pageNum === null) {
            return "/map?city=" + cityName + "&pageNum=" + 1;
        }
        const asInteger = parseInt(pageNum, 10);
        const minusOne = asInteger + 1;
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

    function setNewCityFocus(choice: number) {
        const cityName = getCityNameOf(choice);
        navigater("/map?city=" + cityName);
    }

    function getCityNameOf(choice: number) {
        return SEED_CITIES[choice].cityName;
    }

    function getCenterOf(cityName: string | null): [number, number] {
        if (cityName === null) {
            // return montreal
            const selected = SEED_CITIES[9];
            return [selected.centerLat, selected.centerLong];
        }
        const selected = SEED_CITIES.filter(city => city.cityName === cityName)[0];
        return [selected.centerLat, selected.centerLong];
    }

    return (
        <PageBase>
            <div id="pageBaseInnerContainer">
                <div id="middleContainer" className="w-full flex flex-col md2:flex-row">
                    <div>
                        <div className="w-full mt-0 flex justify-center">
                            <CityPickerWithDefault choiceReporter={setNewCityFocus} defaultCity={city} />
                        </div>
                        {/* <PaidMap center={[45, -73]} qualifiedFromCurrentPage={qualifiedFromCurrentPage} activeApartment={active} /> */}
                        <PaidMap
                            center={getCenterOf(city)}
                            qualifiedFromCurrentPage={qualifiedFromCurrentPage}
                            activeApartment={active}
                            adjustedCenterReporter={setCenterCoords}
                        />
                    </div>
                    <div id="apartmentCardContainer" className="">
                        {newHousing
                            ? qualifiedFromCurrentPage.map((ap: IHousing, i) => {
                                  const address = ap.address ? ap.address : "Placeholder St.";
                                  return (
                                      <ApartmentCard
                                          key={i}
                                          apartment={ap}
                                          addr={address}
                                          distanceToNearestGym={ap.distanceToNearestGym}
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
