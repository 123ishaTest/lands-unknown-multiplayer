import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {Player} from "common/Player";
import {FirebaseHelper} from "src/connection/FirebaseHelper";
import {TravelRequest} from "common/api/TravelRequest";
import {ServerRequest} from "common/connection/ServerRequest";

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
        const cors = require('cors');
        app.use(cors());
        app.use(express.json())

        const PORT = 3000
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })

        app.get('/login', (request, response) => {
            this.login(request, response)
        });

        // TODO get all requests cleanly
        const requests: ServerRequest[] = [
            new TravelRequest(),
        ]

        // Register all requests
        for (const request of requests) {
            app.post(request.route, async (req, res) => {
                try {
                    // TODO authenticate
                    const player: Player = this.playerManager.onlinePlayers[0]

                    const data = req.body;
                    console.log(`Player ${player.userName} request ${request.route} with data ${JSON.stringify(data)}`);
                    await request.validateSchema(data);
                    const result = await request.perform(player, data)
                    res.status(200).send({
                        result
                    });
                } catch (e) {
                    res.status(400).send(e.message);
                }
            });
        }

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
        console.log("already online", isAlreadyOnline);
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

        request.on('close', () => {
            console.log(`${player.userName} Connection closed`);
            player.logOut()
            this.databaseManager.savePlayer(player);
            this.playerManager.removePlayer(player);
        });
    }
}
