import {ServerRequest} from "common/connection/ServerRequest";
import {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import {type InferType, mixed, number, object} from "yup";
import type {Player} from "common/Player";
import {ItemId} from "common/features/items/ItemId";

export class WithdrawItemByIdRequest extends ServerRequest {
    route = ServerRequestRoute.WithdrawItemsById;
    description: string = "Withdraw an amount of items with a specific Id";
    canBePredicted: boolean = true;

    schema = object({
        id: mixed<ItemId>().oneOf(Object.values(ItemId)).required(),
        amount: number().positive().required()
    });

    async perform(player: Player, data: InferType<typeof this.schema>): Promise<boolean> {
        if (data.id === ItemId.Empty) {
            return;
        }
        player.bank.withdrawItemById(data.id, data.amount);
        return false;
    }
}
