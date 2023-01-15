import React from "react";
import AsAdmin from "../../components/hoc/AsAdmin";
import PageBase from "../PageBase";

const UserActivityPage: React.FC<{}> = props => {
    // todo: grab list of recently active users
    // todo: grab user activity by username
    // todo: grab list of registered emails & "isEmployer"
    return (
        <PageBase>
            <div>
                foo
                <div></div>
            </div>
        </PageBase>
    );
};

export default AsAdmin(UserActivityPage);
