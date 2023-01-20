import React from "react";
import { useGetFavoritesAPI, useRemoveFavoriteAPI } from "../../api/favoritesAPI";
import { useRevealURLAPI } from "../../api/revealURLAPI";
import FavoritesItem from "./FavoritesItem";

const FavoritesList: React.FC<{}> = ({}) => {
    const { favorites, favoritesIsLoaded } = useGetFavoritesAPI();
    const { runRemoveFavorite } = useRemoveFavoriteAPI();
    const { runRevealURL } = useRevealURLAPI();
    return (
        <div>
            {favorites.map(f => {
                return (
                    <FavoritesItem
                        distanceToGym={f.nearbyGyms && f.nearbyGyms.length >= 1 ? f.nearbyGyms[0].distanceInKM : 0}
                        removeFavorite={() => {
                            runRemoveFavorite(f.housingId);
                        }}
                        runRevealUrl={() => {
                            runRevealURL(f.housingId); // todo: on reveal, put revealed url in revealed url list
                        }}
                    />
                );
            })}
        </div>
    );
};
export default FavoritesList;
