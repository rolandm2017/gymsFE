import axios from "axios";

export async function getApartments() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/housing/hardcode";
    // const city = "Montreal";
    const providers = "rentCanada,rentFaster,rentSeeker";
    const res = await axios.get(baseUrl + path, { params: { providers } });
    const { data } = res;
    return data.apartments;
}

export async function getGyms() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/google/saved";
    const city = "Montreal";
    const res = await axios.get(baseUrl + path, { params: { city } });
    const { data } = res;
    return data.rows;
}
