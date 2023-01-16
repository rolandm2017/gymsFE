import React, { useEffect, useState, MouseEvent } from "react";
import NameAndEmail from "./NameAndEmail";
import ProfilePic from "./ProfilePic";

import Cat from "../../assets/cat.jpeg";

function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [topDisplacement, setTopDisplacement] = useState<number | undefined>(undefined);
    const [leftDisplacement, setLeftDisplacement] = useState<number | undefined>(undefined);

    function setDropdownPosition(e: MouseEvent<HTMLDivElement | globalThis.MouseEvent>) {
        var bodyOffsets = document.body.getBoundingClientRect();
        const tempX = e.pageX - bodyOffsets.left;
        const tempY = e.pageY;
        console.log(tempX, tempY, "20rm");
        setTopDisplacement(tempY);
        setLeftDisplacement(tempX);
    }

    return (
        <div
            id="profile"
            className="pr-10"
            onClick={e => {
                console.log(isOpen, "14rm");
                setIsOpen(!isOpen);
                setDropdownPosition(e);
            }}
        >
            <div className={`${isOpen ? "" : "hidden"} absolute`} style={{ top: topDisplacement, left: leftDisplacement }}>
                <div>Log Out</div>
            </div>
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
