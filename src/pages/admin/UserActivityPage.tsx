import React from "react";
import AsAdmin from "../../components/hoc/AsAdmin";
import WithAuthentication from "../../components/hoc/WithAuth";
import PageBase from "../PageBase";

const UserActivityPage: React.FC<{}> = props => {
    // todo: grab list of recently active users
    // todo: grab user activity by username
    // todo: grab list of registered emails & "isEmployer"
    return (
        <PageBase>
            <div>
                <div></div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(AsAdmin(UserActivityPage));
