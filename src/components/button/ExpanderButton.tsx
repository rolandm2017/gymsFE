import React from "react";
import "./Button.scss";

interface ButtonProps {
    type: "Transparent" | "Opaque";
    text: string;
    onClickHandler?: Function;
}

function ExpanderButton({ type, text, onClickHandler }: ButtonProps) {
    return (
        <div className={`buttonShared w-full h-9 flex justify-center items-center ${type === "Transparent" ? "transparentBg" : "opaqueBg"}`}>
            <button>{text}</button>
        </div>
    );
}

export default ExpanderButton;
