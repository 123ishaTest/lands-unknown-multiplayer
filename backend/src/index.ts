import {GameServer} from "src/GameServer";
import {PlayerManager} from "src/PlayerManager";
import {DatabaseManager} from "src/DatabaseManager";
import {FirebaseClient} from "src/connection/FirebaseClient";
import {LocalDatabaseClient} from "src/connection/LocalDatabaseClient";

const databaseClient = process.env.NODE_ENV === 'production' ? new FirebaseClient() : new LocalDatabaseClient();

const server = new GameServer(
    new PlayerManager(),
    new DatabaseManager(databaseClient),
)


server.start();

process.on('SIGINT', async function () {
    console.log("Shutting down...")
    server.logOutAllPlayers().then(() => {
        process.exit();
    });
});
