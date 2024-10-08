import React from "react";

import "./Input.scss";

interface InputProps {
    type: "text" | "number" | "password";
    placeholder: string;
    changeReporter: Function;
}

const Input: React.FC<InputProps> = ({ type, placeholder, changeReporter }) => {
    return (
        <div className="mr-1">
            <input
                className={`inputText pl-2 ${type === "text" ? "w-48 addrIcon" : "w-40 distanceIcon"}`}
                type={type}
                placeholder={placeholder}
                onChange={e => {
                    changeReporter(e.target.value);
                }}
            ></input>
        </div>
    );
};

export default Input;
