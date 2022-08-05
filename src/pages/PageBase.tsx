import React, { useContext } from "react";
import { useState } from "react";
import Profile from "../components/profile/Profile";
import ProfileBar from "../components/profile/ProfileBar";
import Sidebar from "../components/sidebar/Sidebar";
import SidebarStateProvider, { ISidebarContext, SidebarStateContext } from "../context/SidebarStateProvider";
import SidebarContext from "../context/SidebarStateProvider";

import "./PageBase.scss";

interface PageProps {
    children: JSX.Element;
}

const layoutType = "desktop";

const PageBase: React.FC<PageProps> = props => {
    // const { isOpen, toggleIsOpen } = useContext(SidebarStateContext) as ISidebarContext;
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div id="pageBase" className="h-full w-full flex pageBg">
            <div id="sidebar" className="h-full flex">
                <div className={`${isOpen ? "w-64" : "w-16"} debug2`}>
                    {" "}
                    <Sidebar layoutType={layoutType} isOpen={isOpen} toggleIsOpen={setIsOpen} />{" "}
                </div>
            </div>
            <div id="content" className="w-full flex flex-col">
                {/* <div className="debug1 w-full flex flex-col"> */}
                <ProfileBar layoutType={layoutType} />
                <div className="debug3 px-9 py-6">{props.children}</div>
            </div>
        </div>
    );
};

export default PageBase;
