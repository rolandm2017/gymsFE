import React from "react";

interface DotProps {
    dotIndex: number;
    activeIndex: number;
    changeCurrentSlide: Function;
}

const Dot: React.FC<DotProps> = ({ dotIndex, activeIndex, changeCurrentSlide }: DotProps) => {
    function determineClasses() {
        if (dotIndex === activeIndex) return "dot active";
        else return "dot"; // tailwind classnames;
    }

    return (
        <span
            className={determineClasses()}
            onClick={() => {
                changeCurrentSlide(dotIndex);
            }}
        ></span>
    );
};

export default Dot;
