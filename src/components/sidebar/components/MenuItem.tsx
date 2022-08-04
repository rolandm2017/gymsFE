import React from "react";

interface MenuItemProps {
    text: string;
}

const MenuItem: React.FC<MenuItemProps> = props => {
    return <div>{props.text}</div>;
};

export default MenuItem;
