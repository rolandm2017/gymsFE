import React from "react";

import "./Review.scss";

interface TestimonialProps {
    text: string;
}

function Testimonial({ text }: TestimonialProps) {
    return (
        <div className="px-8 mt-3">
            <div className="mb-2">
                <h3 className="flex justify-start">{text}</h3>
            </div>
            <div className="">
                <textarea className="feedbackTextArea textAreaShared" />
            </div>
        </div>
    );
}

export default Testimonial;
