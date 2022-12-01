import { Provider } from "../enum/provider.enum";
import { IAssociation } from "./Association.interface";

export interface IHousing {
    buildingType?: "apartment" | "house";
    agreementType?: "rent" | "buy";
    housingId?: number;
    address?: string;
    city?: string;
    state?: string;
    price?: number;
    phone?: string;
    url?: string;
    taskId: number;
    lat: number;
    long: number;
    source: Provider;
    nearbyGyms?: IAssociation[];
    isHighlighted?: boolean;

    // TODO: consider adding "availability"
}
