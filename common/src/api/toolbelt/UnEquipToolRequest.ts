import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, object} from "yup";
import type {Player} from "common/Player";
import {ToolType} from "common/features/toolbelt/ToolType";

export class UnEquipToolRequest extends ServerRequest {
    route = ServerRequestRoute.UnEquipToolRequest;
    description: string = "Unequip an specific tool type";
    canBePredicted: boolean = true;

    schema = object({
        type: mixed<ToolType>().oneOf(Object.values(ToolType)).required(),
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const type = data.type;
        player.toolBelt.unEquip(type);
        return false;
    }
}
