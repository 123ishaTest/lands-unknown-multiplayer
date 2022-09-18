import {GameServer} from "./GameServer";
import {Player} from "lu-common/src/Player";

const server = new GameServer(
    // new DatabaseManager(connection),
    // new PlayerManager(),
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
