import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_ADDR;
console.log(baseURL, "4rm");

const backend = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default backend;
