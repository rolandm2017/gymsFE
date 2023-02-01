import { MINUTES_PER_HOUR, TYPICAL_WALKED_KM_PER_HOUR } from "./constants";

export function calculateWalkTimeInMinutes(d: number): number {
    // ** d: distance in km. **
    const dAsPercentOfAnHourOfWalking: number = d / TYPICAL_WALKED_KM_PER_HOUR;
    const minutes: number = dAsPercentOfAnHourOfWalking * MINUTES_PER_HOUR;
    return minutes;
}

export function walkTimeInMinutes(walkTimeFraction: number, viewportWidth: number, threshold: number) {
    // standard threshold is 600, but can be 900 in some situations
    let minOrMinute = viewportWidth < threshold ? "min" : "minute";
    // presumes values < 1 will be converted into seconds.
    const truncated = Math.trunc(walkTimeFraction);
    if (walkTimeFraction > 2) return `${truncated} ${minOrMinute}s`;
    else if (walkTimeFraction >= 1) return `1 ${minOrMinute}`;
    else if (walkTimeFraction <= 1) return `0 ${minOrMinute}`;
    else {
        throw Error("You aren't supposed to be able to get here");
    }
}

export function walkTimeInMinutesWithWalkText(walkTimeFraction: number, viewportWidth: number) {
    let minOrMinute = viewportWidth < 600 ? "min" : "minute";
    // presumes values < 1 will be converted into seconds.
    const truncated = Math.trunc(walkTimeFraction);
    if (walkTimeFraction > 2) return `${truncated} ${minOrMinute} walk`;
    else if (walkTimeFraction >= 1) return `1 ${minOrMinute} walk`;
    else if (walkTimeFraction <= 1) return `0 ${minOrMinute} walk`;
    else {
        throw Error("You aren't supposed to be able to get here");
    }
}

export function walkTimeInSeconds(walkTimeFraction: number) {
    const asSeconds = walkTimeFraction * 60;
    const truncated = Math.trunc(asSeconds);
    return `${truncated} sec`;
}

export function getMetersFromKM(km: number): number {
    const asMeters = km * 1000;
    const justMeters = Math.trunc(asMeters);
    return justMeters;
}
