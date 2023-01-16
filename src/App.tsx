import React, { useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "./App.scss";
import PageRoutes from "./router/Router";
import SidebarStateProvider from "./context/SidebarContext";
import LocationsProvider from "./context/LocationsContext";
import { AuthProvider } from "./context/AuthContext";
import { ServerProvider } from "./context/ServerContext";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
// TODO before production: put access token on server and retrieve it on page load

function App() {
    return (
        <div className="App">
            {/* <SidebarStateProvider value={{ isOpen: false, toggleIsOpen: toggleIsOpen }}> */}
            <AuthProvider>
                <ServerProvider>
                    <SidebarStateProvider>
                        <LocationsProvider>
                            <PageRoutes />
                        </LocationsProvider>
                    </SidebarStateProvider>
                </ServerProvider>
            </AuthProvider>
        </div>
    );
}

export default App;
