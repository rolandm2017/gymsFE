import React, { useEffect } from "react";
import { useGetFavoritesAPI, useRemoveFavoriteAPI } from "../../api/favoritesAPI";
import { useAddRevealedURLAPI, useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { useAuth } from "../../context/AuthContext";
import { useRevealedURLs } from "../../context/RevealedURLContext";
import FavoritesItem from "./FavoritesItem";

const FavoritesList: React.FC<{}> = () => {
    const { favorites } = useGetFavoritesAPI();
    const { runRemoveFavorite } = useRemoveFavoriteAPI();

    const { requestAddNewURL } = useRevealedURLs();

    const { decrementCredits } = useAuth();
    return (
        <div className="w-full p-3 sm:w-1/2 flex flex-col">
            <div>
                <h3>Favorites</h3>
            </div>
            <div className="h-12 grid grid-cols-6 bg-blue-200 rounded-lg">
                <div className="col-span-2">
                    <div className="h-full flex justify-center items-center">
                        <h4>Address</h4>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="h-full flex justify-center items-center">
                        <h4 className="ml-0">Distance</h4>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="h-full flex items-center">
                        <h4 className="ml-0 text-left">Remove</h4>
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="h-full flex items-center">
                        <h4 className="ml-0">Show URL</h4>
                    </div>
                </div>
            </div>
            {favorites.map(f => {
                return (
                    <FavoritesItem
                        key={f.housingId}
                        address={f.address ? f.address : "loading..."}
                        distanceToGym={f.nearbyGyms && f.nearbyGyms.length >= 1 ? f.nearbyGyms[0].distanceInKM : 0}
                        removeFavorite={() => {
                            runRemoveFavorite(f.housingId);
                        }}
                        runRevealUrl={() => {
                            requestAddNewURL(f.housingId);
                            decrementCredits();
                            // runUpdateRevealedURLs(); // update and notify other component.
                        }}
                    />
                );
            })}
        </div>
    );
};
export default FavoritesList;
