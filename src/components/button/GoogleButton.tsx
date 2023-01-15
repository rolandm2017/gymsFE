import React from "react";

import "./Button.scss";

const GoogleButton: React.FC<{}> = () => {
    return (
        <div className="w-full h-12 flex justify-center rounded-lg googleBtn">
            <button>Google</button>
        </div>
    );
};

export default GoogleButton;
