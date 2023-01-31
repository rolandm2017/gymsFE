import React, { useState } from "react";
import ToggleListHeader from "./ToggleListHeader";

const ToggleList: React.FC<{}> = ({}) => {
    const [favoritesOrRevealedURLs, setFavoritesOrRevealedURLs] = useState("favorites");
    return (
        <div>
            <div>
                <ToggleListHeader favesOrRevealedURLs={"favorites"} />
            </div>
            <div></div>
        </div>
    );
};
export default ToggleList;
