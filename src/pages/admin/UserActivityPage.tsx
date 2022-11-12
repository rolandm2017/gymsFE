import React from "react";
import PageBase from "../PageBase";

const UserActivityPage: React.FC<{}> = props => {
    console.log("5rm");
    // todo: grab list of recently active users
    // todo: grab user activity by username
    // todo: grab list of registered emails & "isEmployer"
    return (
        <PageBase>
            <div>
                foo
                <div>
                    <div>Admin Panel Tabs</div>
                    <div>
                        <div>Batches & Scrapes</div>
                        <div>User Activity</div>
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default UserActivityPage;
