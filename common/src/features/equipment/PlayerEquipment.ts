import {IgtFeature} from "common/features/IgtFeature";
import {EquipmentType} from "common/features/equipment/EquipmentType";
import {Equipment} from "common/features/equipment/Equipment";
import {Attack} from "common/features/combat/Attack";
import {Weapon} from "common/features/combat/Weapon";
import {WeaponType} from "common/features/combat/WeaponType";
import {Inventory} from "common/features/inventory/Inventory";
import {IgtFeatures} from "common/features/IgtFeatures";
import {FightableEntity} from "common/features/combat/FightableEntity";
import {PlayerEquipmentSaveData} from "common/features/equipment/PlayerEquipmentSaveData";
import {ItemList} from "common/features/items/ItemList";
import {ItemSaveData} from "common/features/items/ItemSaveData";

export class PlayerEquipment extends IgtFeature implements FightableEntity {
    _inventory!: Inventory;
    _itemList!: ItemList;

    maxHealth: number = 0;
    criticalChance: number = 0;
    dodgeChance: number = 0;
    mageAttack: number = 0;
    mageDefense: number = 0;
    meleeAttack: number = 0;
    meleeDefense: number = 0;
    rangeAttack: number = 0;
    rangeDefense: number = 0;

    health: number = 0;

    coolDown = 0;
    isAlive: boolean;

    equipment: Record<EquipmentType, Equipment | null> = {
        mainHand: null,
        offHand: null,
        body: null,
        cloak: null,
        feet: null,
        head: null,
        legs: null,
        neck: null,
        ring: null
    };


    constructor() {
        super("equipment");
        this.isAlive = true;
        this.recalculatePlayerStats();
    }


    initialize(features: IgtFeatures) {
        super.initialize(features);
        this._inventory = features.inventory;
        this._itemList = features.itemList;
    }

    attack(): Attack {
        const attack = (this.equipment[EquipmentType.MainHand] as Weapon)?.attacks[0] ?? new Attack("Punch", WeaponType.Melee, 1, 1, 3);
        this.coolDown = attack.coolDown;
        return attack;
    }

    idle(delta: number) {
        this.coolDown -= delta;
    }

    takeDamage(damage: number) {
        this.health -= damage;
        console.log(`Player taking damage, new health is ${this.health}`);
        if (this.health <= 0) {
            this.die();
        }
    }

    gainHealth(amount: number) {
        this.health = Math.min(this.maxHealth, this.health + amount);
    }

    die(): void {
        this.isAlive = false;
        console.log("Player is dead, that can't be good");
    }

    respawn(): void {
        console.log("Respawning player");
        this.health = this.maxHealth;
        this.isAlive = true;
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

    getEquippedItemForType(type: EquipmentType): Equipment | null {
        return this.equipment[type];
    }

    unEquip(type: EquipmentType, indexToPlaceInInventory = -1) {
        const equipment = this.equipment[type];
        if (equipment == null) {
            return;
        }
        const id = equipment.id;
        if (id == null) {
            return
        }

        if (!this._inventory.canTakeItem(equipment)) {
            return;
        }

        this.equipment[type] = null;
        this._inventory.gainItem(equipment);
        this.recalculatePlayerStats();
    }

    equip(equipment: Equipment): boolean {
        if (this.equipment[equipment.equipmentType] != null) {
            console.error(`Cannot equip ${equipment.name} as ${equipment.type} is not null`);
            return false;
        }
        this.equipment[equipment.equipmentType] = equipment;
        this.recalculatePlayerStats();
        return true;
    }

    recalculatePlayerStats() {
        this.maxHealth = 0;
        this.criticalChance = 0;
        this.dodgeChance = 0;
        this.mageAttack = 0;
        this.mageDefense = 0;
        this.meleeAttack = 0;
        this.meleeDefense = 0;
        this.rangeAttack = 0;
        this.rangeDefense = 0;

        for (const type in this.equipment) {
            // if (!this.equipment.hasOwnProperty(type)) {
            //     continue;
            // }
            const equipment = this.equipment[type as EquipmentType] as Equipment;
            if (equipment == null) {
                continue;
            }
            this.maxHealth += equipment.maxHealth;
            this.criticalChance += equipment.criticalChance;
            this.dodgeChance += equipment.dodgeChance;
            this.mageAttack += equipment.mageAttack;
            this.mageDefense += equipment.mageDefense;
            this.meleeAttack += equipment.meleeAttack;
            this.meleeDefense += equipment.meleeDefense;
            this.rangeAttack += equipment.rangeAttack;
            this.rangeDefense += equipment.rangeDefense;
        }
    }

    load(data: PlayerEquipmentSaveData): void {
        if (!data?.equipment) {
            return;
        }
        for (const type in this.equipment) {
            const itemData = data.equipment[type];
            if (!itemData) {
                continue;
            }
            this.equipment[type] = this._itemList.getItem(itemData.id, itemData.data);
        }

    }

    save(): PlayerEquipmentSaveData {
        const equipment: Record<EquipmentType, ItemSaveData | null> = {} as Record<EquipmentType, ItemSaveData | null>;

        for (const type in this.equipment) {
            const item = this.equipment[type as EquipmentType] as Equipment;
            if (item == null) {
                continue;
            }
            equipment[type] = item.save();
        }

        return {
            equipment: equipment,
        }
    }

    get equippedWeapon(): Weapon | null {
        return this.equipment[EquipmentType.MainHand] as Weapon;
    }
}
