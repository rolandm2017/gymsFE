import React, { useState, KeyboardEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useResetPasswordAPI } from "../../api/authAPI";

import Button from "../../components/button/Button";
import AuthInput from "../../components/input/AuthInput";
import Input from "../../components/input/Input";

const ResetPasswordPage: React.FC<{}> = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmed, setConfirmed] = useState("");
    const [pageErr, setPageErr] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const accountId = searchParams.get("accountId");
    const token = searchParams.get("token");

    const { isReset, runResetPassword } = useResetPasswordAPI();

    function handleRunReset() {
        if (token === null) {
            setPageErr("No token found. Did you use a password reset email?");
        } else if (accountId === null) {
            setPageErr("Account id missing. Did you use a password reset email?");
        }
        if (newPassword.length < 6 || confirmed.length < 6) {
            setPageErr("Your password is too short");
            return;
        }
        if (newPassword !== confirmed) {
            setPageErr("Passwords don't match");
            return;
        }
        const acctIdDefinitelyExists = accountId ? parseInt(accountId, 10) : null;
        const tokenDefinitelyExists = token ? token : null;
        if (tokenDefinitelyExists === null || acctIdDefinitelyExists === null) throw Error("You shouldn't be able to get here");
        // success
        runResetPassword(newPassword, confirmed, tokenDefinitelyExists);
    }

    function submitIfEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            handleRunReset();
        }
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-2/3 sm:w-1/3 h-1/2 px-5 border-2 border-zinc-300 rounded-md">
                <div className="flex flex-col justify-center">
                    <p className="mt-3">Reset Your Password</p>
                </div>
                <div className="my-4">
                    <AuthInput type="password" placeholder="Password" changeHandler={setNewPassword} keyDownHandler={submitIfEnter} />
                    <AuthInput type="password" placeholder="Confirm password" changeHandler={setConfirmed} keyDownHandler={submitIfEnter} />
                </div>
                <div>
                    <Button text="Reset password" type="Opaque" size="Large" onClickHandler={handleRunReset} />
                </div>
                {isReset ? (
                    <div>
                        <p>
                            Password reset! You can now <Link to={"/login"}>log in</Link>.{" "}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
