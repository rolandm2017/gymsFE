import React from "react";

import "./MenuItem.scss";

interface MenuItemProps {
    text: string;
    active: boolean;
    isCloseButton?: boolean; // TODO: color menuItem diff if this is present
    changeActiveItem?: () => void;
    closeSidebar?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, active, isCloseButton, changeActiveItem, closeSidebar }) => {
    return (
        <div
            onClick={changeActiveItem ? changeActiveItem : closeSidebar}
            className={`menuItemContainer flex flex-start px-6 py-4 ${active ? "activeItem" : null}`}
        >
            <div className="tempReplacementForIcon mr-2"></div>
            <p className={`menuItemText ${isCloseButton ? "closeSidebarColor" : null}`}>{text}</p>
        </div>
    );
};

export default MenuItem;
