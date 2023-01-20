import React, { useEffect, useState, KeyboardEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginWithEmailAPI } from "../../api/authAPI";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";
import { useAuth } from "../../context/AuthContext";

// imgs
// import LoginPageCurve from "../../assets/tr-almost-sq.png";

import "./Auth.scss";
import BigQuote from "../../components/testimonial/BigQuote";

const LoginPage: React.FC<{}> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");

    const navigate = useNavigate();

    const { setProfile } = useAuth();
    const { loginData, loginErr, loginIsLoaded, runLogin } = useLoginWithEmailAPI();

    useEffect(() => {
        console.log(loginErr, "26rm");
        setErr(loginErr);
    }, [loginErr]);

    useEffect(() => {
        // redirect to dashboard if user credentials are returned
        if (loginData && loginIsLoaded) {
            setProfile(loginData);
            console.log("going to dashboard 29rm");
            navigate("/dashboard");
        }
    }, [loginData, loginIsLoaded, navigate, setProfile]);

    function submitLogIn() {
        console.log("submitting login 35rm");
        runLogin(email, password);
    }

    function submitIfEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            submitLogIn();
        }
    }

    return (
        <main className="h-full w-full">
            <div className="h-full flex">
                <div className="h-full w-1/2 shadow-2xl z-20 flex flex-col primaryBlueBg">
                    {/* // left hand side */}
                    <BigQuote quote="Lorem ipsum doloret sit amet, consectur adipsing elit." author="Jack Liu" />
                    <div className="z-50 loginPageCurve "></div>
                </div>
                <div className="absolute z-40 h-screen w-screen ">
                    {/* // middle person */}
                    <div className="h-full w-full flex justify-center absolute bottom-0 z-40 loginManBgImg">
                        {/* <div className="w-full ">// login man</div> */}
                    </div>
                </div>
                <div className="h-full w-1/2 bg-white flex justify-center items-center ">
                    {/* // right hand side */}
                    <div className="w-1/2 z-50">
                        <div className="mb-8 text-left">
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
                            <p>{err ? err : null}</p>
                        </div>
                        <div className="flex flex-col items-start">
                            <div className="mt-4 h-8 mt-3 flex items-center">
                                <p className="font-xl font-medium text-left">
                                    Forgot your password?{" "}
                                    <Link to={"/forgot-password"}>
                                        <span className="linkBlue">Reset it</span>
                                    </Link>
                                    .
                                </p>
                            </div>
                            <div className="mt-4 h-8 flex items-center">
                                <p className="font-xl font-medium text-left">
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
