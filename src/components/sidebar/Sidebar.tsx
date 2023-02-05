import React, { useCallback, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Icon from "../icons/Icon";

import Profile from "../profile/Profile";
// import ProfilePic from "../profile/ProfilePic";
import Divider from "./components/Divider";
import MenuItem from "./components/MenuItem";
import PlainMenuItem from "./components/PlainMenuItem";

import "./Sidebar.scss";

interface SidebarProps {
    isOpen: boolean;
    toggleIsOpen: Function;
}

// TODO: Convert layoutType to a css media query. Have display: none; and display: flex in media queries.

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleIsOpen }) => {
    const location = useLocation();

    function getLocation(path: string) {
        if (path === "/dashboard") {
            return 1;
        } else if (path === "/search") {
            return 2;
        } else if (path === "/map") {
            return 3;
        } else if (path === "/feedback") {
            return 4;
        } else {
            throw new Error("Unsupported value for path");
        }
    }

    const [activeItem, setActiveItem] = useState(getLocation(location.pathname));

    const navigate = useNavigate();

    return (
        <div
            onClick={() => {
                if (!isOpen) {
                    toggleIsOpen(true);
                }
            }}
            className={`h-full bg-white ${isOpen ? "widthSidebarOpen" : ""}`}
        >
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="hidden md:block">
                        <div className={`${isOpen ? "pl-6" : "flex justify-center"} pt-4 pb-8 text-left`}>
                            <h3 className="blueText logoText">Logo</h3>
                        </div>
                    </div>
                    <div className="block md:hidden">
                        {isOpen ? (
                            <div className="mt-4">
                                <Profile />
                            </div>
                        ) : (
                            <div className="mt-4 flex flex-col h-20 justify-between items-center">{/* <ProfilePic /> */}</div>
                        )}
                    </div>
                    <div className="pb-11 pt-8">
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(1);
                                setActiveItem(1);
                            }}
                            location="/dashboard"
                            text={"Dashboard"}
                            active={activeItem === 1}
                            isOpen={isOpen}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(2);
                                setActiveItem(2);
                            }}
                            location={"/search"}
                            text={"Apartment Search"}
                            active={activeItem === 2}
                            isOpen={isOpen}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(3);
                                setActiveItem(3);
                            }}
                            location={"/map"}
                            text={"Map"}
                            active={activeItem === 3}
                            isOpen={isOpen}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(4);
                                setActiveItem(4);
                            }}
                            location={"/feedback"}
                            text={"Feedback"}
                            active={activeItem === 4}
                            isOpen={isOpen}
                        />
                    </div>
                    <Divider />
                </div>
                <div className="">
                    <MenuItem
                        changeActiveItem={() => {
                            setActiveItem(5);
                        }}
                        location={"/settings"}
                        text={"Settings"}
                        active={activeItem === 5}
                        isOpen={isOpen}
                    />
                    <PlainMenuItem
                        closeSidebar={() => {
                            toggleIsOpen(!isOpen);
                        }}
                        isCloseButton={true}
                        text={"Toggle sidebar"}
                        active={activeItem === 6}
                        isOpen={isOpen}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
