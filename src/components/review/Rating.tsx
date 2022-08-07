import React from "react";
import StarRating from "./stars/StarRating";

interface RatingProps {
    text: string;
}

function Rating({ text }: RatingProps) {
    return (
        <div className="rating pl-8">
            <div>
                <h4 className="flex justify-start my-1">{text}</h4>
            </div>
            <div className="flex justify-start">
                <StarRating />
            </div>
        </div>
    );
}

export default Rating;
