import React from "react";

import GoogleIcon from "../../assets/google.jpg";
import "./Button.scss";

const GoogleButton: React.FC<{}> = () => {
    return (
        <div className="w-full h-12 flex justify-center rounded-lg googleBtn">
            <button className="flex items-center mr-4">
                <img alt="google icon" src={GoogleIcon} height={24} width={24} className="mr-2" />
                Google
            </button>
        </div>
    );
};

export default GoogleButton;
