import type {ServerRequest} from "common/connection/ServerRequest";
import axios, {type AxiosInstance} from "axios";
import {type ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import type {UpdateGameState} from "common/connection/UpdateGameState";
import {SyncType} from "common/connection/SyncType";
import {LocalPlayer} from "@/model/LocalPlayer";
import type {InferType} from "yup";
import type {PlayerPositionsSync} from "common/connection/PlayerPositionsSync";

export class ApiClient {
    public static readonly serverUrl = process.env.NODE_ENV === 'production' ?
        `https://lands-unknown-multiplayer.ishadijcks.repl.co` : `http://localhost:3000`;

    protected static _onGameStateSync = new SimpleEventDispatcher<UpdateGameState>();
    protected static _onPlayerPositionsSync = new SimpleEventDispatcher<PlayerPositionsSync>();

    private static client: AxiosInstance;

    private static initializeClient(sessionToken: string) {
        this.client = axios.create({
            baseURL: this.serverUrl,
            headers: {
                'Authorization': sessionToken,
                'Content-Type': 'application/json',
            }
        })
    }

    public static login(jwt: string) {
        console.log(`Connecting to server ${this.serverUrl}`);

        const path = this.serverUrl + `/login?jwt=${jwt}`;
        const events = new EventSource(path);
        events.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (!data.type) {
                throw new Error("Incorrect server event: " + event.data);
            }
            const type: SyncType = data.type;
            switch (type) {
                case SyncType.PlayerPositions:
                    this._onPlayerPositionsSync.dispatch(data);
                    return;
                case SyncType.SessionToken:
                    this.initializeClient(data.data);
                    return;
                case SyncType.GameState:
                    this._onGameStateSync.dispatch(data);
                    return;
                default:
                    console.error("Unhandled sync type", data);
            }
        }
    }

    /**
     * Emitted whenever the gamestate changes
     */
    public static get onGameStateSync(): ISimpleEvent<UpdateGameState> {
        return this._onGameStateSync.asEvent();
    }

    /**
     * Emitted whenever the positions of other player changes
     */
    public static get onPlayerPositionsSync(): ISimpleEvent<PlayerPositionsSync> {
        return this._onPlayerPositionsSync.asEvent();
    }

    public static async send(request: ServerRequest, data: InferType<typeof request.schema>) {
        try {
            await request.validateSchema(data);
        } catch (e: any) {
            // TODO global alerts
            console.error(e.message);
        }

        await this.client.post(request.route, data)

        if (request.canBePredicted) {
            await request.perform(LocalPlayer.player, data);
        }
    }
}
