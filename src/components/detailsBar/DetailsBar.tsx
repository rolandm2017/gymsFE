import React from "react";
import { IAssociation } from "../../interface/Association.interface";
import { calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import { truncateDecimals } from "../../util/truncateDecimals";

import "./DetailsBar.scss";

interface DeailsBarProps {
    pic?: any; // todo: how to say itll be a jpg/png?
    address: string | undefined;
    nearbyGyms: IAssociation[] | undefined;
    // url: string | undefined;
    activeIndex: number | null;
    detailNumber: number;
    setActive: Function;
}
//TODO: between 1200 and 390 px, show less details: only addr, gymName, walkTime, link (4 values, not 6)
const DetailsBar: React.FC<DeailsBarProps> = ({ pic, address, nearbyGyms, activeIndex, detailNumber, setActive }) => {
    const closestGym = nearbyGyms ? nearbyGyms.sort(compare)[0] : { gym: { name: "Data missing", url: "Data missing" }, distanceInKM: 0 };
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

    return (
        <div
            onClick={() => {
                setActive(detailNumber);
            }}
            className={`w-auto sm:w-full flex justify-between bg-white mt-2.5 px-5 sm:px-7 ${
                activeIndex === detailNumber ? "detailsBarHighlighted h-20" : "h-9"
            }`}
        >
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/6 hidden xl:flex items-center">
                <div>
                    {/* <img src={pic} alt="profile pic" height={24} width={24} /> */}
                    {/* // TODO: Scrape the URL of a pic from the listing. Forward the URL thru backend to here and display pic. */}
                </div>
                <p className="grayText detailsBarText">{address && address.length > 0 ? address : "Placeholder St."}</p>
            </div>
            <div className="w-1/3 sm:w-1/6 mr-2 sm:mr-0 flex items-center">
                <p className="blueText">$800</p>
                {/* // TOOD: remove hardcode price, replace w/ scraped price */}
            </div>
            {/* </div> */}
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/6 hidden sm:flex items-center">
                <p className="grayText detailsBarText">{closestGym.gym!.name}</p>
            </div>
            <div className="w-1/6 hidden xl:flex items-center">
                <p className="grayText detailsBarText">{truncateDecimals(closestGym.distanceInKM, 2)} km</p>
            </div>
            {/* </div> */}
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/3 sm:w-1/6 mr-2 sm:mr-0 flex items-center">
                <p className="grayText detailsBarText">{truncateDecimals(calculateWalkTimeInMinutes(closestGym.distanceInKM), 2)} minutes</p>
            </div>
            {/* <div className="w-1/3 sm:w-1/6 mr-2 sm:mr-0 flex items-center">
                <p className="w-full grayText detailsBarText truncate text-left">{url}</p>
            </div> */}
            {/* </div> */}
        </div>
    );
};

export default DetailsBar;
