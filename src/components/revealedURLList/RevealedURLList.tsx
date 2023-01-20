import React from "react";
import { useGetRevealedURLsAPI } from "../../api/favoritesAPI";
import { IHousing } from "../../interface/Housing.interface";
import RevealedURL from "./RevealedURL";

const RevealedURLList: React.FC<{}> = ({}) => {
    const { revealedURLs, runUpdateRevealedURLs } = useGetRevealedURLsAPI();
    return (
        <div>
            {revealedURLs.map((housing: IHousing) => {
                if (housing.address === undefined || housing.url === undefined) {
                    throw Error("Failed to load crucial detail");
                }
                return <RevealedURL addr={housing.address} url={housing.url} />;
            })}
        </div>
    );
};
export default RevealedURLList;
