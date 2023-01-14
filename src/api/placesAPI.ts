import axios from "axios";
import { useEffect, useState } from "react";
import { useServer } from "../context/ServerContext";
import { Provider } from "../enum/provider.enum";
import { IHousing } from "../interface/Housing.interface";
import { GetApartments } from "../interface/payload/GetApartments.interface";
import { GetGyms } from "../interface/payload/GetGyms.interface";
import { GetQualifiedAps } from "../interface/payload/GetQualifiedAps.interface";
import { MapViewportDimensions } from "../interface/payload/MapViewportDimensions.interface";
import { handleError } from "../util/handleError";

const baseUrl = process.env.REACT_APP_BACKEND_ADDR;

export function useGetDemoApartments(): { demoHousing: IHousing[]; err: string; loaded: boolean } {
    const [demoHousing, setDemoHousing] = useState<IHousing[]>([]);
    const [err, setErr] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<MapViewportDimensions | undefined>(undefined);

    function runGetDemoHousing(neLong: number, neLat: number, swLong: number, swLat: number) {
        setPayload({ neLong, neLat, swLong, swLat });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setErr("");
                    const path = "/housing/demo";

                    const res = await axios.get(path, { params: { ...payload } });
                    const { demoContent } = res.data;
                    setDemoHousing(demoContent);
                } catch (err) {
                    const msg = handleError(err);
                    setErr(msg);
                } finally {
                    setPayload(undefined);
                    setLoaded(true);
                }
            })();
        }
    }, [payload, loaded]);

    return { demoHousing, err, loaded };
}

export async function getDemoApartments(neLong: number, neLat: number, swLong: number, swLat: number) {
    const path = "/housing/demo";
    console.log(neLat, neLong, swLat, swLong, "7rm");
    const res = await axios.get(baseUrl + path, { params: { neLong, neLat, swLong, swLat } });
    const { data } = res;
    console.log(data, "9rm");
    return data.demoContent;
}

export function useGetApartments() {
    const [apartments, setApartments] = useState<IHousing[]>([]);
    const [err, setErr] = useState("");

    const [loaded, setLoaded] = useState(false);

    const [payload, setPayload] = useState<GetApartments | undefined>(undefined);

    function runGetApartments(providers: Provider[]) {
        setPayload({ providers });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setErr("");
                    const res = await axios.get(baseUrl + path, { params: { providers } });
                    const { apartments } = res.data;
                    setApartments(apartments);
                } catch (err) {
                    const msg = handleError(err);
                    setErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, loaded]);
}

export async function getApartments() {
    const path = "/housing/hardcode";
    // const city = "Montreal";
    const providers = "rentCanada,rentFaster,rentSeeker";
    const res = await axios.get(baseUrl + path, { params: { providers } });
    const { data } = res;
    return data.apartments;
}

export function useGetGyms() {
    const [err, setErr] = useState("");

    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetGyms | undefined>(undefined);

    const server = useServer();

    function runGetGyms(cityName: string) {
        setPayload({ cityName });
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setErr("");
                    const path = "/google/saved";
                    const res = await axios.get(path, { params: { ...payload } });
                    const { data } = res;
                    return data.rows;
                } catch (err) {
                    const msg = handleError(err);
                    setErr(msg);
                } finally {
                    setPayload(undefined);
                    setLoaded(true);
                }
            })();
        }
    }, [payload, loaded]);
}

export async function getGyms() {
    const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
    const path = "/google/saved";
    const city = "Montreal";
    const res = await axios.get(baseUrl + path, { params: { city } });
    const { data } = res;
    return data.rows;
}

export function useGetQualifiedApsAPI() {
    const [qualfiedAps, setQualifiedAps] = useState<IHousing[]>([]);
    const [err, setErr] = useState("");

    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetQualifiedAps | undefined>(undefined);

    const server = useServer();

    function runGetQualifiedAps(providers: Provider[], maxDistance: number) {
        setPayload({ providers, maxDistance });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setErr("");
                    const path = "/housing/qualified";
                    const res = await server.get(path, { params: { ...payload } });
                    const { apartments } = res.data;
                    setQualifiedAps(apartments);
                } catch (err) {
                    const msg = handleError(err);
                    setErr(msg);
                } finally {
                    setLoaded(true);
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, loaded]);
}

// export async function getQualifiedAps() {
//     const baseUrl = process.env.REACT_APP_BACKEND_ADDR;
//     const path = "/housing/qualified";
//     const providers = "rentCanada,rentFaster,rentSeeker";
//     const maxDistance: number = 1.75;
//     const res = await axios.get(baseUrl + path, { params: { providers, maxDistance } });
//     const { data } = res;
//     return data.apartments;
// }
