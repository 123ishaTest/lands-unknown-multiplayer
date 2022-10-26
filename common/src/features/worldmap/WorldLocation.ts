import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import type {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import type {FacilityType} from "common/features/facilities/FacilityType";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import {NpcId} from "common/features/npcs/NpcId";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    worldPosition: WorldPosition;

    _possibleGenerators: GeneratorId[];

    _facilities: FacilityType[];
    npcs: NpcId[];
    requirement: Requirement = new NoRequirement();

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, worldPosition: WorldPosition, generators: GeneratorId[] = [], facilities: FacilityType[], npcs: NpcId[]) {
        this.identifier = identifier;
        this.worldPosition = worldPosition;
        this._possibleGenerators = generators;
        this._facilities = facilities;
        this.npcs = npcs;
        this.displayName = displayName;
    }

    hasFacility(type: FacilityType): boolean {
        return this._facilities.includes(type);
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;
    }
}
