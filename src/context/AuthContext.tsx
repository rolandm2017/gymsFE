import jwt_decode, { JwtPayload } from "jwt-decode";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";

//
import { UserAccount } from "../interface/UserAccount.interface";
import { useRefreshJwtAPI } from "../api/authAPI";

type AuthContextType = {
    accessToken: string;
    isLoggedIn: Function;
    setAccessToken: Function;
    setProfile: Function;
    profile: UserAccount | undefined;
    getDefaultCity: Function;
    decrementCredits: Function;
    outOfCredits: boolean;
    addMoreCredits: Function;
};

const authContextDefaultValues: AuthContextType = {
    accessToken: "",
    isLoggedIn: () => {},
    setAccessToken: () => {},
    setProfile: () => {},
    profile: undefined,
    getDefaultCity: () => {},
    decrementCredits: () => {},
    outOfCredits: false,
    addMoreCredits: () => {},
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
    const [profile, setProfile] = useState<UserAccount | undefined>(undefined);
    const [outOfCredits, setOutOfCredits] = useState(false);

    const { runRefreshJwt } = useRefreshJwtAPI();

    function getDefaultCity() {
        // return profile?.favoriteCity;
        return "Montreal"; // todo: enable user to set their default city
    }

    useEffect(() => {
        // if out of credits, set out of credits
        if (profile && profile.credits === 0) {
            setOutOfCredits(true);
        }
    }, [profile]);

    useEffect(() => {
        // try get access token 1x on every page load.
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
        return !!accessToken;
    }

    function decrementCredits() {
        // function is a client-side way to reflect a server-side change w/o extra work.
        if (profile === undefined) {
            // silence ts.
            throw Error("No profile found");
        }
        const update = { ...profile };
        update.credits = profile?.credits ? profile.credits - 1 : 0;
        setProfile(update);
        if (update.credits === 0) {
            setOutOfCredits(true);
        }
    }

    function addMoreCredits(newAmount: number) {
        if (profile === undefined) {
            // silence ts.
            throw Error("No profile found");
        }
        const toUpdate = { ...profile };
        toUpdate.credits = newAmount;
        setOutOfCredits(false);
        setProfile(toUpdate);
    }

    const exportedValues = {
        accessToken,
        setAccessToken,
        profile,
        setProfile,
        isLoggedIn,
        getDefaultCity,
        decrementCredits,
        outOfCredits,
        addMoreCredits,
    };

    return <AuthContext.Provider value={exportedValues}>{children}</AuthContext.Provider>;
}
