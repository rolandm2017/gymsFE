import React, { ChangeEvent } from "react";
import Button from "../button/Button";
import IncrementButton from "../button/IncrementButton";

interface TitledDropdownWithButtonsProps {
    title: string;
    options: any[];
    valueReporter: Function;
}

const TitledDropdownWithButtons: React.FC<TitledDropdownWithButtonsProps> = ({ title, options, valueReporter }) => {
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
                <div>
                    <IncrementButton type="Opaque" text={"<"} />
                </div>
                <div className="w-full">
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
                <div>
                    <IncrementButton type="Opaque" text={">"} />
                </div>
            </div>
        </div>
    );
};

export default TitledDropdownWithButtons;
