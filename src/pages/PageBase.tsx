import React, { useState, useContext, useLayoutEffect } from "react";

import Profile from "../components/profile/Profile";
import ProfileBar from "../components/profile/ProfileBar";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarStateProvider, { ISidebarContext, SidebarStateContext } from "../context/SidebarStateProvider";

import "./PageBase.scss";

interface PageProps {
    children: JSX.Element;
}

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    return size;
}

const PageBase: React.FC<PageProps> = props => {
    const [width, height] = useWindowSize();

    const { isOpen, toggleIsOpen } = useContext(SidebarStateContext) as ISidebarContext;

    return (
        <div id="pageBase" className="h-full w-full flex pageBg">
            <div id="sidebar" className="h-full flex">
                <div className={`${isOpen ? "pageBaseSidebarOpen" : "pageBaseSidebarClosed"}`}>
                    <Sidebar isOpen={isOpen} toggleIsOpen={toggleIsOpen} />{" "}
                </div>
            </div>
            <div id="content" className="w-full flex flex-col">
                <ProfileBar />
                <div className={`w-full px-1.5 pt-2.5 sm:px-9 sm:py-6 overflow-y-scroll`}>{props.children}</div>
            </div>
        </div>
    );
};

export default PageBase;
