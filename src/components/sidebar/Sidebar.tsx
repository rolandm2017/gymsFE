import React from "react";
import Profile from "../profile/Profile";
import Divider from "./components/Divider";
import MenuItem from "./components/MenuItem";

import "./Sidebar.scss";

interface SidebarProps {
    layoutType: string;
}

const Sidebar: React.FC<SidebarProps> = ({ layoutType }) => {
    return (
        <div>
            <div>
                {layoutType === "desktop" ? <div>Logo</div> : null}
                {layoutType === "desktop" ? null : (
                    <div>
                        <Profile />
                    </div>
                )}
                <Divider />
                <div>
                    <MenuItem text={"Dashboard"} />
                    <MenuItem text={"Apartment Search"} />
                    <MenuItem text={"Map"} />
                    <MenuItem text={"Feedback"} />
                </div>
                <Divider />
                <div>
                    <MenuItem text={"Settings"} />
                    <div>Toggle Sidebar</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
