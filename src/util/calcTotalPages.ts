import { IHousing } from "../interface/Housing.interface";

export function calcTotalPages(units: IHousing[]): number {
    if (units.length < 10) return 1;
    const totalLength = units.length;
    const remainder = units.length % 10;
    const tensColumnOnly = totalLength - remainder;
    const pages = tensColumnOnly / 10;

    return pages;
}
