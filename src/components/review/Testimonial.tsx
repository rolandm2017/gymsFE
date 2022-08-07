import React from "react";

interface TestimonialProps {
    text: string;
}

function Testimonial({ text }: TestimonialProps) {
    return (
        <div>
            <div>
                <h3>{text}</h3>
            </div>
            <div className="px-12">
                <textarea className="w-full debug5" />
            </div>
        </div>
    );
}

export default Testimonial;
