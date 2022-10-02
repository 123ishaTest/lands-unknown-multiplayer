import type {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import type {Saveable} from "common/tools/saving/Saveable";
import type {WorldLocationIdentifierSaveData} from "common/features/worldmap/WorldLocationIdentifierSaveData";

export class WorldLocationIdentifier implements Saveable {
    type: WorldLocationType;
    id: WorldLocationId;

    saveKey: string;

    public constructor(type: WorldLocationType, id: WorldLocationId) {
        this.type = type;
        this.id = id;
        this.saveKey = this.id;
    }

    public toString(): string {
        return `${this.type}(${this.id})`;
    }

    public equals(other: WorldLocationIdentifier): boolean {
        if (other == null) {
            console.warn(`Comparing ${this.toString()} to null`);
            return false;
        }
        return this.type === other.type && this.id == other.id;
    }

    save(): WorldLocationIdentifierSaveData {
        return {
            id: this.id,
            type: this.type,
        }
    }

    load(data: WorldLocationIdentifierSaveData) {
        // This object does not need to be loaded
    }

}

