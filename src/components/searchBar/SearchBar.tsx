import React, { createRef, MouseEvent, useEffect, useRef, useState } from "react";
import { getMaxLeftDisplacement } from "../../util/getMaxLeftDisplacement";
import { SEED_CITIES } from "../../util/cities";
import { ICity } from "../../interface/City.interface";
import Button from "../button/Button";
import DropdownContainer from "../dropdown/DropdownContainer";
import DropdownItem from "../dropdown/DropdownItem";
import Input from "../input/Input";

import "./SearchBar.scss";
import { useNavigate } from "react-router-dom";
import CityInput from "../input/CityInput";
import ExpanderButton from "../button/ExpanderButton";

interface SearchBarProps {
    runSearch: Function;
    cityNameReporter: Function;
    minDistanceReporter: Function;
    maxDistanceReporter: Function;
    chosenCityName: string | null; // null will be when the param isn't set.
    chosenMinDist: string | null;
    chosenMaxDist: string | null;
}

const SearchBar: React.FC<SearchBarProps> = ({
    runSearch,
    cityNameReporter,
    minDistanceReporter,
    maxDistanceReporter,
    chosenCityName,
    chosenMinDist,
    chosenMaxDist,
}: SearchBarProps) => {
    const [cityInput, setCityInput] = useState("");
    const [minDistance, setMinDistance] = useState(0);
    const [maxDistance, setMaxDistance] = useState(0);
    const [cityFromURL, setCityFromURL] = useState<string>("");
    const [minDistFromURL, setMinDistFromURL] = useState<string>("");
    const [maxDistFromURL, setMaxDistFromURL] = useState<string>("");

    useEffect(() => {
        // These defaults will be set based on query params in the page's URL.
        // If they are present, use them until the user changes them.
        // If they are missing, do not set them into the search values.
        // The point of setting them into state is that the user will be able to overwrite them.
        if (chosenCityName) setCityFromURL(chosenCityName);
        if (chosenMinDist) setMinDistFromURL(chosenMinDist);
        if (chosenMaxDist) setMaxDistFromURL(chosenMaxDist);
    }, []);

    const [isOpen, setIsOpen] = useState(false);

    const dropdownWidth = 120;

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [xOffset, setX] = useState<number | undefined>();
    const [yOffset, setY] = useState<number | undefined>();
    const getPosition = () => {
        const x = dropdownRef.current?.offsetLeft;
        if (!x) return; // it'll always be there.
        const xWithAdjustment = x + 255;
        setX(xWithAdjustment);

        const y = dropdownRef.current?.offsetTop;
        const approxInputHeight = 31;
        const yWithHeightOfInputFactoredIn = y ? y + approxInputHeight : y;
        setY(yWithHeightOfInputFactoredIn);
    };

    useEffect(() => {
        getPosition();
    }, []);
    useEffect(() => {
        window.addEventListener("resize", getPosition);
    }, []);

    function reportAndSetCity(cityName: string) {
        setCityInput(cityName);
        cityNameReporter(cityName);
    }

    function reportAndSetMinDist(minDist: number) {
        setMinDistance(minDist);
        minDistanceReporter(minDist);
    }

    function reportAndSetMaxDist(maxDist: number) {
        setMaxDistance(maxDist);
        maxDistanceReporter(maxDist);
    }

    return (
        <div className="searchBarContainer h-24 px-6 flex items-center">
            <DropdownContainer
                isOpen={isOpen}
                topDisplacement={yOffset}
                leftDisplacement={xOffset}
                width={dropdownWidth}
                closeDropdown={() => {
                    setIsOpen(false);
                }}
            >
                {SEED_CITIES.map((city: ICity, i: number) => {
                    return (
                        <DropdownItem
                            key={i}
                            text={city.cityName}
                            onClickAction={() => {
                                reportAndSetCity(city.cityName);
                                setIsOpen(false);
                            }}
                        />
                    );
                })}
            </DropdownContainer>

            <div className="w-auto grid sm:grid-cols-12 flex justify-between">
                <div className="col-span-12 sm:col-span-3 flex flex-col xl:flex-row">
                    {/* <div className="pr-9"> */}
                    {/* // todo: use geolocating via google to convert addr => long,lat & then put this back */}
                    {/* <Input type="text" placeholder={"Address"} changeReporter={() => {}} /> */}
                    {/* </div> */}
                    <div ref={dropdownRef}>
                        <CityInput
                            type="text"
                            placeholder={"City"}
                            changeReporter={reportAndSetCity}
                            onClickHandler={() => {
                                setIsOpen(true);
                            }}
                            currentValue={cityInput ? cityInput : cityFromURL}
                        />
                    </div>
                </div>
                <div className="inputContainerRight w-full col-span-9 flex flex-col sm:flex-row">
                    <div className="pr-8 w-full sm:w-2/3 flex flex-row">
                        <div>
                            <Input
                                type="text"
                                placeholder={minDistFromURL ? minDistFromURL : "Min Minute Walk"}
                                changeReporter={reportAndSetMinDist}
                            />
                        </div>
                        <div>
                            <Input
                                type="text"
                                placeholder={maxDistFromURL ? maxDistFromURL : "Max Minute Walk"}
                                changeReporter={reportAndSetMaxDist}
                            />
                        </div>
                    </div>
                    <div className="w-full sm:w-1/3">
                        <ExpanderButton
                            type="Opaque"
                            text="Search"
                            onClickHandler={() => {
                                const startPage = 1;
                                runSearch(cityInput, minDistance, maxDistance, startPage);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
