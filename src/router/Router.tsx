import React from "react";
import { Routes, Route } from "react-router-dom";

import SearchPage from "../pages/SearchPage";
import MapPage from "../pages/MapPage";
import FeedbackPage from "../pages/FeedbackPage";
import DashboardPage from "../pages/DashboardPage";

const PageRoutes = () => {
    return (
        <Routes>
            {/* // TODO: If logged in, / redirects to /dashboard */}
            {/* // todo: if logged out, / is a landing page */}
            {/* // TODO: /login route, /signup route */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
    );
};
export default PageRoutes;
