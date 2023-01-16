import React, { ChangeEvent } from "react";
import Button from "../button/Button";
import IncrementButton from "../button/IncrementButton";

interface TitledDropdownWithButtonsProps {
    title: string;
    options: any[];
    activeOption: number | undefined;
    valueReporter: Function;
}

const TitledDropdownWithButtons: React.FC<TitledDropdownWithButtonsProps> = ({ title, options, activeOption, valueReporter }) => {
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
            <div className="flex mx-4 items-center">
                <div
                    onClick={() => {
                        if (activeOption === undefined) {
                            // cannot go left from 'all'
                            return;
                        } else {
                            const prevOption = options[options.indexOf(activeOption) - 1];
                            valueReporter(prevOption);
                        }
                    }}
                >
                    <IncrementButton type="Opaque" text={"<"} />
                </div>
                <div className="w-full">
                    <select
                        onChange={e => {
                            handleChange(e);
                        }}
                        value={activeOption}
                    >
                        {options.map((option, i) => {
                            return (
                                <option
                                    key={i}
                                    onClick={() => {
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
                <div
                    onClick={() => {
                        if (activeOption === options[options.length - 1]) {
                            // cannot go right from final entry
                            return;
                        } else {
                            const nextOption = options[options.indexOf(activeOption) + 1];
                            valueReporter(nextOption);
                        }
                    }}
                >
                    <IncrementButton type="Opaque" text={">"} />
                </div>
            </div>
        </div>
    );
};

export default TitledDropdownWithButtons;
