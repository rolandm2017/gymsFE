import React from "react";
import "./Button.scss";

interface ButtonProps {
    type: "Transparent" | "Opaque" | "GreyedOut";
    text: string;
    size?: "Small" | "Large" | undefined;
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

    function getSizeStyling(size: "Small" | "Large" | undefined) {
        if (size === "Small") {
            return "w-14 h-8";
        } else if (size === "Large") {
            return "w-18 h-12";
        } else {
            // normal or undefined
            return "h-9 w-20 sm:w-36";
        }
    }

    return (
        <div
            onClick={() => {
                if (onClickHandler) {
                    onClickHandler();
                }
            }}
            className={`buttonShared ${getSizeStyling(size)} flex justify-center items-center ${getCSSForType(type)}`}
        >
            <button>{text}</button>
        </div>
    );
}

export default Button;
