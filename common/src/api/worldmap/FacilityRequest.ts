import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, number, object, string} from "yup";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import type {Player} from "common/Player";

export class FacilityRequest extends ServerRequest {
    route = ServerRequestRoute.FacilityAction;
    description: string = "Perform an action at a specified facility";
    canBePredicted: boolean = true;

    schema = object({
        // Location information
        target: string().required(),
        type: mixed<WorldLocationType>().oneOf(Object.values(WorldLocationType)).required(),

        // Action information
        facilityIndex: number().required().min(0),
        actionIndex: number().required().min(0),
        repeats: number().required().min(0),
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        const target = new WorldLocationIdentifier(data.type, data.target as WorldLocationId)
        const location = player.worldMap.getLocation(target);

        // Make sure the requested facility is not out of bounds
        if (location._facilities.length <= data.facilityIndex) {
            return false;
        }

        const facilityType = location._facilities[data.facilityIndex];
        const facility = player.facilityList.getFacility(facilityType);
        // Make sure the requested action is not out of bounds
        if (facility.actions.length <= data.actionIndex) {
            return false;
        }

        const actionId = facility.actions[data.actionIndex];
        const action = player.actionList.getAction(actionId);

        // If we're not there yet, try to move there
        if (!target.equals(player.worldMap.getLocationIdentifierAtEndOfQueue())) {
            const couldMove = player.worldMap.moveToLocation(target);
            if (!couldMove) {
                return false;
            }
        }
        player.actionQueue.addAction(action, data.repeats);

        return false;
    }
}
