import { Provider } from "../../enum/provider.enum";

export interface GetQualifiedAps {
    providers: Provider[];
    maxDistance: number;
}
