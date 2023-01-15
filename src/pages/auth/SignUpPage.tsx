import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpWithEmailAPI } from "../../api/authAPI";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";

const SignUpPage: React.FC<{}> = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const { signUpData, signUpErr, signUpIsLoaded, runSignUp } = useSignUpWithEmailAPI();

    useEffect(() => {
        setErr(signUpErr);
    }, [signUpErr]);

    useEffect(() => {
        // redirect to dashboard if user credentials are returned
        if (signUpData && signUpIsLoaded) {
            navigate("/login");
        }
    }, [signUpData, signUpIsLoaded, navigate]);

    function submitSignUp() {
        runSignUp(email, password);
    }

    return (
        <main className="h-full w-full">
            <div className="h-full flex">
                <div className="h-full w-1/2 shadow-2xl z-20 softBlueBg">
                    {/* // left hand side */}
                    <div className="h-2/5"></div>
                    <div className="pt-8 pl-14 w-1/2 blueText">
                        <p className="font-semibold text-3xl text-left">Lorem ipsum doloret sit amet, consectur adipsing elit.</p>
                        <p className="text-right">-Jason Bustamante</p>
                    </div>
                </div>
                <div className="h-full w-1/2 bg-white flex justify-center items-center">
                    {/* // right hand side */}
                    <div className="w-1/2">
                        <div className="mb-8 text-left">
                            <p className="text-4xl font-medium">Sign up</p>
                        </div>
                        <div>
                            <AuthInput type={"text"} placeholder="Name" changeHandler={setName} />
                            <AuthInput type={"text"} placeholder="Email" changeHandler={setEmail} />
                            <AuthInput type={"password"} placeholder="Password" changeHandler={setPassword} />
                        </div>
                        <div>
                            <ExpanderButton type={"Opaque"} text="Sign Up" onClickHandler={submitSignUp} />
                        </div>

                        <div>
                            <div className="mt-2 mb-3 flex justify-between items-center">
                                <div className="w-1/5 h-full">
                                    <div className="w-full border-bottom border-2 border-zinc-300"></div>
                                </div>
                                <div className="">
                                    <p>
                                        Or sign up with <span className="poppins font-medium">Google</span>
                                    </p>
                                </div>
                                <div className="w-1/5 h-full">
                                    <div className="w-full border-bottom border-2 border-zinc-300"></div>
                                </div>
                            </div>
                            <div>
                                <GoogleButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
