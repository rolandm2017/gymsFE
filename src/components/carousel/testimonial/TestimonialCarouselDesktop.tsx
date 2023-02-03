import React, { useState } from "react";
import { TESTIMONIALS } from "../../../util/hardcodeTestimonials";
import Testimonial from "./Testimonial";

const TestimonialCarouselDesktop: React.FC<{}> = () => {
    return (
        <div className="w-full h-72 relative flex justify-center ">
            <div className=" h-72 relative w-4/5 flex justify-evenly">
                {/* //   <!-- Full-width slides --> */}

                {TESTIMONIALS.map((testimonial, index) => (
                    <Testimonial key={index} {...testimonial} slideIndex={index} activeIndex={index} />
                ))}
            </div>
        </div>
    );
};

export default TestimonialCarouselDesktop;
