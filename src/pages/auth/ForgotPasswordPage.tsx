import React, { useState } from "react";
import { useForgotPasswordEmailAPI } from "../../api/authAPI";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { isEmail } from "../../util/validation";

const ForgotPasswordPage: React.FC<{}> = () => {
    const [email, setEmail] = useState("");

    const { sent, runSendForgotPasswordEmail } = useForgotPasswordEmailAPI();

    function handleSendForgotPasswordEmail() {
        if (isEmail(email)) {
            runSendForgotPasswordEmail(email);
        }
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-2/3 sm:w-1/3 h-1/2 px-5 border-2 border-zinc-300 rounded-md">
                <div className="flex flex-col justify-center">
                    <p className="mt-3">Forgot password?</p>
                    <p className="mt-2 mb-2">Send a reset email.</p>
                </div>
                <div className="my-4">
                    <Input type="text" placeholder="Your email" changeReporter={setEmail} />
                </div>
                <div>
                    <Button text="Reset password" type="Opaque" size="Large" onClickHandler={handleSendForgotPasswordEmail} />
                </div>
                {sent ? (
                    <div>
                        <p>Sent!</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
