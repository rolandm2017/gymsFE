import React from "react";
import { Route } from "react-router-dom";

import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";
import { IHousing } from "../../interface/Housing.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { truncateDecimals } from "../../util/truncateDecimals";
import Button from "../button/Button";
import "./ApartmentCard.scss";

interface ApartmentCardProps {
    apartment: IHousing;
    addr: string;
    gyms: IAssociation[];
    apUrl: string;
    activeNum: number | null;
    setActive: Function;
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, addr, gyms, apUrl, activeNum, setActive }) => {
    return (
        <div
            onMouseEnter={() => {
                setActive(activeNum);
            }}
            className="apCardContainer apCardBoxShadow mb-2 mr-2 md2:mr-0 mt-2 md2:mt-0 py-3 bg-white rounded-md"
        >
            <div className="apCardText h-full mx-4 flex flex-col justify-center items-start">
                <div className="w-full flex justify-between mb-2">
                    <div>
                        <p className="flex">
                            {/* <span className="blueText mr-2">Address</span> <span className="grayText">{addr}</span> */}
                            <span className="grayText text-left mr-4">{addr}</span>
                        </p>
                    </div>
                    <div className="">
                        {apUrl !== "No link found" ? (
                            <a href={apUrl}>
                                <Button type="Opaque" text="Link" size="Small" />
                            </a>
                        ) : null}
                    </div>
                </div>
                {gyms && gyms.length > 0 ? (
                    gyms
                        .sort((a, b) => {
                            if (a.distanceInKM > b.distanceInKM) {
                                return 1;
                            }
                            if (a.distanceInKM < b.distanceInKM) {
                                return -1;
                            }
                            return 0;
                        })
                        .map((association, index) => {
                            if (index > 0) {
                                return; // Temp until Kavindu tells me what to do with >=1 gyms in the UI
                            }
                            const gym: IGym = association.gym as IGym;
                            const gymName: string = gym.name.length > 0 ? gym.name : "noNameFound";
                            const distanceFromApartmentInKM: number = truncateDecimals(association.distanceInKM, 2); // get only 3 decimals
                            const walkTimeInMinutes: number = truncateDecimals(calculateWalkTimeInMinutes(distanceFromApartmentInKM), 1);
                            const linkToGym = gym.url;
                            return (
                                <div key={index} className="w-full flex justify-between">
                                    <div>
                                        <p className="grayText">Gym {gymName}</p>
                                    </div>
                                    <div>
                                        <p className="grayText">{distanceFromApartmentInKM} km</p>
                                    </div>
                                    <div>
                                        <p className="grayText">{walkTimeInMinutes} min away</p>
                                    </div>
                                </div>
                            );
                        })
                ) : (
                    <div>
                        <p>gyms didn't load</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ApartmentCard;
