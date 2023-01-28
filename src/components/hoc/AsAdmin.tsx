import React, { useEffect, ComponentType, FC, FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useRefreshJwtAPI } from "../../api/authAPI";
import { Role } from "../../enum/roles.enum";

const AsAdmin = (WrappedComponent: FunctionComponent) => {
    const AdminOnlyComponent = () => {
        const navigate = useNavigate();
        const { profile } = useAuth();

        useEffect(() => {
            // todo: if admin, render. else, redirect.
            if (profile) {
                const isAdmin = profile.role === Role.Admin;

                if (!isAdmin) {
                    console.warn(profile.role, "You are not an admin, redirecting");
                    navigate("/");
                }
            }
        }, [profile, navigate]);

        return <WrappedComponent />; // Render whatever you want while the authentication occurs
    };

    return AdminOnlyComponent;
};

export default AsAdmin;
