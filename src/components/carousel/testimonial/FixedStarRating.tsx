import React, { useState } from "react";

import OrangeStar from "../../../assets/icons8-star-100-orange.png";
import BlackStar from "../../../assets/icons8-star-100-black.png";

interface StarRatingProps {
    fixedRating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ fixedRating }: StarRatingProps) => {
    const [rating, setRating] = useState(fixedRating);

    return (
        <div className="starRatingContainer">
            {[...Array(5)].map((s, index) => {
                index += 1;
                const image = index <= rating ? OrangeStar : BlackStar;
                return (
                    <button type="button" key={index} className={`starButton`} onClick={() => {}}>
                        <img src={image} alt="star" height={24} width={24} />
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
