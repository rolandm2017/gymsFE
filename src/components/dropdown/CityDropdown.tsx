import React, { ReactNode, useRef, useEffect } from "react";

import "./Dropdown.scss";
import DropdownItem from "./DropdownItem";
import DropdownItemWithHighlight from "./DropdownItemWithHighlight";

interface CityDropdownProps {
    isOpen: boolean;
    topDisplacement: number | undefined;
    leftDisplacement: number | undefined;
    width: number;
    closeDropdown: Function;
    cityNames: string[];
    inputText: string;
    selectCity: Function;
}

interface FilteredCity {
    original: string;
    highlight: string;
}

const CityDropdown: React.FC<CityDropdownProps> = ({
    isOpen,
    topDisplacement,
    leftDisplacement,
    width,
    closeDropdown,
    cityNames,
    inputText,
    selectCity,
}: CityDropdownProps) => {
    const dropdownsWithoutTextHighlight = cityNames.map((name: string) => {
        return (
            <DropdownItem
                text={name}
                onClickAction={() => {
                    selectCity(name);
                }}
            />
        );
    });

    const dropdownsWithTextHighlight = getPossibleAutocompletes(inputText, cityNames).map((originalWithHighlight: FilteredCity) => {
        return <DropdownItemWithHighlight text={originalWithHighlight.original} highlight={originalWithHighlight.highlight} />;
    });

    function getPossibleAutocompletes(text: string, candidates: string[]): FilteredCity[] {
        const filteredSuggestions: FilteredCity[] = candidates
            .filter(candidate => candidate.toLowerCase().indexOf(text.toLowerCase()) > -1)
            .map((remaining: string) => {
                return { original: remaining, highlight: text };
            });

        return filteredSuggestions;
    }

    return (
        <div className={`absolute ${isOpen ? "fullScreenRegardless" : ""}`}>
            <div
                className="w-full h-full absolute z-30 bg-transparent"
                onClick={() => {
                    closeDropdown();
                }}
            >
                {/* // dropdown click target */}
            </div>
            <div
                className={`${isOpen ? "" : "hidden"} p-2 absolute bg-white border-2 rounded-lg z-40`}
                style={{ top: topDisplacement, left: leftDisplacement, width }}
            >
                {/* {inputText.length !== 0 ? :} */}
            </div>
        </div>
    );
};

export default CityDropdown;
