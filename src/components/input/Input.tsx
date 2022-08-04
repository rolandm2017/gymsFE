import React from "react";

import "./Input.scss";

interface InputProps {
    type: "text" | "number";
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
    return (
        <div className="">
            <input className={`inputText ${type === "text" ? "w-48 addrIcon" : "w-40 distanceIcon"}`} type={type} placeholder={placeholder}></input>
        </div>
    );
};

export default Input;
