import React from "react";
import "./ApartmentCard";

interface ApartmentCardProps {
    addr: string;
    gym: string;
    distance: string;
    time: string;
    apUrl: string;
    gymUrl: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ addr, gym, distance, time, apUrl, gymUrl }) => {
    return (
        <div>
            <h1>Hi</h1>
            <h2 className="">Poppins</h2>
        </div>
    );
};

export default ApartmentCard;
