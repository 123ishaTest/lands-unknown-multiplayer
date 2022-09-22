import {SyncType} from "common/connection/SyncType";
import {type ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import type {UpdateGameState} from "common/connection/UpdateGameState";

export class Connection {
    protected static _onGameStateSync = new SimpleEventDispatcher<UpdateGameState>();


    public static init(jwt: string) {
        const serverUrl = process.env.NODE_ENV === 'production' ?
            `https://lands-unknown-multiplayer.ishadijcks.repl.co` : `http://localhost:3000`;
        const path = serverUrl + `/login?jwt=${jwt}`;

        console.log(`Connecting to server ${serverUrl}`);

        const events = new EventSource(path);
        events.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (!data.type) {
                throw new Error("Incorrect server event: " + event.data);
            }
            const type: SyncType = data.type;
            switch (type) {
                case SyncType.GameState:
                    this._onGameStateSync.dispatch(data);
                    return;
                default:
                    console.error("Unhandled sync type", data);
            }
        }
    }

    /**
     * Emitted whenever a currency is gained
     */
    public static get onGameStateSync(): ISimpleEvent<UpdateGameState> {
        return this._onGameStateSync.asEvent();
    }
}
