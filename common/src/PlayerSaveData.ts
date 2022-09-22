import type {SaveData} from "common/tools/saving/SaveData";
import type {ActionQueueSaveData} from "common/features/actionqueue/ActionQueueSaveData";
import type {WalletSaveData} from "common/features/wallet/WalletSaveData";

export interface PlayerSaveData extends SaveData {
    userName: string,
    actionQueue: ActionQueueSaveData;
    wallet: WalletSaveData;
}
