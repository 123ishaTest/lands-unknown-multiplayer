import {SaveData} from "common/tools/saving/SaveData";
import {ActionQueueSaveData} from "common/features/actionqueue/ActionQueueSaveData";
import {WalletSaveData} from "common/features/wallet/WalletSaveData";

export interface PlayerSaveData extends SaveData {
    userName: string,
    actionQueue: ActionQueueSaveData;
    wallet: WalletSaveData;
}
