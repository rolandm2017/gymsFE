import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../icons/Icon";

import Profile from "../profile/Profile";
// import ProfilePic from "../profile/ProfilePic";
import MenuItem from "./components/MenuItem";

import "./Sidebar.scss";

interface AdminSidebarProps {
    isOpen: boolean;
    toggleIsOpen: Function;
}

// TODO: Convert layoutType to a css media query. Have display: none; and display: flex in media queries.

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, toggleIsOpen }) => {
    const [activeItem, setActiveItem] = useState<number>(1);

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
                                {/* <ProfilePic /> */}
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
                                setActiveItem(1);
                            }}
                            location={"/admin/scrapesByCity"}
                            text={"Scrapes"}
                            active={activeItem === 1}
                            isOpen={isOpen}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(1);
                                setActiveItem(2);
                            }}
                            location={"/admin/tasksByBatch"}
                            text={"Tasks"}
                            active={activeItem === 2}
                            isOpen={isOpen}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(2);
                                setActiveItem(3);
                            }}
                            location={"/admin/userActivity"}
                            text={"User Activity"}
                            active={activeItem === 3}
                            isOpen={isOpen}
                        />
                    </div>
                    {/* <Divider /> */}
                </div>
            </div>
        </div>
    );
};

export default AdminSidebar;
