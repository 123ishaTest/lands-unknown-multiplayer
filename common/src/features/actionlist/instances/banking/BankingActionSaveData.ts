import {ActionSaveData} from "common/tools/actions/ActionSaveData";
import {ItemId} from "common/features/items/ItemId";

export interface BankingActionSaveData extends ActionSaveData {
    itemId: ItemId;
    amount: number;
}
