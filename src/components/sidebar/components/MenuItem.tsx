import React from "react";

interface MenuItemProps {
    text: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
    return <div className="text-red-500">{props.text}</div>;
};

export default MenuItem;
