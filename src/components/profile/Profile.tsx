import React from "react";
import NameAndEmail from "./NameAndEmail";
import ProfilePic from "./ProfilePic";

import Cat from "../../assets/cat.jpeg";

function Profile() {
    return (
        <div id="profile" className="pr-10 debug3">
            <div className="flex">
                <div className="flex justify-center items-center px-7">
                    {/* // for notifications */}
                    <img src={Cat} alt="bell" height={24} width={24} />
                </div>
                <div className="flex">
                    <div>
                        <ProfilePic />
                    </div>
                    <div>
                        <NameAndEmail name={"Sam Alexi"} email={"s.alexi@gmail.com"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
