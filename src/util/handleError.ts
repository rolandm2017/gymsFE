import { AxiosError } from "axios";

export function handleError(error: unknown): string {
    const err = error as AxiosError;
    const data = err.response?.data;
    console.log(hasError(data), "6rm");
    if (err.name === "AxiosError") {
        console.log(err);
        return "";
    }
    if (data && hasError(data)) {
        return data.message;
    }
    console.log(err, "14rm");
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
