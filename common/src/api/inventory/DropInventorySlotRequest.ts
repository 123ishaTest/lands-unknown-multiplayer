import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, number, object} from "yup";
import type {Player} from "common/Player";

export class DropInventorySlotRequest extends ServerRequest {
    route = ServerRequestRoute.DropInventorySlot;
    description: string = "Delete a stack at the requested inventory slot";
    canBePredicted: boolean = true;

    schema = object({
        index: number().min(0).required()
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const index = data.index;
        if (index < 0 || index >= player.inventory.slotCount) {
            return;
        }
        player.inventory.dropStack(index);
    }
}
