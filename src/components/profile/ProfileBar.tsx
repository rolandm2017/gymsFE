import React from "react";

import Profile from "./Profile";

const ProfileBar: React.FC<{}> = () => {
    return (
        <div className="h-15 flex justify-end bg-white">
            <div className="block md:hidden">Logo</div>
            <div className="flex justify-end">
                <Profile />
            </div>
        </div>
    );
};

export default ProfileBar;
