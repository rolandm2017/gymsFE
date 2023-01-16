import React, { useState } from "react";

import "./AuthInput.scss";

interface InputProps {
    type: "text" | "number" | "password";
    placeholder: string;
    changeHandler: Function;
    keyDownHandler: Function;
}

const AuthInput: React.FC<InputProps> = ({ type, placeholder, changeHandler, keyDownHandler }) => {
    return (
        <div className="mb-6">
            <input
                className={`authInput ${type === "text" ? "w-48 " : "w-40 "} text-base border-b border-0 border-zinc-800`}
                type={type}
                placeholder={placeholder}
                onChange={e => {
                    changeHandler(e.target.value);
                }}
                onKeyDown={e => {
                    keyDownHandler(e);
                }}
            ></input>
        </div>
    );
};

export default AuthInput;
