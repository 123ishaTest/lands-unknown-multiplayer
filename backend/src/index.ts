import {GameServer} from "src/GameServer";
import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {Sockets} from "src/connection/Sockets";

const server = new GameServer(
    new PlayerManager(),
    new DatabaseManager(),
)

Sockets.init(server, true)
// FirebaseHelper.init();

server.start();
//
// process.on('SIGINT', async function () {
//     console.log("Shutting down...")
//     server.logOutAllPlayers().then(() => {
//         process.exit();
//     });
// });
