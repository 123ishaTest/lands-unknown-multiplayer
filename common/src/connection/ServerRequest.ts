import type {ServerRequestRoute} from "common/connection/ServerRequestRoute";
import type {Player} from "common/Player";

export abstract class ServerRequest {
    abstract route: ServerRequestRoute;
    abstract description: string;
    abstract canBePredicted: boolean;

    abstract schema: any;

    // If a request can be predicted, perform() will be called on the client immediately
    abstract perform(player: Player, data: any): Promise<boolean>;

    async validateSchema(data: any) {
        return await this.schema.validate(data);
    }
}
