import { Provider } from "../enum/provider.enum";
import { IAssociation } from "./Association.interface";

export interface IHousing {
    // it is known that the apartment is qualified at this point.
    buildingType?: "apartment" | "house";
    agreementType?: "rent" | "buy";
    housingId: number;
    address?: string;
    city?: string;
    state?: string;
    price?: number;
    phone?: string;
    taskId: number;
    batchId: number;
    lat: number;
    long: number;
    source: Provider;
    nearbyGyms: IAssociation[];
    isHighlighted?: boolean;
    isFavorite?: boolean;
    distanceToNearestGym: number;

    // TODO: consider adding "availability"
}

export interface IHousingWithUrl extends IHousing {
    url: string;
}
