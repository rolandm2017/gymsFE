import React from "react";

import Profile from "./Profile";

interface ProfileBarProps {
    layoutType: string;
}

const ProfileBar: React.FC<ProfileBarProps> = ({ layoutType }) => {
    return (
        <div className="h-15 flex whiteBg">
            <div>{layoutType === "desktop" ? null : "Logo"}</div>
            {/* <div className="w-full flex justify-end"> */}
            <div className="flex justify-end">
                <Profile />
            </div>
        </div>
    );
};

export default ProfileBar;
