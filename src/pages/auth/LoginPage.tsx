import React from "react";
import { Link } from "react-router-dom";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";

import "./Auth.scss";

const LoginPage: React.FC<{}> = () => {
    return (
        <main className="h-full w-full">
            {/* // todo */}
            <div className="h-full flex">
                <div className="h-full w-1/2 shadow-2xl z-20 softBlueBg">
                    {/* // left hand side */}
                    <div className="pt-8 pl-14 w-1/2 blueText">
                        <p className="font-semibold text-3xl text-left">Lorem ipsum doloret sit amet, consectur adipsing elit.</p>
                        <p className="text-right">-Jack Liu</p>
                    </div>
                </div>
                <div className="h-full w-1/2 bg-white flex justify-center items-center">
                    {/* // right hand side */}
                    <div className="w-1/2">
                        <div>
                            <p className="text-4xl font-medium">Log In</p>
                        </div>
                        <div>
                            <AuthInput type={"text"} placeholder="Email" />
                            <AuthInput type={"password"} placeholder="Password" />
                        </div>
                        <div>
                            <ExpanderButton type={"Opaque"} text="Log In" />
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

export default LoginPage;
