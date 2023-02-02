import React from "react";

interface SlideProps {
    slideText: string;
    slideIndex: number;
    activeIndex: number;
}

const Slide: React.FC<SlideProps> = ({ slideText, slideIndex, activeIndex }: SlideProps) => {
    function determineClasses() {
        if (slideIndex === activeIndex) return "slide block";
        else return "slide hidden"; // tailwind classnames;
    }

    return (
        <div className={determineClasses()}>
            <p className="cityName">{slideText}</p>
        </div>
    );
};

export default Slide;
