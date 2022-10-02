import {TiledLayer} from "common/tiled/types/layers/TiledLayer";

/**
 * The layer which holds actual tile data
 */
export interface TileLayer extends TiledLayer {
    data: number[];
}
