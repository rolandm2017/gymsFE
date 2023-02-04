import React from "react";
import { Route } from "react-router-dom";

import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { truncateDecimals } from "../../util/truncateDecimals";
import Button from "../button/Button";
import "./ApartmentCard.scss";
import ApartmentCardActions from "./ApartmentCardActions";

interface ApartmentCardProps {
    apartment: IHousing;
    addr: string;
    distanceToNearestGym: number;
    activeNum: number | null;
    setActive: Function;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, addr, distanceToNearestGym, activeNum, setActive }) => {
    const walkTimeInMinutes: number = truncateDecimals(calculateWalkTimeInMinutes(distanceToNearestGym), 1);

    return (
        <div
            onMouseEnter={() => {
                setActive(activeNum);
            }}
            className="apCardContainer apCardBoxShadow mb-2 mr-2 md2:mr-0 mt-2 md2:mt-0 py-3 bg-white rounded-md"
        >
            <div className="apCardText h-full mx-4 flex justify-between items-start">
                <div className="h-full flex flex-col">
                    <div className="w-full flex justify-between mb-2">
                        <p className="flex items-center">
                            {/* <span className="blueText mr-2">Address</span> <span className="grayText">{addr}</span> */}
                            <span className="grayText text-left mr-4">{addr}</span>
                        </p>
                    </div>
                    <div className="w-full flex justify-between items-center">
                        <div>
                            <p className="grayText">{walkTimeInMinutes} min walk</p>
                        </div>
                    </div>
                </div>
                <ApartmentCardActions apartmentId={apartment.housingId} />
            </div>
        </div>
    );
};

export default ApartmentCard;
