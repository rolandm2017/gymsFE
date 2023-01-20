import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useServer } from "../context/ServerContext";
import { IHousing, IHousingWithUrl } from "../interface/Housing.interface";
import { AddFavorite } from "../interface/payload/AddFavorite.interface";
import { GenericAcctId } from "../interface/payload/GenericAcctId.interface";
import { GenericHousingIdPayload } from "../interface/payload/GenericHousingIdPayload.interface";
import { handleError } from "../util/handleError";

export function useAddFavoriteAPI(): { success: boolean; loaded: boolean; err: string; runAddFavorite: Function } {
    //
    const [success, setSuccess] = useState<boolean>(false);
    const [loaded, setLoaded] = useState(false);

    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<AddFavorite | undefined>(undefined);

    function runAddFavorite(housingId: number) {
        setPayload({ housingId });
    }

    const server = useServer();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        if (payload) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await server!.post("/profile/authed-pick/housing", { ...payload });
                    setSuccess(true);
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [setAccessToken, server]);

    return { success, loaded, err, runAddFavorite };
}

export function useGetFavoritesAPI() {
    const [favorites, setFavorites] = useState<IHousing[]>([]);
    const [favoritesIsLoaded, setFavoritesIsLoaded] = useState(false);
    const [getFavoritesErr, setGetFavoritesErr] = useState("");

    const server = useServer();
    const { setAccessToken, accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            (async () => {
                try {
                    setGetFavoritesErr(""); // clear old error
                    const response = await server!.get("/profile/all/picks/housing");
                    const { favorites } = response.data;
                    console.log(favorites, "61rm");
                    setFavorites(favorites);
                } catch (error) {
                    const msg = handleError(error);
                    console.log(msg, "65rm");
                    setGetFavoritesErr(msg);
                } finally {
                    setFavoritesIsLoaded(true);
                }
            })();
        }
    }, [setAccessToken, accessToken, server]);

    return { favorites, getFavoritesErr, favoritesIsLoaded };
}

export function useRemoveFavoriteAPI(): { success: boolean; loaded: boolean; err: string; runRemoveFavorite: Function } {
    const [success, setSuccess] = useState<boolean>(false);

    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<GenericHousingIdPayload | undefined>(undefined);

    function runRemoveFavorite(housingId: number) {
        setPayload({ housingId });
    }

    const server = useServer();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        if (payload) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await server!.delete("/profile/pick/housing", { data: { ...payload } });
                    setSuccess(true);
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, setAccessToken, server]);

    return { success, loaded, err, runRemoveFavorite };
}
