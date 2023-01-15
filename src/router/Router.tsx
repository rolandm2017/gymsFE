import React from "react";
import { Routes, Route } from "react-router-dom";

import SearchPage from "../pages/SearchPage";
import MapPage from "../pages/MapPage";
import FeedbackPage from "../pages/FeedbackPage";
import DashboardPage from "../pages/DashboardPage";
import UserActivityPage from "../pages/admin/UserActivityPage";
import ScrapesAndBatchesPage from "../pages/admin/ScrapesPage";
import ScrapesPage from "../pages/admin/ScrapesPage";
import TaskMarkerPage from "../pages/admin/TaskMarkerPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignupPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";

const PageRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* //  */}
            {/* // user portion */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            {/* //  */}
            {/* // auth */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            {/* // todo: wrap Private Route with admin privileges */}
            {/* //  */}
            {/* // admin */}
            <Route path="/admin/scrapesByCity" element={<ScrapesPage />} />
            <Route path="/admin/tasksByBatch" element={<TaskMarkerPage />} />
            <Route path="/admin/userActivity" element={<UserActivityPage />} />
        </Routes>
    );
};
export default PageRoutes;
