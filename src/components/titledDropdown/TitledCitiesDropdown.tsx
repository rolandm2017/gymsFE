import React, { ChangeEvent } from "react";
import { ICity } from "../../interface/City.interface";

interface TitledCityDropdownProps {
    title: string;
    options: ICity[];
    valueReporter: Function;
    // activeOption: number | undefined;
    activeOption: number;
}

const TitledCityDropdown: React.FC<TitledCityDropdownProps> = ({ title, options, valueReporter, activeOption }) => {
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        console.log(e.target.value);
        // if (usesCities) {
        const indexOfCity = options.findIndex(city => city.cityName === e.target.value);
        valueReporter(indexOfCity); // city is selected by index
        // + 1 because who knows, its just what worked
        return;
        // }
        // if (e.target.value === "all") {
        //     valueReporter(undefined);
        //     return;
        // }
        // const asInteger = parseInt(e.target.value, 10);
        // valueReporter(asInteger);
    }
    return (
        <div>
            <div>
                <h4 className="text-xl">{title}</h4>
            </div>
            <div>
                <select
                    onChange={e => {
                        handleChange(e);
                    }}
                    value={options[activeOption ? activeOption : 0].cityName} // accounts for 'undefined'
                >
                    {options.map((option, i) => {
                        return (
                            <option key={i} value={option.cityName}>
                                {option.cityName}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default TitledCityDropdown;
