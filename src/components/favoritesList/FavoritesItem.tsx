import React from "react";

interface FavoritesItemProps {
    distanceToGym: number; // pythagoras long, lat difference
    removeFavorite: Function;
    runRevealUrl: Function;
}

const FavoritesItem: React.FC<FavoritesItemProps> = ({ distanceToGym, removeFavorite, runRevealUrl }: FavoritesItemProps) => {
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
            <div
                onClick={() => {
                    runRevealUrl();
                }}
            >
                <button>Reveal URL</button>
            </div>
        </div>
    );
};
export default FavoritesItem;
