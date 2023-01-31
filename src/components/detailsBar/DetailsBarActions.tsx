import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useAddFavoriteAPI } from "../../api/favoritesAPI";
import { useAddRevealedURLAPI } from "../../api/revealURLAPI";
import { useAuth } from "../../context/AuthContext";
import { CreditsModalContext, ICreditsModalContext, useCreditsModalContext } from "../../context/CreditsModalContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRevealedURLs } from "../../context/RevealedURLContext";
import Button from "../button/Button";

interface DetailsBarActionsProps {
    apartmentId: number;
}

const DetailsBarActions: React.FC<DetailsBarActionsProps> = ({ apartmentId }: DetailsBarActionsProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const { pushNewClientSideFavorite, favoritesIds } = useFavorites();
    const { revealedURLsIds, getURLForId, requestAddNewURL } = useRevealedURLs();
    const { outOfCredits } = useAuth();
    const { openAddCreditsModal } = useContext(CreditsModalContext) as ICreditsModalContext;

    const { runAddFavorite } = useAddFavoriteAPI();

    const isFavorited = favoritesIds.includes(apartmentId);

    const isRevealed = revealedURLsIds.includes(apartmentId);

    return (
        <div className="h-full flex  items-center">
            <div
                onClick={() => {
                    if (isFavorited) return; // do not try to add twice!
                    runAddFavorite(apartmentId);
                    pushNewClientSideFavorite(apartmentId);
                }}
            >
                {isFavorited ? <Button type="GreyedOut" text="Saved!" size="Small" /> : <Button type="Opaque" text="Favorite" size="Small" />}
            </div>
            {isRevealed ? (
                <div className="ml-2 hidden sm:block">
                    <a href={getURLForId(apartmentId)} target="_blank" rel="noreferrer">
                        <Button type="Opaque" text="Visit" size="Small" />
                    </a>
                </div>
            ) : isLoading ? (
                <div className="ml-2 hidden sm:block">
                    <Button text="Loading" type="GreyedOut" size="Small" />
                </div>
            ) : (
                <div
                    className="ml-2 hidden sm:block"
                    onClick={() => {
                        if (outOfCredits) {
                            openAddCreditsModal();
                            return;
                        }
                        requestAddNewURL(apartmentId);
                        setIsLoading(true);
                    }}
                >
                    <Button type="Opaque" text="Get URL" size="Small" />
                </div>
            )}
        </div>
    );
};
export default DetailsBarActions;
