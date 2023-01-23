import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { CustomerFeedback } from "../interface/payload/CustomerFeedback.interface";
import { FeatureRequest } from "../interface/payload/FeatureRequest.interface";
import { getEndpoint } from "../util/getEndpoint";
import { handleError } from "../util/handleError";
import { makeHeaders } from "../util/makeHeaders";

export function useSendCustomerFeedbackAPI() {
    const [feedbackSuccess, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<CustomerFeedback | undefined>(undefined);

    function sendCustomerFeedback(questionOneAnswer: number, questionTwoAnswer: number, questionThreeAnswer: number, largeTextAnswer: string) {
        setPayload({ questionOneAnswer, questionTwoAnswer, questionThreeAnswer, largeTextAnswer });
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken && payload) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await axios.post(
                        getEndpoint("/feedback/new/customer-feedback"),
                        { ...payload },
                        { ...makeHeaders(accessToken) },
                    );
                    const { success } = response.data;
                    setSuccess(success);
                } catch (error) {
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setIsLoading(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [accessToken, payload]);

    return { feedbackSuccess, isLoading, err, sendCustomerFeedback };
}

export function useSendFeatureRequestAPI() {
    //
    const [featureReqSuccess, setSuccess] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");

    const [payload, setPayload] = useState<FeatureRequest | undefined>(undefined);

    function sendFeatureReq(featureReqOneAnswer: string, featureReqTwoAnswer: string) {
        setPayload({ featureReqOneAnswer, featureReqTwoAnswer });
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken && payload) {
            (async () => {
                try {
                    setErr(""); // clear old error
                    const response = await axios.post(getEndpoint("/feedback/new/feature-req"), { ...payload }, { ...makeHeaders(accessToken) });
                    const { success } = response.data;
                    setSuccess(success);
                } catch (error) {
                    const msg = handleError(error);
                    setErr(msg);
                } finally {
                    setPayload(undefined);
                    setIsLoading(false);
                }
            })();
        }
    }, [accessToken, payload]);

    return { featureReqSuccess, isLoading, err, sendFeatureReq };
}
