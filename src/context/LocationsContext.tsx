import React, { createContext, useEffect, useMemo } from "react";
import { useGetQualifiedApsAPI } from "../api/placesAPI";
import { IGym } from "../interface/Gym.interface";
import { IHousing } from "../interface/Housing.interface";

export interface ILocationContext {
    city: string;
    // apartments: IHousing[];
    // gyms: IGym[];
    qualified: IHousing[];
}

export const defaultState = {
    isOpen: false,
};

interface ChildrenProps {
    children: React.ReactNode;
}

export const LocationsProviderContext = createContext<ILocationContext | null>(null);

const LocationsProvider: React.FC<ChildrenProps> = ({ children }) => {
    // const [apartments, setApartments] = React.useState<IHousing[]>([]);
    // const [gyms, setGyms] = React.useState<IGym[]>([]);
    const [qualified, setQualified] = React.useState<IHousing[]>([]);

    const { qualifiedAps, qualifiedApsAreLoaded, runGetQualifiedAps } = useGetQualifiedApsAPI();

    // useEffect(() => {
    //     if (apartments.length !== 0) return;
    // }, [apartments]);

    // useEffect(() => {
    //     if (gyms.length !== 0) return;
    // }, [gyms]);

    useEffect(() => {
        if (qualifiedApsAreLoaded) {
            setQualified(qualifiedAps);
            return;
        }
        if (qualified.length !== 0) return;
        runGetQualifiedAps();
    }, [qualifiedApsAreLoaded]);

    const memoedValue = useMemo(
        () => ({
            // gyms,
            // apartments,
            qualified,
        }),
        [qualified],
    );

    return <LocationsProviderContext.Provider value={{ city: "Montreal", ...memoedValue }}>{children}</LocationsProviderContext.Provider>;
};

export default LocationsProvider;
