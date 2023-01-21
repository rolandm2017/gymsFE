import React from "react";
import { useAuth } from "../../context/AuthContext";

import "./CreditsCounter.scss";

const CreditsCounter: React.FC<{}> = () => {
    const { profile } = useAuth();
    console.log(profile, "6rm");
    return (
        <div className="mr-3 h-full flex items-center">
            <p key={profile?.credits ? profile.credits : 0} className="font-bold changeCreditsAmountAnimation">
                Credits: {profile?.credits ? profile.credits : 0}
            </p>
        </div>
    );
};
export default CreditsCounter;
