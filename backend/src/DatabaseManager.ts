import {Player} from "common/Player";
import {FirebaseHelper} from "src/connection/FirebaseHelper";

/**
 * Responsible for saving and loading player data
 */
export class DatabaseManager {

    constructor() {
    }

    public async loadPlayer(userId: string): Promise<Player> {
        const player = new Player(userId, 'placeholder');
        const data = await FirebaseHelper.loadPlayerData(userId);
        player.initialize();
        player.load(data);

        return player;
    }

    createPlayer(userName: string, userId: string): Player {
        const player = new Player(userId, userName);
        player.initialize();
        this.savePlayer(player);
        return player;
    }

    savePlayer(player: Player): void {
        console.log(`saving player ${player.userName}`);
        FirebaseHelper.storePlayer(player);
    }

    async findOrCreatePlayer(userName: string, userId: string): Promise<Player> {
        const player = await this.loadPlayer(userId);
        return player ?? this.createPlayer(userName, userId);
    }
}
