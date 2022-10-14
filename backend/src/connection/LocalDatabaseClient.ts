import {DatabaseClient} from "src/connection/DatabaseClient";
import {PlayerSaveData} from "common/PlayerSaveData";
import {Player} from "common/Player";
import {UserRecord} from "src/connection/UserRecord";

/**
 * A local database client which fakes users
 */
export class LocalDatabaseClient implements DatabaseClient {

    private _index = 0;
    readonly USER_RECORDS: UserRecord[] = [
        {userName: "Isha", userId: "1"},
        {userName: "Another one", userId: "2"},
    ]

    constructor() {
    }

    init(): void {
    }

    loadPlayerData(id: string): Promise<PlayerSaveData | null> {
        // TODO load the player
        return Promise.resolve(undefined);
    }

    storePlayer(player: Player): void {
        // TODO store the player
    }

    async getUserRecord(token: string): Promise<UserRecord> {
        return this.USER_RECORDS[0];
    }

}
