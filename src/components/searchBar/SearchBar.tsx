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
import { x } from "joi";
import CityDropdown from "../dropdown/CityDropdown";

const SearchBar: React.FC<{}> = () => {
    const [city, setCity] = useState("");
    const [cityInput, setCityInput] = useState("");

    const [isOpen, setIsOpen] = useState(false);

    const dropdownWidth = 120;

    const navigate = useNavigate();

    const dropdownRef = useRef<HTMLDivElement>(null);
    const [xOffset, setX] = useState<number | undefined>();
    const [yOffset, setY] = useState<number | undefined>();
    const getPosition = () => {
        const x = dropdownRef.current?.offsetLeft;
        setX(x);

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
        <div className="searchBarContainer h-24 px-6 flex items-center relative">
            <CityDropdown
                isOpen={isOpen}
                topDisplacement={yOffset}
                leftDisplacement={xOffset}
                width={dropdownWidth}
                closeDropdown={() => {
                    setIsOpen(false);
                }}
                cityNames={SEED_CITIES.map((city: ICity) => city.cityName)}
                inputText={cityInput}
                selectCity={setCity}
            />

            <div className="w-auto flex justify-between">
                <div className="inputContainerLeft flex flex-col xl:flex-row">
                    <div className="pr-9">
                        <Input type="text" placeholder={"Address"} changeReporter={() => {}} />
                    </div>
                    <div ref={dropdownRef}>
                        <CityInput
                            type="text"
                            placeholder={"City"}
                            changeReporter={setCityInput}
                            onClickHandler={() => {
                                setIsOpen(true);
                            }}
                        />
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
