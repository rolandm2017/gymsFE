import { Provider, ProviderOrAll } from "../../enum/provider.enum";

export interface GetTaskMarkersByBatchNum {
    batchNum: number;
    cityName: string;
    provider: ProviderOrAll;
}
