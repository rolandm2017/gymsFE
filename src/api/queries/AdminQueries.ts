import axios from "axios";

export async function getBatchesAdmin(provider: string, batchNum: number) {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/admin/task_queue/all";
    const response = await axios.get(baseUrl + path, { params: { provider, batchNum } });
    const { data } = response;
    return data;
}

export async function queryHousingByLocationAdmin(cityId: number) {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/admin/housing/by_location";
    const response = await axios.get(baseUrl + path, { params: { cityId, cityName: "Montreal", state: "Quebec" } });
    const { data } = response;
    return data.apartments;
}

export async function queryAllHousingAdmin() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/admin/housing/all";
    const response = await axios.get(baseUrl + path);
    const { data } = response;
    return data.apartments;
}

export async function getAllBatchesAdmin() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/admin/task_queue/all";
    const response = await axios.get(baseUrl + path);
    const { data } = response;
    return data.tasks;
}

export async function housingHealthCheck() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/task_queue/health_check";
    console.log(baseUrl + path, "22rm");
    const response = await axios.get(baseUrl + path);
    const { data } = response;
    console.log(data);
}
