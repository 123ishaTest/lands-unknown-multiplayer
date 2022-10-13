import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, object, string} from "yup";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import type {Player} from "common/Player";

export class TravelRequest extends ServerRequest {
    route = ServerRequestRoute.Travel;
    description: string = "Travel to the specified location";
    canBePredicted: boolean = true;

    schema = object({
        target: string().required(),
        type: mixed<WorldLocationType>().oneOf(Object.values(WorldLocationType)).required()
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const destination = new WorldLocationIdentifier(data.type, data.target as WorldLocationId)
        player.worldMap.moveToLocation(destination);
        return false;
    }
}
