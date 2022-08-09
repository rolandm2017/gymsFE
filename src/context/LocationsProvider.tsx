import React, { createContext, useEffect, useMemo } from "react";
import { getApartments, getGyms } from "../api/queries/Places";

export interface ILocationContext {
    city: string;
    apartments: any[];
    gyms: any[];
}

export const defaultState = {
    isOpen: false,
};

interface ChildrenProps {
    children: React.ReactNode;
}

export const LocationsProviderContext = createContext<ILocationContext | null>(null);

const LocationsProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [apartments, setApartments] = React.useState<any>([]);
    const [gyms, setGyms] = React.useState<any>([]);

    // async function useGetAps() {
    //     const data = await getApartments();
    //     setApartments(data);
    // }

    // async function useGetGyms() {
    //     const data = await getGyms();
    //     setGyms(data);
    // }

    useEffect(() => {
        if (apartments.length !== 0) return;
        // useGetAps();
        getApartments().then(aps => {
            setApartments(aps);
        });
    }, [apartments]);

    useEffect(() => {
        if (gyms.length !== 0) return;
        // useGetGyms();
        getGyms().then(gyms => {
            setGyms(gyms);
        });
    }, [gyms]);

    const memoedValue = useMemo(
        () => ({
            gyms,
            apartments,
        }),
        [gyms, apartments],
    );

    return <LocationsProviderContext.Provider value={{ city: "Montreal", ...memoedValue }}>{children}</LocationsProviderContext.Provider>;
};

export default LocationsProvider;
