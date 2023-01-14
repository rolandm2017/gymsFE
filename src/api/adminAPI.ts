import axios from "axios";
import { useEffect, useState } from "react";

import { useServer } from "../context/ServerContext";
import { handleError } from "../util/handleError";
import { ITask } from "../interface/Task.interface";
import { GetTaskMarkersByBatchNum } from "../interface/payload/GetTaskMarkersByBatchNum.interface";
import { IHousing } from "../interface/Housing.interface";
import { GetHousingByLocation } from "../interface/payload/GetHousingByLocation.interface";
import { GetHousingByCityIdAndBatchNum } from "../interface/payload/GetHousingByCityIdAndBatchNum.interface";

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

export function useGetAllTasksAPI(): { allTasks: ITask[]; getAllTasksErr: string; loaded: boolean } {
    const [allTasks, setAllTasks] = useState<ITask[]>([]);
    const [getAllTasksErr, setGetAllTasksErr] = useState("");
    const [loaded, setLoaded] = useState<boolean>(false);

    const server = useServer();

    useEffect(() => {
        (async () => {
            try {
                setGetAllTasksErr("");
                const path = "/admin/batches/all";
                const response = await server.get(path);
                const tasks = response.data;
                setAllTasks(tasks);
            } catch (err) {
                const msg = handleError(err);
                setGetAllTasksErr(msg);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return { allTasks, getAllTasksErr, loaded };
}

export function useGetTaskMarkersByBatchNumAPI(): {
    taskMarkersForBatchNum: ITask[];
    runGetTaskMarkersByBatchNum: Function;
    getTaskMarkerByBatchNumErr: string;
    loaded: boolean;
} {
    const [taskMarkersForBatchNum, setTaskMarkersForBatchNum] = useState<ITask[]>([]);
    const [getTaskMarkerByBatchNumErr, setGetTaskMarkerByBatchNumErr] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetTaskMarkersByBatchNum | undefined>(undefined);

    const server = useServer();

    function runGetTaskMarkersByBatchNum(batchNum: number) {
        setPayload({ batchNum });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setGetTaskMarkerByBatchNumErr("");
                    const path = "/admin/batches/all";
                    const response = await server.get(path);
                    const tasks = response.data;
                    setTaskMarkersForBatchNum(tasks);
                } catch (err) {
                    const msg = handleError(err);
                    setGetTaskMarkerByBatchNumErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload]);

    return { taskMarkersForBatchNum, runGetTaskMarkersByBatchNum, getTaskMarkerByBatchNumErr, loaded };
}

export function useGetHousingByLocationAPI(): {
    housingByLocation: IHousing[];
    runGetHousingByLocation: Function;
    getHousingByLocationErr: string;
    loaded: boolean;
} {
    const [housingByLocation, setHousingByLocation] = useState<IHousing[]>([]);
    const [getHousingByLocationErr, setGetHousingByLocationErr] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetHousingByLocation | undefined>(undefined);

    const server = useServer();

    function runGetHousingByLocation(cityName: string) {
        setPayload({ cityName });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setGetHousingByLocationErr("");
                    const path = "/admin/batches/all";
                    const response = await server.get(path);
                    const tasks = response.data;
                    setHousingByLocation(tasks);
                } catch (err) {
                    const msg = handleError(err);
                    setGetHousingByLocationErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload]);

    return { housingByLocation, runGetHousingByLocation, getHousingByLocationErr, loaded };
}

export function useGetHousingByCityIdAndBatchNumAPI(): {
    housingByCityIdAndBatchNum: IHousing[];
    runGetHousingByCityIdAndBatchNum: Function;
    getHousingByCityIdAndBatchNumErr: string;
    loaded: boolean;
} {
    const [housingByCityIdAndBatchNum, setHousingByCityIdAndBatchNum] = useState<IHousing[]>([]);
    const [getHousingByCityIdAndBatchNumErr, setGetHousingByCityIdAndBatchNumErr] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetHousingByCityIdAndBatchNum | undefined>(undefined);

    const server = useServer();

    function runGetHousingByCityIdAndBatchNum(cityId: number, batchNum: number) {
        setPayload({ cityId, batchNum });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setGetHousingByCityIdAndBatchNumErr("");
                    const path = "/admin/housing/by-city-id-and-batch-num";
                    const response = await server.get(path, { params: { payload } });
                    const tasks = response.data;
                    setHousingByCityIdAndBatchNum(tasks);
                } catch (err) {
                    const msg = handleError(err);
                    setGetHousingByCityIdAndBatchNumErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload]);

    return { housingByCityIdAndBatchNum, runGetHousingByCityIdAndBatchNum, getHousingByCityIdAndBatchNumErr, loaded };
}

// export async function getApartmentsByCityIdAndBatchNum(cityId: number, batchNum: number) {
//     const response = await axios.get(baseUrl + path, { params: { cityId, batchNum }, headers });
//     const { data } = response;
//     console.log(data);
//     return data.apartments;
// }

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
