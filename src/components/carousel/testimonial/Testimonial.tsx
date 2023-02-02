import React from "react";
import StarRating from "../../review/stars/StarRating";

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
        <div className={` ${determineClasses()} h-full w-full flex items-center relative`}>
            <div className="mt-8 shadow-xl border-2 border-red-600">
                <div className="w-full flex justify-center absolute top-0">
                    <img src={imgPath} alt="a person's face" />
                </div>
                <div className="mt-20">
                    <h4 className="text-xl mb-4">{name}</h4>
                </div>
                <div>
                    <p className="text-sm">{content}</p>
                </div>
                <div className="mt-4">
                    {/* // rating  - todo */}
                    <StarRating valueReporter={() => {}} fixedRating={rating} />
                </div>
            </div>
        </div>
    );
};
export default Testimonial;
