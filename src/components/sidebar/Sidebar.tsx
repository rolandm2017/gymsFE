import React from "react";
import Profile from "../profile/Profile";
import Divider from "./components/Divider";
import MenuItem from "./components/MenuItem";

function Sidebar() {
    return (
        <div>
            <div>
                <div>Logo</div>
                <div>
                    <Profile />
                </div>
                <Divider />
                <div>
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                    <MenuItem />
                </div>
                <Divider />
                <div>
                    <MenuItem />
                    <div>Toggle Sidebar</div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
