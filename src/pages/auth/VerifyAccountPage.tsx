import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const VerifyAccountPage: React.FC<{}> = () => {
    return (
        <div>
            <div>
                <p>
                    Account Verified! <Link to="/login">Log in</Link>.
                </p>
            </div>
        </div>
    );
};

export default VerifyAccountPage;
