import React from "react";
import FavoritesItem from "./FavoritesItem";

const FavoritesList: React.FC<{}> = ({}) => {
    const { favorites, favoritesIsLoaded } = useGetFavorites();
    const { removeFavorite } = useRemoveFavorite();
    const { revealUrl } = useRevealUrl();
    return (
        <div>
            {favorites.map(f => {
                <FavoritesItem
                    distanceToGym={f.distance}
                    removeFavorite={() => {
                        removeFavorite(f.housingId);
                    }}
                    revealUrl={() => {
                        revealUrl(f.housingId); // todo: on reveal, put revealed url in revealed url list
                    }}
                />;
            })}
        </div>
    );
};
export default FavoritesList;
