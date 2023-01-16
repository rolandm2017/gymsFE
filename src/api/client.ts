import axios from "axios";

const baseURL = process.env.REACT_APP_BACKEND_ADDR;

const backend = axios.create({
    baseURL: baseURL,
    withCredentials: true,
});

export default backend;
