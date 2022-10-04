import type {IgtWallet} from "common/features/wallet/Wallet";
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {ActionList} from "common/features/actionlist/ActionList";
import type {Skills} from "common/features/skills/Skills";
import type {WorldMap} from "common/features/worldmap/WorldMap";
import {ItemList} from "common/features/items/ItemList";
import {Inventory} from "common/features/inventory/Inventory";

export interface IgtFeatures {
    actionList: ActionList;
    actionQueue: ActionQueue;
    itemList: ItemList;
    inventory: Inventory;
    wallet: IgtWallet;
    skills: Skills;
    worldMap: WorldMap
}
