import {WeaponType} from "common/features/combat/WeaponType";

export class Attack {
    description: string;
    weaponType: WeaponType;
    coolDown: number;
    minAttack: number;
    maxAttack: number;


    constructor(description: string, weaponType: WeaponType, coolDown: number, minAttack: number, maxAttack: number) {
        this.description = description;
        this.weaponType = weaponType;
        this.coolDown = coolDown;
        this.minAttack = minAttack;
        this.maxAttack = maxAttack;
    }
}
