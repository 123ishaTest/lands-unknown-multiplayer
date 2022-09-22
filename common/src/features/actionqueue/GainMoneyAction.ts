import {Action} from "common/tools/actions/Action";
import type {IgtWallet} from "common/features/wallet/Wallet";
import {Currency} from "common/features/wallet/Currency";
import {CurrencyType} from "common/features/wallet/CurrencyType";
import {ActionId} from "common/features/actionlist/ActionId";
import type {IgtFeatures} from "common/features/IgtFeatures";

export class GainMoneyAction extends Action {
    id: ActionId = ActionId.GainMoney;

    _wallet!: IgtWallet;

    icon: string = 'icon';
    value: number;

    constructor(description: string, value: number) {
        super(description, 4);
        this.value = value;
    }

    gainReward(): boolean {
        this._wallet.gainCurrency(new Currency(this.value, CurrencyType.money));
        return true;
    }

    initialize(features: IgtFeatures): void {
        this._wallet = features.wallet;
    }

}
