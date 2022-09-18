import {io, Socket} from "socket.io-client";

export class SocketHelper {
    public static socket: Socket;

    public static init() {
        this.socket = io("localhost:3000");

        this.socket.on('test', (data) => {
            console.log(data);
        })
    }
}
