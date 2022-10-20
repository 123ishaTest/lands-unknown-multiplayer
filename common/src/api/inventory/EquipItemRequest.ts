import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, number, object} from "yup";
import type {Player} from "common/Player";

export class EquipItemRequest extends ServerRequest {
    route = ServerRequestRoute.EquipItemRequest;
    description: string = "Equip an item at the requested inventory slot";
    canBePredicted: boolean = true;

    schema = object({
        index: number().min(0).required()
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const index = data.index;
        if (index < 0 || index >= player.inventory.slotCount) {
            return false;
        }
        player.inventory.equipItemAtIndex(index);
        return false;
    }
}
