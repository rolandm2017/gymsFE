import React, { useEffect, ComponentType, FC, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRefreshJwtAPI } from "../../api/authAPI";

const WithAuthentication = (WrappedComponent: FunctionComponent) => {
    const AuthenticatedComponent = () => {
        const navigate = useNavigate();
        const { refreshedUser, refreshErr, refreshIsLoaded, runRefreshJwt } = useRefreshJwtAPI();
        const { accessToken, isLoggedIn } = useAuth();

        useEffect(() => {
            console.log("problem", isLoggedIn(), accessToken, accessToken.length, "13rm");
            console.log(refreshIsLoaded, "13rm");
            if (refreshIsLoaded) {
                const didNotLogIn = refreshIsLoaded && !isLoggedIn();
                console.log(isLoggedIn, isLoggedIn(), "15rm");
                console.log(refreshIsLoaded, didNotLogIn, "16rm");
                if (didNotLogIn) {
                    navigate("/");
                }
            } else {
                runRefreshJwt();
            }
        }, [refreshIsLoaded, isLoggedIn, navigate, runRefreshJwt]);

        return <WrappedComponent />; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};

export default WithAuthentication;
