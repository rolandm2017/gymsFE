import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import SearchBar from "../components/searchBar/SearchBar";
import { hardcodeApartments } from "../data/apartments";
import WithAuthentication from "../components/hoc/WithAuth";

const DashboardPage: React.FC<{}> = props => {
    return (
        <PageBase>
            <div>
                <div>Favorites List</div>
                <div>Credits Remaining</div>
                <div>Budget</div>
                <div>Send Feedback</div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(DashboardPage);
