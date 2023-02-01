import React from "react";
import { IAssociation } from "../../interface/Association.interface";
import { IGym } from "../../interface/Gym.interface";

interface ApartmentSlideProps {
    distanceToGym: number;
    nearbyGym: IGym;
    slideIndex: number;
    activeIndex: number;
}

const ApartmentSlide: React.FC<ApartmentSlideProps> = ({ distanceToGym, nearbyGym, slideIndex, activeIndex }: ApartmentSlideProps) => {
    function determineClasses() {
        if (slideIndex === activeIndex) return "slide block";
        else return "slide hidden"; // tailwind classnames;
    }

    const nearestGymName = nearbyGym.name;

    return (
        <div className={determineClasses()}>
            <p>
                Address: <span className="blueText">Hidden :)</span>
            </p>
            {/* // todo: calculate walk time */}
            <p className="">{distanceToGym} walk to a gym</p>
            <p>Nearest Gym: {nearestGymName}</p>
        </div>
    );
};

export default ApartmentSlide;
