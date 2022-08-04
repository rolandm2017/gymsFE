import React from "react";

import "./DetailsBar.scss";

interface DeailsBarProps {
    pic: any; // todo: how to say itll be a jpg/png?
    name: string;
    addr: string;
    gym: string;
    distance: string;
    time: string;
    apUrl: string;
    gymUrl: string;
}
//TODO: between 1200 and 390 px, show less details: only addr, gymName, walkTime, link (4 values, not 6)
const DetailsBar: React.FC<DeailsBarProps> = ({ pic, name, addr, gym, distance, time, apUrl, gymUrl }) => {
    return (
        <div className="w-full flex justify-between bg-white h-9 mt-2.5 px-7">
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/6 hidden xl:flex items-center">
                <div>
                    <img src={pic} alt="profile pic" height={24} width={24} />
                </div>
                <p className="blueText">{name}</p>
            </div>
            <div className="w-1/6 flex items-center">
                <p className="grayText detailsBarText">{addr}</p>
            </div>
            {/* </div> */}
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/6 flex items-center">
                <p className="grayText detailsBarText">{gym}</p>
            </div>
            <div className=" w-1/6 hidden xl:flex items-center">
                <p className="grayText detailsBarText">{distance}</p>
            </div>
            {/* </div> */}
            {/* <div className="w-1/3 flex"> */}
            <div className="w-1/6 flex items-center">
                <p className="grayText detailsBarText">{time}</p>
            </div>
            <div className="w-1/6 flex items-center">
                <p className="grayText detailsBarText">{apUrl}</p>
            </div>
            {/* </div> */}
        </div>
    );
};

export default DetailsBar;
