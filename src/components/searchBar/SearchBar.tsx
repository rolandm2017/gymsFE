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

interface SearchBarProps {
    runSearch: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({ runSearch }: SearchBarProps) => {
    const [cityInput, setCityInput] = useState("");
    const [minDistance, setMinDistance] = useState(0);
    const [maxDistance, setMaxDistance] = useState(0);

    const [isOpen, setIsOpen] = useState(false);

    const dropdownWidth = 120;

    const navigate = useNavigate();

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
                                setCityInput(city.cityName);
                                setIsOpen(false);
                            }}
                        />
                    );
                })}
            </DropdownContainer>

            <div className="w-auto flex justify-between">
                <div className="inputContainerLeft flex flex-col xl:flex-row">
                    <div className="pr-9">
                        {/* <Input type="text" placeholder={"Address"} changeReporter={() => {}} /> */}
                        {/* // todo: use geolocating via google to convert addr => long,lat */}
                    </div>
                    <div ref={dropdownRef}>
                        <CityInput
                            type="text"
                            placeholder={"City"}
                            changeReporter={setCityInput}
                            onClickHandler={() => {
                                setIsOpen(true);
                            }}
                            currentValue={cityInput}
                        />
                    </div>
                </div>
                <div className="inputContainerRight w-full flex justify-end">
                    <div className=" pr-8 flex flex-col xl:flex-row">
                        {/* <div className="pr-8">
                            <Input type="text" placeholder={"Min Distance"} />
                        </div> */}
                        <div>
                            <Input type="text" placeholder={"Min Distance In Minutes"} changeReporter={setMinDistance} />
                        </div>
                        <div>
                            <Input type="text" placeholder={"Max Distance In Minutes"} changeReporter={setMaxDistance} />
                        </div>
                    </div>
                    <Button
                        type="Opaque"
                        text="Search"
                        onClickHandler={() => {
                            runSearch(cityInput, minDistance, maxDistance);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
