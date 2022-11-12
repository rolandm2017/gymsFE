import React, { useCallback, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Icon from "../icons/Icon";

import Profile from "../profile/Profile";
import ProfilePic from "../profile/ProfilePic";
import Divider from "./components/Divider";
import MenuItem from "./components/MenuItem";

import "./Sidebar.scss";

interface AdminSidebarProps {
    isOpen: boolean;
    toggleIsOpen: Function;
}

// TODO: Convert layoutType to a css media query. Have display: none; and display: flex in media queries.

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, toggleIsOpen }) => {
    const location = useLocation();

    const [activeItem, setActiveItem] = useState<number>(1)

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
                                <div className="w-full pl-6 mt-6 mb-2 flex">
                                    <Icon type="Notification" />
                                    <p className={`${isOpen ? "" : "hidden"}`}>Notification</p>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 flex flex-col h-20 justify-between items-center">
                                <ProfilePic />
                                <div className="flex">
                                    <Icon type="Notification" />
                                    <p className={`${isOpen ? "" : "hidden"}`}>Notification</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="pb-11">
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(1);
                                navigate("/dashboard");
                                setActiveItem(1);
                            }}
                            text={"Scrapes"}
                            active={activeItem === 1}
                            isOpen={isOpen}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(2);
                                navigate("/search");
                                setActiveItem(2);
                            }}
                            text={"User Activity"}
                            active={activeItem === 2}
                            isOpen={isOpen}
                        />
                    </div>
                    {/* <Divider /> */}
                </div>
                {/* <div className="">
                    <MenuItem
                        changeActiveItem={() => {
                            console.log("94rm");
                            setActiveItem(5);
                        }}
                        text={"Settings"}
                        active={activeItem === 5}
                        isOpen={isOpen}
                    />
                    <MenuItem
                        closeSidebar={() => {
                            // todo: close sidebar
                            console.log(isOpen, "102rm");
                            toggleIsOpen(!isOpen);
                        }}
                        isCloseButton={true}
                        text={"Toggle sidebar"}
                        active={activeItem === 6}
                        isOpen={isOpen}
                    />
                </div> */}
            </div>
        </div>
    );
};

export default AdminSidebar;
