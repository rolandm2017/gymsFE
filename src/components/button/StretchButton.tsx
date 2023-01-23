import React from "react";
import "./Button.scss";

interface StretchButtonProps {
    type: "Transparent" | "Opaque" | "GreyedOut";
    text: string;
    onClickHandler?: Function;
}

function StretchButton({ type, text, onClickHandler }: StretchButtonProps) {
    function getBackgroundForType(cssType: string) {
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
            className={`buttonShared h-full w-full flex justify-center items-center ${getBackgroundForType(type)} cursor-pointer	`}
        >
            <button className="text-md">{text}</button>
        </div>
    );
}

export default StretchButton;
