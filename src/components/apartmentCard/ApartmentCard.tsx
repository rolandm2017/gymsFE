import React from "react";
import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import Button from "../button/Button";
import "./ApartmentCard.scss";

interface ApartmentCardProps {
    addr: string;
    gyms: IAssociation[];

    // time?: string; // todo: calculate time from distance
    apUrl: string;
    // gymUrl?: string;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ addr, gyms, apUrl }) => {
    return (
        <div className="apCardContainer apCardBoxShadow mb-2 mr-2 md2:mr-0 mt-2 md2:mt-0 bg-white rounded-md">
            <div className="apCardText h-full mx-4 flex flex-col justify-center items-start">
                <div className="flex mb-2">
                    <div>
                        <p>
                            <span className="blueText mr-2">Address</span> <span className="grayText">{addr}</span>
                        </p>
                    </div>
                    <div>{/* <Button type="Opaque" text="Link" size="Small" /> */}</div>
                </div>
                {/* <div className="w-full flex justify-between"> */}
                    {gyms.length > 0 ? gyms.map((association, index) => {
                        const gym: IGym = association.gym;
                        const gymName: string = gym?.name;
                        const distanceFromApartment: number = association.distanceInKM;
                        const walkTimeInMinutes: number = calculateWalkTimeInMinutes(distanceFromApartment);
                        const linkToGym = gym.url;
                        return (<div className="w-full flex justify-between">
                       <div>
                        <p className="grayText">{gymName}</p>
                    </div>
                    <div>
                        <p className="grayText">{distance}</p>
                    </div>
                    <div>
                        <p className="grayText">{time}</p>
                    </div>     
                            </div>)
                    })}
                    
                // </div>
            </div>
        </div>
    );
};

export default ApartmentCard;
