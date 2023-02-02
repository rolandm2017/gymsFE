import React from "react";
import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";
import { walkTimeInMinutes, walkTimeInSeconds, calculateWalkTimeInMinutes } from "../../util/calcWalkTime";
import Button from "../button/Button";

interface ApartmentSlideProps {
    distanceToGym: number;
    nearbyGym: IGym;
    slideIndex: number;
    activeIndex: number;
}

const ApartmentSlide: React.FC<ApartmentSlideProps> = ({ distanceToGym, nearbyGym, slideIndex, activeIndex }: ApartmentSlideProps) => {
    function determineClasses() {
        if (slideIndex === activeIndex) return "slide block bg-white";
        else return "slide hidden"; // tailwind classnames;
    }

    const nearestGymName = nearbyGym.name;

    const walkTimeFraction = calculateWalkTimeInMinutes(distanceToGym);

    return (
        <div className={` ${determineClasses()} h-full w-full flex items-center`}>
            <div className="h-5/6 w-full shadow-xl rounded-xl border-4 border-zinc-100">
                <div className="h-full w-full pl-3 pt-3 text-left ">
                    <p>
                        Address: <span className="blueText">Hidden</span>
                    </p>
                    {/* // todo: calculate walk time */}
                    <p className="text-sm">
                        {" "}
                        <span className="font-bold">{walkTimeInSeconds(distanceToGym)}ond walk</span> to a gym
                    </p>
                    {/* <p className="">{distanceToGym} walk to a gym</p> */}
                    <p className="text-base mt-1">
                        <span className="underline">Nearest Gym</span>:
                    </p>
                    <p className="text-base"> {nearestGymName}</p>
                    <Button type="Opaque" text="Favorite" />
                </div>
            </div>
        </div>
    );
};

export default ApartmentSlide;
