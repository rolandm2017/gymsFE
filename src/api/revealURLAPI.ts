import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { IHousing, IHousingWithUrl } from "../interface/Housing.interface";
import { GenericHousingIdPayload } from "../interface/payload/GenericHousingIdPayload.interface";
import { getEndpoint } from "../util/getEndpoint";
import { handleError } from "../util/handleError";
import { makeHeaders } from "../util/makeHeaders";

export function useAddRevealedURLAPI(): {
    revealedURL: string;
    addRevealedUrlIsLoading: boolean;
    err: string;
    runAddRevealedURL: Function;
} {
    const [revealedURL, setRevealedURL] = useState<string>("");
    const [addRevealedUrlIsLoading, setAddRevealedUrlIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<GenericHousingIdPayload | undefined>(undefined);

    function runAddRevealedURL(housingId: number) {
        setRevealedURL("");
        setPayload({ housingId });
        setAddRevealedUrlIsLoading(true);
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && accessToken) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    console.log(payload, "payload 34rm");
                    const response = await axios.get(getEndpoint("/housing/real-url/" + payload.housingId), {
                        ...makeHeaders(accessToken),
                        data: { ...payload },
                    });
                    const { apartmentId, realURL, success } = response.data;
                    console.log(response.data, "40rm");
                    console.log(revealedURL, "new url 41rm");
                    setRevealedURL(realURL);
                } catch (error) {
                    console.warn("failed to refresh token");
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setAddRevealedUrlIsLoading(false);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, accessToken]);

    return { revealedURL, addRevealedUrlIsLoading, err, runAddRevealedURL };
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

    const { accessToken } = useAuth();

    useEffect(() => {
        if (!revealedURLsIsLoaded && accessToken) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await axios.get(getEndpoint("/housing/real-url-list"), { headers: { Authorization: "Bearer " + accessToken } });
                    const { revealedURLs } = response.data;
                    console.log(revealedURLs, "73rm");
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
    }, [accessToken, revealedURLsIsLoaded]);

    return { revealedURLs, revealedURLsIsLoaded, err, runUpdateRevealedURLs };
}
