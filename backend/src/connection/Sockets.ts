import {GameServer} from "src/GameServer";
import {Socket} from "socket.io";

const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");

const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});

export class Sockets {
    public static gameServer: GameServer;

    public static init(gameServer: GameServer, debug: boolean = false) {
        this.gameServer = gameServer;

        io.on('connection', async (socket: Socket) => {
            console.debug("A user connected");

            socket.on('disconnect', async () => {
                console.log('disconnected');
            });
        })

        server.listen(3000, () => {
            console.log('listening on *:3000');
        });
    }

}
