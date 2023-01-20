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
    const { pushNewClientSideFavorite } = useFavorites();
    const { runAddRevealedURL } = useAddRevealedURLAPI();

    return (
        <div className="h-full flex items-center">
            <div
                onClick={() => {
                    runAddFavorite(apartmentId);
                    pushNewClientSideFavorite(apartmentId);
                }}
            >
                <Button type="Opaque" text="Favorite" size="Small" />
            </div>
            <div
                className="ml-2 "
                onClick={() => {
                    runAddRevealedURL(apartmentId);
                }}
            >
                <Button type="Opaque" text="See URL" size="Small" />
                {/* // todo: make click this link (a) deduct credit (b) take to url */}
            </div>
        </div>
    );
};
export default ApartmentCardActions;
