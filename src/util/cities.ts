import { ICity } from "../interface/City.interface";

// keeps name "SEED_CITIES" to reflect it being derived from the backend's SEED_CITIES
export const SEED_CITIES: ICity[] = [
    {
        cityName: "Vancouver",
        country: "Canada",
        centerLat: 49.2827,
        centerLong: -123.1207,
        scanRadius: 25,
    },
    {
        cityName: "Calgary",
        country: "Canada",
        centerLat: 51.0447,
        centerLong: -114.0719,
        scanRadius: 25,
    },
    {
        cityName: "Edmonton",
        country: "Canada",
        centerLat: 53.5461,
        centerLong: -113.4937,
        scanRadius: 25,
    },
    {
        cityName: "Winnipeg",
        country: "Canada",
        centerLat: 49.8954,
        centerLong: -97.1385,
        scanRadius: 25,
    },
    {
        cityName: "Toronto",
        country: "Canada",
        centerLat: 43.6532,
        centerLong: -79.3832,
        scanRadius: 25,
    },
    { cityName: "Mississauga", centerLat: 43.589, centerLong: -79.6441, scanRadius: 25, country: "Canada" },
    { cityName: "Brampton", centerLat: 43.7315, centerLong: -79.7624, scanRadius: 25, country: "Canada" },
    { cityName: "Hamilton", centerLat: 43.2557, centerLong: -79.8711, scanRadius: 25, country: "Canada" },
    { cityName: "Ottawa", centerLat: 45.4215, centerLong: 75.6972, scanRadius: 25, country: "Canada" },
    {
        cityName: "Montreal",
        country: "Canada",
        centerLat: 45.5019,
        centerLong: -73.5674,
        scanRadius: 25,
    },
];

// "Montreal", "Ottawa", "Hamilton", "Brampton", "Mississauga", "Toronto", "Winnipeg", "Edmonton", "Calgary", "Vancouver"
//
