import {Player} from "common/Player";

/**
 * Manage the list of online players
 */
export class PlayerManager {
    onlinePlayers: Player[] = [];

    constructor() {
    }

    addPlayer(player: Player) {
        if (this.onlinePlayers.includes(player)) {
            throw Error(`Player ${player.userName} is already online`);
        }
        console.debug(`New player ${player.userName} logged in`);
        this.onlinePlayers.push(player);
    }

    getPlayer(userName: string): Player {
        return this.onlinePlayers.find(player => {
            return player.userName === userName;
        })
    }

    getPlayerCount(): number {
        return this.onlinePlayers.length;
    }

    removePlayer(player: Player) {
        const index = this.onlinePlayers.indexOf(player);
        if (index > -1) {
            this.onlinePlayers.splice(index, 1);
        }
    }
}
