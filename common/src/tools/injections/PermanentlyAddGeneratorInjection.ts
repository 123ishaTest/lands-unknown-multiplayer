import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {AbstractInjection} from "common/tools/injections/AbstractInjection";
import {IgtFeatures} from "common/features/IgtFeatures";
import {GeneratorId} from "common/features/actionlist/GeneratorId";

/**
 * Permanently adds a generator to a location
 */
export class PermanentlyAddGeneratorInjection extends AbstractInjection {
    location: WorldLocationIdentifier
    generatorId: GeneratorId;

    constructor(location: WorldLocationIdentifier, generatorId: GeneratorId) {
        super();
        this.location = location;
        this.generatorId = generatorId;
    }

    inject(features: IgtFeatures): void {
        const location = features.worldMap.getLocation(this.location);
        if (!location) {
            console.warn(`Could not inject action into location with id ${this.location}`);
            return;
        }
        location._possibleGenerators.push(this.generatorId);
    }

    eject(): void {
        // Empty
    }

}
