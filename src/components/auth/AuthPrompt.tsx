import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";

const AuthPrompt: React.FC<{}> = () => {
    const nav = useNavigate();
    return (
        <div className="w-full flex justify-center">
            <div
                className="mr-3 cursor-pointer"
                onClick={() => {
                    nav("/signup");
                }}
            >
                <Button type="Opaque" text="Sign Up" />
            </div>
            <div
                className="cursor-pointer"
                onClick={() => {
                    nav("/login");
                }}
            >
                <Button type="Opaque" text="Log In" />
            </div>
        </div>
    );
};

export default AuthPrompt;
