import {SaveData} from "src/tools/saving/SaveData";
import {CurrencySaveData} from "src/features/wallet/CurrencySaveData";

export interface WalletSaveData extends SaveData {
    currencies: CurrencySaveData[]
}
