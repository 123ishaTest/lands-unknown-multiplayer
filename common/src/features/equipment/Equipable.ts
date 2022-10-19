import {EquipmentType} from "common/features/equipment/EquipmentType";
import {CombatStats} from "common/features/combat/CombatStats";

export interface Equipable extends CombatStats {
    equipmentType: EquipmentType;
}

export function isEquipable(object: any): object is Equipable {
    return object.equipmentType != undefined;
}
