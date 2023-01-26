import { Provider, ProviderOrAll } from "../../enum/provider.enum";

export interface GetTaskMarkersByBatchNum {
    batchNum: number;
    cityId: number;
    provider: ProviderOrAll;
}
