import {InjectionQuestStep} from "common/features/quests/steps/InjectionQuestStep";
import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {IgtFeatures} from "common/features/IgtFeatures";
import {WorldMap} from "common/features/worldmap/WorldMap";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

/**
 * Subscribes to the worldMap and checks if we arrive at a location
 */
export class ArriveAtLocationQuestStep extends InjectionQuestStep {
    _worldMap: WorldMap;
    target: WorldLocationId

    unsubscribe: () => void;

    constructor(id: number, target: WorldLocationId, injections: AbstractInjection[], worldMap: WorldMap) {
        super(id, injections);
        this.target = target;
        this._worldMap = worldMap;
    }

    before(features: IgtFeatures) {
        this.unsubscribe = this._worldMap.onArrival.subscribe(location => {
            if (location.id === this.target) {
                this._onStepCompleted.dispatch(this);
            }
        })
        super.before(features);
    }

    after(features: IgtFeatures) {
        this.unsubscribe();
        super.after(features);
    }
}
