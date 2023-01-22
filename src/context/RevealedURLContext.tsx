import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAddRevealedURLAPI, useGetRevealedURLsAPI } from "../api/revealURLAPI";
import { IHousing, IHousingWithUrl } from "../interface/Housing.interface";

//

type RevealedURLsContextType = {
    revealedURLsContext: IHousingWithUrl[];
    setRevealedURLsContext: Function;
    requestAddNewURL: Function;
};

const RevealedURLsContextDefaultValues: RevealedURLsContextType = {
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

    const { revealedURL, runAddRevealedURL, addRevealedUrlIsLoading } = useAddRevealedURLAPI();
    const { revealedURLs, runUpdateRevealedURLs } = useGetRevealedURLsAPI();

    useEffect(() => {
        if (addRevealedUrlIsLoading === false && revealedURL) {
            // update list
            runUpdateRevealedURLs();
        }
    }, [addRevealedUrlIsLoading, revealedURL, runUpdateRevealedURLs]);

    function requestAddNewURL(housingId: number) {
        runAddRevealedURL(housingId);
    }

    const exportedValues = {
        revealedURLsContext,
        setRevealedURLsContext,
        requestAddNewURL,
    };

    return <RevealedURLsContext.Provider value={exportedValues}>{children}</RevealedURLsContext.Provider>;
}
