import {IgtWallet} from "common/features/wallet/Wallet";
import {Response} from "express";

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

    logOut() {
        this.isLoggedIn = false;
        this.lastSeen = new Date();
    }

    sendDataToClient(data: any) {
        this.response.write(`data: ${JSON.stringify(data)}\n\n`)
    }

    setResponse(response: Response) {
        this.response = response;
    }
}
