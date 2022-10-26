import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, object} from "yup";
import type {Player} from "common/Player";

export class DialogNextRequest extends ServerRequest {
    route = ServerRequestRoute.DialogNextRequest;
    description: string = "Press Next when talking to an NPC";
    canBePredicted: boolean = true;

    schema = object({});

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        if (!player.isInDialog()) {
            return false;
        }
        player.dialog.next();
        if (player.dialog.isDone()) {
            player.exitDialog();
        }
    }
}
