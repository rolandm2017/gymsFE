import React from "react";
import StarRating from "./stars/StarRating";

interface RatingProps {
    text: string;
}

function Rating({ text }: RatingProps) {
    return (
        <div className="rating">
            <div>{text}</div>
            <div>
                <StarRating />
            </div>
        </div>
    );
}

export default Rating;
