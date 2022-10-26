import {IgtWallet} from "common/features/wallet/Wallet";
import type {Response} from "express";
import type {UpdateGameState} from "common/connection/UpdateGameState";
import type {SyncEvent} from "common/connection/SyncEvent";
import {SyncType} from "common/connection/SyncType";
import {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {IgtFeature} from "common/features/IgtFeature";
import type {Saveable} from "common/tools/saving/Saveable";
import type {PlayerSaveData} from "common/PlayerSaveData";
import type {IgtFeatures} from "common/features/IgtFeatures";
import {ActionList} from "common/features/actionlist/ActionList";
import type {SaveData} from "common/tools/saving/SaveData";
import {Skills} from "common/features/skills/Skills";
import type {WorldMap} from "common/features/worldmap/WorldMap";
import type {SessionTokenSync} from "common/connection/SessionTokenSync";
import {WorldBuilder} from "common/features/worldmap/WorldBuilder";
import {WorldMapRepository} from "common/tiled/WorldMapRepository";
import {WorldMapId} from "common/tiled/WorldMapId";
import type {PlayerPosition, PlayerPositionsSync} from "common/connection/PlayerPositionsSync";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import {ItemList} from "common/features/items/ItemList";
import {Inventory} from "common/features/inventory/Inventory";
import {Bank} from "common/features/bank/Bank";
import {GeneratorList} from "common/features/actionlist/GeneratorList";
import {FacilityList} from "common/features/facilities/FacilityList";
import {PlayerEquipment} from "common/features/equipment/PlayerEquipment";
import {Dialog} from "common/tools/dialog/Dialog";
import {NpcList} from "common/features/npcs/NpcList";
import {DialogTree} from "common/tools/dialog/DialogTree";

export class Player implements Saveable {
    userId: string;
    userName: string;
    sessionToken!: string;

    private response?: Response;
    lastSeen: Date = new Date();
    isLoggedIn: boolean = false;

    // Features
    wallet: IgtWallet = new IgtWallet();
    actionQueue: ActionQueue = new ActionQueue();
    actionList: ActionList = new ActionList();
    generatorList: GeneratorList = new GeneratorList();
    facilityList: FacilityList = new FacilityList();
    itemList: ItemList = new ItemList();
    npcList: NpcList = new NpcList();
    inventory: Inventory = new Inventory();
    equipment: PlayerEquipment = new PlayerEquipment();
    bank: Bank = new Bank();
    skills: Skills = new Skills();

    // TODO get worldmap from builder
    worldMap: WorldMap = WorldBuilder.createWorld(WorldMapRepository.getWorldMap(WorldMapId.Tutorial));

    dialog: Dialog<any>;

    features: IgtFeatures;

    constructor(userId: string, userName: string) {
        this.userId = userId;
        this.userName = userName;
        this.saveKey = this.userId;
        this.features = {
            actionList: this.actionList,
            generatorList: this.generatorList,
            facilityList: this.facilityList,
            actionQueue: this.actionQueue,
            itemList: this.itemList,
            npcList: this.npcList,
            inventory: this.inventory,
            equipment: this.equipment,
            bank: this.bank,
            wallet: this.wallet,
            skills: this.skills,
            worldMap: this.worldMap,
        }
    }

    private get featureList(): IgtFeature[] {
        return Object.values(this.features);
    }

    public initialize() {
        this.featureList.forEach(feature => {
            feature.initialize(this.features);
        })
    }

    public update(delta: number) {
        this.featureList.forEach(feature => {
            feature.update(delta);
        })
    }

    logIn() {
        this.isLoggedIn = true;
        this.lastSeen = new Date();
    }

    logOut() {
        this.isLoggedIn = false;
        this.lastSeen = new Date();
        this.response = undefined;
        this.sessionToken = "";
    }

    sendDataToClient(data: SyncEvent) {
        this.response?.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    sendGameState() {
        // TODO send diffs only
        const sync: UpdateGameState = {
            type: SyncType.GameState,
            data: this.save(),
        }
        this.sendDataToClient(sync);
    }

    sendSessionToken() {
        const sync: SessionTokenSync = {
            type: SyncType.SessionToken,
            data: this.sessionToken
        }
        this.sendDataToClient(sync);
    }

    sendPlayerPositions(positions: PlayerPosition[]) {
        const sync: PlayerPositionsSync = {
            type: SyncType.PlayerPositions,
            data: positions
        }
        this.sendDataToClient(sync);
    }

    setResponse(response: Response) {
        this.response = response;
    }

    saveKey: string;

    /**
     * Recursively save all registered features
     */
    public save(): PlayerSaveData {
        const res: Record<string, unknown> = {
            userName: this.userName
        };
        for (const feature of this.featureList) {
            res[feature.saveKey] = feature.save()
        }
        // TODO check if this is creating the interface correctly
        return res as unknown as PlayerSaveData;
    }

    /**
     * Recursively load all registered features
     */
    public load(data: PlayerSaveData): void {
        if (data == null) {
            return;
        }
        if (data.userName != null && data.userName != "") {
            this.userName = data.userName;
        }
        for (const feature of this.featureList) {
            // @ts-ignore
            const featureSaveData: SaveData = data[feature.saveKey] as SaveData
            if (featureSaveData == null) {
                continue;
            }
            feature.load(featureSaveData);
        }
    }

    getCurrentPosition(): WorldPosition | undefined {
        return this.actionQueue.getTravelingPosition() ?? this.worldMap.getCurrentLocation()?.worldPosition;
    }

    canStartDialog(): boolean {
        return this.actionQueue.isIdle();
    }

    startDialog<T>(tree: DialogTree<T>) {
        this.dialog = new Dialog()
        this.dialog.start(tree);
    }

    isInDialog(): boolean {
        return this.dialog !== null;
    }

    exitDialog(): void {
        this.dialog = null;
    }
}
