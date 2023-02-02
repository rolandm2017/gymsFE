import React, { useState } from "react";

import OrangeStar from "../../../assets/icons8-star-100-orange.png";
import BlackStar from "../../../assets/icons8-star-100-black.png";

interface StarRatingProps {
    valueReporter: Function;
    fixedRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ valueReporter, fixedRating }: StarRatingProps) => {
    const [rating, setRating] = useState(fixedRating ? fixedRating : 0);
    const [hover, setHover] = useState(0);

    return (
        <div className="starRatingContainer">
            {[...Array(5)].map((s, index) => {
                index += 1;
                const image = index <= (hover || rating) ? OrangeStar : BlackStar;
                return (
                    <button
                        type="button"
                        key={index}
                        className={`starButton`}
                        onClick={() => {
                            setRating(index);
                            valueReporter(index);
                        }}
                        onMouseEnter={() => setHover(index)}
                        onMouseLeave={() => setHover(rating)}
                    >
                        <img src={image} alt="star" height={24} width={24} />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
