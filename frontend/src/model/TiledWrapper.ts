import type {TiledMap} from "common/tiled/types/TiledMap";
import type {TileSet} from "common/tiled/types/TileSet";
import {TravelType} from "common/features/worldmap/roads/TravelType";
import type {ObjectGroup} from "common/tiled/types/layers/ObjectGroup";
import type {TileLayer} from "common/tiled/types/layers/TileLayer";
import type {TiledLayer} from "common/tiled/types/layers/TiledLayer";
import {LayerType} from "common/tiled/types/layers/LayerType";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import type {ClickBox} from "common/tiled/types/clickboxes/ClickBox";
import type {WorldMapId} from "common/tiled/WorldMapId";
import {WorldMapRepository} from "common/tiled/WorldMapRepository";
import * as TileSets from "@/assets/tiled/tilesets";
import * as Images from "@/assets/tiled/images";

/**
 * Wrapper to work with Tiled maps.
 * Support is very limited at the moment. It can render tiles and areas as clickboxes.
 * Text is also shown, but not all properties are supported.
 */
export class TiledWrapper {

    clickBoxes: ClickBox[] = [];
    canvas: HTMLCanvasElement
    playerCanvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D;

    worldMap!: TiledMap;
    tileHeight!: number;
    tileWidth!: number;

    tileSets: TileSet[] = [];

    isHoveringOverClickBox: boolean = false;

    tileSetsLoaded = 0;

    /**
     * Called when a ClickBox is clicked
     */
    onClickBoxClicked: Function

    playerImage: HTMLImageElement;
    // TODO load player
    playerImagedLoaded = true;

    currentScale: number = 1;

    constructor(canvas: HTMLCanvasElement, playerCanvas: HTMLCanvasElement, onClickBoxClicked: Function) {
        this.canvas = canvas;
        this.playerCanvas = playerCanvas;

        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;

        this.onClickBoxClicked = onClickBoxClicked;

        this.playerImage = new Image();
        this.playerImage.onload = () => {
            this.playerImagedLoaded = true;
            this.checkIfReady()
        }

        // this.playerImage.src = Images.character;
    }

    renderTileMap(id: WorldMapId) {
        this.worldMap = WorldMapRepository.getWorldMap(id);
        this.tileHeight = this.worldMap.tileheight;
        this.tileWidth = this.worldMap.tilewidth;

        this.canvas.width = this.worldMap.width * this.tileWidth;
        this.canvas.height = this.worldMap.height * this.tileHeight;

        this.playerCanvas.width = this.worldMap.width * this.tileWidth;
        this.playerCanvas.height = this.worldMap.height * this.tileHeight;

        this.tileSets = this.worldMap.tilesets.map((tileSet: { firstgid: number; source: string }) => {
            const jsonId = this.getJsonId(tileSet.source);

            const imageCache = new Image();

            // @ts-ignore
            imageCache.src = Images[jsonId]

            imageCache.onload = () => {
                this.tileSetsLoaded++;
                this.checkIfReady();
            }
            return {
                imageCache: imageCache,
                firstgid: tileSet.firstgid,
                // @ts-ignore
                ...TileSets[jsonId],
            };
        });
    }

    globalToTilePosition(global: WorldPosition): WorldPosition {
        return {
            x: Math.floor(global.x / this.tileWidth),
            y: Math.floor(global.y / this.tileHeight),
        }
    }

    checkIfReady() {
        if (this.tileSetsLoaded !== this.tileSets.length) {
            return false;
        }
        if (!this.playerImagedLoaded) {
            return false;
        }

        this.render();
    }

    renderPlayer(x: number, y: number, roads: WorldPosition[][] = [[]], travelType: TravelType = TravelType.Walk) {
        const ctx = this.playerCanvas.getContext("2d") as CanvasRenderingContext2D;
        ctx.clearRect(0, 0, this.playerCanvas.width, this.playerCanvas.height);

        // Paths
        ctx.lineWidth = 2;
        roads.forEach((worldPositions) => {
            ctx.strokeStyle = 'red';

            ctx.beginPath();

            worldPositions.forEach(position => {
                const x = (position.x + 0.5) * this.tileWidth;
                const y = (position.y + 0.5) * this.tileHeight;
                ctx.lineTo(x, y);
            });
            ctx.stroke();
        });

        ctx.drawImage(this.playerImage, x * this.tileWidth, y * this.tileHeight, this.tileWidth, this.tileHeight)
    }

