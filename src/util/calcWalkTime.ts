import { MINUTES_PER_HOUR, TYPICAL_WALKED_KM_PER_HOUR } from "./constants";

export function calculateWalkTimeInMinutes(km: number): number {
    // return km / 60 *
    // TODO: fill me in
    const kmPerMinute: number = TYPICAL_WALKED_KM_PER_HOUR / MINUTES_PER_HOUR;
    const minutes: number = kmPerMinute / km;
    return minutes;
}
