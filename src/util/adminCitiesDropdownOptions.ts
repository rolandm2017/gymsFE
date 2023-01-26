import { ICity } from "../interface/City.interface";
import { SEED_CITIES } from "./cities";

const allCitiesOption: ICity = {
    cityName: "all",
    country: "Canada",
    centerLat: 45.5019,
    centerLong: -73.5674, // values are taken from montreal.
    scanRadius: 25,
};

export const adminCitiesDropdownOptions: ICity[] = [allCitiesOption, ...SEED_CITIES];
