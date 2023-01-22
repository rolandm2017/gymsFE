import React, { useEffect, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRefreshJwtAPI } from "../../api/authAPI";

const WithAuthentication = (WrappedComponent: FunctionComponent) => {
    const AuthenticatedComponent = () => {
        const navigate = useNavigate();
        const { refreshIsLoaded, runRefreshJwt } = useRefreshJwtAPI();
        const { accessToken } = useAuth();

        useEffect(() => {
            console.log("problem", refreshIsLoaded, accessToken.length, accessToken, "13rm");
            if (refreshIsLoaded) {
                // console.log(refreshIsLoaded, accessToken.length, "16rm");
                const stillNoAccessToken = accessToken.length === 0;
                if (stillNoAccessToken) {
                    console.log("did not log in! redirect", "21rm");
                    navigate("/");
                    return;
                }
            } else {
                runRefreshJwt();
            }
        }, [refreshIsLoaded, accessToken, navigate, runRefreshJwt]);

        return <WrappedComponent />; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};

export default WithAuthentication;
