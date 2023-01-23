import React, { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { CreditsModalContext, ICreditsModalContext } from "../../context/CreditsModalContext";
import Button from "../button/Button";

interface FavoritesItemProps {
    address: string;
    distanceToGym: number; // pythagoras long, lat difference
    removeFavorite: Function;
    hasBeenRevealed: boolean;
    runRevealUrl: Function;
}

const FavoritesItem: React.FC<FavoritesItemProps> = ({
    address,
    distanceToGym,
    removeFavorite,
    hasBeenRevealed,
    runRevealUrl,
}: FavoritesItemProps) => {
    const { outOfCredits } = useAuth();
    const { openAddCreditsModal } = useContext(CreditsModalContext) as ICreditsModalContext;

    return (
        <div className="mt-3 py-2 pl-2 h-12 grid grid-cols-6 bg-white rounded-lg">
            <div className="col-span-2 pl-1">
                <div className="h-full flex items-center">
                    <p className="text-left whitespace-nowrap text-ellipsis	overflow-hidden">{address}</p>
                </div>
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
                    if (outOfCredits) {
                        openAddCreditsModal();
                        return;
                    }
                    runRevealUrl();
                }}
            >
                {hasBeenRevealed ? <Button type="GreyedOut" text="Loaded" size="Small" /> : <Button type="Opaque" text="Get URL" size="Small" />}
            </div>
        </div>
    );
};
export default FavoritesItem;
