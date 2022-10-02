import {TiledLayer} from "common/tiled/types/layers/TiledLayer";
import {TiledObject} from "common/tiled/types/objects/TiledObject";

/**
 * A layer containing objects
 */
export interface ObjectGroup extends TiledLayer {
    draworder: string;
    objects: TiledObject[];
}
