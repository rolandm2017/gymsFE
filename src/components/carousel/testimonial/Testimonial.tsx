import React from "react";

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
        <div className={` ${determineClasses()} h-full w-full flex items-center`}>
            <div className="mt-16">
                <div className="">{/* <img src={imgPath} alt="a person's face" /> */}</div>
                <div>
                    <h4 className="text-xl mb-4">{name}</h4>
                </div>
                <div>
                    <p className="text-sm">{content}</p>
                </div>
                <div className="mt-6">
                    {/* // rating  - todo */}
                    {rating}
                </div>
            </div>
        </div>
    );
};
export default Testimonial;
