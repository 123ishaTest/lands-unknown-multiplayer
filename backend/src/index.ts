import {GameServer} from "./GameServer";
import {DatabaseManager} from "src/DatabaseManager";
import {PlayerManager} from "src/PlayerManager";

const server = new GameServer(
    new PlayerManager(),
    new DatabaseManager(),
)

// Sockets.init(game, connection, true)
// FirebaseHelper.init();

server.start();

process.on('SIGINT', async function () {
    console.log("Shutting down...")
    server.logOutAllPlayers().then(() => {
        process.exit();
    });
});
