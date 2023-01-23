import React from "react";
import "./Button.scss";

interface ButtonProps {
    type: "Transparent" | "Opaque" | "GreyedOut";
    text: string;
    size?: "Small" | undefined;
    onClickHandler?: Function;
}

function Button({ type, text, size, onClickHandler }: ButtonProps) {
    function getCSSForType(cssType: string) {
        if (cssType === "Transparent") {
            return "transparentBg";
        } else if (cssType === "Opaque") {
            return "opaqueBg";
        } else {
            return "loadedBg";
        }
    }
    return (
        <div
            onClick={() => {
                if (onClickHandler) {
                    onClickHandler();
                }
            }}
            className={`buttonShared ${size === "Small" ? "w-14 h-8" : "h-9 w-20 sm:w-36"} flex justify-center items-center ${getCSSForType(type)}`}
        >
            <button>{text}</button>
        </div>
    );
}

export default Button;
