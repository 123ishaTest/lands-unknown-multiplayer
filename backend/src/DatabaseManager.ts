import {Player} from "common/Player";
import {DatabaseClient} from "src/connection/DatabaseClient";
import {UserRecord} from "src/connection/UserRecord";

/**
 * Responsible for saving and loading player data
 */
export class DatabaseManager {
    client: DatabaseClient;

    constructor(client: DatabaseClient) {
        this.client = client;
    }

    public init() {
        this.client.init();
    }

    public async loadPlayer(userId: string): Promise<Player> {
        const data = await this.client.loadPlayerData(userId);
        if (!data) {
            return null;
        }
        const player = new Player(userId, 'placeholder');

        player.initialize();
        player.load(data);

        return player;
    }

    createPlayer(userName: string, userId: string): Player {
        const player = new Player(userId, userName);
        player.initialize();
        return player;
    }

    savePlayer(player: Player): void {
        console.log(`saving player ${player.userName}`);
        this.client.storePlayer(player);
    }

    async findOrCreatePlayer(userName: string, userId: string): Promise<Player> {
        const player = await this.loadPlayer(userId);
        return player ?? this.createPlayer(userName, userId);
    }

    async getUserRecord(token: string): Promise<UserRecord> {
        return this.client.getUserRecord(token);
    }
}
