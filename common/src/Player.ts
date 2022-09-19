import {IgtWallet} from "common/features/wallet/Wallet";
import {Response} from "express";
import {UpdateGameState} from "common/connection/UpdateGameState";
import {SyncEvent} from "common/connection/SyncEvent";
import {SyncType} from "common/connection/SyncType";

export class Player {
    userId: string;
    userName: string;

    private response: Response;
    lastSeen: Date = new Date();
    isLoggedIn: boolean = false;

    wallet: IgtWallet = new IgtWallet();


    constructor(userId: string, userName: string) {
        this.userId = userId;
        this.userName = userName;
    }

    logIn() {
        this.isLoggedIn = true;
        this.lastSeen = new Date();
    }

    logOut() {
        this.isLoggedIn = false;
        this.lastSeen = new Date();
        this.response = null;
    }

    sendDataToClient(data: SyncEvent) {
        this.response.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    sendGameState() {
        const sync: UpdateGameState = {
            type: SyncType.GameState,
            data: this.save(),
        }
        this.sendDataToClient(sync);
    }

    setResponse(response: Response) {
        this.response = response;
    }

    save() {
        // TODO register all features, combine with tick()
        return {
            "wallet": this.wallet.save()
        };
    }
}
