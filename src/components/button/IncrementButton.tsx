import React from "react";
import "./Button.scss";

interface IncrementButtonProps {
    type: "Transparent" | "Opaque";
    text: string;
    size?: "Small" | undefined;
}

function IncrementButton({ type, text }: IncrementButtonProps) {
    return (
        <div className={`buttonShared w-4 h-4 flex justify-center items-center ${type === "Transparent" ? "transparentBg" : "opaqueBg"}`}>
            <button>{text}</button>
        </div>
    );
}

export default IncrementButton;
