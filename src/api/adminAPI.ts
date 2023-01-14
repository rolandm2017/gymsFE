import axios from "axios";
import { useEffect, useState } from "react";

import { useServer } from "../context/ServerContext";
import { handleError } from "../util/handleError";

// this.router.get("/batches/all", authorize([Role.Admin]), this.getAllBatchNumbers.bind(this));
//this.router.get("/task-queue/all", authorize([Role.Admin]), this.getAllTasks.bind(this));
//this.router.get("/housing/by-location", authorize([Role.Admin]), this.getApartmentsByLocation.bind(this));
// /task-queue/markers-by-batch-num
//this.router.get("/housing/by-city-id-and-batch-num", authorize([Role.Admin]), this.getApartmentsByCityIdAndBatchNum.bind(this));
//// user stuff:
//this.router.post("/user/ban", authorize([Role.Admin]), this.banUser.bind(this));
//this.router.post("/user/make-admin", this.makeAdmin.bind(this));

export function useGetAllBatchNumsAPI(): { batchNums: number[]; getAllBatchNumsErr: string; loaded: boolean } {
    const [batchNums, setBatchNums] = useState<number[]>([]);
    const [getAllBatchNumsErr, setGetAllBatchNumsErr] = useState<string>("");
    const [loaded, setLoaded] = useState<boolean>(false);

    const server = useServer();

    useEffect(() => {
        (async () => {
            try {
                setGetAllBatchNumsErr("");
                const path = "/admin/batches/all";
                const response = await server.get(path);
                const { batchNums } = response.data;
                setBatchNums(batchNums);
            } catch (err) {
                const msg = handleError(err);
                setGetAllBatchNumsErr(msg);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return { batchNums, getAllBatchNumsErr, loaded };
}
export async function getAllBatchNumsAdmin() {
    const path = "/admin/batches/all";
    const response = await axios.get(baseUrl + path, { headers });
    const { data } = response;
    console.log(data);
    return data.batchNums;
}

export function useGetAllTasksAPI() {
    //
}

export async function getAllTasksAdmin(provider: string, batchNum: number) {
    const path = "/admin/task-queue/all";
    const response = await axios.get(baseUrl + path, { params: { provider, batchNum }, headers });
    const { data } = response;
    console.log(data);
    return data;
}

export function useGetTaskMarkersByBatchNumAPI() {
    //
}

export async function getTaskMarkersByBatchNumAdmin(batchNum: number) {
    const path = "/admin/task-queue/tasks-by-batch-num";
    const response = await axios.get(baseUrl + path, { params: { batchNum }, headers });
    const { data } = response;
    console.log(data);
    return data.tasks;
}

export function useGetApartmentsByLocationAPI() {
    //
}

export async function getApartmentsByLocationAdmin(cityName: string) {
    const path = "/admin/housing/by-location";
    const response = await axios.get(baseUrl + path, { params: { cityName }, headers });
    const { data } = response;
    console.log(data);
    return data.apartments;
}

export function useGetApartmentsByCityIdAndBatchNumAPI() {
    //
}

export async function getApartmentsByCityIdAndBatchNum(cityId: number, batchNum: number) {
    const path = "/admin/housing/by-city-id-and-batch-num";
    const response = await axios.get(baseUrl + path, { params: { cityId, batchNum }, headers });
    const { data } = response;
    console.log(data);
    return data.apartments;
}

// this.router.get("/housing/by-location", authorize([Role.Admin]), this.getApartmentsByLocation.bind(this));
// this.router.get("/housing/by-city-id-and-batch-num", authorize([Role.Admin]), this.getApartmentsByCityIdAndBatchNum.bind(this));

// export async function getAllHousingAdmin() {
//     const path = "/admin/housing/all";
//     const response = await axios.get(baseUrl + path, { headers });
//     const { data } = response;
//     return data.apartments;
// }

export function useGetAllBatchesAPI() {
    //
}

export async function getAllBatchesAdmin() {
    const path = "/admin/task-queue/all";
    const response = await axios.get(baseUrl + path, { headers });
    const { data } = response;
    return data.tasks;
}

export function healthCheckAPI(where: string) {
    //
}

export async function housingHealthCheck() {
    const path = "/task-queue/health-check";
    console.log(baseUrl + path, "22rm");
    const response = await axios.get(baseUrl + path);
    const { data } = response;
    console.log(data);
}
