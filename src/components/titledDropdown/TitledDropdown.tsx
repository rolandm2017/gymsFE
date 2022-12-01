import React, { ChangeEvent } from "react";

interface TitledDropdownProps {
    title: string;
    options: any[];
    valueReporter: Function;
}

const TitledDropdown: React.FC<TitledDropdownProps> = ({ title, options, valueReporter }) => {
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
            <div>{title}</div>
            <div>
                <select
                    onChange={e => {
                        handleChange(e);
                    }}
                >
                    {options.map((option, i) => {
                        return (
                            <option
                                key={i}
                                onClick={() => {
                                    console.log(option, "20rm");
                                    valueReporter(option);
                                }}
                                value={option}
                            >
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
