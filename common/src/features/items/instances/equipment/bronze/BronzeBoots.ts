import {ItemId} from "common/features/items/ItemId";
import {Equipment} from "common/features/equipment/Equipment";
import {EquipmentType} from "common/features/equipment/EquipmentType";

export class BronzeBoots extends Equipment {

    constructor() {
        super({
                name: "Bronze Boots",
                description: "A pair of boots made of bronze",
                id: ItemId.BronzeBoots,
                image: 'boots-bronze'
            },
            EquipmentType.Feet,
            {
                meleeAttack: 1,
                meleeDefense: 1,
                mageAttack: -4,
                mageDefense: -3,
                rangeAttack: -2,
                rangeDefense: -1,
            });
    }
}
