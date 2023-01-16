import React from "react";

import PageBase from "./PageBase";

import WithAuthentication from "../components/hoc/WithAuth";

const DashboardPage: React.FC<{}> = props => {
    return (
        <PageBase>
            <div>
                <div>
                    Favorites List
                    <div>Search for More</div>
                    <div>Show URL</div>
                </div>
                <div>Credits Remaining</div>
                <div>Budget</div>
                <div>Send Feedback</div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(DashboardPage);
