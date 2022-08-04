import React from "react";
import Profile from "../components/profile/Profile";
import Sidebar from "../components/sidebar/Sidebar";

interface PageProps {
    children: JSX.Element;
}

const PageBase: React.FC<PageProps> = props => {
    return (
        <div>
            <div>
                <div>Logo</div>
                <div>
                    <Profile />
                </div>
            </div>
            <div>
                <div>
                    <Sidebar />
                </div>
                <div>{props.children}</div>
            </div>
        </div>
    );
};

export default PageBase;
