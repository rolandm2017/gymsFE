import React, { useState } from "react";
import { TESTIMONIALS } from "../../../util/hardcodeTestimonials";
import Testimonial from "./Testimonial";

const TestimonialCarousel: React.FC<{}> = () => {
    const availableIndexes = Array.from(Array(TESTIMONIALS.length).keys());
    const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState<number>(0);

    function plusSlides(n: number) {
        const newselectedTestimonialIndex = selectedTestimonialIndex + n;
        showSlides(newselectedTestimonialIndex);
    }

    function showSlides(n: number) {
        const numberOfIndexes = availableIndexes.length - 1;
        const nIsGreaterThanNumberOfSlides = n > numberOfIndexes;
        if (nIsGreaterThanNumberOfSlides) {
            setSelectedTestimonialIndex(0);
            return;
        }
        const nIsBeforeFirstIndex = n < 0;
        if (nIsBeforeFirstIndex) {
            // reset to final slide
            setSelectedTestimonialIndex(numberOfIndexes);
            return;
        }
        setSelectedTestimonialIndex(n);
    }

    return (
        <div className="w-full h-72 relative flex ">
            {/* <!-- Slideshow container --> */}
            <div className="w-24">
                <span
                    className="prev"
                    onClick={() => {
                        plusSlides(-1);
                    }}
                >
                    &#10094;
                </span>
            </div>
            <div className="slideshow-container h-72 relative w-full ">
                {/* //   <!-- Full-width slides --> */}

                {TESTIMONIALS.map((testimonial, index) => (
                    <Testimonial key={index} {...testimonial} slideIndex={index} activeIndex={selectedTestimonialIndex} />
                ))}

                {/* <!-- Next/prev buttons --> */}
            </div>
            <div className="w-24">
                <span
                    className="next"
                    onClick={() => {
                        plusSlides(1);
                    }}
                >
                    &#10095;
                </span>
            </div>
        </div>
    );
};

export default TestimonialCarousel;
