import {IgtFeature} from "common/features/IgtFeature";
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {ActionList} from "common/features/actionlist/ActionList";
import {WorldLocationIdentifier} from "common/features/worldmap/WorldLocationIdentifier";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import type {WorldLocation} from "common/features/worldmap/WorldLocation";
import type {IgtFeatures} from "common/features/IgtFeatures";
import type {Road} from "common/features/worldmap/roads/Road";
import {RoadLocationIdentifier} from "common/features/worldmap/roads/RoadLocationIdentifier";
import type {RegionOfInterest} from "common/features/worldmap/roi/RegionOfInterest";
import type {TravelAction} from "common/features/worldmap/TravelAction";
import type {WorldSaveData} from "common/features/worldmap/WorldSaveData";
import {Dijkstra} from "common/features/worldmap/Dijkstra";
import {ActionId} from "common/features/actionlist/ActionId";
import {TravelGenerator} from "common/features/actionlist/instances/travel/TravelGenerator";

export class WorldMap extends IgtFeature {
    _actionQueue!: ActionQueue;
    _actionList!: ActionList;

    playerLocation: WorldLocationIdentifier;

    roads: Road[];
    rois: RegionOfInterest[];

    locations: WorldLocation[];

    constructor(roads: Road[], rois: RegionOfInterest[]) {
        super('world-map');
        this.roads = roads;
        this.rois = rois;

        this.locations = [...roads, ...rois];

        this.playerLocation = new RoiLocationIdentifier(WorldLocationId.TutorialStart);
    }


    initialize(features: IgtFeatures) {
        this._actionQueue = features.actionQueue;
        this._actionList = features.actionList;

        // this.getRoad(WorldLocationId.DocksToIsland).requirement = new KeyItemRequirement(features.keyItems, KeyItemId.BoatTicket);
    }


    /**
     * Try to move from the player location to the target, returns true if possible
     * @param target to move to
     */
    moveToLocation(target: WorldLocationIdentifier): boolean {
        const startingLocation = this.getLocationIdentifierAtEndOfQueue();

        if (startingLocation.equals(target)) {
            console.log(`You're already at ${target}`);
            return false;
        }

        const path = this.getPath(startingLocation, target, true);
        if (!path || path.length === 0) {
            console.log(`There is no road from ${startingLocation} to ${target}`);
            return false;
        }

        let lastSource = startingLocation;

        const travelActions = [];
        for (let i = 0; i < path.length; i++) {
            const road = path[i];
            const isReverse = road.to.equals(lastSource);

            const travelAction = this._actionList.getAction(ActionId.TravelAction, null, road.identifier.id, isReverse) as TravelAction;
            travelActions.push(travelAction)
            lastSource = (travelAction as TravelAction).to;
        }
        const generator = new TravelGenerator(travelActions);
        this._actionQueue.addGenerator(generator);
        return true;
    }

    public getLocationIdentifierAtEndOfQueue(): WorldLocationIdentifier {
        return this._actionQueue.getPlayerLocationAtEndOfQueue() ?? this.playerLocation;
    }

    public getLocationAtEndOfQueue(): WorldLocation {
        return this.getLocation(this.getLocationIdentifierAtEndOfQueue());
    }

    getCurrentLocation(): WorldLocation | null {
        return this.getLocation(this.playerLocation)
    }

    getRoi(id: WorldLocationId): RegionOfInterest {
        return this.getLocation(new RoiLocationIdentifier(id)) as RegionOfInterest;
    }

    getRoad(id: WorldLocationId): Road {
        return this.getLocation(new RoadLocationIdentifier(id)) as Road;
    }

    getLocation(id: WorldLocationIdentifier) {
        for (const location of this.locations) {
            if (location.identifier.equals(id)) {
                return location;
            }
        }
        console.error(`Could not find location ${id}`);
        return null;
    }

    setLocation(target: WorldLocationIdentifier) {
        this.playerLocation = target;
    }

    areConnected(from: WorldLocationIdentifier, to: WorldLocationIdentifier): boolean {
        return this.getPath(from, to, true) !== null;
    }

    getPath(from: WorldLocationIdentifier, to: WorldLocationIdentifier, withRequirements: boolean): Road[] | null {
        // TODO make sure to only run this calculation on the client
        const dijkstra = new Dijkstra(this.roads);
        return dijkstra.solve(from, to, withRequirements);
    }

    load(data: WorldSaveData): void {
        if (!data?.location) {
            return;
        }
        const identifier = new WorldLocationIdentifier(data.location.type, data.location.id);

        if (this.getLocation(identifier)) {
            this.playerLocation = identifier;
        } else {
            this.playerLocation = new RoiLocationIdentifier(WorldLocationId.TutorialStart);
        }
    }

    save(): WorldSaveData {
        return {
            location: this.playerLocation.save()
        };
    }

    getCannotTravelReason(from: WorldLocationIdentifier, to: WorldLocationIdentifier): string {
        if (this.areConnected(from, to)) {
            return "";
        }
        const path = this.getPath(from, to, false);
        const reasons: string[] = [];
        path?.forEach(road => {
            if (!road.requirement.isCompleted) {
                reasons.push(road.requirement.hint);
            }
        })
        return reasons.join("\n");
    }
}
