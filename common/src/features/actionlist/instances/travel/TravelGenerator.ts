import {LinearActionGenerator} from "common/tools/actions/LinearActionGenerator";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import type {TravelAction} from "common/features/worldmap/TravelAction";
import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";

export class TravelGenerator extends LinearActionGenerator {
    actions: TravelAction[];

    constructor(actions: TravelAction[]) {
        super(GeneratorId.TravelGenerator, "Traveling", actions);
    }

    public getEndLocation(): WorldLocationIdentifier {
        return this.actions[this.actions.length - 1].to
    }
}
