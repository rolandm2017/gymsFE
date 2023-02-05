import React from "react";
import { Link } from "react-router-dom";

import { getEndpoint } from "../../util/getEndpoint";
import GoogleIcon from "../../assets/google.jpg";
import "./Button.scss";

const GoogleButton: React.FC<{}> = () => {
    const startGoogleSignInFlow = getEndpoint("/auth/google");
    console.log(startGoogleSignInFlow, "google sign in flow url, 10rm");
    return (
        <a href={startGoogleSignInFlow} className="flex items-center">
            <div className="w-full h-12 flex justify-center rounded-lg googleBtn">
                <button className="flex items-center mr-4">
                    <img alt="google icon" src={GoogleIcon} height={24} width={24} className="mr-2" />
                    Google
                </button>
            </div>
        </a>
    );
};

export default GoogleButton;
