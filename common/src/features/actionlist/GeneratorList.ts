import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {SaveData} from "common/tools/saving/SaveData";
import {MineAction} from "common/features/actionqueue/MineAction";
import {Action} from "common/tools/actions/Action";
import type {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {FishShrimp} from "common/features/actionlist/instances/fishing/FishShrimp";
import {RandomActionGenerator} from "common/tools/actions/RandomActionGenerator";
import {OutcomeFunction, WeightedDistribution} from "common/tools/random/distributions/WeightedDistribution";
import {Outcome} from "common/tools/random/distributions/Outcome";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import {TravelGenerator} from "common/features/actionlist/instances/travel/TravelGenerator";
import {TravelAction} from "common/features/worldmap/TravelAction";


/**
 * A giant repository of all possible action generators
 */
export class GeneratorList extends IgtFeature {
    _features!: IgtFeatures

    constructor() {
        super("actionList");
    }

    generators!: Record<GeneratorId, (...args) => ActionGenerator>;


    initialize(features: IgtFeatures) {
        this._features = features;
        this.generators = {
            // Internals
            [GeneratorId.SingleActionGenerator]: () => {
                throw new Error("Do not query for this generator directly")
            },
            [GeneratorId.LinearActionGenerator]: () => {
                throw new Error("Do not query for this generator directly")
            },
            [GeneratorId.TravelGenerator]: (actions: TravelAction[]) => {
                return new TravelGenerator(actions);
            },
            [GeneratorId.ExploreTheForest]: () => new RandomActionGenerator(GeneratorId.ExploreTheForest, "Explore the forest", new WeightedDistribution<OutcomeFunction<Action>>([
                new Outcome(() => new FishShrimp(), 1),
                new Outcome(() => new MineAction("Chop a rock", 1), 2),
            ])),
        }
    }

    public getGenerator(id: GeneratorId): ActionGenerator {
        if (id == undefined) {
            console.trace("Cannot get generator of undefined Id")
        }
        return this.generators[id]();
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
