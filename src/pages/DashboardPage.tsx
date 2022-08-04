import React from "react";

import PageBase from "./PageBase";
import Button from "../components/button/Button";
import DetailsBar from "../components/detailsBar/DetailsBar";
import SearchBar from "../components/searchBar/SearchBar";

const DashboardPage: React.FC<{}> = props => {
    const hardcodeApartments = [
        {
            name: "Apartment 1",
            addr: "123 Fake St",
            gym: "Gold's Gym",
            distance: "1 km",
            time: "10 min",
            apUrl: "https://google.com",
            gymUrl: "www.goldsgym.com",
        },
    ];

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

export default DashboardPage;
