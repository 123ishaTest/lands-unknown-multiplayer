<script setup lang="ts">
import {WorldMap} from "common/features/worldmap/WorldMap";
import {onMounted, Ref, ref} from "vue";
import {TiledWrapper} from "@/model/TiledWrapper";
import {WorldMapId} from "common/tiled/WorldMapId";

defineProps<{
  worldMap: WorldMap
}>()

const stackHeight = ref()
const tiledWrapper: Ref<TiledWrapper> = ref() as Ref<TiledWrapper>;

function updateStackHeight() {
  stackHeight.value = window.innerHeight - 200;
  return stackHeight;
}

const showPointer = true;

onMounted(() => {
  window.onresize = () => {
    updateStackHeight();
  }
  updateStackHeight();
  const worldCanvas = document.getElementById('world-canvas') as HTMLCanvasElement;
  const playerCanvas = document.getElementById('player-canvas') as HTMLCanvasElement;
  if (!worldCanvas || !playerCanvas) {
    console.warn("Could not load canvases");
    return;
  }
  tiledWrapper.value = new TiledWrapper(
      worldCanvas,
      playerCanvas,
      // TODO check type
      (clickBox: any) => {
        const townId = clickBox.properties[0].value;
        // this.showHighlight(new TownLocationIdentifier(townId));
      }
  )
  tiledWrapper.value.renderTileMap(WorldMapId.Tutorial);

  const panZoomOptions = {
    disableZoom: false,
    minScale: 0.8,
    maxScale: 5,
    contain: 'outside',
    canvas: true,
  };
  // this.worldPanZoom = Panzoom(this.tiledWrapper.canvas, panZoomOptions)
  // this.playerPanZoom = Panzoom(this.tiledWrapper.playerCanvas, panZoomOptions)
  // this.tiledWrapper.canvas.parentElement.addEventListener('wheel', this.worldPanZoom.zoomWithWheel)
  // this.tiledWrapper.canvas.parentElement.addEventListener('wheel', () => {
  //   this.tiledWrapper.currentScale = this.worldPanZoom.getScale();
  // })
  // this.tiledWrapper.playerCanvas.parentElement.addEventListener('wheel', this.playerPanZoom.zoomWithWheel)
  // setTimeout(() => {
  //   this.worldPanZoom.pan(-770, -800);
  // })
  // setTimeout(() => {
  //   this.playerPanZoom.pan(-770, -800);
  // })
})

</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <p>You are here: {{ worldMap.playerLocation }}</p>
    <div id="canvas-stack" class="w-full relative"
         :style="'height:' + stackHeight + 'px;'">
      <canvas id="world-canvas" class="pixelated absolute z-10"
              :class="{'cursor-pointer': showPointer}">
      </canvas>
      <canvas id="player-canvas" class="pixelated absolute z-20"
              :class="{'cursor-pointer': showPointer}"></canvas>
    </div>
  </div>
</template>

<style scoped>

</style>
