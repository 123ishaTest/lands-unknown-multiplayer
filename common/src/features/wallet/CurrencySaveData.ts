import type {CurrencyType} from "common/features/wallet/CurrencyType";
import type {SaveData} from "common/tools/saving/SaveData";

export interface CurrencySaveData extends SaveData {
    type: CurrencyType;
    amount: number;
}
