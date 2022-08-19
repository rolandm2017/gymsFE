import { MINUTES_PER_HOUR, TYPICAL_WALKED_KM_PER_HOUR } from "./constants";

export function calculateWalkTimeInMinutes(d: number): number {
    // ** d: distance in km. **
    const dAsPercentOfAnHourOfWalking: number = d / TYPICAL_WALKED_KM_PER_HOUR;
    const minutes: number = dAsPercentOfAnHourOfWalking * MINUTES_PER_HOUR;
    return minutes;
}
