import React from "react";
import "./App.scss";
// import ApartmentCard from "./components/ApartmentCard";
import PageRoutes from "./router/Router";

function App() {
    return (
        <div className="App">
            <div className="h-full">
                <PageRoutes />
            </div>
        </div>
    );
}

export default App;
