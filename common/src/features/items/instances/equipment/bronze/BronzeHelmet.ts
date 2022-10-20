import {ItemId} from "common/features/items/ItemId";
import {Equipment} from "common/features/equipment/Equipment";
import {EquipmentType} from "common/features/equipment/EquipmentType";

export class BronzeHelmet extends Equipment {

    constructor() {
        super({
                name: "Bronze Helmet",
                description: "A helmet made of bronze",
                id: ItemId.BronzeHelmet,
                image: 'helmet-med-bronze'
            },
            EquipmentType.Head,
            {
                meleeDefense: 3,
                mageAttack: -4,
                mageDefense: -3,
                rangeAttack: -2,
                rangeDefense: -1,
            });
    }
}
