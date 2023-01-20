import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useServer } from "../context/ServerContext";
import { IHousing } from "../interface/Housing.interface";
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
    const [err, setErr] = useState("");

    const server = useServer();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setErr(""); // clear old error
                const response = await server!.get("/housing/real-url-list");
                const { favorites } = response.data;
                setFavorites(favorites);
            } catch (error) {
                console.warn("failed to refresh token");
                const msg = handleError(error);
                setErr(msg);
            } finally {
                setFavoritesIsLoaded(true);
            }
        })();
    }, [setAccessToken, server]);

    return { favorites, favoritesIsLoaded };
}

export function useGetRevealedURLsAPI(): { revealedURLs: IHousing[]; revealedURLsIsLoaded: boolean; err: string; runUpdateRevealedURLs: Function } {
    const [revealedURLs, setRevealedURLs] = useState<IHousing[]>([]);
    const [revealedURLsIsLoaded, setRevealedURLsIsLoaded] = useState(false);
    const [err, setErr] = useState("");
    // const [payload, setPayload]=useState<RevealedURLs | undefined>(undefined);

    function runUpdateRevealedURLs() {
        setRevealedURLsIsLoaded(false);
        // setPayload({acctId})
    }

    const server = useServer();
    const { setAccessToken } = useAuth();

    useEffect(() => {
        if (!revealedURLsIsLoaded) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await server!.get("/housing/real-url-list");
                    const { revealedURLs } = response.data;
                    setRevealedURLs(revealedURLs);
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setRevealedURLsIsLoaded(true);
                    // setPayload(undefined)
                }
            })();
        }
    }, [setAccessToken, server, revealedURLsIsLoaded]);

    return { revealedURLs, revealedURLsIsLoaded, err, runUpdateRevealedURLs };
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
