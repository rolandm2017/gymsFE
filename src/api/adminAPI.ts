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
import { ProviderOrAll } from "../enum/provider.enum";

export function useGetAllBatchNumsAPI(): { batchNums: number[]; getAllBatchNumsErr: string; batchNumsIsLoaded: boolean } {
    // good
    const [batchNums, setBatchNums] = useState<number[]>([]);
    const [getAllBatchNumsErr, setGetAllBatchNumsErr] = useState<string>("");
    const [batchNumsIsLoaded, setLoaded] = useState<boolean>(false);

    const { accessToken } = useAuth();

    useEffect(() => {
        if (accessToken) {
            (async () => {
                try {
                    setGetAllBatchNumsErr("");
                    const path = "/admin/batches/all";
                    const fullPath = getEndpoint(path);
                    console.log(fullPath, "30rm");
                    const response = await axios.get(fullPath, { ...makeHeaders(accessToken) });
                    const { batchNums } = response.data;
                    console.log(batchNums, "33rm");
                    setBatchNums(batchNums);
                } catch (err) {
                    const msg = handleError(err);
                    setGetAllBatchNumsErr(msg);
                } finally {
                    setLoaded(true);
                }
            })();
        }
    }, [accessToken]);

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
        if (payload && !loaded && accessToken) {
            (async () => {
                try {
                    setGetAllTasksErr("");
                    const path = "/admin/task-queue/all";
                    const fullPath = getEndpoint(path);
                    console.log(fullPath, "67rm");
                    const response = await axios.get(fullPath, { ...makeHeaders });
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
    }, [payload, loaded, accessToken]);

    return { allTasks, runGetAllTasks, getAllTasksErr, loaded };
}

export function useGetTaskMarkersByBatchNumAndCityIdAPI(): {
    taskMarkersForBatchNumAndCityId: ITask[];
    runGetTaskMarkersByParameters: Function;
    getTaskMarkerByBatchNumErr: string;
    getTaskMarkersIsLoaded: boolean;
    loadedBatchNum: number | undefined;
    loadedCityName: string;
    loadedProvider: ProviderOrAll;
} {
    const [taskMarkersForBatchNumAndCityId, setTaskMarkersForBatchNumAndCityId] = useState<ITask[]>([]);
    const [getTaskMarkerByBatchNumErr, setGetTaskMarkerByBatchNumErr] = useState("");
    const [getTaskMarkersIsLoaded, setLoaded] = useState(false);
    // so the app knows when to reload stuff
    const [loadedBatchNum, setLoadedBatchNum] = useState<number | undefined>(undefined);
    const [loadedCityName, setLoadedCityName] = useState<string>("");
    const [loadedProvider, setLoadedProvider] = useState<ProviderOrAll>(ProviderOrAll.all);
    const [payload, setPayload] = useState<GetTaskMarkersByBatchNum | undefined>(undefined);

    function runGetTaskMarkersByParameters(batchNum: number, cityName: string, provider: ProviderOrAll) {
        setLoaded(false);
        console.log(batchNum, cityName, "101rm");
        setPayload({ batchNum, cityName, provider });
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && !getTaskMarkersIsLoaded && accessToken) {
            (async () => {
                try {
                    setGetTaskMarkerByBatchNumErr("");
                    const path = "/admin/task-queue/tasks-by-batch-num-and-city-name";
                    const fullPath = getEndpoint(path);
                    console.log(fullPath, payload, "112rm");
                    const response = await axios.get(fullPath, { ...makeHeaders(accessToken), params: { ...payload } });
                    const { tasks } = response.data;
                    // console.log(payload, tasks, "116rm");
                    setTaskMarkersForBatchNumAndCityId(tasks);
                } catch (err) {
                    const msg = handleError(err);
                    setGetTaskMarkerByBatchNumErr(msg);
                } finally {
                    // todo: make into useReducer
                    setLoadedBatchNum(payload.batchNum);
                    setLoadedCityName(payload.cityName);
                    setLoadedProvider(payload.provider);
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, getTaskMarkersIsLoaded, accessToken]);

    return {
        taskMarkersForBatchNumAndCityId,
        runGetTaskMarkersByParameters,
        getTaskMarkerByBatchNumErr,
        getTaskMarkersIsLoaded,
        loadedBatchNum,
        loadedCityName,
        loadedProvider,
    };
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
        if (payload && !loaded && accessToken) {
            (async () => {
                try {
                    setGetHousingByLocationErr("");
                    const path = "/housing/by-location";
                    const fullPath = getEndpoint(path);
                    console.log(fullPath, "150rm");
                    const response = await axios.get(fullPath, { ...makeHeaders(accessToken) });
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
    }, [payload, loaded, accessToken]);

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
        if (payload && !loaded && accessToken) {
            (async () => {
                try {
                    setGetHousingByCityIdAndBatchNumErr("");
                    const path = "/admin/housing/by-city-id-and-batch-num";
                    //     const response = await axios.get(baseUrl + path, { params: { cityId, batchNum }, headers });
                    const fullPath = getEndpoint(path);
                    console.log(fullPath, "150rm");

                    const response = await axios.get(fullPath, { ...makeHeaders(accessToken), params: { payload } });
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
    }, [payload, loaded, accessToken]);

    return { housingByCityIdAndBatchNum, runGetHousingByCityIdAndBatchNum, getHousingByCityIdAndBatchNumErr, loaded };
}

export function useDeleteAllTasksAPI() {
    const [run, setRun] = useState(false);

    function runDeleteAllTasks() {
        setRun(true);
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (run && accessToken) {
            (async () => {
                try {
                    const path = "/task-queue/all";
                    const response = await axios.delete(getEndpoint(path), { ...makeHeaders(accessToken) });
                    const { data } = response;
                    console.log(data);
                } catch (err) {
                    const msg = handleError(err);
                    console.log(msg);
                } finally {
                    setRun(false);
                }
            })();
        }
    });

    return { runDeleteAllTasks };
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
