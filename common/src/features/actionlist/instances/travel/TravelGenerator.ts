import {LinearActionGenerator} from "common/tools/actions/LinearActionGenerator";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import {TravelAction} from "common/features/worldmap/TravelAction";
import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {TravelGeneratorSaveData} from "common/features/actionlist/instances/travel/TravelGeneratorSaveData";
import {IgtFeatures} from "common/features/IgtFeatures";

export class TravelGenerator extends LinearActionGenerator {
    actions: TravelAction[];
    endLocation: WorldLocationIdentifier;

    constructor(actions: TravelAction[]) {
        super(GeneratorId.TravelGenerator, "Traveling", actions);
        if (actions.length > 0) {
            this.endLocation = actions[actions.length - 1].to;
        }
    }

    public getEndLocation(): WorldLocationIdentifier {
        return this.endLocation;
    }


    initialize(features: IgtFeatures) {
        super.initialize(features);
        if (this.actions.length > 0) {
            this.endLocation = this.actions[this.actions.length - 1].to;
            this.description = `Traveling to ${this.endLocation.toString()}`;
        }
    }

    next(): TravelAction {
        return this.actions.shift();
    }


    isFinished(): boolean {
        return this.actions.length === 0;
    }

    save(): TravelGeneratorSaveData {
        return {
            actions: this.actions.map(action => action.save()),
            index: 0,
            id: this.id,
            repeats: 0
        };
    }

    load(data: TravelGeneratorSaveData) {
        this.actions = data.actions.map(actionData => new TravelAction(actionData.road, actionData.isReverse))
        super.load(data);
    }

}
