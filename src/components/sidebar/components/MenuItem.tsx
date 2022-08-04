import React from "react";

import "./MenuItem.scss";

interface MenuItemProps {
    text: string;
    active: boolean;
    changeActiveItem: (e: any) => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, active, changeActiveItem }) => {
    return (
        <div onClick={changeActiveItem} className={`menuItemContainer flex flex-start px-6 py-4 ${active ? "activeItem" : null}`}>
            <div className="tempReplacementForIcon mr-2"></div>
            <p className="poppins menuItemText">{text}</p>
        </div>
    );
};

export default MenuItem;
