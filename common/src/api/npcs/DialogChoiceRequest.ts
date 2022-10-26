import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, number, object} from "yup";
import type {Player} from "common/Player";

export class DialogChoiceRequest extends ServerRequest {
    route = ServerRequestRoute.DialogChoiceRequest
    description: string = "Select an option when presented with a choice";
    canBePredicted: boolean = true;

    schema = object({
        index: number().required().min(0),
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        if (!player.isInDialog()) {
            return false;
        }
        player.dialog.selectOption(data.index)
        if (player.dialog.isDone()) {
            player.exitDialog();
        }
    }
}
