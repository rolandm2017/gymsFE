import React, { MouseEvent, useState } from "react";
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

const SearchBar: React.FC<{}> = () => {
    const [city, setCity] = useState("");

    const [isOpen, setIsOpen] = useState(false);
    const [topDisplacement, setTopDisplacement] = useState<number | undefined>(undefined);
    const [leftDisplacement, setLeftDisplacement] = useState<number | undefined>(undefined);

    const dropdownWidth = 120;

    const navigate = useNavigate();

    function setDropdownPosition(e: MouseEvent<HTMLDivElement | globalThis.MouseEvent>) {
        console.log(e, "search pg 26rm");
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const maxDisplacement = getMaxLeftDisplacement(dropdownWidth, viewportWidth);
        const xPos = e.pageX < maxDisplacement ? e.pageX : maxDisplacement;
        const yPos = e.pageY;
        // const xPos = e.clientX;
        // const yPos = e.clientY;
        console.log(dropdownWidth, viewportWidth, xPos, yPos, "search bar 30rm");
        setTopDisplacement(yPos);
        setLeftDisplacement(xPos);
    }

    return (
        <div className="searchBarContainer h-24 px-6 flex items-center">
            <DropdownContainer
                isOpen={isOpen}
                topDisplacement={50}
                leftDisplacement={50}
                width={dropdownWidth}
                closeDropdown={() => {
                    setIsOpen(false);
                }}
            >
                {SEED_CITIES.map((city: ICity) => {
                    return (
                        <DropdownItem
                            text={city.cityName}
                            onClickAction={() => {
                                setCity(city.cityName);
                            }}
                        />
                    );
                })}
            </DropdownContainer>
            <div className="w-auto flex justify-between">
                <div className="inputContainerLeft flex flex-col xl:flex-row">
                    <div className="pr-9">
                        <Input type="text" placeholder={"Address"} changeReporter={() => {}} />
                    </div>
                    <div>
                        <CityInput type="text" placeholder={"City"} changeReporter={() => {}} onClickHandler={setDropdownPosition} />
                    </div>
                </div>
                <div className="inputContainerRight w-full flex justify-end">
                    <div className=" pr-8 flex flex-col xl:flex-row">
                        {/* <div className="pr-8">
                            <Input type="text" placeholder={"Min Distance"} />
                        </div> */}
                        <div>
                            <Input type="text" placeholder={"Max Distance"} changeReporter={() => {}} />
                        </div>
                    </div>
                    <Button type="Opaque" text="Search" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
