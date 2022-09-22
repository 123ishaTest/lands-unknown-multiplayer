import type {IgtWallet} from "common/features/wallet/Wallet";
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {ActionList} from "common/features/actionlist/ActionList";
import {Skills} from "common/features/skills/Skills";
import {WorldMap} from "common/features/worldmap/WorldMap";

export interface IgtFeatures {
    actionList: ActionList
    actionQueue: ActionQueue;
    wallet: IgtWallet;
    skills: Skills;
    worldMap: WorldMap
}
