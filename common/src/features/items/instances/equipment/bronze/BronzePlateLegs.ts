import {ItemId} from "common/features/items/ItemId";
import {Equipment} from "common/features/equipment/Equipment";
import {EquipmentType} from "common/features/equipment/EquipmentType";

export class BronzePlateLegs extends Equipment {

    constructor() {
        super({
                name: "Bronze PlateLegs",
                description: "A pair of platelegs made of bronze",
                id: ItemId.BronzePlateLegs,
                image: 'platelegs-bronze'
            },
            EquipmentType.Legs,
            {
                meleeDefense: 3,
                mageAttack: -4,
                mageDefense: -3,
                rangeAttack: -2,
                rangeDefense: -1,
            });
    }
}
