import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, object} from "yup";
import type {Player} from "common/Player";
import {EquipmentType} from "common/features/equipment/EquipmentType";

export class UnEquipItemRequest extends ServerRequest {
    route = ServerRequestRoute.UnEquipItemRequest;
    description: string = "Unequip an equipment type";
    canBePredicted: boolean = true;

    schema = object({
        type: mixed<EquipmentType>().oneOf(Object.values(EquipmentType)).required(),
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const type = data.type;
        player.equipment.unEquip(type);
        return false;
    }
}
