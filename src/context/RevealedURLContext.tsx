import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAddRevealedURLAPI, useGetRevealedURLsAPI } from "../api/revealURLAPI";
import { IHousing, IHousingWithUrl } from "../interface/Housing.interface";

//

type RevealedURLsContextType = {
    revealedURLsIds: number[];
    revealedURLsContext: IHousingWithUrl[];
    setRevealedURLsContext: Function;
    requestAddNewURL: Function;
};

const RevealedURLsContextDefaultValues: RevealedURLsContextType = {
    revealedURLsIds: [],
    revealedURLsContext: [],
    setRevealedURLsContext: () => {},
    requestAddNewURL: () => {},
};

const RevealedURLsContext = createContext<RevealedURLsContextType>(RevealedURLsContextDefaultValues);

export function useRevealedURLs() {
    return useContext(RevealedURLsContext);
}

type RevealedURLContextProps = {
    children: ReactNode;
};

export function RevealedURLProvider({ children }: RevealedURLContextProps) {
    const [revealedURLsContext, setRevealedURLsContext] = useState<IHousingWithUrl[]>([]);
    const [revealedURLsIds, setRevealedURLsIds] = useState<number[]>([]);
    const [targetIdToReveal, setTargetIdToReveal] = useState<number | undefined>(undefined);

    const { revealedURL, runAddRevealedURL, addRevealedUrlIsLoading } = useAddRevealedURLAPI();
    const { revealedURLs, runUpdateRevealedURLs } = useGetRevealedURLsAPI();

    useEffect(() => {
        // when they load, load them.
        if (revealedURLs.length > 0) {
            setRevealedURLsContext(revealedURLs);
            const justIds = revealedURLs.map(url => url.housingId);
            setRevealedURLsIds(justIds);
        }
    }, [revealedURLs]);

    // todo: get the housing entry of the housing id from  requestAddNewURL
    // then put that housing's url to be equal to the realURL returned from the backend.
    // then put that housing with the url added into the revealedURLsContext

    useEffect(() => {
        console.log(addRevealedUrlIsLoading, revealedURL, "useEffect 36rm");
        if (addRevealedUrlIsLoading === false && revealedURL) {
            // update list client side
            const updated = [...revealedURLsContext];
            const targetItemIndex = updated.findIndex(h => h.housingId === targetIdToReveal);
            console.log(targetItemIndex, updated[targetItemIndex], "42rm");
            updated[targetItemIndex].url = revealedURL;
            setRevealedURLsContext(updated);
            const justIds = updated.map(housingWithUrl => housingWithUrl.housingId);
            setRevealedURLsIds(justIds);
        }
    }, [addRevealedUrlIsLoading, revealedURL, runUpdateRevealedURLs, targetIdToReveal]);

    function requestAddNewURL(housingId: number) {
        console.log("geting url for", housingId, "43rm");
        runAddRevealedURL(housingId);
        setTargetIdToReveal(housingId);
    }

    const exportedValues = {
        revealedURLsIds,
        revealedURLsContext,
        setRevealedURLsContext,
        requestAddNewURL,
    };

    return <RevealedURLsContext.Provider value={exportedValues}>{children}</RevealedURLsContext.Provider>;
}
