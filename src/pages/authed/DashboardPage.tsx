import React from "react";

import PageBase from "../PageBase";

import WithAuthentication from "../../components/hoc/WithAuth";
import FavoritesList from "../../components/favoritesList/FavoritesList";
import RevealedURLList from "../../components/revealedURLList/RevealedURLList";
import ToggleList from "../../components/toggleList/ToggleList";

const DashboardPage: React.FC<{}> = props => {
    return (
        <PageBase>
            <div>
                <div className="hidden lg:flex">
                    <FavoritesList />
                    <RevealedURLList />
                </div>
                <div className="w-full flex lg:hidden justify-center">
                    {/* // for tablets and mobile */}
                    <ToggleList />
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(DashboardPage);
