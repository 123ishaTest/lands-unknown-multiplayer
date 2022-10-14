import type {ItemAmount} from "common/features/items/ItemAmount";
import type {Inventory} from "common/features/inventory/Inventory";
import {Action} from "common/tools/actions/Action";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {Experience} from "common/features/skills/Experience";
import {Skills} from "common/features/skills/Skills";

export abstract class RecipeAction extends Action {
    icon = "fa-cauldron";

    input: ItemAmount[];
    output: ItemAmount[];

    exp: Experience[];

    _inventory!: Inventory;
    _skills!: Skills;

    protected constructor(description: string, duration: number, input: ItemAmount[], output: ItemAmount[], exp: Experience[]) {
        super(description, duration);
        this.input = input;
        this.output = output;
        this.exp = exp;
    }

    initialize(features: IgtFeatures): void {
        this._inventory = features.inventory;
        this._skills = features.skills;
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

        this.exp.forEach(exp => {
            this._skills.gainExperience(exp.skill, exp.exp)
        })

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
