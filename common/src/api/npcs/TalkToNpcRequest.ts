import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, number, object, string} from "yup";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import type {Player} from "common/Player";

export class TalkToNpcRequest extends ServerRequest {
    route = ServerRequestRoute.TalkToNpcRequest;
    description: string = "Start talking to an NPC at a specified location";
    canBePredicted: boolean = true;

    schema = object({
        // Location information
        target: string().required(),
        type: mixed<WorldLocationType>().oneOf(Object.values(WorldLocationType)).required(),

        // Npc information
        npcIndex: number().required().min(0),
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const target = new WorldLocationIdentifier(data.type, data.target as WorldLocationId)
        const location = player.worldMap.getLocation(target);

        // If we're not there yet, try to move there
        if (!target.equals(player.worldMap.getLocationIdentifierAtEndOfQueue())) {
            player.worldMap.moveToLocation(target);
            return;
        }
        if (!player.canStartDialog()) {
            return false;
        }

        if (location.npcs.length <= data.npcIndex) {
            return false;
        }
        const npcId = location.npcs[data.npcIndex];
        const npc = player.npcList.getNpc(npcId);
        if (!npc) {
            return false;
        }

        player.startDialog(npc.dialog)

        return false;
    }
}
