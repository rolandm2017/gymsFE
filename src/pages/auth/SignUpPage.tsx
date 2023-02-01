import React from "react";
import BigQuote from "../../components/testimonial/BigQuote";

import SignUpMan from "../../assets/SignupMan.png";
import SignUpPageCurve from "../../assets/signup-pg-curve.png";
import SignUpPrompt from "../../components/auth/SignUpPrompt";

const SignUpPage: React.FC<{}> = () => {
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
                    <SignUpPrompt />
                </div>
            </div>
        </main>
    );
};

export default SignUpPage;
