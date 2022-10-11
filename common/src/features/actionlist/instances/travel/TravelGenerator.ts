import {LinearActionGenerator} from "common/tools/actions/LinearActionGenerator";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import {TravelAction} from "common/features/worldmap/TravelAction";
import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import type {TravelGeneratorSaveData} from "common/features/actionlist/instances/travel/TravelGeneratorSaveData";
import type {IgtFeatures} from "common/features/IgtFeatures";

export class TravelGenerator extends LinearActionGenerator {
    declare actions: TravelAction[];

    constructor(actions: TravelAction[]) {
        super(GeneratorId.TravelGenerator, "Traveling", actions);
    }

    initialize(features: IgtFeatures) {
        super.initialize(features);
        this.description = `Traveling to ${this.getEndLocation().toString()}`
    }

    public getEndLocation(): WorldLocationIdentifier {
        return this.actions[this.actions.length - 1].to;
    }

    save(): TravelGeneratorSaveData {
        return {
            actions: this.actions.map(action => action.save()),
            ...super.save(),
        };
    }

    load(data: TravelGeneratorSaveData) {
        this.actions = data.actions.map(actionData => new TravelAction(actionData.road, actionData.isReverse))
        super.load(data);
    }

}
