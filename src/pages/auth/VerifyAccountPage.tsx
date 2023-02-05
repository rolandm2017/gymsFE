import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSendVerificationCodeAPI } from "../../api/authAPI";
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";

const VerifyAccountPage: React.FC<{}> = () => {
    const [inputtedCode, setInputtedCode] = useState("");
    const { success, err, runSendVerificationCode } = useSendVerificationCodeAPI();
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-1/3 h-1/3 flex flex-col items-center">
                <div>
                    <p>Thanks for joining </p>
                    <p>Apartments Near Gyms.</p>
                </div>
                <div className="mt-6 w-96 flex flex-col items-center">
                    <h3 className="py-3">Input your verification code</h3>
                    <div className="mb-4 w-60">
                        <Input type="text" placeholder="Your verification code" changeReporter={setInputtedCode} />
                    </div>
                    <div>
                        <Button
                            text="Submit"
                            type="Opaque"
                            onClickHandler={() => {
                                runSendVerificationCode(inputtedCode);
                            }}
                        />
                    </div>
                </div>
                {success ? (
                    <div className="mt-4">
                        <p>
                            {" "}
                            Account verified!{" "}
                            <Link to="/login" className="underline">
                                <span className="blueText">Log in</span>
                            </Link>
                            .
                        </p>
                    </div>
                ) : null}
                {err && !success ? <p>{err}. Did you already complete verification?</p> : null}
            </div>
        </div>
    );
};

export default VerifyAccountPage;
