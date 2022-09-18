import {Saveable} from "common/tools/saving/Saveable";
import {IgtFeatures} from "common/features/IgtFeatures";
import {SaveData} from "common/tools/saving/SaveData";

/**
 * An abstract class that all features should extend from.
 */
export abstract class IgtFeature implements Saveable {

    /**
     * Initialize all feature attributes.
     * Note that you should not assume other features exist already here
     * @param saveKey
     */
    protected constructor(saveKey: string) {
        this.saveKey = saveKey;
    }


    /**
     * Called after all features are created.
     * This is where your main configuration takes place.
     */
    initialize(features: IgtFeatures): void {
        // This method intentionally left blank
    }

    /**
     * Runs when the game gets started. Can be run multiple times if the player can stop the game
     */
    start(): void {
        // This method intentionally left blank
    }

    /**
     * Runs when the game gets stopped. NOT when the game closes
     */
    stop(): void {
        // This method intentionally left blank
    }

    /**
     * Default false to avoid not implementing the proper restrictions
     */
    canAccess(): boolean {
        return false;
    }

    /**
     * Gets called every Game.TICK_DURATION
     * @param delta time since last update
     */
    update(delta: number): void {
        // Override in subclass if needed
    }

    // Saving logic
    saveKey: string;

    abstract load(data: SaveData): void;

    abstract save(): SaveData;
}
