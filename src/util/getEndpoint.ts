export function getEndpoint(path: string, forceDevelopment?: boolean) {
    if (process.env.DEV_OR_PROD === "development" || forceDevelopment) {
        return "http://localhost:8000" + path;
    }
    if (process.env.DEV_OR_PROD === "production") {
        return "https://www.apartmentsneargyms.com/api" + path;
    }
    throw Error("invalid environment");
}
