import {Player} from "common/Player";

/**
 * Manage the list of online players
 */
export class PlayerManager {
    onlinePlayers: Player[] = [];

    constructor() {
    }

    addPlayer(player: Player) {
        const onlinePlayer = this.getPlayer(player.userId);
        if (onlinePlayer) {
            console.log(`Player ${player.userName} is already online`);
            return;
        }
        console.debug(`Player ${player.userName} logged in`);
        player.logIn()
        this.onlinePlayers.push(player);
    }

    getPlayer(userId: string): Player {
        return this.onlinePlayers.find(player => {
            return player.userId === userId;
        })
    }

    getPlayerCount(): number {
        return this.onlinePlayers.length;
    }

    removePlayer(player: Player) {
        const index = this.onlinePlayers.indexOf(player);
        if (index > -1) {
            player.logOut();
            this.onlinePlayers.splice(index, 1);
        }
    }

    getBySessionToken(token: string): Player {
        return this.onlinePlayers.find(player => {
            return player.sessionToken === token;
        })
    }
}
