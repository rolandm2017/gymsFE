import React from "react";

import Notification from "../../assets/icons8-notification-64.png";

interface IconProps {
    type: "Notification" | "";
}

const Icon: React.FC<IconProps> = ({ type }) => {
    let choice;
    if (type === "Notification") {
        choice = Notification;
    }

    return <img src={choice} alt={type} height={24} width={24} />;
};

export default Icon;
