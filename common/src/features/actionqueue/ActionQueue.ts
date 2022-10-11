import {type ISimpleEvent, SimpleEventDispatcher} from "strongly-typed-events";
import {IgtFeature} from "common/features/IgtFeature";
import type {Action} from "common/tools/actions/Action";
import type {ActionQueueSaveData} from "common/features/actionqueue/ActionQueueSaveData";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {ActionList} from "common/features/actionlist/ActionList";
import type {ActionGenerator} from "common/tools/actions/ActionGenerator";
import {SingleActionGenerator} from "common/tools/actions/SingleActionGenerator";
import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {TravelAction} from "common/features/worldmap/TravelAction";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import {GeneratorList} from "common/features/actionlist/GeneratorList";
import {TravelGenerator} from "common/features/actionlist/instances/travel/TravelGenerator";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

export class ActionQueue extends IgtFeature {
    _features!: IgtFeatures;
    _actionList!: ActionList;
    _generatorList!: GeneratorList;

    generators: ActionGenerator[] = [];
    currentAction: Action;

    readonly MAX_GENERATORS = 10;

    private _onActionCompletion = new SimpleEventDispatcher<Action>();

    public get onActionCompletion(): ISimpleEvent<Action> {
        return this._onActionCompletion.asEvent();
    }

    constructor() {
        super('actionQueue');
    }


    initialize(features: IgtFeatures) {
        this._actionList = features.actionList;
        this._generatorList = features.generatorList;
        this._features = features;
    }

    update(delta: number) {
        // If we have an action planned, perform it
        if (this.currentAction) {
            this.currentAction.perform(delta);
            if (!this.currentAction.canBeCompleted()) {
                return;
            } else {
                this.currentAction.complete();
                this.generators[0]?.actionCompleted();
                this.currentAction = null;
            }
        }

        if (this.generators.length === 0) {
            return;
        }

        let generator = this.generators[0];

        // Start or finish the current generator
        if (!generator.isStarted()) {
            const couldStart = generator.start();
            if (!couldStart) {
                this.removeFirstGenerator();
            }
        }
        if (this.generators.length === 0) {
            return;
        }

        // Get new action from the current generator
        generator = this.generators[0];
        const nextAction = generator.next();
        if (!nextAction) {
            console.warn(`Got an empty action from generator ${generator};`)
            this.removeFirstGenerator();
            return;
        }
        // And remove it if it's finished now
        if (generator.isFinished()) {
            this.removeFirstGenerator();
        }

        this.currentAction = nextAction;
        this.currentAction.initialize(this._features);
    }

    cancelAction(index: number) {
        const action = this.generators[index];

        if (action == null) {
            console.error(`Could not find and cancel action at index ${index}`);
            return;

        }
        // Reset the rest if we just canceled a travel
        // const cascadeCancel = (action as TravelAction).to != null;
        this.cancelActionsFromIndex(index, false);
    }

    cancelActionsFromIndex(index: number, cascade: boolean) {
        if (!cascade) {
            this.generators[index].stop();
            this.generators.splice(index, 1);
            return;
        }
        for (let i = index; i < this.generators.length; i++) {
            this.generators[i].stop();
        }
        this.generators = this.generators.slice(0, index);
    }

    // /**
    //  * Helper method to more easily add actions by id
    //  */
    // public addActionById(actionId: ActionId, repeats: number = 0) {
    //     const generator = this._actionList.getActionGenerator(actionId);
    //     generator.repeats = repeats;
    //     this.addActionGenerator(generator);
    // }

    /**
     * Add an action by wrapping it in a generator
     */
    public addAction(action: Action) {
        this.addGenerator(new SingleActionGenerator(action));
    }

    addGenerator(generator: ActionGenerator) {
        // No need to schedule a generator for now if we can't perform it.
        if (this.generators.length === 0 && !generator.canPerform()) {
            return;
        }

        if (this.generators.length >= this.MAX_GENERATORS) {
            console.log(`You already have ${this.MAX_GENERATORS} generators scheduled.`);
            return;
        }

        // TODO fix pubsub
        // const sub = generator.onCompletion.subscribe((generator) => {
        //     this._onActionCompletion.dispatch(generator);
        // })
        // generator.onFinished.one(() => {
        //     sub();
        // })
        this.generators.push(generator);
    }

    // Could be improved to be more bug-safe
    removeFirstGenerator() {
        this.generators.shift();
    }


    load(data: ActionQueueSaveData): void {
        this.generators = [];
        if (data.currentAction) {
            this.currentAction = this._actionList.getAction(data.currentAction.id, data.currentAction)
        } else {
            this.currentAction = null;
        }
        data.generators?.forEach(generatorData => {
            const generator = this._generatorList.getGenerator(generatorData.id, generatorData);
            this.addGenerator(generator);
        })
    }

    save(): ActionQueueSaveData {
        const saveData: ActionQueueSaveData = {
            generators: this.generators.map(generator => generator.save()),
        };
        if (this.currentAction) {
            saveData.currentAction = this.currentAction.save()
        }
        return saveData;
    }

    getPlayerLocationAtEndOfQueue(): WorldLocationIdentifier | null {
        for (let i = this.generators.length - 1; i >= 0; i--) {
            if (this.generators[i] instanceof TravelGenerator) {
                return (this.generators[i] as TravelGenerator).getEndLocation();
            }
        }
        if (this.currentAction instanceof TravelAction) {
            return (this.currentAction as TravelAction).to;
        }
        return null;
    }

    getTravelingPosition(): WorldPosition | null {
        if (this.currentAction instanceof TravelAction) {
            return (this.currentAction as TravelAction).getWorldPosition()
        }
        return null;
    }

    addGeneratorById(id: GeneratorId, repeats: number = 1) {
        const generator = this._generatorList.getGenerator(id);
        generator.setRepeats(repeats);
        this.addGenerator(generator);
    }
}
