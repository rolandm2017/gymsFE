import axios from "axios";

async function getApartments() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/housing/hardcode";
    // const city = "Montreal";
    const providers = "rentCanada,rentFaster,rentSeeker";
    const res = await axios.get(baseUrl + path, { params: { providers } });
    console.log(res, "8rm");
    const { data } = res;
    return data;
}

export default getApartments;
