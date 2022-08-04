import React from "react";

import "./Input.scss";

interface InputProps {
    type: "text" | "number";
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
    return (
        <div className="">
            <input className={`debug1 inputText w-full ${type === "text" ? "w-48" : "w-40"}`} type={type} placeholder={placeholder}></input>
        </div>
    );
};

export default Input;
