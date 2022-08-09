import React, { createContext, useMemo } from "react";
import getApartments from "../api/queries/Apartments";
import getGyms from "../api/queries/Gyms";

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

    async function requestApartments() {
        const apData = await getApartments();
        setApartments(apData);
    }

    async function requestGyms() {
        const gymData = await getGyms();
        setGyms(gymData);
    }
    // setApartments(apData);
    // setGyms(gymData);
    // const places = useMemo(() => {

    // }, [apartments, gyms]);

    return <LocationsProviderContext.Provider value={{ city: "Montreal", apartments, gyms }}>{children}</LocationsProviderContext.Provider>;
};

export default LocationsProvider;