    getJsonId(source: string): string {
        const ending = source.split("/");
        const fileName = ending[ending.length - 1];
        return fileName.split(".json")[0];
    }

    indexToXY(index: number, width: number) {
        const x = index % width;
        const y = Math.floor(index / width)
        return [x, y]
    }

    isPointInRectangle(px: number, py: number, rx: number, ry: number, rw: number, rh: number): boolean {
        if (px < rx || px > rx + rw) {
            return false;
        }
        if (py < ry || py > ry + rh) {
            return false;
        }
        return true;
    }

    getCursorPosition(event: MouseEvent) {
        const rect = this.playerCanvas.getBoundingClientRect()
        const x = (event.clientX - rect.left) / this.currentScale;
        const y = (event.clientY - rect.top) / this.currentScale;
        return [x, y];
    }

    private renderObjectGroup(layer: ObjectGroup) {
        for (let i = 0; i < layer.objects.length; i++) {
            const object = layer.objects[i];

            if (object.text) {
                this.ctx.font = `${object.text.pixelsize}px ${object.text.fontfamily}`;
                this.ctx.textAlign = 'center'
                this.ctx.textBaseline = 'middle'
                this.ctx.fillStyle = object.text.color ?? "black";
                this.ctx.fillText(object.text.text, object.x + object.width / 2, object.y + object.height / 2);
            }
            if (object.properties) {
                this.ctx.beginPath();
                this.ctx.strokeStyle = "black";
                this.ctx.rect(object.x, object.y, object.width, object.height);
                this.ctx.stroke();
                this.clickBoxes.push(object)
            }
        }
    }

    private getTileSetFromGid(id: number) {
        let highestFound = -1;
        let highestIndex = -1;
        for (let i = 0; i < this.tileSets.length; i++) {
            if (id >= this.tileSets[i].firstgid) {
                if (this.tileSets[i].firstgid >= highestFound) {
                    highestFound = this.tileSets[i].firstgid
                    highestIndex = i;
                }
            }
        }
        return this.tileSets[highestIndex];
    }

    private renderTileLayer(layer: TileLayer) {
        const data = layer.data;
        const width = layer.width;
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0) {
                continue;
            }
            const [destinationX, destinationY] = this.indexToXY(i, width)

            const tileSet = this.getTileSetFromGid(data[i]);

            const [sourceX, sourceY] = this.indexToXY(data[i] - tileSet.firstgid, tileSet.columns)
            const spacing = tileSet.spacing;
            const sx = sourceX * (this.tileWidth + spacing);
            const sy = sourceY * (this.tileHeight + spacing);
            const dx = destinationX * this.tileWidth;
            const dy = destinationY * this.tileHeight;

            const img = tileSet.imageCache;
            this.ctx.drawImage(img, sx, sy, this.tileWidth, this.tileHeight, dx, dy, this.tileWidth, this.tileHeight);
        }
    }

    renderLayer(layer: TiledLayer) {
        switch (layer.type as LayerType) {
            case LayerType.TileLayer:
                this.renderTileLayer(layer as TileLayer);
                break;
            case LayerType.ObjectGroup:
                this.renderObjectGroup(layer as ObjectGroup);
                break;
        }
    }


    render() {
        for (let i = 0; i < this.worldMap.layers.length; i++) {
            this.renderLayer(this.worldMap.layers[i])
        }

        this.playerCanvas.onmousemove = (event: MouseEvent) => {
            const [mouseX, mouseY] = this.getCursorPosition(event);
            for (const clickBox of this.clickBoxes) {
                if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
                    this.isHoveringOverClickBox = true;
                    return;
                }
            }
            this.isHoveringOverClickBox = false;
        }

        this.playerCanvas.onclick = (event: MouseEvent) => {
            // get the mouse position
            const [mouseX, mouseY] = this.getCursorPosition(event);
            // iterate each shape in the shapes array
            for (let i = 0; i < this.clickBoxes.length; i++) {
                const clickBox = this.clickBoxes[i];
                if (this.isPointInRectangle(mouseX, mouseY, clickBox.x, clickBox.y, clickBox.width, clickBox.height)) {
                    this.onClickBoxClicked(clickBox);
                }
            }
        }
    }

}
