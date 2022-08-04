import React from "react";

interface TestimonialProps {
    text: string;
}

function Testimonial({ text }: TestimonialProps) {
    return <div>{text}</div>;
}

export default Testimonial;
