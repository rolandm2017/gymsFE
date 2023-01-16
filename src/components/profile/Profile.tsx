import React, { useEffect, useState, MouseEvent } from "react";
import NameAndEmail from "./NameAndEmail";
import ProfilePic from "./ProfilePic";

import Cat from "../../assets/cat.jpeg";
import DropdownContainer from "../dropdown/DropdownContainer";
import DropdownItem from "../dropdown/DropdownItem";
import { useLogOutAPI } from "../../api/authAPI";
import DropdownItemWithLink from "../dropdown/DropdownItemWithLink";
import { useNavigate } from "react-router-dom";
import { getMaxLeftDisplacement } from "../../util/getMaxLeftDisplacement";

function Profile() {
    const [isOpen, setIsOpen] = useState(false);
    const [topDisplacement, setTopDisplacement] = useState<number | undefined>(undefined);
    const [leftDisplacement, setLeftDisplacement] = useState<number | undefined>(undefined);

    const dropdownWidth = 120;

    const navigate = useNavigate();

    function setDropdownPosition(e: MouseEvent<HTMLDivElement | globalThis.MouseEvent>, dropdownWidth: number) {
        const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const maxDisplacement = getMaxLeftDisplacement(dropdownWidth, viewportWidth);
        const xPos = e.pageX < maxDisplacement ? e.pageX : maxDisplacement;
        const yPos = e.pageY;
        console.log(dropdownWidth, viewportWidth, xPos, yPos, "20rm");
        setTopDisplacement(yPos);
        setLeftDisplacement(xPos);
    }

    const { success, loaded, runLogOut } = useLogOutAPI();

    useEffect(() => {
        if (success && loaded) {
            navigate("/");
        }
    }, [success, loaded, navigate]);

    return (
        <div
            id="profile"
            className="pr-10"
            onClick={e => {
                console.log(isOpen, "14rm");
                setIsOpen(!isOpen);
                setDropdownPosition(e, dropdownWidth);
            }}
        >
            <DropdownContainer isOpen={isOpen} topDisplacement={topDisplacement} leftDisplacement={leftDisplacement} width={dropdownWidth}>
                <DropdownItemWithLink text="Settings" location={"/settings"} />
                <DropdownItem text="Log Out" onClickAction={runLogOut} />
            </DropdownContainer>
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
