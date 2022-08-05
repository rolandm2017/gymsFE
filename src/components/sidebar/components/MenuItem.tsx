import React from "react";

import "./MenuItem.scss";

interface MenuItemProps {
    text: string;
    active: boolean;
    isCloseButton?: boolean;
    isOpen: boolean;
    changeActiveItem?: () => void;
    closeSidebar?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, active, isCloseButton, isOpen, changeActiveItem, closeSidebar }) => {
    return (
        <div
            onClick={changeActiveItem ? changeActiveItem : closeSidebar}
            className={`menuItemContainer flex ${isOpen ? "flex-start" : "justify-center"} ${isOpen ? "px-6" : ""} py-4 ${
                active ? "activeItem" : ""
            }`}
        >
            <div className="tempReplacementForIcon mr-2 w-6"></div>
            <p className={`menuItemText ${isCloseButton ? "closeSidebarColor" : ""} ${isOpen ? "" : "hidden"}`}>{text}</p>
        </div>
    );
};

export default MenuItem;
