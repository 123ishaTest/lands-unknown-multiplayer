import {IgtWallet} from "./features/wallet/Wallet";

export class Player {
    userId: string;

    userName: string;
    lastSeen: Date = new Date();

    isLoggedIn: boolean = false;

    wallet: IgtWallet;
}
