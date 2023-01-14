import axios from "axios";
import { useEffect, useState } from "react";
import { useServer } from "../context/ServerContext";
import { Provider } from "../enum/provider.enum";
import { IGym } from "../interface/Gym.interface";
import { IHousing } from "../interface/Housing.interface";
import { GetApartments } from "../interface/payload/GetApartments.interface";
import { GetGyms } from "../interface/payload/GetGyms.interface";
import { GetQualifiedAps } from "../interface/payload/GetQualifiedAps.interface";
import { MapViewportDimensions } from "../interface/payload/MapViewportDimensions.interface";
import { handleError } from "../util/handleError";

const baseUrl = process.env.REACT_APP_BACKEND_ADDR;

export function useGetDemoApartments(): { demoHousing: IHousing[]; runGetDemoHousing: Function; err: string; loaded: boolean } {
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

    return { demoHousing, runGetDemoHousing, err, loaded };
}

export function useGetApartments(): { apartments: IHousing[]; runGetApartments: Function; err: string; loaded: boolean } {
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
                    const path = "/housing/hardcode";

                    const res = await axios.get(path, { params: { ...payload } });
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

    return { apartments, runGetApartments, err, loaded };
}

export function useGetGyms(): { gyms: IGym[]; runGetGyms: Function; err: string; loaded: boolean } {
    const [gyms, setGyms] = useState<IGym[]>([]);
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
                    const { rows } = res.data;
                    setGyms(rows);
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

    return { gyms, runGetGyms, err, loaded };
}

export function useGetQualifiedApsAPI(): { qualfiedAps: IHousing[]; runGetQualifiedAps: Function; err: string; loaded: boolean } {
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

    return { qualfiedAps, runGetQualifiedAps, err, loaded };
}
