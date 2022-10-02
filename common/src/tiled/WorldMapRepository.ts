import * as tutorial from "common/tiled/maps/tutorial.json";

import {WorldMapId} from "common/tiled/WorldMapId";
import type {TiledMap} from "common/tiled/types/TiledMap";

export class WorldMapRepository {
    public static getWorldMap(id: WorldMapId): TiledMap {
        switch (id) {
            case WorldMapId.Tutorial:
                return tutorial as TiledMap;
            default:
                return tutorial as TiledMap;
        }
    }
}
