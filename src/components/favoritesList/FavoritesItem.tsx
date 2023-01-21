import React from "react";
import Button from "../button/Button";

interface FavoritesItemProps {
    address: string;
    distanceToGym: number; // pythagoras long, lat difference
    removeFavorite: Function;
    runRevealUrl: Function;
}

const FavoritesItem: React.FC<FavoritesItemProps> = ({ address, distanceToGym, removeFavorite, runRevealUrl }: FavoritesItemProps) => {
    const isRevealed = false;
    return (
        <div className="mt-3 py-2 grid grid-cols-6 bg-white rounded-lg">
            <div className="col-span-2 pl-3">
                <p>{address}</p>
            </div>
            <div className="col-span-2">
                <p>{distanceToGym}</p>
            </div>
            <div
                className="col-span-1"
                onClick={() => {
                    removeFavorite();
                }}
            >
                <Button type="Opaque" text="Remove" size="Small" />
            </div>
            <div
                className="col-span-1"
                onClick={() => {
                    runRevealUrl();
                }}
            >
                {isRevealed ? <div></div> : <Button type="Opaque" text="Get URL" size="Small" />}
            </div>
        </div>
    );
};
export default FavoritesItem;
