export function getEndpoint(path: string, forceDevelopment?: boolean) {
    console.log(process.env.REACT_APP_DEV_OR_PROD, "2rm");
    if (process.env.REACT_APP_DEV_OR_PROD === "development" || forceDevelopment) {
        return "http://localhost:8000" + path;
    }
    if (process.env.REACT_APP_DEV_OR_PROD === "production") {
        return "https://www.apartmentsneargyms.com/api" + path;
    }
    throw Error("invalid environment");
}
