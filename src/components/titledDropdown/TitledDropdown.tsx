import React, { ChangeEvent } from "react";
import { ICity } from "../../interface/City.interface";

interface TitledDropdownProps {
    title: string;
    options: string[];
    valueReporter: Function;
    // activeOption: number | undefined;
    activeOption: string;
}

const TitledDropdown: React.FC<TitledDropdownProps> = ({ title, options, valueReporter, activeOption }) => {
    function handleChange(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        console.log(e.target.value);
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
                    value={activeOption}
                >
                    {options.map((option, i) => {
                        return (
                            <option key={i} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
};

export default TitledDropdown;
