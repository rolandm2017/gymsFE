import React from "react";
import { Link } from "react-router-dom";

import "./MenuItem.scss";

interface MenuItemProps {
    text: string;
    active: boolean;
    location: string;
    isCloseButton?: boolean;
    isOpen: boolean;
    changeActiveItem?: () => void;
    closeSidebar?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, active, location, isCloseButton, isOpen, changeActiveItem, closeSidebar }) => {
    return (
        <Link to={location}>
            <div
                onClick={changeActiveItem ? changeActiveItem : closeSidebar}
                className={`menuItemContainer flex ${isOpen ? "flex-start" : "justify-center"} ${isOpen ? "px-6" : ""} py-4 ${
                    active ? "activeItem" : ""
                }`}
            >
                <div className={`tempReplacementForIcon w-6 ${isOpen ? "mr-2" : ""}`}></div>
                <p className={`menuItemText ${isCloseButton ? "closeSidebarColor" : ""} ${isOpen ? "" : "hidden"}`}>{text}</p>
            </div>
        </Link>
    );
};

export default MenuItem;
