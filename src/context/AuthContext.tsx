import jwt_decode, { JwtPayload } from "jwt-decode";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

//
import { UserProfile } from "../interface/UserProfile.interface";
import { useRefreshJwtAPI } from "../api/authAPI";

type AuthContextType = {
    accessToken: string;
    isLoggedIn: Function;
    setAccessToken: Function;
    setProfile: Function;
    profile: UserProfile | undefined;
    getDefaultCity: Function;
    decrementCredits: Function;
};

const authContextDefaultValues: AuthContextType = {
    accessToken: "",
    isLoggedIn: () => {},
    setAccessToken: () => {},
    setProfile: () => {},
    profile: undefined,
    getDefaultCity: () => {},
    decrementCredits: () => {},
};

const AuthContext = createContext<AuthContextType>(authContextDefaultValues);

export function useAuth() {
    return useContext(AuthContext);
}

type AuthContextProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthContextProps) {
    const [accessToken, setAccessToken] = useState<string>("");
    const [profile, setProfile] = useState<UserProfile | undefined>(undefined);

    const { runRefreshJwt } = useRefreshJwtAPI();

    function getDefaultCity() {
        // return profile?.favoriteCity;
        return "Montreal"; // todo: enable user to set their default city
    }

    useEffect(() => {
        // try get access token 1x on every page load.
        console.log("refresh token 41rm");
        // debugger;
        runRefreshJwt();
    }, []);

    useEffect(() => {
        // refresh the access token if it's about to expire or has expired.
        if (accessToken !== "") {
            const decodedToken = jwt_decode<JwtPayload>(accessToken);
            const dateNow = new Date();
            // null check: appeasing typescript
            if (decodedToken === null) {
                // invalid token
                return;
            }
            // more appeasing typescript.
            if (decodedToken.exp === undefined) {
                // invalid token
                return;
            }
            // according to // https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library
            // the payload.exp has to be * 1000 for whatever reason
            const tokenExpiryTime = new Date(decodedToken.exp * 1000);
            const millisecondsPerMinute = 1000 * 60;
            const twoMinutes = millisecondsPerMinute * 2;
            const soon = new Date(dateNow.getTime() - twoMinutes);
            const tokenWillExpireSoon = tokenExpiryTime < soon;
            if (tokenWillExpireSoon) {
                runRefreshJwt();
            }
        }
    }, [accessToken, runRefreshJwt]);

    function isLoggedIn() {
        console.log(!!accessToken, "75rm");
        return !!accessToken;
    }

    function decrementCredits() {
        // function is a client-side way to reflect a server-side change w/o extra work.
        if (profile === undefined) return; // silence ts.
        const update = { ...profile };
        update.credits = profile?.credits ? profile.credits - 1 : 0;
        setProfile(update);
    }

    const exportedValues = {
        accessToken,
        setAccessToken,
        profile,
        setProfile,
        isLoggedIn,
        getDefaultCity,
        decrementCredits,
    };

    return <AuthContext.Provider value={exportedValues}>{children}</AuthContext.Provider>;
}
