import React from "react";
import NameAndEmail from "./NameAndEmail";
import ProfilePic from "./ProfilePic";

function Profile() {
    return (
        <div className="pr-10 debug3">
            <div className="flex">
                <div>
                    {/* // for notifications */}
                    <img alt="bell" />
                </div>
                <div className="">
                    <div>
                        <ProfilePic />
                    </div>
                    <div>
                        <NameAndEmail />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
