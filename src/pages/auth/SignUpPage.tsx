import React from "react";
import { Link } from "react-router-dom";
import ExpanderButton from "../../components/button/ExpanderButton";
import GoogleButton from "../../components/button/GoogleButton";
import AuthInput from "../../components/input/AuthInput";

const SignUpPage: React.FC<{}> = () => {
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
                            <AuthInput type={"text"} placeholder="Email" />
                            <AuthInput type={"password"} placeholder="Password" />
                        </div>
                        <div>
                            <ExpanderButton type={"Opaque"} text="Sign Up" />
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
