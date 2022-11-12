import React, { useState, useContext, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import Profile from "../components/profile/Profile";
import ProfileBar from "../components/profile/ProfileBar";
import AdminSidebar from "../components/sidebar/AdminSidebar";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarStateProvider, { ISidebarContext, SidebarStateContext } from "../context/SidebarStateProvider";

import useWindowSize from "../util/useWindowSize";

import "./PageBase.scss";

interface PageProps {
    children: JSX.Element;
}

const PageBase: React.FC<PageProps> = props => {
    const [width, height] = useWindowSize();

    const isOnMobile = width < 768;

    const location = useLocation();
    const isAdminPage = location.pathname.includes("/admin");

    const { isOpen, toggleIsOpen } = useContext(SidebarStateContext) as ISidebarContext;

    return (
        <div id="pageBase" className="h-full w-full flex pageBg">
            <div
                className={`sidebarCover z-20 ${isOpen && isOnMobile ? "" : "hidden"}`}
                onClick={() => {
                    toggleIsOpen(false);
                }}
            >
                {/* // medium opacity black screen for when mobile sidebar is open */}
            </div>
            <div id="sidebar" className="h-full flex">
                <div className={`h-full z-30 ${isOpen ? "pageSidebarOpen" : "pageBaseSidebarClosed"} ${isOnMobile ? "absolute" : ""}`}>
                    {isAdminPage ? (
                        <AdminSidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
                    ) : (
                        <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />
                    )}{" "}
                </div>
            </div>
            <div id="content" className={`w-full flex flex-col contentDivSidebarAdjustment`}>
                <ProfileBar />
                <div className={`w-full px-1.5 pt-2.5 sm:px-9 sm:py-6 overflow-y-scroll`}>{props.children}</div>
            </div>
            {/* // todo: footer https://simplemaps.com/data/canada-cities (you agreed) */}
        </div>
    );
};

export default PageBase;
