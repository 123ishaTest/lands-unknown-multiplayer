import {ItemId} from "common/features/items/ItemId";
import {Equipment} from "common/features/equipment/Equipment";
import {EquipmentType} from "common/features/equipment/EquipmentType";

export class BronzePlateBody extends Equipment {

    constructor() {
        super({
                name: "Bronze Platebody",
                description: "A platebody made of bronze",
                id: ItemId.BronzePlateBody,
                image: 'platebody-bronze'
            },
            EquipmentType.Body,
            {
                meleeDefense: 3,
                mageAttack: -4,
                mageDefense: -3,
                rangeAttack: -2,
                rangeDefense: -1,
            });
    }
}
