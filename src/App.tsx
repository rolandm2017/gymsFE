import React, { useState } from "react";
import "./App.scss";
// import ApartmentCard from "./components/ApartmentCard";
import PageRoutes from "./router/Router";
import SidebarStateProvider from "./context/SidebarStateProvider";

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
