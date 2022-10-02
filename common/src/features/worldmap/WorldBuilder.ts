import {WorldPosition} from "common/tiled/types/WorldPosition";
import {ObjectProperty} from "common/tiled/types/objects/ObjectProperty";
import {Road} from "common/features/worldmap/roads/Road";
import {ObjectGroup} from "common/tiled/types/layers/ObjectGroup";
import {TravelType} from "common/features/worldmap/roads/TravelType";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {RoadLocationIdentifier} from "common/features/worldmap/roads/RoadLocationIdentifier";
import {TiledLayer} from "common/tiled/types/layers/TiledLayer";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import {RegionOfInterest} from "common/features/worldmap/roi/RegionOfInterest";
import {WorldMap} from "common/features/worldmap/WorldMap";
import {TiledMap} from "common/tiled/types/TiledMap";
import {EmptyRoi} from "common/features/worldmap/roi/EmptyRoi";

export class WorldBuilder {

    static globalToTilePosition(map: TiledMap, global: WorldPosition): WorldPosition {
        const tileHeight = map.tileheight;
        const tileWidth = map.tilewidth;
        return {
            x: Math.floor(global.x / tileWidth),
            y: Math.floor(global.y / tileHeight),
        }
    }

    static getPropertyValue(
        properties: ObjectProperty[], targetName: string) {
        const property = properties.find(property => {
            return property.name === targetName;
        })
        return property?.value
    }

    static parsePaths(map: TiledMap): Road[] {
        const pathLayer = this.getLayer(map, "Navigation") as ObjectGroup;

        return pathLayer?.objects?.filter(object => {
            // Skip single points, we will parse them later.
            return !object.point
        }).map(object => {

            const properties = object.properties as ObjectProperty[];
            const from = this.getPropertyValue(properties, "from")
            const to = this.getPropertyValue(properties, "to")
            const roadType = this.getPropertyValue(properties, "type") ?? TravelType.Walk;
            const id = `${from}-${to}` as WorldLocationId;
            const baseDuration = this.getPropertyValue(properties, "baseDuration")

            const points = object.polyline?.map(position => {
                return this.globalToTilePosition(map, {
                    x: position.x + object.x,
                    y: position.y + object.y,
                });
            }) ?? [];
            return new Road(new RoadLocationIdentifier(id), "Road", new RoiLocationIdentifier(from), new RoiLocationIdentifier(to), points, baseDuration, roadType);
        });
    }

    static getLayer(map: TiledMap, name: string): TiledLayer {
        return map.layers.find(layer => {
            return layer.name === name;
        }) as TiledLayer;
    }

    static parseWorldLocations(map: TiledMap): Record<WorldLocationId, WorldPosition> {
        const hitBoxLayer = this.getLayer(map, "Hitboxes") as ObjectGroup;
        const positions = {} as Record<WorldLocationId, WorldPosition>

        hitBoxLayer?.objects?.filter(object => {
            // Only parse points.
            return object.point
        }).forEach(object => {
            positions[object.name as WorldLocationId] = this.globalToTilePosition(map, {x: object.x, y: object.y});
        });
        return positions;
    }

    static createWorld(map: TiledMap): WorldMap {
        const roads = this.parsePaths(map);
        const worldPositions = this.parseWorldLocations(map);

        const rois = [
            new RegionOfInterest(new RoiLocationIdentifier(WorldLocationId.StartingHouse), "Starting House", worldPositions[WorldLocationId.StartingHouse], []),
        ]

        // Delete WorldPositions already defined as ROIs
        for (const roi of rois) {
            delete worldPositions[roi.identifier.id];
        }

        // So we can create "empty" regions for the rest
        for (const [key, value] of Object.entries(worldPositions)) {
            rois.push(new EmptyRoi(new RoiLocationIdentifier(key as WorldLocationId), key, value))
        }

        return new WorldMap(roads, rois);
    }

}
