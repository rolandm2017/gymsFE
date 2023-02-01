import React, { useEffect, useState } from "react";
import { useAddRevealedURLAPI, useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { useRevealedURLs } from "../../context/RevealedURLContext";
import { IHousingWithUrl } from "../../interface/Housing.interface";
import RevealedURLListContent from "./RevealedURLListContent";

const RevealedURLList: React.FC<{}> = ({}) => {
    const [allURLs, setAllURLs] = useState<IHousingWithUrl[]>([]);

    const { revealedURL, runAddRevealedURL, addRevealedUrlIsLoading } = useAddRevealedURLAPI();
    const { revealedURLs, runUpdateRevealedURLs, revealedURLsIsLoaded } = useGetRevealedURLsAPI();

    const { revealedURLsContext, setRevealedURLsContext, requestAddNewURL } = useRevealedURLs();

    useEffect(() => {
        // on load revealed urls list, populate state
        if (revealedURLs && revealedURLsIsLoaded) {
            console.log("setting", revealedURLs, "15rm");
            setAllURLs(revealedURLs);
        }
    }, [revealedURLs, revealedURLsIsLoaded]);

    return (
        <div className="w-1/2">
            {/* <button
                onClick={() => {
                    console.log(revealedURLsContext, "38rm");
                }}
            >
                Inspect
            </button> */}
            <div className="w-full mb-4">
                <h3 className="text-xl inline-block px-6 py-2  bg-zinc-200 rounded-lg">Revealed URLs</h3>
            </div>
            <RevealedURLListContent />
        </div>
    );
};
export default RevealedURLList;
