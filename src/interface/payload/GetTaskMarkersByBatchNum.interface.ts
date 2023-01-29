import { Provider, ProviderOrAll } from "../../enum/provider.enum";
import { SuccessFilterEnum } from "../../enum/successFilter.enum";

export interface GetTaskMarkersByBatchNum {
    batchNum: number;
    cityName: string;
    provider: ProviderOrAll;
    successFilter: SuccessFilterEnum;
}
