import React from "react";
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
    function determineClasses() {
        if (slideIndex === activeIndex) return "slide block bg-white";
        else return "slide hidden"; // tailwind classnames;
    }

    return (
        <div className={` ${determineClasses()} h-full w-full sm:w-1/4 flex justify-center items-center relative`}>
            <div className="mt-6 block shadow-2xl rounded-sm">
                <div className="w-full flex justify-center ">
                    <img src={imgPath} alt="a person's face" />
                </div>
                <div className="mt-4 px-4">
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
