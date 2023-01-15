import React, { useEffect, ComponentType, FC, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRefreshJwtAPI } from "../../api/authAPI";

const AsAdmin = (WrappedComponent: FunctionComponent) => {
    const AdminOnlyComponent = () => {
        const navigate = useNavigate();
        const { refreshedUser, refreshErr, refreshIsLoaded, runRefreshJwt } = useRefreshJwtAPI();
        const { accessToken, isLoggedIn } = useAuth();

        useEffect(() => {
            // todo: if admin, render. else, redirect.
            if (refreshIsLoaded) {
                const didNotLogIn = refreshIsLoaded && !isLoggedIn();
                console.log(refreshIsLoaded, isLoggedIn(), didNotLogIn, "13rm");
                if (didNotLogIn) {
                    navigate("/");
                }
            } else {
                runRefreshJwt();
            }
        }, [refreshIsLoaded, isLoggedIn]);

        return <WrappedComponent />; // Render whatever you want while the authentication occurs
    };

    return AdminOnlyComponent;
};

export default AsAdmin;
