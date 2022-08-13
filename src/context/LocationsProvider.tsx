import React, { createContext, useEffect, useMemo } from "react";
import { getApartments, getGyms, getQualifiedAps } from "../api/queries/Places";
import { IGym } from "../interface/Gym.interface";
import { IHousing } from "../interface/Housing.interface";

export interface ILocationContext {
    city: string;
    apartments: IHousing[];
    gyms: IGym[];
    qualified: IGym[];
}

export const defaultState = {
    isOpen: false,
};

interface ChildrenProps {
    children: React.ReactNode;
}

export const LocationsProviderContext = createContext<ILocationContext | null>(null);

const LocationsProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [apartments, setApartments] = React.useState<IHousing[]>([]);
    const [gyms, setGyms] = React.useState<IGym[]>([]);
    const [qualified, setQualified] = React.useState<IGym[]>([]);

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
        // getApartments().then(aps => {
        //     setApartments(aps);
        // });
    }, [apartments]);

    useEffect(() => {
        if (gyms.length !== 0) return;
        // getGyms().then(gyms => {
        //     setGyms(gyms);
        // });
    }, [gyms]);

    useEffect(() => {
        if (qualified.length !== 0) return;
        getQualifiedAps().then(gyms => {
            setQualified(gyms);
        });
    });

    const memoedValue = useMemo(
        () => ({
            gyms,
            apartments,
            qualified,
        }),
        [gyms, apartments, qualified],
    );

    return <LocationsProviderContext.Provider value={{ city: "Montreal", ...memoedValue }}>{children}</LocationsProviderContext.Provider>;
};

export default LocationsProvider;
