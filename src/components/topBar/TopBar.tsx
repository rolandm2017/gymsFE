import React from "react";
import IconButton from "../button/IconButton";
// import ProfilePic from "../profile/ProfilePic";

function TopBar() {
    return (
        <div>
            <div>
                <div>{/* // spacer */}</div>
                <div>
                    <div>
                        <IconButton />
                    </div>
                    {/* <div>
                        <ProfilePic />
                    </div> */}
                    <div>
                        <h4>Sam Alexi</h4>
                        <p>s.alexi@gmail.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopBar;
