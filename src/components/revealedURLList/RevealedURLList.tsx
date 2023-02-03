import React, { useEffect, useState } from "react";
import { useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { IHousingWithUrl } from "../../interface/Housing.interface";
import RevealedURLListContent from "./RevealedURLListContent";

const RevealedURLList: React.FC<{}> = ({}) => {
    const [allURLs, setAllURLs] = useState<IHousingWithUrl[]>([]);

    const { revealedURLs, revealedURLsIsLoaded } = useGetRevealedURLsAPI();

    useEffect(() => {
        // on load revealed urls list, populate state
        if (revealedURLs && revealedURLsIsLoaded) {
            setAllURLs(revealedURLs);
        }
    }, [revealedURLs, revealedURLsIsLoaded]);

    return (
        <div className="w-1/2">
            <div className="w-full mb-4">
                <h3 className="text-xl inline-block px-6 py-2  bg-zinc-200 rounded-lg">Revealed URLs</h3>
            </div>
            <RevealedURLListContent />
        </div>
    );
};
export default RevealedURLList;
