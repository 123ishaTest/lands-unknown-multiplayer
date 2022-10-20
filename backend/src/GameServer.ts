import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {Player} from "common/Player";
import {TravelRequest} from "common/api/worldmap/TravelRequest";
import {ServerRequest} from "common/connection/ServerRequest";
import {randomUUID} from "crypto";
import {PlayerPosition} from "common/connection/PlayerPositionsSync";
import {DepositItemByIdRequest} from "common/api/banking/DepositItemByIdRequest";
import {WithdrawItemByIdRequest} from "common/api/banking/WithdrawItemByIdRequest";
import {FacilityRequest} from "common/api/worldmap/FacilityRequest";
import {GeneratorRequest} from "common/api/worldmap/GeneratorRequest";
import {DropInventorySlotRequest} from "common/api/inventory/DropInventorySlotRequest";
import {EquipItemRequest} from "common/api/inventory/EquipItemRequest";
import {UnEquipItemRequest} from "common/api/inventory/UnEquipItemRequest";

export class GameServer {
    readonly TICK_DURATION = 1

    private playerManager: PlayerManager;
    private databaseManager: DatabaseManager;

    constructor(playerManager: PlayerManager, databaseManager: DatabaseManager) {
        this.playerManager = playerManager;
        this.databaseManager = databaseManager;
    }

    public start() {
        this.databaseManager.init();

        const express = require('express');
        const app = express();
        const cors = require('cors');
        const allowedOrigins = [
            'http://localhost:5173',
            'http://127.0.0.1:5173',
            'https://123ishatest.github.io'
        ];
        app.use(cors({
            origin: function (origin, callback) {
                if (!origin) {
                    return callback(null, true);
                }
                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg = 'The CORS policy for this site does not ' +
                        'allow access from the specified Origin.';
                    return callback(new Error(msg), false);
                }
                return callback(null, true);
            }
        }));
        app.use(express.json())

        const PORT = process.env.PORT ?? 3000
        app.listen(PORT, () => {
            console.log(`Server listening at http://localhost:${PORT}`)
        })

        app.get('/login', (request, response) => {
            this.login(request, response)
        });

        // TODO get all requests cleanly
        const requests: ServerRequest[] = [
            new TravelRequest(),
            new FacilityRequest(),
            new GeneratorRequest(),
            new DepositItemByIdRequest(),
            new WithdrawItemByIdRequest(),
            new DropInventorySlotRequest(),
            new EquipItemRequest(),
            new UnEquipItemRequest(),
        ]

        // Register all requests
        for (const request of requests) {
            app.post(request.route, async (req, res) => {
                try {
                    const token = req.get('Authorization')
                    const player: Player = this.playerManager.getBySessionToken(token)
                    if (!player || token == null || token == "") {
                        console.warn(`Could not find player with session token ${token}`);
                        return res.status(400).send("Unauthorized");
                    }
                    const data = req.body;
                    console.log(`Player ${player.userName} request ${request.route} with data ${JSON.stringify(data)}`);
                    await request.validateSchema(data);
                    const result = await request.perform(player, data)
                    res.status(200).send({
                        result
                    });
                } catch (e) {
                    console.error(`${e.message}`);
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
        const positions: PlayerPosition[] = this.playerManager.onlinePlayers.map(player => {
            return {
                displayName: player.userName,
                position: player.getCurrentPosition() ?? {x: 0, y: 0},
            }
        })
        this.playerManager.onlinePlayers.forEach((player: Player) => {
            player.sendPlayerPositions(positions);
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
        const userRecord = await this.databaseManager.getUserRecord(jwt);
        if (!userRecord) {
            response.writeHead(401);
            response.end();
            return;
        }

        const {userName, userId} = userRecord;
        const isAlreadyOnline = await this.playerManager.getPlayer(userId) != null;
        if (isAlreadyOnline) {
            console.log(`Player ${userName} tried to login twice, logging out the old one`)
            const player = this.playerManager.getPlayer(userId)
            await this.databaseManager.savePlayer(player)
            await this.playerManager.removePlayer(player);
            return this.login(request, response);
        }

        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        });
        const player = await this.databaseManager.findOrCreatePlayer(userName, userId);
        player.setResponse(response);
        this.playerManager.addPlayer(player);

        player.sessionToken = randomUUID();
        player.sendSessionToken();
        player.sendGameState();
        request.on('close', () => {
            console.log(`${player.userName} Connection closed`);
            this.databaseManager.savePlayer(player);
            this.playerManager.removePlayer(player);
        });
    }
}
