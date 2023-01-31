import React, { useState } from "react";
import { DashboardTypeToggleEnum } from "../../enum/dashboardTypeToggle.enum";
import FavoritesListContent from "../favoritesList/FavoritesListContent";
import RevealedURLListContent from "../revealedURLList/RevealedURLListContent";
import ToggleListHeader from "./ToggleListHeader";

const ToggleList: React.FC<{}> = ({}) => {
    const [favoritesOrRevealedURLs, setFavoritesOrRevealedURLs] = useState(DashboardTypeToggleEnum.favorites);
    return (
        <div className="w-full flex flex-col items-center relative">
            <div className="h-8 bg-black">{/* // spacer div */}</div>
            <ToggleListHeader favesOrRevealedURLs={favoritesOrRevealedURLs} toggleHandler={setFavoritesOrRevealedURLs} />
            <div className="w-full pt-8 flex justify-center bg-zinc-200 rounded-lg">
                {favoritesOrRevealedURLs === "favorites" ? <FavoritesListContent /> : null}
                {favoritesOrRevealedURLs === "revealedURLs" ? <RevealedURLListContent /> : null}
            </div>
        </div>
    );
};
export default ToggleList;
