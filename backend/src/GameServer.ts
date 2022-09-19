import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {Player} from "common/Player";

export class GameServer {
    readonly TICK_DURATION = 1

    private playerManager: PlayerManager;
    private databaseManager: DatabaseManager;

    constructor(playerManager: PlayerManager, databaseManager: DatabaseManager) {
        this.playerManager = playerManager;
        this.databaseManager = databaseManager;
    }

    public start() {
        const express = require('express');
        const app = express();
        const bodyParser = require('body-parser');
        const cors = require('cors');
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));

        const PORT = 3000
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })

        app.get('/login', (request, response, next) => {
            this.login(request, response, next)
        });


        setInterval(() => {
            this.tick();
        }, this.TICK_DURATION * 1000);
    }

    private tick() {
        process.stdout.write(".");
        this.playerManager.onlinePlayers.forEach((player: Player) => {
            // TODO tick features
            this.databaseManager.savePlayer(player);
            player.sendDataToClient("yooo")
        })
    }

    public async logOutAllPlayers() {
        console.log("Logging out all players");
        for (const player of this.playerManager.onlinePlayers) {
            player.logOut();
            await this.databaseManager.savePlayer(player);
        }
    }

    private async login(request, response, next) {
        const headers = {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        };
        response.writeHead(200, headers);

        const player = await this.databaseManager.loadPlayer("test")
        player.setResponse(response);
        this.playerManager.addPlayer(player);

        player.sendDataToClient("Login successful");
        request.on('close', () => {
            console.log(`${player.userName} Connection closed`);
            this.playerManager.removePlayer(player);
        });
    }
}
