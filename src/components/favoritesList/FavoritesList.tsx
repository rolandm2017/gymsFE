import React, { useEffect } from "react";
import { useGetFavoritesAPI, useRemoveFavoriteAPI } from "../../api/favoritesAPI";
import { useAddRevealedURLAPI, useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { useAuth } from "../../context/AuthContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useRevealedURLs } from "../../context/RevealedURLContext";
import FavoritesListContent from "./FavoritesListContent";

const FavoritesList: React.FC<{}> = () => {
    const { decrementCredits } = useAuth();

    const { favoritesContext, removeFavorite } = useFavorites();

    const { revealedURLsContext, revealedURLsIds } = useRevealedURLs();
    const { requestAddNewURL } = useRevealedURLs();

    return (
        <div className="w-full w-1/2 flex flex-col">
            <div className="mb-4">
                <h3 className="text-xl bg-zinc-200 px-6 py-2 inline-block rounded-lg">Favorites</h3>
            </div>
            <FavoritesListContent />
        </div>
    );
};
export default FavoritesList;
