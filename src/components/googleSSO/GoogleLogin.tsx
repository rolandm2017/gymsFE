import React from "react";

const GoogleLogin: React.FC<{}> = () => {
    return (
        <div>
            <div>
                <p>Log in with Google</p>
            </div>
            <div>
                <a href="localhost:8000/google/callback">Log in with Google</a>
            </div>
        </div>
    );
};

export default GoogleLogin;
