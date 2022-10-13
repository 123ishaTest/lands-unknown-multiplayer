import type {IgtWallet} from "common/features/wallet/Wallet";
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {ActionList} from "common/features/actionlist/ActionList";
import type {Skills} from "common/features/skills/Skills";
import type {WorldMap} from "common/features/worldmap/WorldMap";
import type {ItemList} from "common/features/items/ItemList";
import type {Inventory} from "common/features/inventory/Inventory";
import type {Bank} from "common/features/bank/Bank";
import type {GeneratorList} from "common/features/actionlist/GeneratorList";
import type {FacilityList} from "common/features/facilities/FacilityList";

export interface IgtFeatures {
    actionList: ActionList;
    generatorList: GeneratorList;
    facilityList: FacilityList;
    actionQueue: ActionQueue;
    itemList: ItemList;
    inventory: Inventory;
    bank: Bank;
    wallet: IgtWallet;
    skills: Skills;
    worldMap: WorldMap
}
