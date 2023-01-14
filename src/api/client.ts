import axios from "axios";

const baseURL = process.env.BASE_URL;

const backend = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default backend;
