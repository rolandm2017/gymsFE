import axios from "axios";

async function getGyms() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/google/saved";
    const city = "Montreal";
    const res = await axios.get(baseUrl + path, { params: { city } });
    const { data } = res;
    return data;
}

export default getGyms;
