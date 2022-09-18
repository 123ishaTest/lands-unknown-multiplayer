import {CurrencyType} from "src/features/wallet/CurrencyType";
import {SaveData} from "src/tools/saving/SaveData";

export interface CurrencySaveData extends SaveData {
    type: CurrencyType;
    amount: number;
}
