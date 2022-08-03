import React from "react";
import NameAndEmail from "./NameAndEmail";
import ProfilePic from "./ProfilePic";

function Profile() {
    return (
        <div>
            <div>
                <div>
                    <ProfilePic />
                </div>
                <div>
                    <NameAndEmail />
                </div>
            </div>
        </div>
    );
}

export default Profile;
