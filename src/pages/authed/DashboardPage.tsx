import React from "react";

import PageBase from "../PageBase";

import WithAuthentication from "../../components/hoc/WithAuth";
import FavoritesList from "../../components/favoritesList/FavoritesList";
import RevealedURLList from "../../components/revealedURLList/RevealedURLList";
import CreditsCounter from "../../components/creditsCounter/CreditsCounter";

const DashboardPage: React.FC<{}> = props => {
    return (
        <PageBase>
            <div>
                <div className="hidden md:flex">
                    {/* Favorites List
                        <div>Search for More</div>
                        <div>Show URL</div> */}
                    <FavoritesList />
                    <RevealedURLList />
                </div>
                <div className="block md:hidden">
                    {/* // for tablets and mobile */}
                    <ToggleList />
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(DashboardPage);
