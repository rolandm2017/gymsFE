import React, { useState } from "react";
import { useAddFavoriteAPI } from "../../api/favoritesAPI";
import { useAddRevealedURLAPI } from "../../api/revealURLAPI";
import { useFavorites } from "../../context/FavoritesContext";
import Button from "../button/Button";

interface ApartmentCardActionsProps {
    apartmentId: number;
}

const ApartmentCardActions: React.FC<ApartmentCardActionsProps> = ({ apartmentId }: ApartmentCardActionsProps) => {
    const { runAddFavorite } = useAddFavoriteAPI();
    const { pushNewClientSideFavorite, favoritesIds } = useFavorites();
    const { runAddRevealedURL } = useAddRevealedURLAPI();

    const isFavorited = favoritesIds.includes(apartmentId);

    const [ranAddFavorite, setRanAddFavorite] = useState(false);

    console.log(ranAddFavorite, "ran add favorite 20rm");

    return (
        <div className="h-full flex items-center">
            <div
                onClick={() => {
                    if (isFavorited) return; // do not try to add twice!
                    runAddFavorite(apartmentId);
                    pushNewClientSideFavorite(apartmentId);
                }}
            >
                {isFavorited || ranAddFavorite ? (
                    <Button type="GreyedOut" text="Saved!" size="Small" />
                ) : (
                    <Button type="Opaque" text="Favorite" size="Small" />
                )}
            </div>
            <div
                className="ml-2 "
                onClick={() => {
                    runAddRevealedURL(apartmentId);
                    setRanAddFavorite(true);
                }}
            >
                <Button type="Opaque" text="See URL" size="Small" />
                {/* // todo: make click this link (a) deduct credit (b) take to url */}
            </div>
        </div>
    );
};
export default ApartmentCardActions;
