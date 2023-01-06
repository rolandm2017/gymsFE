import { useState, useEffect, useMemo } from "react";
import { useServer } from "../context/ServerContext";
import { Role } from "../enum/Role.enum";
import { Member } from "../interface/Member.interface";
import { handleError } from "../util/handleError";
import { useAuth } from "../context/AuthContext";
import { EmailSignUpPayload } from "../interface/payloads/EmailSignUp.interface";

export function useSignUpWithEmailAPI(): { signUpData: Member; signUpErr: string; signUpIsLoaded: boolean; runSignUp: Function } {
    const emptyPayload: EmailSignUpPayload = useMemo(() => {
        return {
            role: Role.NewMember,
            firstName: "",
            lastName: "",
            email: "",
            fakeGoogleId: "",
            isReady: false,
        };
    }, []);
    const [signUpData, setSignUpData] = useState<Member>({} as Member);
    const [signUpErr, setSignUpErr] = useState("");
    const [signUpIsLoaded, setSignUpIsLoaded] = useState(false);
    const [payload, setPayload] = useState<EmailSignUpPayload>(emptyPayload);

    const server = useServer();

    function runSignUp(email: string, fakeGoogleId: string, firstName: string, lastName: string, role: Role) {
        setSignUpIsLoaded(false);
        setPayload({ email, fakeGoogleId, firstName, lastName, role, isReady: true });
    }

    useEffect(() => {
        if (!signUpIsLoaded && payload.isReady) {
            (async () => {
                try {
                    setSignUpErr(""); // remove old errors
                    const response = await server!.post("/auth/email/signup", {
                        email: payload.email,
                        fakeGoogleId: payload.fakeGoogleId,
                        firstName: payload.firstName,
                        lastName: payload.lastName,
                        role: payload.role,
                    });
                    const newMember = response.data as Member;
                    setSignUpData(newMember);
                } catch (error) {
                    const msg = handleError(error);
                    setSignUpErr(msg);
                } finally {
                    setSignUpIsLoaded(true);
                    setPayload(emptyPayload); // so it doesn't re-run.
                }
            })();
        }
    }, [signUpIsLoaded, emptyPayload, payload, server]);

    return { signUpData, signUpErr, signUpIsLoaded, runSignUp };
}

export function useLoginWithEmailAPI(): {
    loginData: Member | undefined;
    loginErr: string;
    loginIsLoaded: boolean;
    runLogin: Function;
} {
    const [loginData, setLoginData] = useState<Member | undefined>(undefined);
    const [loginErr, setLoginErr] = useState("");
    const [loginIsLoaded, setLoginIsLoaded] = useState(false);
    const [email, setEmail] = useState("");

    const server = useServer();
    const { setAccessToken } = useAuth();

    function runLogin(email: string) {
        setLoginIsLoaded(false);
        setEmail(email);
    }

    useEffect(() => {
        if (email) {
            (async () => {
                try {
                    setLoginErr(""); // remove old errors
                    const response = await server!.post("/auth/email/login", { email });
                    const { member, accessToken } = response.data;
                    setLoginData(member);
                    setAccessToken(accessToken);
                } catch (error) {
                    const msg = handleError(error);
                    setLoginErr(msg);
                } finally {
                    setLoginIsLoaded(true);
                    setEmail(""); // so it doesn't re-run.
                }
            })();
        }
    }, [email, server, setAccessToken]);

    return { loginData, loginErr, loginIsLoaded, runLogin };
}

export function useRefreshJwtAPI(): {
    refreshedMember: Member;
    refreshErr: string;
    refreshIsLoaded: boolean;
    runRefreshJwt: Function;
} {
    const [refreshedMember, setRefreshedMember] = useState<Member>({} as Member);
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
                    const response = await server!.post("/auth/jwt/refresh");
                    const { member, accessToken } = response.data;
                    setAccessToken(accessToken);
                    setRefreshedMember(member);
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

    return { refreshedMember, refreshErr, refreshIsLoaded, runRefreshJwt };
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
