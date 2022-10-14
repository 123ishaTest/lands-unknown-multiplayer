import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, number, object, string} from "yup";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import type {Player} from "common/Player";

export class GeneratorRequest extends ServerRequest {
    route = ServerRequestRoute.GeneratorAction;
    description: string = "Schedule a generator at a specified location";
    canBePredicted: boolean = true;

    schema = object({
        // Location information
        target: string().required(),
        type: mixed<WorldLocationType>().oneOf(Object.values(WorldLocationType)).required(),

        // Action information
        generatorIndex: number().required().min(0),
        repeats: number().required().min(0),
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const target = new WorldLocationIdentifier(data.type, data.target as WorldLocationId)
        const location = player.worldMap.getLocation(target);

        // Make sure the requested facility is not out of bounds
        if (location._possibleGenerators.length <= data.generatorIndex) {
            return false;
        }

        // If we're not there yet, try to move there
        if (!target.equals(player.worldMap.getLocationIdentifierAtEndOfQueue())) {
            const couldMove = player.worldMap.moveToLocation(target);
            if (!couldMove) {
                return false;
            }
        }

        const generatorId = location._possibleGenerators[data.generatorIndex];
        player.actionQueue.addGeneratorById(generatorId, data.repeats);

        return false;
    }
}
