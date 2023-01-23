import React, { RefObject } from "react";

import "./Input.scss";

interface CityInputProps {
    type: "text" | "number" | "password";
    placeholder: string;
    changeReporter: Function;
    onClickHandler: Function;
    inputRef?: RefObject<any>;
}

const CityInput: React.FC<CityInputProps> = ({ type, placeholder, changeReporter, onClickHandler, inputRef }) => {
    return (
        <div className="">
            <input
                ref={inputRef}
                className={`inputText ${type === "text" ? "w-48 addrIcon" : "w-40 distanceIcon"}`}
                type={type}
                placeholder={placeholder}
                onChange={e => {
                    changeReporter(e.target.value);
                }}
                onClick={e => {
                    onClickHandler(e);
                }}
            ></input>
        </div>
    );
};

export default CityInput;
