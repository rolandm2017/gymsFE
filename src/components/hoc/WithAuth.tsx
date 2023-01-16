import React, { useEffect, ComponentType, FC, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRefreshJwtAPI } from "../../api/authAPI";

const WithAuthentication = (WrappedComponent: FunctionComponent) => {
    const AuthenticatedComponent = () => {
        const navigate = useNavigate();
        const { refreshedUser, refreshErr, refreshIsLoaded, runRefreshJwt } = useRefreshJwtAPI();
        const { accessToken, isLoggedIn, returnTest } = useAuth();

        useEffect(() => {
            console.log("problem", isLoggedIn(), accessToken, accessToken.length, "13rm");
            console.log(refreshIsLoaded, "13rm");
            console.log("TEST", returnTest(), "15rm");
            if (refreshIsLoaded) {
                const didNotLogIn = refreshIsLoaded && isLoggedIn() === false;
                console.log(refreshIsLoaded, isLoggedIn(), didNotLogIn, "16rm");
                if (didNotLogIn) {
                    console.log("did not log in! redirect", "21rm");
                    navigate("/");
                }
            } else {
                runRefreshJwt();
            }
        }, [refreshIsLoaded, isLoggedIn, accessToken, navigate, runRefreshJwt]);

        return <WrappedComponent />; // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
};

export default WithAuthentication;
