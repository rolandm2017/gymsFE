import React from "react";

import Profile from "./Profile";

const ProfileBar: React.FC<{}> = () => {
    return (
        <div className="h-15 flex justify-center items-center md:justify-end bg-white">
            <div className="block md:hidden">
                <h3 className="poppins blueText font-bold">Apartments Near Gyms</h3>
            </div>
            <div className="h-15 hidden md:flex justify-end items-center">
                <Profile />
            </div>
        </div>
    );
};

export default ProfileBar;
