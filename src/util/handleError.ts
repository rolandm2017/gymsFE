import { AxiosError } from "axios";

export function handleError(error: unknown): string {
    const err = error as AxiosError;
    const data = err.response?.data;
    if (err.name === "AxiosError") {
        console.log(err);
        if (err?.response?.data) {
            // not sure what the difference is betweeh the two types of error responses.
            // **
            // this works in some cases.
            const withError1 = err.response.data as { error: { name: string; message: string } };
            if (withError1.error.message) {
                return withError1.error.message;
            }
            // this also works in some cases.
            const withError2 = err.response.data as { message: string };
            return withError2.message;
        }
        return "";
    }
    if (data && hasError(data)) {
        return data.message;
    }
    throw err; // throw if not what we expect
}

export function hasError(maybeError: any): maybeError is Error {
    // this function handles something called "narrowing".
    // It takes an argument of one of many types and
    // asserts that it is a specific type using
    // the condition (below) and
    // the asssertion "maybeError is SmallError"
    // to the right.
    return (maybeError as Error).message !== undefined;
}
