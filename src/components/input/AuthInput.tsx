import React from "react";

import "./AuthInput.scss";

interface InputProps {
    type: "text" | "number" | "password";
    placeholder: string;
}

const AuthInput: React.FC<InputProps> = ({ type, placeholder }) => {
    return (
        <div className="mb-6">
            <input
                className={`authInput ${type === "text" ? "w-48 addrIcon" : "w-40 distanceIcon"} text-base border-b border-0 border-zinc-800`}
                type={type}
                placeholder={placeholder}
            ></input>
        </div>
    );
};

export default AuthInput;
