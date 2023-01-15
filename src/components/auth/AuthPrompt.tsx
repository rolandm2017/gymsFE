import React from "react";
import Button from "../button/Button";

const AuthPrompt: React.FC<{}> = () => {
    return (
        <div className="w-full flex justify-center">
            <div className="mr-3">
                <Button type="Opaque" text="Sign Up" />
            </div>
            <div>
                <Button type="Opaque" text="Log In" />
            </div>
        </div>
    );
};

export default AuthPrompt;
