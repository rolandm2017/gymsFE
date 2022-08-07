import React from "react";

interface TestimonialProps {
    text: string;
}

function Testimonial({ text }: TestimonialProps) {
    return (
        <div className="px-8 mt-3">
            <div>
                <h3 className="flex justify-start">{text}</h3>
            </div>
            <div className="">
                <textarea className="w-full debug5" />
            </div>
        </div>
    );
}

export default Testimonial;
