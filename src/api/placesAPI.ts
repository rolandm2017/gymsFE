import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Provider } from "../enum/provider.enum";
import { IDemoHousing } from "../interface/DemoHousing.interface";
import { IGym } from "../interface/Gym.interface";
import { IHousing } from "../interface/Housing.interface";
import { GetApartments } from "../interface/payload/GetApartments.interface";
import { GetGyms } from "../interface/payload/GetGyms.interface";
import { GetQualifiedAps } from "../interface/payload/GetQualifiedAps.interface";
import { MapViewportDimensions } from "../interface/payload/MapViewportDimensions.interface";
import { SearchQuery } from "../interface/payload/Search.interface";
import { getEndpoint } from "../util/getEndpoint";
import { handleError } from "../util/handleError";
import { makeHeaders } from "../util/makeHeaders";

export function useReportPublicFavoriteAPI() {
    // todo
}

export function useGetDemoApartmentsAPI(): {
    newDemoHousing: IDemoHousing[];
    moveViewport: Function;
    err: string;
    demoApartmentsAreLoaded: boolean;
    recenteredViewportCounter: number;
} {
    const [newDemoHousing, setNewDemoHousing] = useState<IDemoHousing[]>([]);
    const [err, setErr] = useState("");
    const [demoApartmentsAreLoaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<MapViewportDimensions | undefined>(undefined);
    const [recenteredViewportCounter, setRecenteredViewportCounter] = useState(0);

    function moveViewport(neLong: number, neLat: number, swLong: number, swLat: number) {
        setPayload({ neLong, neLat, swLong, swLat });
        setLoaded(false);
    }

    useEffect(() => {
        if (payload && !demoApartmentsAreLoaded) {
            (async () => {
                try {
                    setErr("");
                    const path = "/housing/demo";
                    const res = await axios.get(getEndpoint(path), { params: { ...payload } });
                    const { demoContent } = res.data;
                    setNewDemoHousing(demoContent);
                } catch (err) {
                    const msg = handleError(err);
                    setErr(msg);
                } finally {
                    setPayload(undefined);
                    setLoaded(true);
                    setRecenteredViewportCounter(old => old + 1);
                }
            })();
        }
    }, [payload, demoApartmentsAreLoaded]);

    return { newDemoHousing, moveViewport, err, demoApartmentsAreLoaded, recenteredViewportCounter };
}

export function useGetApartmentsAPI(): { apartments: IHousing[]; runGetApartments: Function; err: string; loaded: boolean } {
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

                    const res = await axios.get(getEndpoint(path), { params: { ...payload } });
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

export function useGetGymsAPI(): { gyms: IGym[]; runGetGyms: Function; err: string; loaded: boolean } {
    const [gyms, setGyms] = useState<IGym[]>([]);
    const [err, setErr] = useState("");

    const [loaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetGyms | undefined>(undefined);

    function runGetGyms(cityName: string) {
        setPayload({ cityName });
    }

    useEffect(() => {
        if (payload && !loaded) {
            (async () => {
                try {
                    setErr("");
                    const path = "/google/saved";
                    const res = await axios.get(getEndpoint(path), { params: { ...payload } });
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

export function useGetQualifiedApsAPI(): {
    qualifiedAps: IHousing[];
    runGetQualifiedAps: Function;
    err: string;
    qualifiedApsAreLoaded: boolean;
} {
    const [qualifiedAps, setQualifiedAps] = useState<IHousing[]>([]);
    const [err, setErr] = useState("");

    const [qualifiedApsAreLoaded, setLoaded] = useState(false);
    const [payload, setPayload] = useState<GetQualifiedAps | undefined>(undefined);

    function runGetQualifiedAps(providers: Provider[], maxDistance: number) {
        setPayload({ providers, maxDistance });
        setLoaded(false);
    }

    const { accessToken } = useAuth();

    useEffect(() => {
        if (payload && !qualifiedApsAreLoaded && accessToken) {
            (async () => {
                try {
                    setErr("");
                    const path = "/housing/by-location";
                    const res = await axios.get(getEndpoint(path), { ...makeHeaders(accessToken), params: { ...payload } });
                    const { apartments, totalPages } = res.data;
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
    }, [payload, qualifiedApsAreLoaded, accessToken]);

    return { qualifiedAps, runGetQualifiedAps, err, qualifiedApsAreLoaded };
}

export function useSearchAPI() {
    const [searchResults, setSearchResults] = useState<IHousing[]>([]);

    const [totalPagesForThisQuery, setTotalPagesForThisQuery] = useState<number | undefined>(undefined);

    const [err, setErr] = useState("");
    const [payload, setPayload] = useState<SearchQuery | undefined>(undefined);

    const { accessToken } = useAuth();

    function runSearch(cityName: string, minDistance: number, maxDistance: number, pageNum: number) {
        setPayload({ cityName, minDistance, maxDistance, pageNum });
    }

    useEffect(() => {
        if (payload && accessToken) {
            (async () => {
                try {
                    setErr("");
                    const path = "/housing/search";
                    const res = await axios.get(getEndpoint(path), { ...makeHeaders(accessToken), params: { ...payload } });
                    const { results, totalPages } = res.data;
                    setTotalPagesForThisQuery(Math.floor(totalPages));

                    setSearchResults(results);
                } catch (err) {
                    const msg = handleError(err);
                    setErr(msg);
                } finally {
                    setPayload(undefined);
                }
            })();
        }
    }, [payload, accessToken]);

    return { searchResults, totalPagesForThisQuery, runSearch };
}
