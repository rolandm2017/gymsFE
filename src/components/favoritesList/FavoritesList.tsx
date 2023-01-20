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
        <div>
            <div>
                <h3>Favorites</h3>
            </div>
            {favorites.map(f => {
                return (
                    <FavoritesItem
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
