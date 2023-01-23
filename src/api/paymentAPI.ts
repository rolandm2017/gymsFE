import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { GenericAcctId } from "../interface/payload/GenericAcctId.interface";
import { getEndpoint } from "../util/getEndpoint";
import { handleError } from "../util/handleError";
import { makeHeaders } from "../util/makeHeaders";

export function useGetFreeCreditsAPI() {
    const [success, setSuccess] = useState(false);
    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<GenericAcctId | undefined>(undefined);

    const { accessToken, profile, addMoreCredits } = useAuth();

    function runGetFreeCredits() {
        if (profile === undefined) {
            throw Error("No account info found");
        }
        setPayload({ acctId: profile.acctId });
    }

    useEffect(() => {
        if (payload && accessToken) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const path = getEndpoint("/auth/free-credits");
                    const response = await axios.put(path, {}, { ...makeHeaders(accessToken) });
                    const { newCreditsAmount } = response.data;
                    addMoreCredits(newCreditsAmount);
                    setSuccess(true);
                } catch (error) {
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setPayload(undefined);
                }
            })();
        }
    });

    return { success, runGetFreeCredits };
}
