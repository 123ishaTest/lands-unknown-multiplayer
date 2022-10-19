import {FightableEntity} from "common/features/combat/FightableEntity";
import {EnemyCategory} from "common/features/combat/EnemyCategory";
import {Attack} from "common/features/combat/Attack";
import {EnemyId} from "common/features/combat/EnemyId";
import {ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {CombatStats} from "common/features/combat/CombatStats";
import {Random} from "common/tools/random/Random";
import {WeaponType} from "common/features/combat/WeaponType";

export abstract class Enemy implements FightableEntity {
    id: EnemyId;
    categories: EnemyCategory[];

    health: number;
    maxHealth: number;

    attacks: Attack[];

    // Stats
    criticalChance: number;
    dodgeChance: number;
    mageAttack: number;
    mageDefense: number;
    meleeAttack: number;
    meleeDefense: number;
    rangeAttack: number;
    rangeDefense: number;

    coolDown: number = 0;
    isAlive: boolean = true;

    private _onDeath = new SimpleEventDispatcher<EnemyId>();


    protected constructor(id: EnemyId, categories: EnemyCategory[], stats: CombatStats, attacks: Attack[]) {
        this.id = id;
        this.categories = categories;

        this.maxHealth = stats.maxHealth;
        this.health = stats.maxHealth;

        this.attacks = attacks;

        this.criticalChance = stats.criticalChance ?? 0;
        this.dodgeChance = stats.dodgeChance ?? 0;
        this.mageAttack = stats.mageAttack ?? 0;
        this.mageDefense = stats.mageDefense ?? 0;
        this.meleeAttack = stats.meleeAttack ?? 0;
        this.meleeDefense = stats.meleeDefense ?? 0;
        this.rangeAttack = stats.rangeAttack ?? 0;
        this.rangeDefense = stats.rangeDefense ?? 0;

    }

    attack(): Attack {
        const attack = Random.fromArray(this.attacks);
        this.coolDown = attack.coolDown;
        return attack;
    }

    idle(delta: number) {
        this.coolDown -= delta;
    }

    takeDamage(damage: number) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }

    getAttackValue(type: WeaponType): number {
        switch (type) {
            case WeaponType.Melee:
                return this.meleeAttack;
            case WeaponType.Range:
                return this.rangeAttack;
            case WeaponType.Magic:
                return this.mageAttack;
        }
    }

    getDefenseValue(type: WeaponType): number {
        switch (type) {
            case WeaponType.Melee:
                return this.meleeDefense;
            case WeaponType.Range:
                return this.rangeDefense;
            case WeaponType.Magic:
                return this.mageDefense;
        }
    }

    die(): void {
        this.isAlive = false;
        this._onDeath.dispatch(this.id);
        console.log("Monster is dead, gain some loot :(");
    }

    public get onDeath(): ISimpleEvent<EnemyId> {
        return this._onDeath.asEvent();
    }
}
