import React, { useEffect, ComponentType, FC, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRefreshJwtAPI } from "../../api/authAPI";

const WithAuthentication = (WrappedComponent: FunctionComponent) => {
    const AuthenticatedComponent = () => {
        const navigate = useNavigate();
        const { refreshedUser, refreshErr, refreshIsLoaded, runRefreshJwt } = useRefreshJwtAPI();
        const { accessToken, returnTest } = useAuth();

        useEffect(() => {
            // console.log("problem", accessToken.length, accessToken, "13rm");
            // debugger;
            if (refreshIsLoaded) {
                // console.log(refreshIsLoaded, accessToken.length, "16rm");
                // debugger;
                const stillNoAccessToken = accessToken.length === 0;
                if (stillNoAccessToken) {
                    console.log("did not log in! redirect", "21rm");
                    // debugger;
                    navigate("/");
                    return;
                }
                // debugger;
            } else {
                runRefreshJwt();
            }
        }, [refreshIsLoaded, accessToken, navigate, runRefreshJwt]);

        return <WrappedComponent />; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};

export default WithAuthentication;
