import {IgtWallet} from "./features/wallet/Wallet";

export class Player {
    userId: string;
    userName: string;

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
}
