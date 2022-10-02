import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldPosition} from "common/tiled/types/WorldPosition";
import {TravelType} from "common/features/worldmap/roads/TravelType";
import {RoadLocationIdentifier} from "common/features/worldmap/roads/RoadLocationIdentifier";

export class Road extends WorldLocation {
    from: WorldLocationIdentifier;
    to: WorldLocationIdentifier;
    duration: number;

    travelType: TravelType;
    points: WorldPosition[];

    constructor(identifier: RoadLocationIdentifier, displayName: string, from: WorldLocationIdentifier, to: WorldLocationIdentifier, points: WorldPosition[], baseDuration: number, travelType: TravelType = TravelType.Walk) {
        super(identifier, displayName, {x: 0, y: 0}, [], []);
        this.from = from;
        this.to = to;
        this.points = points;
        this.travelType = travelType;

        this.duration = baseDuration * this.points.length;
    }

    getWorldPosition(progress: number): WorldPosition {
        progress = Math.min(1, Math.max(0, progress));
        const startIndex = Math.min(this.points.length - 1, Math.floor(progress * this.points.length))
        return this.points[startIndex];
    }
}
