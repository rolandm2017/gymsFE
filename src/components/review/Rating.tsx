import React from "react";

interface RatingProps {
    text: string;
}

function Rating({ text }: RatingProps) {
    return <div>{text}</div>;
}

export default Rating;
