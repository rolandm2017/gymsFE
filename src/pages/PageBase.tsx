import React from "react";
import Profile from "../components/profile/Profile";
import ProfileBar from "../components/profile/ProfileBar";
import Sidebar from "../components/sidebar/Sidebar";

import "./PageBase.scss";

interface PageProps {
    children: JSX.Element;
}

const layoutType = "desktop";

const PageBase: React.FC<PageProps> = props => {
    return (
        <div className="h-full flex">
            <div className="h-full flex">
                <div className="w-64 debug2">
                    <Sidebar layoutType={layoutType} />
                </div>
            </div>
            <div className="debug1 w-full flex flex-col">
                <ProfileBar layoutType={layoutType} />
                <div className="debug3">{props.children}</div>
            </div>
        </div>
    );
};

export default PageBase;
