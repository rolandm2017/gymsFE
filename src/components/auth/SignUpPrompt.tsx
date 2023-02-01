import React, { KeyboardEvent, useEffect, useState } from "react";
import AuthInput from "../input/AuthInput";
import ExpanderButton from "../button/ExpanderButton";
import GoogleButton from "../button/GoogleButton";
import { useSignUpWithEmailAPI } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { isEmail, isValidName, isValidPassword } from "../../util/validation";

const SignUpPrompt: React.FC<{}> = () => {
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
        <div className="w-1/2 mt-12 sm:mt-0 z-50">
            <div className="mb-8 text-left hidden sm:block">
                <p className="text-4xl font-medium">Sign up</p>
            </div>
            <div>
                <AuthInput type={"text"} placeholder="Name" changeHandler={setName} keyDownHandler={submitIfEnter} />
                <AuthInput type={"text"} placeholder="Email" changeHandler={setEmail} keyDownHandler={submitIfEnter} />
                <AuthInput type={"password"} placeholder="Password" changeHandler={setPassword} keyDownHandler={submitIfEnter} />
                <AuthInput type={"password"} placeholder="Confirm Password" changeHandler={setConfirmation} keyDownHandler={submitIfEnter} />
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
    );
};
export default SignUpPrompt;
