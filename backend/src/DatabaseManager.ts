import {Player} from "common/Player";

/**
 * Responsible for saving and loading player data
 */
export class DatabaseManager {

    constructor() {
    }

    public async loadPlayer(userId: string): Promise<Player> {
        return null;
    }

    createPlayer(userName: string, userId: string) {
        // TODO save player
        return new Player(userId, userName);
    }

    savePlayer(player: Player) {
        const saveData = player.save();
        console.log(saveData);
        // TODO save player
    }

    async findOrCreatePlayer(userName: string, userId: string): Promise<Player> {
        const player = await this.loadPlayer(userId);
        return player ?? this.createPlayer(userName, userId);
    }
}
