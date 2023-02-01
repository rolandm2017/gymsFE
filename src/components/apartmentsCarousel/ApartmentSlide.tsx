import React from "react";

interface ApartmentSlideProps {
    walkTime: number;
    nearGymName: string;
    slideIndex: number;
    activeIndex: number;
}

const ApartmentSlide: React.FC<ApartmentSlideProps> = ({ walkTime, nearGymName, slideIndex, activeIndex }: ApartmentSlideProps) => {
    function determineClasses() {
        if (slideIndex === activeIndex) return "slide block";
        else return "slide hidden"; // tailwind classnames;
    }

    return (
        <div className={determineClasses()}>
            <p>
                Address: <span className="blueText">Hidden :)</span>
            </p>
            <p className="">{walkTime} walk to a gym</p>
            <p>Nearest Gym: {nearGymName}</p>
        </div>
    );
};

export default ApartmentSlide;
