import type {ItemAmount} from "common/features/items/ItemAmount";
import type {Inventory} from "common/features/inventory/Inventory";
import {Action} from "common/tools/actions/Action";
import type {IgtFeatures} from "common/features/IgtFeatures";

export abstract class RecipeAction extends Action {
    icon = "fa-cauldron";

    input: ItemAmount[];
    output: ItemAmount[];

    _inventory!: Inventory;

    protected constructor(description: string, duration: number, input: ItemAmount[], output: ItemAmount[]) {
        super(description, duration);
        this.input = input;
        this.output = output;
    }

    initialize(features: IgtFeatures): void {
        this._inventory = features.inventory;
    };


    canPerform(): boolean {
        if (!this._inventory.hasItemAmounts(this.input)) {
            return false;
        }

        if (!this._inventory.canTakeItemAmounts(this.output)) {
            return false
        }

        return super.canPerform();
    }

    gainReward(): boolean {
        if (!this.canPerform()) {
            return false;
        }

        this.input.forEach(itemAmount => {
            this._inventory.loseItemAmount(itemAmount.id, itemAmount.amount);
        })

        this.output.forEach(itemAmount => {
            this._inventory.gainItemById(itemAmount.id, itemAmount.amount);
        })

        // Check if we can still perform this recipe again
        return this.canPerform()
    }

}
