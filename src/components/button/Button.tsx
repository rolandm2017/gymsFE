import React from "react";
import "./Button.scss";

interface ButtonProps {
    type: "Transparent" | "Opaque";
    text: string;
    size?: "Small" | undefined;
    onClickHandler?: Function;
}

function Button({ type, text, size, onClickHandler }: ButtonProps) {
    return (
        <div
            className={`buttonShared ${size === "Small" ? "w-14 h-8" : "h-9 w-20 sm:w-36"} flex justify-center items-center ${
                type === "Transparent" ? "transparentBg" : "opaqueBg"
            }`}
        >
            <button>{text}</button>
        </div>
    );
}

export default Button;
