import {SaveData} from "common/tools/saving/SaveData";
import {CurrencySaveData} from "common/features/wallet/CurrencySaveData";

export interface WalletSaveData extends SaveData {
    currencies: CurrencySaveData[]
}
