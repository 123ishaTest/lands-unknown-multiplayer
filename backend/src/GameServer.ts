import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {Player} from "common/Player";
import {FirebaseHelper} from "src/connection/FirebaseHelper";
import {Currency} from "common/features/wallet/Currency";
import {CurrencyType} from "common/features/wallet/CurrencyType";

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

        app.get('/login', (request, response, next) => {
            this.login(request, response)
        });


        setInterval(() => {
            this.tick();
        }, this.TICK_DURATION * 1000);
    }

    private tick() {
        this.playerManager.onlinePlayers.forEach((player: Player) => {
            player.wallet.gainCurrency(new Currency(1, CurrencyType.money))
            // TODO tick features
            this.databaseManager.savePlayer(player);
            player.sendGameState();
        })
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

        response.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Connection': 'keep-alive',
            'Cache-Control': 'no-cache'
        });
        const userName = userRecord.displayName;
        const userId = userRecord.uid

        const player = await this.databaseManager.findOrCreatePlayer(userName, userId);
        player.setResponse(response);
        this.playerManager.addPlayer(player);

        // player.sendDataToClient("Login successful");
        request.on('close', () => {
            console.log(`${player.userName} Connection closed`);
            this.playerManager.removePlayer(player);
        });
    }
}
