import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useServer } from "../context/ServerContext";
import { IHousing } from "../interface/Housing.interface";
import { AddFavorite } from "../interface/payload/AddFavorite.interface";
import { GenericAcctId } from "../interface/payload/GenericAcctId.interface";
import { handleError } from "../util/handleError";

export function useAddFavorite() {
    //
    const [success, setSuccess] = useState<undefined | boolean>(undefined);
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
}

export function useGetFavorites() {
    const [favorites, setFavorites] = useState(undefined);
    const [loaded, setLoaded] = useState(false);
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
                setLoaded(true);
            }
        })();
    }, [setAccessToken, server]);

    return { favorites, loaded };
}

export function useGetRevealedURLs(): { revealedURLs: any[]; revealedURLsIsLoaded: boolean; err: string; runUpdateRevealedURLs: Function } {
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
