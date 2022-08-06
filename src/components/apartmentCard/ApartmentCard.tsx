import React from "react";
import Button from "../button/Button";
import "./ApartmentCard.scss";

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
        <div className="apCardContainer apCardBoxShadow mb-2 bg-white rounded-md">
            <div className="apCardText h-full ml-4 flex flex-col justify-center items-start">
                <div className="flex mb-2">
                    <div>
                        <p>
                            <span className="blueText">Address</span> <span className="grayText">{addr}</span>
                        </p>
                    </div>
                    <div>{/* <Button type="Opaque" text="Link" size="Small" /> */}</div>
                </div>
                <div className="flex">
                    <div>
                        <p className="grayText">{gym}</p>
                    </div>
                    <div>
                        <p className="grayText">{distance}</p>
                    </div>
                    <div>
                        <p className="grayText">{time}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
