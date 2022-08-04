import React from "react";
import Profile from "../components/profile/Profile";
import Sidebar from "../components/sidebar/Sidebar";

import "./PageBase.scss";

interface PageProps {
    children: JSX.Element;
}

const layoutType = "desktop";

const PageBase: React.FC<PageProps> = props => {
    return (
        <div className="h-full flex flex-col">
            <div className="debug1 flex justify-between">
                <div className="debug3">{layoutType === "desktop" ? null : "Logo"}</div>
                <div className="debug3">
                    <Profile />
                </div>
            </div>
            <div className="flex">
                <div className="h-full w-64 debug2">
                    <Sidebar layoutType={layoutType} />
                </div>
                <div className="debug3">{props.children}</div>
            </div>
        </div>
    );
};

export default PageBase;
