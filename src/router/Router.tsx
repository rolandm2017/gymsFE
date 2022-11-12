import React from "react";
import { Routes, Route } from "react-router-dom";

import SearchPage from "../pages/SearchPage";
import MapPage from "../pages/MapPage";
import FeedbackPage from "../pages/FeedbackPage";
import DashboardPage from "../pages/DashboardPage";
import UserActivityPage from "../pages/admin/UserActivityPage";
import ScrapesAndBatchesPage from "../pages/admin/ScrapesAndBatchesPage";

const PageRoutes = () => {
    return (
        <Routes>
            {/* // TODO: If logged in, / redirects to /dashboard */}
            {/* // todo: if logged out, / is a landing page */}
            {/* // TODO: /login route, /signup route */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/map" element={<MapPage />} />
            {/* // todo: wrap Private Route with admin privileges */}
            <Route path="/admin/scrape_and_batch" element={<ScrapesAndBatchesPage />} />
            <Route path="/admin/user_activity" element={<UserActivityPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
    );
};
export default PageRoutes;
