import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { IHousing } from "../interface/Housing.interface";

//

type FavoritesContextType = {
    favorites: IHousing[];
    setFavorites: Function;
    pushNewClientSideFavorite: Function;
};

const FavoritesContextDefaultValues: FavoritesContextType = {
    favorites: [],
    setFavorites: () => {},
    pushNewClientSideFavorite: () => {},
};

const FavoritesContext = createContext<FavoritesContextType>(FavoritesContextDefaultValues);

export function useFavorites() {
    return useContext(FavoritesContext);
}

type FavoritesContextProps = {
    children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesContextProps) {
    const [favorites, setFavorites] = useState<IHousing[]>([]);

    function pushNewClientSideFavorite(newFavoriteId: number) {
        const index = favorites.findIndex(h => h.housingId === newFavoriteId);
        const toUpdate = [...favorites];
        toUpdate[index].isFavorite = true;
        setFavorites(toUpdate);
    }

    const exportedValues = {
        favorites,
        setFavorites,
        pushNewClientSideFavorite,
    };

    return <FavoritesContext.Provider value={exportedValues}>{children}</FavoritesContext.Provider>;
}
