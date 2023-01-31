import React from "react";
import { IAssociation } from "../../interface/Association.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import ApartmentCardActions from "../apartmentCard/ApartmentCardActions";

import "./DetailsBar.scss";

interface DeailsBarProps {
    pic?: any; // todo: how to say itll be a jpg/png?
    apartmentId: number;
    address: string | undefined;
    nearbyGyms: IAssociation[] | undefined;
    // url: string | undefined;
    activeIndex: number | null;
    detailNumber: number;
    setActive: Function;
    distanceToNearestGym: number;
}
//TODO: between 1200 and 390 px, show less details: only addr, gymName, walkTime, link (4 values, not 6)
const DetailsBar: React.FC<DeailsBarProps> = ({
    pic,
    apartmentId,
    address,
    nearbyGyms,
    activeIndex,
    detailNumber,
    setActive,
    distanceToNearestGym,
}) => {
    console.log(nearbyGyms, "19rm");
    const closestGym = nearbyGyms ? nearbyGyms.sort(compare)[0] : { gym: { name: "Data missing", url: "Data missing" }, distanceInKM: 0 };
    console.log(closestGym, "20rm");
    const gymUrl = closestGym.gym?.url;

    function compare(a: IAssociation, b: IAssociation): number {
        if (a.distanceInKM < b.distanceInKM) {
            return -1;
        }
        if (a.distanceInKM > b.distanceInKM) {
            return 1;
        }
        return 0;
    }

    const walkTimeFraction = calculateWalkTimeInMinutes(distanceToNearestGym);

    function walkTimeInMinutes(walkTimeFraction: number) {
        // presumes values < 1 will be converted into seconds.
        const truncated = Math.trunc(walkTimeFraction);
        if (walkTimeFraction > 2) return `${truncated} minutes`;
        else if (walkTimeFraction === 1) return "1 minute";
        else throw Error("You aren't supposed to be able to get here");
    }

    function walkTimeInSeconds(walkTimeFraction: number) {
        const asSeconds = walkTimeFraction * 60;
        const truncated = Math.trunc(asSeconds);
        return `${truncated} seconds`;
    }

    function getMetersFromKM(km: number): number {
        const asMeters = km * 1000;
        const justMeters = Math.trunc(asMeters);
        return justMeters;
    }

    return (
        <div
            onClick={() => {
                setActive(detailNumber);
            }}
            className={`w-auto sm:w-full flex justify-between bg-white mt-2.5 px-5 sm:px-7 ${
                activeIndex === detailNumber ? "detailsBarHighlighted h-20" : "h-9"
            }`}
        >
            <div className="w-1/6">
                {/* <p className="grayText detailsBarText">{address}</p> */}
                <p className="grayText detailsBarText">333 Placeholder St</p>
            </div>
            {/* 
            <div className="w-1/6 hidden sm:flex items-center">
                <p className="grayText detailsBarText">{closestGym.gym!.name}</p>
            </div> */}
            <div className="w-1/6 flex items-center">
                <p className="grayText detailsBarText">{getMetersFromKM(distanceToNearestGym)} meters</p>
            </div>
            {/* </div> */}
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/3 sm:w-1/6 mr-2 sm:mr-0 flex items-center">
                <p className="grayText detailsBarText">
                    {walkTimeFraction > 1 ? walkTimeInMinutes(walkTimeFraction) : walkTimeInSeconds(walkTimeFraction)}
                </p>
            </div>
            {/* <div className="w-1/3 sm:w-1/6 mr-2 sm:mr-0 flex items-center">
                <p className="w-full grayText detailsBarText truncate text-left">{url}</p>
            </div> */}
            {/* </div> */}
            {/* // todo: add 'favorite' and 'get URL' buttons */}
            <ApartmentCardActions apartmentId={apartmentId} />
        </div>
    );
};

export default DetailsBar;
