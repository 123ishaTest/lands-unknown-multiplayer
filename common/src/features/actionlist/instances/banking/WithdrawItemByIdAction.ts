import {Action} from "common/tools/actions/Action";
import {ActionId} from "common/features/actionlist/ActionId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {Bank} from "common/features/bank/Bank";
import {ItemId} from "common/features/items/ItemId";
import {BankingActionSaveData} from "common/features/actionlist/instances/banking/BankingActionSaveData";

export class WithdrawItemByIdAction extends Action {
    icon: string;
    id = ActionId.WithdrawItemByIdAction;

    _bank: Bank;

    itemId: ItemId;
    amount: number;

    constructor(itemId: ItemId, amount: number) {
        super(`Withdraw ${amount} ${itemId}`, 5);
        this.itemId = itemId;
        this.amount = amount;
    }

    gainReward(): boolean {
        this._bank.withdrawItemById(this.itemId, this.amount);
        return false;
    }

    initialize(features: IgtFeatures): void {
        this._bank = features.bank;
    }


    load(data: BankingActionSaveData) {
        super.load(data);
        this.itemId = data.itemId
        this.amount = data.amount
    }

    save(): BankingActionSaveData {
        return {
            itemId: this.itemId,
            amount: this.amount,
            ...super.save()
        }
    }
}
