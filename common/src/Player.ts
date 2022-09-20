import {IgtWallet} from "common/features/wallet/Wallet";
import type {Response} from "express";
import type {UpdateGameState} from "common/connection/UpdateGameState";
import type {SyncEvent} from "common/connection/SyncEvent";
import {SyncType} from "common/connection/SyncType";
import {ActionQueue} from "common/features/actionqueue/ActionQueue";
import {IgtFeature} from "common/features/IgtFeature";
import {Saveable} from "common/tools/saving/Saveable";
import {PlayerSaveData} from "common/PlayerSaveData";

export class Player implements Saveable {
    userId: string;
    userName: string;

    private response?: Response;
    lastSeen: Date = new Date();
    isLoggedIn: boolean = false;

    // Features
    wallet: IgtWallet = new IgtWallet();
    actionQueue: ActionQueue = new ActionQueue();

    private get featureList(): IgtFeature[] {
        return [
            this.actionQueue,
            this.wallet
        ]
    }

    public update(delta: number) {
        this.featureList.forEach(feature => {
            feature.update(delta);
        })
    }

    constructor(userId: string, userName: string) {
        this.userId = userId;
        this.userName = userName;
        this.saveKey = this.userId;
    }

    logIn() {
        this.isLoggedIn = true;
        this.lastSeen = new Date();
    }

    logOut() {
        this.isLoggedIn = false;
        this.lastSeen = new Date();
        this.response = undefined;
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

    setResponse(response: Response) {
        this.response = response;
    }

    saveKey: string;

    /**
     * Recursively save all registered features
     */
    public save(): PlayerSaveData {
        const res = {};
        for (const feature of this.featureList) {
            res[feature.saveKey] = feature.save()
        }
        // TODO check if this is creating the interface correctly
        return res as PlayerSaveData;
    }

    /**
     * Recursively load all registered features
     */
    public load(data: PlayerSaveData): void {
        if (data == null) {
            return;
        }
        for (const feature of this.featureList) {
            const featureSaveData: Record<string, unknown> = data[feature.saveKey] as Record<string, unknown>;
            if (featureSaveData == null) {
                continue;
            }
            feature.load(featureSaveData);
        }
    }
}
