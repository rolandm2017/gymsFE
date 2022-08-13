import React, { useState } from "react";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "./App.scss";
import PageRoutes from "./router/Router";
import SidebarStateProvider from "./context/SidebarStateProvider";
import LocationsProvider from "./context/LocationsProvider";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
// TODO before production: put access token on server and retrieve it on page load

function App() {
    return (
        <div className="App">
            {/* <SidebarStateProvider value={{ isOpen: false, toggleIsOpen: toggleIsOpen }}> */}
            <SidebarStateProvider>
                <LocationsProvider>
                    <PageRoutes />
                </LocationsProvider>
            </SidebarStateProvider>
        </div>
    );
}

export default App;
