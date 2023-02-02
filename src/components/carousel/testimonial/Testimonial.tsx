import React from "react";
import useWindowSize from "../../../util/useWindowSize";
import FixedStarRating from "./FixedStarRating";

interface TestimonialProps {
    name: string;
    content: string;
    rating: number;
    imgPath: string;
    slideIndex: number;
    activeIndex: number;
}

const Testimonial: React.FC<TestimonialProps> = ({ name, content, rating, imgPath, slideIndex, activeIndex }: TestimonialProps) => {
    // const [width, height] = useWindowSize();

    function determineClasses() {
        // if (width > 840) return "slide block bg-white";
        if (slideIndex === activeIndex) return "slide block bg-white";
        else return "slide hidden"; // tailwind classnames;
    }

    return (
        <div className={` ${determineClasses()} h-full w-full flex items-center relative`}>
            <div className="mt-6 block h-64 shadow-2xl rounded-sm">
                <div className="w-full flex justify-center absolute top-0">
                    <img src={imgPath} alt="a person's face" />
                </div>
                <div className="mt-20 px-4">
                    <h4 className="text-xl mb-4">{name}</h4>
                </div>
                <div className="px-4">
                    <p className="text-sm">{content}</p>
                </div>
                <div className="mt-4 mb-4   ">
                    <FixedStarRating fixedRating={rating} />
                </div>
            </div>
        </div>
    );
};
export default Testimonial;
