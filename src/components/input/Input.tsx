import React from "react";

interface InputProps {
    type: "text" | "number";
    placeholder: string;
}

const Input: React.FC<InputProps> = ({ type, placeholder }) => {
    return (
        <div className="debug2 w-1/5">
            <input className="debug1 w-full" type={type} placeholder={placeholder}></input>
        </div>
    );
};

export default Input;
