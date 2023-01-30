import { AxiosError } from "axios";

export function handleError(error: unknown): string {
    const err = error as AxiosError;
    const data = err.response?.data;
    if (err.name === "AxiosError") {
        console.log(err);
        if (err?.response?.data) {
            // this works in some cases.
            const withError = err.response.data as { message: string };
            return withError.message;
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
