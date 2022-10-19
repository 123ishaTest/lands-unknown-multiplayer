/**
 * Anything that can engage in combat.
 * Usually the player or enemies
 */
import {CombatStats} from "common/features/combat/CombatStats";
import {Attack} from "common/features/combat/Attack";
import {WeaponType} from "common/features/combat/WeaponType";

export interface FightableEntity extends CombatStats {
    maxHealth: number;
    health: number;
    coolDown: number;
    isAlive: boolean;

    meleeAttack: number;
    meleeDefense: number;

    rangeAttack: number;
    rangeDefense: number;

    mageDefense: number;
    mageAttack: number;

    criticalChance: number;
    dodgeChance: number;

    attack(): Attack;

    takeDamage(damage: number): void;

    idle(delta: number): void;

    getAttackValue(type: WeaponType): number;
    getDefenseValue(type: WeaponType): number;

    die(): void;
}
