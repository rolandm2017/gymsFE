import React from "react";
import { useGetRevealedURLs } from "../../api/dashboardAPI";
import RevealedURL from "./RevealedURL";

const RevealedURLList: React.FC<{}> = ({}) => {
    const { runGetRevealedURLs } = useGetRevealedURLs();
    return (
        <div>
            {revealedURLs.map(housing => {
                <RevealedURL addr={housing.address} url={housing.url} />;
            })}
        </div>
    );
};
export default RevealedURLList;
