import { ICity } from "../../interface/City.interface";
import { SEED_CITIES } from "../cities";

// this was removed because loading all markers for all cities was a huge lag
const allCitiesOption: ICity = {
    cityName: "all",
    country: "Canada",
    centerLat: 45.5019,
    centerLong: -73.5674, // values are taken from montreal.
    scanRadius: 25,
};

export const adminCitiesDropdownOptions: ICity[] = [...SEED_CITIES];
