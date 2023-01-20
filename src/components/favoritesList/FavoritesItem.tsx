import React from "react";

interface FavoritesItemProps {
    distanceToGym: number; // pythagoras long, lat difference
    removeFavorite: Function;
}

const FavoritesItem: React.FC<FavoritesItemProps> = ({ distanceToGym, removeFavorite }: FavoritesItemProps) => {
    return (
        <div>
            <div>
                <p>Walking time: {distanceToGym}</p>
            </div>
            <div
                onClick={() => {
                    removeFavorite();
                }}
            >
                <button>Remove</button>
            </div>
        </div>
    );
};
export default FavoritesItem;
