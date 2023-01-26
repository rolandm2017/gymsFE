import { ICity } from "../../interface/City.interface";
import { adminCitiesDropdownOptions } from "../adminCitiesDropdownOptions";

export function getCorrespondingIndex(loadedCityName: string) {
    // index comes from seed cities.
    const indexOfCorrespondingThing = adminCitiesDropdownOptions.findIndex((el: ICity) => el.cityName === loadedCityName);
    return indexOfCorrespondingThing;
}
