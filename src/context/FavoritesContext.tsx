import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useGetFavoritesAPI, useRemoveFavoriteAPI } from "../api/favoritesAPI";
import { IHousing } from "../interface/Housing.interface";
import { LocationsProviderContext, ILocationContext } from "./LocationsContext";

//

type FavoritesContextType = {
    favoritesContext: IHousing[];
    setFavoritesContext: Function;
    pushNewClientSideFavorite: Function;
    removeFavorite: Function;
    favoritesIds: number[];
};

const FavoritesContextDefaultValues: FavoritesContextType = {
    favoritesContext: [],
    setFavoritesContext: () => {},
    pushNewClientSideFavorite: () => {},
    removeFavorite: () => {},
    favoritesIds: [],
};

const FavoritesContext = createContext<FavoritesContextType>(FavoritesContextDefaultValues);

export function useFavorites() {
    return useContext(FavoritesContext);
}

type FavoritesContextProps = {
    children: ReactNode;
};

export function FavoritesProvider({ children }: FavoritesContextProps) {
    const [favoritesContext, setFavoritesContext] = useState<IHousing[]>([]);
    const [favoritesIds, setFavoritesIds] = useState<number[]>([]);

    const { qualified } = useContext(LocationsProviderContext) as ILocationContext;

    const { favorites } = useGetFavoritesAPI();
    const { runRemoveFavorite } = useRemoveFavoriteAPI();

    useEffect(() => {
        // set into memory if loaded
        if (favorites) {
            setFavoritesContext(favorites);
            const justIds = favorites.map((fave: IHousing) => fave.housingId);
            setFavoritesIds(justIds);
        }
    }, [favorites]);

    function pushNewClientSideFavorite(newFavoriteId: number) {
        const newFavorite = qualified.find((housing: IHousing) => housing.housingId === newFavoriteId);
        if (newFavorite === undefined) {
            throw Error("Failed to find favorite in list of qualified");
        }
        newFavorite.isFavorite = true;

        const toUpdate = [...favoritesContext, newFavorite];
        setFavoritesContext(toUpdate);
        const justIds = toUpdate.map((fave: IHousing) => fave.housingId);
        setFavoritesIds(justIds);
    }

    function removeFavorite(housingId: number) {
        runRemoveFavorite(housingId);
        // remove it locally also
        const toUpdate = favoritesContext.filter(fave => fave.housingId !== housingId);
        setFavoritesContext(toUpdate);
        const justIds = favoritesIds.filter(id => id !== housingId);
        setFavoritesIds(justIds);
    }

    const exportedValues = {
        favoritesContext,
        setFavoritesContext,
        removeFavorite,
        pushNewClientSideFavorite,
        favoritesIds,
    };

    return <FavoritesContext.Provider value={exportedValues}>{children}</FavoritesContext.Provider>;
}
