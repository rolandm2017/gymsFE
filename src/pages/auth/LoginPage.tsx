import React, { useEffect, useState, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginWithEmailAPI } from "../../api/authAPI";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";
import { useAuth } from "../../context/AuthContext";

// imgs
import LogInPageCurve from "../../assets/login-pg-curve.png";
import LogInMan from "../../assets/LoginMan.png";

import "./Auth.scss";
import BigQuote from "../../components/testimonial/BigQuote";

const LoginPage: React.FC<{}> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const { setProfile, accessToken } = useAuth();
    const { loginData, loginErr, loginIsLoaded, runLogin } = useLoginWithEmailAPI();

    useEffect(() => {
        setErr(loginErr);
    }, [loginErr]);

    useEffect(() => {
        // redirect to dashboard if user credentials are returned
        if (loginData && loginIsLoaded && accessToken) {
            // must wait for access token to be loaded before redirecting.
            console.log(accessToken, "redirecting to dahsbord 34rm");
            setProfile(loginData);
            navigate("/dashboard");
        }
    }, [loginData, loginIsLoaded, navigate, setProfile, accessToken]);

    function submitLogIn() {
        runLogin(email, password);
    }

    function submitIfEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            submitLogIn();
        }
    }

    return (
        <main className="h-full w-full">
            <div className="h-full flex flex-col sm:flex-row">
                <div className="h-full w-full sm:w-1/2 shadow-2xl z-20 hidden sm:flex flex-col justify-between primaryBlueBg">
                    {/* // left hand side - shows on desktop, hidden on mobile */}
                    <BigQuote quote="This site helped me keep on track with my lifting goals." author="Jack Liu" topPadding={true} thin={false} />

                    <div className="z-50">
                        <img src={LogInPageCurve} alt="curved lines" className="loginPageCurve" />
                    </div>
                    <div className="mb-8 ml-8 text-left  z-50 block sm:hidden">
                        <p className="text-4xl font-medium">Log in</p>
                    </div>
                </div>
                <div className="h-min w-full relative flex flex-col sm:hidden primaryBlueBg">
                    {/* // top - shows on mobile, hidden on desktop */}
                    <div className="max-h-96 z-50 flex items-end">
                        <img src={LogInPageCurve} alt="curved lines" className="loginPageCurve" />
                    </div>
                    <div className="h-1/2 mb-8 ml-8 text-left z-50 absolute bottom-0 block sm:hidden">
                        <div className="h-full w-full flex items-end">
                            <p className="text-4xl font-medium">Log in</p>
                        </div>
                    </div>
                </div>
                <div className="absolute z-40 h-screen w-screen flex-col hidden sm:flex">
                    {/* // middle person */}
                    <div className="h-full w-full flex justify-center absolute bottom-0 z-40">
                        <img src={LogInMan} alt="log in man" className="loginManBgImg" />
                    </div>
                </div>
                <div className="h-full w-full mt-12 sm:mt-0 sm:w-1/2 bg-white flex justify-center items-start sm:items-center">
                    {/* // right hand side */}
                    <div className="w-1/2 z-50">
                        <div className="mb-8 text-left hidden sm:block">
                            <p className="text-4xl font-medium">Log in</p>
                        </div>
                        <div>
                            <AuthInput type={"text"} placeholder="Email" changeHandler={setEmail} keyDownHandler={submitIfEnter} />
                            <AuthInput type={"password"} placeholder="Password" changeHandler={setPassword} keyDownHandler={submitIfEnter} />
                        </div>
                        <div
                            onKeyDown={() => {
                                submitLogIn();
                            }}
                        >
                            <ExpanderButton type={"Opaque"} text="Log In" onClickHandler={submitLogIn} />
                        </div>
                        <div>
                            <p className="mt-5 text-left text-red-500">{err ? "Error: " + err : null}</p>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="mt-8 sm:mt-6 h-8 flex items-center">
                                <p className="font-xl font-medium text-left">
                                    Forgot your password?{" "}
                                    <Link to={"/account/forgot-password"}>
                                        <span className="linkBlue">Reset it</span>
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="mb-3 sm:mb-0 mt-6 md:mt-4 h-8 flex items-center">
                                <p className="font-xl  font-medium text-left">
                                    No account?{" "}
                                    <Link to={"/signup"}>
                                        <span className="linkBlue">Make one</span>
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="mt-2 mb-3 flex justify-between items-center">
                                <div className="w-1/5 h-full">
                                    <div className="w-full border-bottom border-2 border-zinc-300"></div>
                                </div>
                                <div className="">
                                    <p>
                                        Or log in with <span className="poppins font-medium">Google</span>
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

export default LoginPage;
