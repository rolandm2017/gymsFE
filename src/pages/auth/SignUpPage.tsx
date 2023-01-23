import React, { KeyboardEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpWithEmailAPI } from "../../api/authAPI";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";
import BigQuote from "../../components/testimonial/BigQuote";
import { isEmail, isValidName, isValidPassword } from "../../util/validation";

import SignUpMan from "../../assets/SignupMan.png";
import SignUpPageCurve from "../../assets/signup-pg-curve.png";

const SignUpPage: React.FC<{}> = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [err, setErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const navigate = useNavigate();

    const { signUpData, signUpErr, signUpIsLoaded, runSignUp, backendMsg } = useSignUpWithEmailAPI();

    useEffect(() => {
        setErr(signUpErr);
    }, [signUpErr]);

    useEffect(() => {
        // redirect to dashboard if user credentials are returned
        if (signUpData && signUpIsLoaded && backendMsg) {
            setErr("");
            setSuccessMsg(backendMsg);
        }
    }, [signUpData, signUpIsLoaded, navigate, backendMsg]);

    useEffect(() => {
        if (name && !isValidName(name)) {
            setErr("First and last name must be at least 2 characters");
            return;
        } else {
            setErr("");
        }
    }, [name]);

    useEffect(() => {
        if (email && !isEmail(email)) {
            setErr("Invalid email");
            return;
        } else {
            setErr("");
        }
    }, [email]);

    useEffect(() => {
        if (isValidPassword(password, confirmation)) {
            setErr("");
            return;
        }
        // if pw2 is empty, say so
        if (password && confirmation.length === 0) {
            setErr("Must confirm your password");
            return;
        }
        // if pws dont match, say so
        if (password && confirmation) {
            setErr("Passwords don't match");
            return;
        }
    }, [password, confirmation]);

    function submitSignUp() {
        const passwordsMatch = password === confirmation;
        if (name && email && passwordsMatch) {
            runSignUp(name, email, password, confirmation);
        } else {
            setErr("One or more fields is empty");
        }
    }

    function submitIfEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            submitSignUp();
        }
    }

    return (
        <main className="h-full w-full">
            <div className="h-full flex flex-col sm:flex-row">
                <div className="h-full w-1/2 shadow-2xl z-20 hidden sm:block primaryBlueBg">
                    {/* // left hand side - shows on desktop, hidden on mobile */}
                    <div className="w-full z-50 flex justify-end">
                        <img src={SignUpPageCurve} alt="bottom left quadrant of a full circle" />
                        {/* // todo (1) - find soruce of horizontal scroll
                        // todo 1.5 - make two separate containers, left and top, for desktop and mobile code
                        // todo (2) - mobile design */}
                    </div>
                    <BigQuote quote="Your site got me going to the gym six days a week." author="Jason Bustamante" topPadding={false} thin={true} />
                </div>
                <div className="h-min w-full shadow-2xl z-20 relative block sm:hidden primaryBlueBg">
                    {/* // top - shows on mobile, hidden on desktop */}
                    <div className="w-full max-h-96 z-50  flex justify-end">
                        <img src={SignUpPageCurve} alt="bottom left quadrant of a full circle" />
                    </div>
                    <div className="h-1/2 mb-8 ml-8 text-left z-50 absolute bottom-0 block sm:hidden">
                        <div className="h-full w-full flex items-end">
                            <p className="text-4xl font-medium">Sign up</p>
                        </div>
                    </div>
                </div>
                <div className="absolute z-40 h-screen w-screen hidden sm:flex ">
                    {/* // middle person */}
                    <div className="h-full w-full flex justify-center absolute bottom-0 z-40  ">
                        <img src={SignUpMan} alt="sign up man" className="pl-0 md:pl-20 pt-36 signupManBgImg" />
                    </div>
                </div>
                <div className="h-full w-full sm:w-1/2 bg-white flex justify-center items-start sm:items-center">
                    {/* // right hand side */}
                    <div className="w-1/2 mt-12 sm:mt-0 z-50">
                        <div className="mb-8 text-left hidden sm:block">
                            <p className="text-4xl font-medium">Sign up</p>
                        </div>
                        <div>
                            <AuthInput type={"text"} placeholder="Name" changeHandler={setName} keyDownHandler={submitIfEnter} />
                            <AuthInput type={"text"} placeholder="Email" changeHandler={setEmail} keyDownHandler={submitIfEnter} />
                            <AuthInput type={"password"} placeholder="Password" changeHandler={setPassword} keyDownHandler={submitIfEnter} />
                            <AuthInput
                                type={"password"}
                                placeholder="Confirm Password"
                                changeHandler={setConfirmation}
                                keyDownHandler={submitIfEnter}
                            />
                        </div>
                        <div>
                            <ExpanderButton type={"Opaque"} text="Sign Up" onClickHandler={submitSignUp} />
                        </div>
                        <div className="text-left">
                            {err ? <p className="text-red-500 mt-3">{err}</p> : null}
                            {successMsg ? <p className="text-black mt-3">{successMsg}. Check your spam!</p> : null}
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
