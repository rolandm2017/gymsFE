import React, { useEffect } from "react";
import { useGetFavoritesAPI, useRemoveFavoriteAPI } from "../../api/favoritesAPI";
import { useAddRevealedURLAPI } from "../../api/revealURLAPI";
import FavoritesItem from "./FavoritesItem";

const FavoritesList: React.FC<{}> = ({}) => {
    const { favorites, getFavoritesErr, favoritesIsLoaded } = useGetFavoritesAPI();
    const { runRemoveFavorite } = useRemoveFavoriteAPI();
    const { runAddRevealedURL } = useAddRevealedURLAPI();
    console.log(favorites, "10rm");

    useEffect(() => {
        console.log(favorites, getFavoritesErr, "13rm");
    }, [favorites, getFavoritesErr]);
    return (
        <div className="w-full sm:w-1/2 flex flex-col">
            <div>
                <h3>Favorites</h3>
            </div>
            <div className="grid grid-cols-6">
                <div className="col-span-2">
                    <h4>Address</h4>
                </div>
                <div className="col-span-2">
                    <h4 className="ml-0">Distance</h4>
                </div>
                <div className="col-span-1">
                    <h4 className="ml-0 text-left">Remove</h4>
                </div>
                <div className="col-span-1">
                    <h4 className="ml-0">Show URL</h4>
                </div>
            </div>
            {favorites.map(f => {
                return (
                    <FavoritesItem
                        address={f.address ? f.address : "loading..."}
                        distanceToGym={f.nearbyGyms && f.nearbyGyms.length >= 1 ? f.nearbyGyms[0].distanceInKM : 0}
                        removeFavorite={() => {
                            runRemoveFavorite(f.housingId);
                        }}
                        runRevealUrl={() => {
                            runAddRevealedURL(f.housingId); // todo: on reveal, put revealed url in revealed url list
                        }}
                    />
                );
            })}
        </div>
    );
};
export default FavoritesList;
