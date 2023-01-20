import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useServer } from "../context/ServerContext";
import { IHousing, IHousingWithUrl } from "../interface/Housing.interface";
import { AddFavorite } from "../interface/payload/AddFavorite.interface";
import { GenericAcctId } from "../interface/payload/GenericAcctId.interface";
import { GenericHousingIdPayload } from "../interface/payload/GenericHousingIdPayload.interface";
import { handleError } from "../util/handleError";

export function useAddRevealedURLAPI(): { revealedURL: IHousing | undefined; loaded: boolean; err: string; runAddRevealedURL: Function } {
    const [revealedURL, setRevealedURL] = useState<IHousing | undefined>(undefined);
    const [loaded, setLoaded] = useState(false);
    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<GenericHousingIdPayload | undefined>(undefined);

    function runAddRevealedURL(housingId: number) {
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
                    const { revealedURL } = response.data;
                    setRevealedURL(revealedURL);
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

    return { revealedURL, loaded, err, runAddRevealedURL };
}

export function useGetRevealedURLsAPI(): {
    revealedURLs: IHousingWithUrl[];
    revealedURLsIsLoaded: boolean;
    err: string;
    runUpdateRevealedURLs: Function;
} {
    const [revealedURLs, setRevealedURLs] = useState<IHousingWithUrl[]>([]);
    const [revealedURLsIsLoaded, setRevealedURLsIsLoaded] = useState(false);
    const [err, setErr] = useState("");
    // const [payload, setPayload]=useState<RevealedURLs | undefined>(undefined);

    function runUpdateRevealedURLs() {
        setRevealedURLsIsLoaded(false);
        // setPayload({acctId})
    }

    const server = useServer();
    const { setAccessToken, accessToken } = useAuth();

    useEffect(() => {
        if (!revealedURLsIsLoaded && accessToken) {
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
    }, [setAccessToken, accessToken, server, revealedURLsIsLoaded]);

    return { revealedURLs, revealedURLsIsLoaded, err, runUpdateRevealedURLs };
}
