import React from "react";

import Profile from "./Profile";

interface ProfileBarProps {
    layoutType: string;
}

const ProfileBar: React.FC<ProfileBarProps> = ({ layoutType }) => {
    return (
        <div className="h-15">
            <div className="debug3">{layoutType === "desktop" ? null : "Logo"}</div>
            <div className="debug3">
                <Profile />
            </div>
        </div>
    );
};

export default ProfileBar;
