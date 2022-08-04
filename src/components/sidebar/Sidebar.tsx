import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

import Profile from "../profile/Profile";
import Divider from "./components/Divider";
import MenuItem from "./components/MenuItem";

import "./Sidebar.scss";

interface SidebarProps {
    layoutType: string;
}

// TODO: Convert layoutType to a css media query. Have display: none; and display: flex in media queries.

const Sidebar: React.FC<SidebarProps> = ({ layoutType }) => {
    const [activeItem, setActiveItem] = useState(0);

    const nagivate = useNavigate();

    return (
        <div className="h-full">
            <div className="h-full flex flex-col justify-between">
                <div>
                    {layoutType === "desktop" ? (
                        <div className="pl-6 pt-4 pb-8 text-left">
                            <h3 className="blueText logoText">Logo</h3>
                        </div>
                    ) : null}
                    {layoutType === "desktop" ? null : (
                        <div>
                            <Profile />
                        </div>
                    )}
                    <div className="">
                        <MenuItem
                            changeActiveItem={e => {
                                console.log(1, e.target);
                                nagivate("/dashboard");
                                setActiveItem(1);
                            }}
                            text={"Dashboard"}
                            active={activeItem === 1}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(2);
                                nagivate("/search");
                                setActiveItem(2);
                            }}
                            text={"Apartment Search"}
                            active={activeItem === 2}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(3);
                                setActiveItem(3);
                            }}
                            text={"Map"}
                            active={activeItem === 3}
                        />
                        <MenuItem
                            changeActiveItem={() => {
                                console.log(4);
                                setActiveItem(4);
                            }}
                            text={"Feedback"}
                            active={activeItem === 4}
                        />
                    </div>
                    <Divider />
                </div>
                <div className="">
                    <MenuItem
                        changeActiveItem={() => {
                            setActiveItem(5);
                        }}
                        text={"Settings"}
                        active={activeItem === 5}
                    />
                    <div>Toggle Sidebar</div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
