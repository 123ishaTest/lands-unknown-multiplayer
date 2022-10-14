import {PlayerSaveData} from "common/PlayerSaveData";
import {Player} from "common/Player";
import {UserRecord} from "src/connection/UserRecord";

export interface DatabaseClient {
    init(): void;
    loadPlayerData(id: string):  Promise<PlayerSaveData | null>;
    storePlayer(player: Player): void;

    getUserRecord(token: string): Promise<UserRecord>;
}
