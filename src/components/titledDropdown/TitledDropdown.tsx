import React, { ChangeEvent } from "react";

interface TitledDropdownProps {
    title: string;
    options: any[];
    valueReporter: Function;
    activeOption: number | undefined;
    usesCities?: boolean;
}

const TitledDropdown: React.FC<TitledDropdownProps> = ({ title, options, valueReporter, activeOption, usesCities }) => {
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        console.log(e.target.value);
        if (usesCities) {
            const indexOfCity = options.findIndex(city => city.cityName === e.target.value);
            valueReporter(indexOfCity); // city is selected by index
            return;
        }
        if (e.target.value === "all") {
            valueReporter(undefined);
            return;
        }
        const asInteger = parseInt(e.target.value, 10);
        valueReporter(asInteger);
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

export default TitledDropdown;
