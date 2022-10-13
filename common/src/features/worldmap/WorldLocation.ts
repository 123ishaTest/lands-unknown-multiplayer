import type {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import type {ActionId} from "common/features/actionlist/ActionId";
import type {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";
import type {FacilityType} from "common/features/facilities/FacilityType";

export abstract class WorldLocation {
    identifier: WorldLocationIdentifier
    displayName: string;

    worldPosition: WorldPosition;

    _possibleActions: ActionId[];

    _facilities: FacilityType[];

    requirement: Requirement = new NoRequirement();

    protected constructor(identifier: WorldLocationIdentifier, displayName: string, worldPosition: WorldPosition, possibleActions: ActionId[] = [], facilities: FacilityType[]) {
        this.identifier = identifier;
        this.worldPosition = worldPosition;
        this._possibleActions = possibleActions;
        this._facilities = facilities;
        this.displayName = displayName;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted;
    }
}
