import axios from "axios";
import { useEffect, useState } from "react";

import { handleError } from "../util/handleError";
import { ITask } from "../interface/Task.interface";
import { GetTaskMarkersByBatchNum } from "../interface/payload/GetTaskMarkersByBatchNum.interface";
import { IHousing } from "../interface/Housing.interface";
import { GetHousingByCityName } from "../interface/payload/GetHousingByCityName.interface";
import { GetHousingByCityIdAndBatchNum } from "../interface/payload/GetHousingByCityIdAndBatchNum.interface";
import { GetAllTasks } from "../interface/payload/GetAllTasks.interface";
import { useAuth } from "../context/AuthContext";
import { makeHeaders } from "../util/makeHeaders";
import { getEndpoint } from "../util/getEndpoint";

export function useGetAllBatchNumsAPI(): { batchNums: number[]; getAllBatchNumsErr: string; batchNumsIsLoaded: boolean } {
    // good
    const [batchNums, setBatchNums] = useState<number[]>([]);
    const [getAllBatchNumsErr, setGetAllBatchNumsErr] = useState<string>("");
    const [batchNumsIsLoaded, setLoaded] = useState<boolean>(false);

    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setGetAllBatchNumsErr("");
                const path = "/admin/batches/all";
                const response = await axios.get(path, { ...makeHeaders(accessToken) });
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

    return { batchNums, getAllBatchNumsErr, batchNumsIsLoaded };
}

export function useGetAllTasksAPI(): { allTasks: ITask[]; runGetAllTasks: Function; getAllTasksErr: string; loaded: boolean } {
    //
    const [allTasks, setAllTasks] = useState<ITask[]>([]);
    const [getAllTasksErr, setGetAllTasksErr] = useState("");
    const [loaded, setLoaded] = useState<boolean>(false);
    const [payload, setPayload] = useState<GetAllTasks | undefined>(undefined);

    function runGetAllTasks(provider: string, batchNum: number) {
        setPayload({ provider, batchNum });
        setLoaded(false);
    }
    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setGetAllTasksErr("");
                    const path = "/admin/task-queue/all";
                    const response = await axios.get(path, { ...makeHeaders });
                    const tasks = response.data;
                    setAllTasks(tasks);
                } catch (err) {
                    const msg = handleError(err);
                    setGetAllTasksErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, loaded]);

    return { allTasks, runGetAllTasks, getAllTasksErr, loaded };
}

export function useGetTaskMarkersByBatchNumAPI(): {
    taskMarkersForBatchNum: ITask[];
    runGetTaskMarkersByBatchNum: Function;
    getTaskMarkerByBatchNumErr: string;
    getTaskMarkersIsLoaded: boolean;
    loadedBatchNum: number | undefined;
} {
    const [taskMarkersForBatchNum, setTaskMarkersForBatchNum] = useState<ITask[]>([]);
    const [getTaskMarkerByBatchNumErr, setGetTaskMarkerByBatchNumErr] = useState("");
    const [getTaskMarkersIsLoaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetTaskMarkersByBatchNum | undefined>(undefined);
    const [loadedBatchNum, setLoadedBatchNum] = useState<number | undefined>(undefined);

    function runGetTaskMarkersByBatchNum(batchNum: number) {
        setLoaded(false);
        setPayload({ batchNum });
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && !getTaskMarkersIsLoaded) {
            (async () => {
                try {
                    setGetTaskMarkerByBatchNumErr("");
                    const path = "/admin/task-queue/tasks-by-batch-num";
                    const response = await axios.get(path, { ...makeHeaders(accessToken), params: { ...payload } });
                    const tasks = response.data;
                    setTaskMarkersForBatchNum(tasks);
                } catch (err) {
                    const msg = handleError(err);
                    setGetTaskMarkerByBatchNumErr(msg);
                } finally {
                    setLoadedBatchNum(payload.batchNum);
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, getTaskMarkersIsLoaded]);

    return { taskMarkersForBatchNum, runGetTaskMarkersByBatchNum, getTaskMarkerByBatchNumErr, getTaskMarkersIsLoaded, loadedBatchNum };
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
    const [payload, setPayload] = useState<GetHousingByCityName | undefined>(undefined);

    function runGetHousingByLocation(cityName: string) {
        setPayload({ cityName });
        setLoaded(false);
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setGetHousingByLocationErr("");
                    const path = "/admin/batches/all";
                    const response = await axios.get(getEndpoint(path), { ...makeHeaders(accessToken) });
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
    }, [payload, loaded]);

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

    function runGetHousingByCityIdAndBatchNum(cityId: number, batchNum: number) {
        setPayload({ cityId, batchNum });
        setLoaded(false);
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setGetHousingByCityIdAndBatchNumErr("");
                    const path = "/admin/housing/by-city-id-and-batch-num";
                    //     const response = await axios.get(baseUrl + path, { params: { cityId, batchNum }, headers });
                    const response = await axios.get(getEndpoint(path), { ...makeHeaders(accessToken), params: { payload } });
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
    }, [payload, loaded]);

    return { housingByCityIdAndBatchNum, runGetHousingByCityIdAndBatchNum, getHousingByCityIdAndBatchNumErr, loaded };
}

// this.router.get("/housing/by-location", authorize([Role.Admin]), this.getApartmentsByLocation.bind(this));
// this.router.get("/housing/by-city-id-and-batch-num", authorize([Role.Admin]), this.getApartmentsByCityIdAndBatchNum.bind(this));

export function useHealthCheckAPI(where: string): { healthCheckResponse: string; err: string; loaded: boolean } {
    //
    const [healthCheckResponse, setHealthCheckResponse] = useState("");
    const [err, setErr] = useState("");
    const [loaded, setLoaded] = useState(false);

    const { accessToken } = useAuth();

    useEffect(() => {
        (async () => {
            try {
                setErr("");
                const path = "/task-queue/health-check";
                const response = await axios.get(getEndpoint(path), { ...makeHeaders(accessToken) });
                const { data } = response;
                console.log(data);
            } catch (err) {
                const msg = handleError(err);
                setErr(msg);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    return { healthCheckResponse, loaded, err };
}
