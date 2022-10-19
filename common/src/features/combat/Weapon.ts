import {Attack} from "common/features/combat/Attack";
import {CombatStats} from "common/features/combat/CombatStats";
import {EquipmentType} from "common/features/equipment/EquipmentType";
import {Equipment} from "common/features/equipment/Equipment";
import {ItemConfig} from "common/features/items/ItemConfig";

export class Weapon extends Equipment {
    attacks: Attack[];

    constructor(config: ItemConfig, stats: CombatStats, attacks: Attack[]) {
        super(config, EquipmentType.MainHand, stats);
        this.attacks = attacks;
    }
}
