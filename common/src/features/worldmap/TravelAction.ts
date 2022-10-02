import {Action} from "common/tools/actions/Action";
import {WorldMap} from "common/features/worldmap/WorldMap";
import {Road} from "common/features/worldmap/roads/Road";
import {ActionId} from "common/features/actionlist/ActionId";
import {IgtFeatures} from "common/features/IgtFeatures";
import {WorldPosition} from "common/tiled/types/WorldPosition";
import {TravelActionSaveData} from "common/features/worldmap/TravelActionSaveData";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

export class TravelAction extends Action {
    id = ActionId.TravelAction;
    icon = "fa-route";
    _worldMap!: WorldMap;

    road!: Road;
    roadId: WorldLocationId;

    isReverse: boolean;

    constructor(roadId: WorldLocationId, isReverse: boolean) {
        super("", Infinity);
        this.roadId = roadId;
        this.isReverse = isReverse;
    }

    initialize(features: IgtFeatures): void {
        this._worldMap = features.worldMap
        this.road = this._worldMap.getRoad(this.roadId);
        this.description = `${this.from.id} to ${this.to.id}.`

    }

    public get duration(): number {
        return this.road?.duration ?? Infinity
    }

    gainReward(): boolean {
        this._worldMap.setLocation(this.to);
        return false;
    }

    getWorldPosition(): WorldPosition {
        const percentage = this.isReverse ? 1 - this.getProgress().getPercentage() : this.getProgress().getPercentage()
        return this.road.getWorldPosition(percentage);
    }

    getRemainingPoints(): WorldPosition[] {
        const index = Math.floor(this.getProgress().getPercentage() * this.road.points.length);
        return this.isReverse ?
            this.road.points.slice(0, this.road.points.length - index) : this.road.points.slice(index, this.road.points.length);
    }

    get from() {
        return this.isReverse ? this.road.to : this.road.from;
    }

    get to() {
        return this.isReverse ? this.road.from : this.road.to;
    }

    load(data: TravelActionSaveData) {
        super.load(data);
        this.roadId = data.road
        this.isReverse = data.isReverse
    }

    save(): TravelActionSaveData {
        return {
            ...super.save(),
            road: this.roadId,
            isReverse: this.isReverse,
        };
    }
}
