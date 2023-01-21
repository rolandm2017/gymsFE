import React from "react";
import { useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { IHousingWithUrl } from "../../interface/Housing.interface";
import RevealedURL from "./RevealedURL";

const RevealedURLList: React.FC<{}> = ({}) => {
    const { revealedURLs, runUpdateRevealedURLs } = useGetRevealedURLsAPI();
    return (
        <div className="w-full sm:w-1/2">
            <div className="w-full">
                <h3>Revealed URLs</h3>
            </div>
            {revealedURLs &&
                revealedURLs.map((housing: IHousingWithUrl) => {
                    if (housing.address === undefined || housing.url === undefined) {
                        throw Error("Failed to load crucial detail");
                    }
                    return <RevealedURL addr={housing.address} url={housing.url} />;
                })}
        </div>
    );
};
export default RevealedURLList;
