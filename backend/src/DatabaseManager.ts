import {Player} from "common/Player";

/**
 * Responsible for saving and loading player data
 */
export class DatabaseManager {

    constructor() {
    }

    public async loadPlayer(userId: string): Promise<Player> {
        // TODO load player
        return this.createPlayer("Isha", userId);
    }

    createPlayer(userName: string, userId: string) {
        // TODO save player
        return new Player(userName, userId);
    }

    savePlayer(player: Player) {
        // TODO save player
    }
}
