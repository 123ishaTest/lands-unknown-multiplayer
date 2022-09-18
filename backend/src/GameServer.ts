export class GameServer {

    constructor() {
    }

    readonly TICK_DURATION = 1

    public start() {
        setInterval(() => {
            this.tick();
        }, this.TICK_DURATION * 1000);
    }

    private tick() {
        // this.playerManager.onlinePlayers.forEach((player: Player) => {
        // TODO tick features
        // this.databaseManager.savePlayer(player);
        // })
    }

    public async logOutAllPlayers() {
        console.log("Logging out all players");
        // for (const player of this.playerManager.onlinePlayers) {
        //     player.logOut();
        //     await this.databaseManager.savePlayer(player);
        // }
    }


}
