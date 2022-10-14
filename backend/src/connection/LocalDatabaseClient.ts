import {DatabaseClient} from "src/connection/DatabaseClient";
import {PlayerSaveData} from "common/PlayerSaveData";
import {Player} from "common/Player";
import {UserRecord} from "src/connection/UserRecord";
import {verbose, Database} from "sqlite3";

const sqlite3 = verbose();

/**
 * A local database client which fakes users
 */
export class LocalDatabaseClient implements DatabaseClient {

    db: Database;
    readonly USER_RECORDS: UserRecord[] = [
        {userName: "Isha", userId: "1"},
        {userName: "Another one", userId: "2"},
    ]

    constructor() {
    }

    init(): void {
        this.db = new sqlite3.Database('saves.db');
        this.db.run("CREATE TABLE if not exists saves (userId TEXT, save TEXT, PRIMARY KEY(userId))");
    }

    async loadPlayerData(id: string): Promise<PlayerSaveData | null> {
        const saveData: string = await new Promise((resolve, reject) => {
            this.db.get("SELECT save FROM saves WHERE userId = $id", {$id: id},
                (err, row) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(row?.save)
                },
            );
        });
        if (!saveData) {
            return null;
        }
        return JSON.parse(saveData) as PlayerSaveData;
    }

    storePlayer(player: Player): void {
        this.db.run("INSERT OR REPLACE INTO saves (userId, save) VALUES ($id, $save)", {
            $id: player.userId,
            $save: JSON.stringify(player.save()),
        });
    }

    async getUserRecord(token: string): Promise<UserRecord> {
        return this.USER_RECORDS[0];
    }

}
