import React, { useState } from "react";
// import
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

import "./App.scss";
// import ApartmentCard from "./components/ApartmentCard";
import PageRoutes from "./router/Router";
import SidebarStateProvider from "./context/SidebarStateProvider";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || "";
// TODO: put access token on server and retrieve it on page load

function App() {
    return (
        <div className="App">
            {/* <SidebarStateProvider value={{ isOpen: false, toggleIsOpen: toggleIsOpen }}> */}
            <SidebarStateProvider>
                <PageRoutes />
            </SidebarStateProvider>
        </div>
    );
}

export default App;
