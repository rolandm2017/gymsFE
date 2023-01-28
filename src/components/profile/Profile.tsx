import React, { useEffect, useState, MouseEvent } from "react";
import NameAndEmail from "./NameAndEmail";
// import ProfilePic from "./ProfilePic";

import DropdownContainer from "../dropdown/DropdownContainer";
import DropdownItem from "../dropdown/DropdownItem";
import { useLogOutAPI } from "../../api/authAPI";
import DropdownItemWithLink from "../dropdown/DropdownItemWithLink";
import { useNavigate } from "react-router-dom";
import { getMaxLeftDisplacement } from "../../util/getMaxLeftDisplacement";
import { useAuth } from "../../context/AuthContext";
import CreditsCounter from "../creditsCounter/CreditsCounter";

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
        setTopDisplacement(yPos);
        setLeftDisplacement(xPos);
    }

    const { success, loaded, runLogOut } = useLogOutAPI();

    useEffect(() => {
        console.log(success, loaded, "35rm");
        if (success && loaded) {
            navigate("/");
        }
    }, [success, loaded, navigate]);

    const { profile } = useAuth();

    return (
        <div
            id="profile"
            className="pr-10"
            onClick={e => {
                setIsOpen(!isOpen);
                setDropdownPosition(e, dropdownWidth);
            }}
        >
            <DropdownContainer
                isOpen={isOpen}
                topDisplacement={topDisplacement}
                leftDisplacement={leftDisplacement}
                width={dropdownWidth}
                closeDropdown={() => {
                    setIsOpen(false);
                }}
            >
                <DropdownItemWithLink text="Settings" location={"/settings"} />
                <DropdownItem text="Log Out" onClickAction={runLogOut} />
            </DropdownContainer>
            <div className="flex">
                <div className="flex">
                    {profile?.role === "ADMIN" ? <div>admin</div> : null}
                    <div>
                        <CreditsCounter />
                    </div>
                    <div>
                        <NameAndEmail
                            name={profile?.name ? profile.name : "No name found"}
                            email={profile?.email ? profile.email : "No email found"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
