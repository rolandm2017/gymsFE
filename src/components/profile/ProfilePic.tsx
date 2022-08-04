import React from "react";
import Cat from "../../assets/cat.jpeg";

function ProfilePic() {
    return (
        <div>
            <div>
                <img className="h-10" src={Cat} alt="profile pic" />
            </div>
        </div>
    );
}

export default ProfilePic;
