import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, number, object, string} from "yup";
import type {Player} from "common/Player";
import {ItemId} from "common/features/items/ItemId";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import {DepositItemByIdAction} from "common/features/actionlist/instances/banking/DepositItemByIdAction";
import {FacilityType} from "common/features/facilities/FacilityType";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export class DepositItemByIdRequest extends ServerRequest {
    route = ServerRequestRoute.DepositItemsById;
    description: string = "Deposit an amount of items with a specific Id";
    canBePredicted: boolean = true;

    schema = object({
        // Location
        target: string().required(),
        type: mixed<WorldLocationType>().oneOf(Object.values(WorldLocationType)).required(),

        // Item
        id: mixed<ItemId>().oneOf(Object.values(ItemId)).required(),
        amount: number().positive().required()
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        if (data.id === ItemId.Empty) {
            return false;
        }
        const target = new WorldLocationIdentifier(data.type, data.target as WorldLocationId)

        // Check if there is a bank there
        const location = player.worldMap.getLocation(target);
        if (!location.hasFacility(FacilityType.Bank)) {
            return false;
        }

        // If we're not there yet, try to move there
        if (!target.equals(player.worldMap.getLocationIdentifierAtEndOfQueue())) {
            const couldMove = player.worldMap.moveToLocation(target);
            if (!couldMove) {
                return false;
            }
        }

        player.actionQueue.addAction(new DepositItemByIdAction(data.id, data.amount))
        return false;
    }
}
