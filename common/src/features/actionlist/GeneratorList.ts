import {IgtFeature} from "common/features/IgtFeature";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {SaveData} from "common/tools/saving/SaveData";
import type {Action} from "common/tools/actions/Action";
import type {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {FishShrimpAction} from "common/features/actionlist/instances/fishing/FishShrimpAction";
import {RandomActionGenerator} from "common/tools/actions/RandomActionGenerator";
import {type OutcomeFunction, WeightedDistribution} from "common/tools/random/distributions/WeightedDistribution";
import {Outcome} from "common/tools/random/distributions/Outcome";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import {TravelGenerator} from "common/features/actionlist/instances/travel/TravelGenerator";
import type {TravelAction} from "common/features/worldmap/TravelAction";
import type {ActionGeneratorSaveData} from "common/tools/actions/ActionGeneratorSaveData";
import {MineCopperAction} from "common/features/actionlist/instances/mining/MineCopperAction";
import {MineTinAction} from "common/features/actionlist/instances/mining/MineTinAction";


/**
 * A giant repository of all possible action generators
 */
export class GeneratorList extends IgtFeature {
    _features!: IgtFeatures

    constructor() {
        super("actionList");
    }

    generators!: Record<GeneratorId, (...args: any[]) => ActionGenerator>;


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
            [GeneratorId.TravelGenerator]: (actions: TravelAction[] = []) => {
                return new TravelGenerator(actions);
            },
            [GeneratorId.ExploreTheForest]: () => new RandomActionGenerator(GeneratorId.ExploreTheForest, "Explore the forest", new WeightedDistribution<OutcomeFunction<Action>>([
                new Outcome(() => new FishShrimpAction(), 1),
                new Outcome(() => new MineCopperAction(), 2),
                new Outcome(() => new MineTinAction(), 2),
            ])),
            [GeneratorId.FishLowerTier]: () => new RandomActionGenerator(GeneratorId.FishLowerTier, "Fishing Spot", new WeightedDistribution<OutcomeFunction<Action>>([
                new Outcome(() => new FishShrimpAction(), 1),
            ])),
        }
    }

    public getGenerator(id: GeneratorId, saveData: ActionGeneratorSaveData | null = null, ...args: any[]): ActionGenerator {
        if (id == undefined) {
            console.trace("Cannot get generator of undefined id")
        }
        const generator = this.generators[id](...args);

        if (saveData) {
            generator.load(saveData);
        }
        generator.initialize(this._features);
        return generator;
    }

    load(): void {
        // Empty
    }

    save(): SaveData {
        return {};
    }

}
