import React, { createContext, ReactNode, useContext, useEffect } from "react";
import axios, { Axios, AxiosInstance } from "axios";
import { useAuth } from "./AuthContext";
import server from "../api/client";

const useAddInterceptor = () => {
    const { accessToken } = useAuth();

    useEffect(() => {
        const injectHeaders = server.interceptors.request.use(config => {
            if (accessToken && config.headers) {
                config.headers["Authorization"] = "Bearer " + accessToken;
            }
            return config;
        });

        return () => {
            server.interceptors.request.eject(injectHeaders);
        };
    });
};

interface ServerContextProps {
    children: ReactNode;
}

export const ServerContext = createContext<AxiosInstance>(server);

export function useServer() {
    const axiosInstance = useContext(ServerContext);

    return axiosInstance;
}

export const ServerProvider: React.FC<ServerContextProps> = ({ children }) => {
    useAddInterceptor();

    return <ServerContext.Provider value={server}>{children}</ServerContext.Provider>;
};
