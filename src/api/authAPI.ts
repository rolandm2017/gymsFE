import { useState, useEffect, useMemo } from "react";
import { useServer } from "../context/ServerContext";
import { handleError } from "../util/handleError";
import { useAuth } from "../context/AuthContext";
import { LogInAuth } from "../interface/payload/LogInAuth.interface";
import { SignUpAuth } from "../interface/payload/SignUpAuth.interface";
import { UserProfile } from "../interface/UserProfile.interface";

export function useSignUpWithEmailAPI(): {
    signUpData: UserProfile | undefined;
    signUpErr: string;
    signUpIsLoaded: boolean;
    runSignUp: Function;
    backendMsg: string;
} {
    const [backendMsg, setBackendMsg] = useState("");
    const [signUpData, setSignUpData] = useState<UserProfile | undefined>(undefined);
    const [signUpErr, setSignUpErr] = useState("");
    const [signUpIsLoaded, setSignUpIsLoaded] = useState(false);
    const [payload, setPayload] = useState<SignUpAuth | undefined>(undefined);

    const server = useServer();

    function runSignUp(name: string, email: string, password: string, confirmPassword: string) {
        setSignUpIsLoaded(false);
        setPayload({ name, email, password, confirmPassword, acceptsTerms: true });
    }

    useEffect(() => {
        if (!signUpIsLoaded && payload) {
            (async () => {
                try {
                    setSignUpErr(""); // remove old errors
                    const response = await server!.post("/auth/register", {
                        ...payload,
                    });
                    const { message, accountDetails } = response.data;
                    setSignUpData(accountDetails);
                    setBackendMsg(message);
                } catch (error) {
                    const msg = handleError(error);
                    setSignUpErr(msg);
                } finally {
                    setSignUpIsLoaded(true);
                    setPayload(undefined); // so it doesn't re-run.
                }
            })();
        }
    }, [signUpIsLoaded, payload, server]);

    return { signUpData, signUpErr, signUpIsLoaded, runSignUp, backendMsg };
}

export function useLoginWithEmailAPI(): {
    loginData: UserProfile | undefined;
    loginErr: string;
    loginIsLoaded: boolean;
    runLogin: Function;
} {
    const [loginData, setLoginData] = useState<UserProfile | undefined>(undefined);
    const [loginErr, setLoginErr] = useState("");
    const [loginIsLoaded, setLoginIsLoaded] = useState(false);
    const [payload, setPayload] = useState<LogInAuth | undefined>(undefined);

    const server = useServer();
    const { setAccessToken } = useAuth();

    function runLogin(email: string, password: string) {
        setLoginIsLoaded(false);
        setPayload({ email, password });
    }

    useEffect(() => {
        if (payload) {
            (async () => {
                try {
                    setLoginErr(""); // remove old errors
                    const response = await server!.post("/auth/authenticate", { ...payload });
                    const { acctId, email, isVerified, credits, role, jwtToken } = response.data;
                    setLoginData({ acctId, email, isVerified, role, credits });
                    console.log(jwtToken, "storing jwt, 83rm");
                    setAccessToken(jwtToken);
                } catch (error) {
                    const msg = handleError(error);
                    setLoginErr(msg);
                } finally {
                    setLoginIsLoaded(true);
                    setPayload(undefined); // so it doesn't re-run.
                }
            })();
        }
    }, [payload, server, setAccessToken]);

    return { loginData, loginErr, loginIsLoaded, runLogin };
}

export function useRefreshJwtAPI(): {
    refreshedUser: UserProfile | undefined;
    refreshErr: string;
    refreshIsLoaded: boolean;
    runRefreshJwt: Function;
} {
    const [refreshedUser, setRefreshedUser] = useState<UserProfile | undefined>(undefined);
    const [refreshErr, setRefreshErr] = useState("");
    const [refreshIsLoaded, setRefreshIsLoaded] = useState(false);
    const [run, setRun] = useState(false);

    const server = useServer();
    const { setAccessToken } = useAuth();

    function runRefreshJwt() {
        setRefreshIsLoaded(false);
        setRun(true);
    }

    useEffect(() => {
        if (run) {
            (async () => {
                try {
                    setRefreshErr(""); // clear old error
                    const response = await server!.post("/auth/refresh-token");
                    const { user, accessToken } = response.data;
                    console.log(user, accessToken, "setting access token, 125rm");
                    setAccessToken(accessToken === undefined ? "" : accessToken);
                    setRefreshedUser(user);
                    // debugger;
                } catch (error) {
                    console.log("failed to refresh token");
                    const msg = handleError(error);
                    setRefreshErr(msg);
                } finally {
                    setRefreshIsLoaded(true);
                    setRun(false);
                }
            })();
        }
    }, [run, setAccessToken, server]);

    return { refreshedUser, refreshErr, refreshIsLoaded, runRefreshJwt };
}

export function useLogOutAPI(): { success: boolean; error: string; loaded: boolean; runLogOut: Function } {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [run, setRun] = useState(false);

    const server = useServer();
    const { setAccessToken } = useAuth();

    function runLogOut() {
        setRun(true);
    }
    // todo: what should this method return?
    useEffect(() => {
        if (run) {
            (async () => {
                try {
                    // server has "withCredential: true" and the access token automatically attached.
                    const response = await server!.get("/auth/logout");
                    setAccessToken("");
                    setSuccess(true);
                } catch (error) {
                    const msg = handleError(error);
                    setError(msg);
                } finally {
                    setLoaded(true);
                    setRun(false);
                }
            })();
        }
    }, [run, server, setAccessToken]);

    return { success, error, loaded, runLogOut };
}
