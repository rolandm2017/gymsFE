import { IHousing } from "../interface/Housing.interface";

export function getCurrentPageResults(qualified: IHousing[], page: number): IHousing[] {
    // Function is placed early in the distribution of Qualified Apartments to components so
    // the power required to render the chosen apartments is lower.
    // Page 1 is results 0 to 9, page 2 is results 10 to 19.
    if (qualified.length < 10) {
        return qualified;
    }
    const startOfPage = page * 10 - 10; // "1 * 10 - 10 = 0", "2 * 10 - 10 = 10";
    const endOfPage = page * 10 - 1; // "1 * 10 - 1 = 9", "2 * 10 - 1 = 19";
    return qualified.slice(startOfPage, endOfPage);
}
