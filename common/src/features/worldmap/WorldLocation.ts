import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldPosition} from "common/tiled/WorldPosition";
import {ActionId} from "common/features/actionlist/ActionId";
import {FacilityType} from "common/features/worldmap/FacilityType";
import {Requirement} from "common/tools/requirements/Requirement";
import {NoRequirement} from "common/tools/requirements/NoRequirement";

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
