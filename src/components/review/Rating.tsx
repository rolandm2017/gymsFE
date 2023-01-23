import React from "react";
import StarRating from "./stars/StarRating";

interface RatingProps {
    text: string;
    valueReporter: Function;
}

function Rating({ text, valueReporter }: RatingProps) {
    return (
        <div className="rating px-8">
            <div>
                <h4 className="text-left my-1">{text}</h4>
            </div>
            <div className="flex justify-start">
                <StarRating valueReporter={valueReporter} />
            </div>
        </div>
    );
}

export default Rating;
