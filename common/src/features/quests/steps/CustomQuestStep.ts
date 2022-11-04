import {AbstractQuestStep} from "common/features/quests/steps/AbstractQuestStep";

/**
 * In case you need to define one-time custom functions
 */
export class CustomQuestStep extends AbstractQuestStep {
    beforeFunc: () => void;
    afterFunc: () => void;

    constructor(id: number, beforeFunc: () => void, afterFunc: () => void) {
        super(id);
        this.beforeFunc = beforeFunc;
        this.afterFunc = afterFunc;
    }

    before(): void {
        this.afterFunc()
    }

    after(): void {
        this.afterFunc();
    }


}
