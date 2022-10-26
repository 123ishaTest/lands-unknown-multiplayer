import type {WorldPosition} from "common/tiled/types/WorldPosition";
import type {ObjectProperty} from "common/tiled/types/objects/ObjectProperty";
import {Road} from "common/features/worldmap/roads/Road";
import type {ObjectGroup} from "common/tiled/types/layers/ObjectGroup";
import {TravelType} from "common/features/worldmap/roads/TravelType";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";
import {RoadLocationIdentifier} from "common/features/worldmap/roads/RoadLocationIdentifier";
import type {TiledLayer} from "common/tiled/types/layers/TiledLayer";
import {RoiLocationIdentifier} from "common/features/worldmap/roi/RoiLocationIdentifier";
import {RegionOfInterest} from "common/features/worldmap/roi/RegionOfInterest";
import {WorldMap} from "common/features/worldmap/WorldMap";
import type {TiledMap} from "common/tiled/types/TiledMap";
import {TiledObject} from "common/tiled/types/objects/TiledObject";
import {FacilityType} from "common/features/facilities/FacilityType";
import {GeneratorId} from "common/features/actionlist/GeneratorId";
import {NpcId} from "common/features/npcs/NpcId";

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

    static parseFacilities(object: TiledObject): FacilityType[] {
        const facilitiesProperty = object?.properties?.find(property => {
            return property?.propertytype === "Facilities"
        });
        if (!facilitiesProperty) {
            return [];
        }
        return facilitiesProperty.value.split(",");
    }

    static parseNpcs(object: TiledObject): NpcId[] {
        const npcsProperty = object?.properties?.find(property => {
            return property?.propertytype === "Npcs"
        });
        if (!npcsProperty) {
            return [];
        }
        return npcsProperty.value.split(",");
    }

    static parseGenerators(object: TiledObject): GeneratorId[] {
        const generatorProperty = object?.properties?.find(property => {
            return property?.name === "generators";
        });
        if (!generatorProperty) {
            return [];
        }
        return generatorProperty.value.split(",");
    }

    static parseWorldLocations(map: TiledMap): RegionOfInterest[] {
        const hitBoxLayer = this.getLayer(map, "Hitboxes") as ObjectGroup;

        return hitBoxLayer?.objects?.filter(object => {
            // Only parse points.
            return object.point
        }).map(object => {
            const worldPosition = this.globalToTilePosition(map, {x: object.x, y: object.y});
            const facilities = this.parseFacilities(object);
            const generators = this.parseGenerators(object);
            const npcs = this.parseNpcs(object);
            return new RegionOfInterest(object.name as WorldLocationId, object.name, worldPosition, generators, facilities, npcs)
        });
    }

    static createWorld(map: TiledMap): WorldMap {
        const roads = this.parsePaths(map);
        const rois = this.parseWorldLocations(map);
        return new WorldMap(roads, rois);
    }

}
