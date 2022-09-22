import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {Player} from "common/Player";
import {FirebaseHelper} from "src/connection/FirebaseHelper";
import {ActionId} from "common/features/actionlist/ActionId";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export class GameServer {
    readonly TICK_DURATION = 1

    private playerManager: PlayerManager;
    private databaseManager: DatabaseManager;

    constructor(playerManager: PlayerManager, databaseManager: DatabaseManager) {
        this.playerManager = playerManager;
        this.databaseManager = databaseManager;
    }

    public start() {
        FirebaseHelper.init();

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

        app.get('/login', (request, response) => {
            this.login(request, response)
        });


        setInterval(() => {
            this.tick();
        }, this.TICK_DURATION * 1000);
    }

    private tick() {
        const start = Date.now();
        process.stdout.write("tick took: ");

        this.playerManager.onlinePlayers.forEach((player: Player) => {
            player.update(this.TICK_DURATION);
            player.sendGameState();
        })
        const end = Date.now();
        console.log((end - start), "ms for", this.playerManager.getPlayerCount(), "players")
        // TODO save sometimes
    }

    public async logOutAllPlayers() {
        console.log("Logging out all players");
        for (const player of this.playerManager.onlinePlayers) {
            player.logOut();
            await this.databaseManager.savePlayer(player);
        }
    }

    private async login(request, response) {
        const jwt = request.query.jwt;
        const userRecord = await FirebaseHelper.getUserRecord(jwt);
        if (!userRecord) {
            response.writeHead(401);
            response.end();
            return;
        }

        const userName = userRecord.displayName;
        const userId = userRecord.uid

        const isAlreadyOnline = await this.playerManager.getPlayer(userId) != null;
        console.log("already onlnie", isAlreadyOnline);
        if (isAlreadyOnline) {
            console.log(`Player ${userName} tried to login twice`)
            response.writeHead(401);
            response.end();
            return;
        }

        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        });
        const player = await this.databaseManager.findOrCreatePlayer(userName, userId);
        player.setResponse(response);
        this.playerManager.addPlayer(player);

        // TODO remove default actions
        player.actionQueue.generators = [];
        player.actionQueue.addActionById(ActionId.GainMoney);
        player.actionQueue.addActionById(ActionId.MiningTutorial);
        player.actionQueue.addActionById(ActionId.GainMoney);
        player.actionQueue.addActionById(ActionId.MiningTutorial);
        const success = player.worldMap.moveToLocation(new RoiLocationIdentifier(WorldLocationId.OtherPlace))
        console.log("Move was success?", success);

        // player.sendDataToClient("Login successful");
        request.on('close', () => {
            console.log(`${player.userName} Connection closed`);
            player.logOut()
            this.databaseManager.savePlayer(player);
            this.playerManager.removePlayer(player);
        });
    }
}
