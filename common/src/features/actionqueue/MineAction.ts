import {Action} from "common/tools/actions/Action";
import {ActionId} from "common/features/actionlist/ActionId";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {Skill} from "common/features/skills/Skill";
import {Inventory} from "common/features/inventory/Inventory";
import {ItemId} from "common/features/items/ItemId";

export class MineAction extends Action {
    id: ActionId = ActionId.MineAction;

    _mining!: Skill;
    _inventory!: Inventory;

    icon: string = 'icon';
    value: number;

    constructor(description: string, value: number) {
        super(description, 4);
        this.value = value;
    }

    gainReward(): boolean {
        this._mining.gainExperience(10);
        this._inventory.gainItemById(ItemId.BronzeHelmet)
        return true;
    }

    initialize(features: IgtFeatures): void {
        this._mining = features.skills.mining;
        this._inventory = features.inventory;
    }

}
