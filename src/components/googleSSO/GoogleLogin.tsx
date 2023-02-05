import React from "react";
import { getEndpoint } from "../../util/getEndpoint";

const GoogleLogin: React.FC<{}> = () => {
    const redirectURL = getEndpoint("/auth/google");
    return (
        <div>
            <div>
                <a href={redirectURL}>Log in with Google</a>
            </div>
        </div>
    );
};

export default GoogleLogin;
