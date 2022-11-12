import axios from "axios";

export async function getBatchesAdmin(provider: string, batchNum: number) {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/task_queue/batch";
    const response = await axios.get(baseUrl + path, { params: { provider, batchNum } });
    const { data } = response;
    return data;
}

export async function queryScrapesAdmin(cityId: number) {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/housing/by_location";
    const response = await axios.get(baseUrl + path, { params: { cityId, cityName: "Montreal", state: "Quebec" } });
    const { data } = response;
    return data.apartments;
}

export async function queryAllScrapesAdmin() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/housing/all";
    const response = await axios.get(baseUrl + path);
    const { data } = response;
    return data.apartments;
}

export async function housingHealthCheck() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/task_queue/health_check";
    console.log(baseUrl + path, "22rm");
    const response = await axios.get(baseUrl + path);
    const { data } = response;
    console.log(data);
}
