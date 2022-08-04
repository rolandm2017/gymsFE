import React from "react";
import { Routes, Route } from "react-router-dom";

import SearchPage from "../pages/SearchPage";
import MapPage from "../pages/MapPage";
import FeedbackPage from "../pages/FeedbackPage";
import DashboardPage from "../pages/DashboardPage";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
    );
};
export default PageRoutes;
