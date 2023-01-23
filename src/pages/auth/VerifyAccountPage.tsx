import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const VerifyAccountPage: React.FC<{}> = () => {
    return (
        <div className="h-full w-full flex justify-center items-center">
            <div className="w-1/3 h-1/3 flex flex-col">
                <p>Thanks for joining </p>
                <p>Apartments Near Gyms.</p>
                <p>
                    {" "}
                    Account verified!{" "}
                    <Link to="/login" className="underline">
                        Log in
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
};

export default VerifyAccountPage;
