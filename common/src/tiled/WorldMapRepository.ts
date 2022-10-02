import * as tutorial from "common/tiled/maps/tutorial.json";

import {WorldMapId} from "common/tiled/WorldMapId";
import {TiledMap} from "common/tiled/types/TiledMap";

export class WorldMapRepository {
    public static getWorldMap(id: WorldMapId): TiledMap {
        switch (id) {
            case WorldMapId.Tutorial:
                return tutorial as TiledMap;
            case WorldMapId.Overworld:
                break;
        }
    }
}
