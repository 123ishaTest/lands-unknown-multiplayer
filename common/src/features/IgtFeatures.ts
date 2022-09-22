import type {IgtWallet} from "common/features/wallet/Wallet";
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {ActionList} from "common/features/actionlist/ActionList";

export interface IgtFeatures {
    actionList: ActionList
    actionQueue: ActionQueue;
    wallet: IgtWallet;
}
