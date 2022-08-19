export function truncateDecimals(original: number, places: number): number {
    // 10 ** 2 = 100, 10 ** 3 = 1000, so ...
    const k = 10 ** places;
    // ... original has the values moved left numberOfDecimals places,
    // and then moved right the same number after rounding.
    return Math.round(original * k) / k;
}
