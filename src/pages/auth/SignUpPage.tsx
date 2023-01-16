import React, { KeyboardEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignUpWithEmailAPI } from "../../api/authAPI";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";
import { isEmail, isValidName, isValidPassword } from "../../util/validation";

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
        console.log(password, confirmation, isValidPassword(password, confirmation), "50rm");
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
        console.log("sign upping", email, password, "30rm");
        const passwordsMatch = password === confirmation;
        if (name && email && passwordsMatch) {
            runSignUp(name, email, password, confirmation);
        }
    }

    function submitIfEnter(event: KeyboardEvent<HTMLInputElement>) {
        console.log(event.key, "40rm");
        if (event.key === "Enter") {
            submitSignUp();
        }
    }

    return (
        <main className="h-full w-full">
            <div className="h-1/2 absolute z-20 bg-red-500"></div>
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
