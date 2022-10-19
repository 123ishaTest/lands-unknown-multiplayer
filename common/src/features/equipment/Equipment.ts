import {AbstractItem} from "common/features/items/AbstractItem";
import {Equipable} from "common/features/equipment/Equipable";
import {EquipmentType} from "common/features/equipment/EquipmentType";
import {ItemConfig} from "common/features/items/ItemConfig";
import {CombatStats} from "common/features/combat/CombatStats";
import {ItemType} from "common/features/items/ItemType";

export class Equipment extends AbstractItem implements Equipable {
    equipmentType: EquipmentType;

    maxHealth: number;
    criticalChance: number;
    dodgeChance: number;
    mageAttack: number;
    mageDefense: number;
    meleeAttack: number;
    meleeDefense: number;
    rangeAttack: number;
    rangeDefense: number;

    constructor(config: ItemConfig, equipmentType: EquipmentType, stats: CombatStats) {
        config.maxStack = 1;
        config.type = ItemType.Equipment;
        super(config);
        this.equipmentType = equipmentType;

        this.maxHealth = stats.maxHealth;
        this.criticalChance = stats.criticalChance ?? 0;
        this.dodgeChance = stats.dodgeChance ?? 0;
        this.mageAttack = stats.mageAttack ?? 0;
        this.mageDefense = stats.mageDefense ?? 0;
        this.meleeAttack = stats.meleeAttack ?? 0;
        this.meleeDefense = stats.meleeDefense ?? 0;
        this.rangeAttack = stats.rangeAttack ?? 0;
        this.rangeDefense = stats.rangeDefense ?? 0;
    }


}
