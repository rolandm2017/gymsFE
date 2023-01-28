import { adminCitiesDropdownOptions } from "./adminCitiesDropdownOptions";

export function getCorrespondingCityName(activeCityId: number) {
    // index comes from seed cities.
    const indexOfCorrespondingCity = adminCitiesDropdownOptions[activeCityId];
    return indexOfCorrespondingCity.cityName;
}

export function getCorrespondingBatchNum(activeBatchNumIndex: number, availableNums: number[]): number {
    return availableNums[activeBatchNumIndex];
}
