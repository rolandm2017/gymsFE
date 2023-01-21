export function makeHeaders(accessToken: string) {
    return { headers: { Authorization: "Bearer " + accessToken } };
}
