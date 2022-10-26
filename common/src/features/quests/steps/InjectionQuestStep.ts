import {AbstractQuestStep} from "common/features/quests/steps/AbstractQuestStep";
import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {IgtFeatures} from "common/features/IgtFeatures";

/**
 * A basic step which performs a set of injections before and after
 */
export class InjectionQuestStep extends AbstractQuestStep {
    injections: AbstractInjection[];

    constructor(id: number, injections: AbstractInjection[]) {
        super(id);
        this.injections = injections;
    }

    before(features: IgtFeatures): void {
        this.injections.forEach(injection => {
            injection.inject(features)
        })
    }

    after(features: IgtFeatures): void {
        this.injections.forEach(injection => {
            injection.eject(features)
        })
    }


}
