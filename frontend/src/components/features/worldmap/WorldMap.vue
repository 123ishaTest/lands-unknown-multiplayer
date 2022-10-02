<script setup lang="ts">
import {WorldMap} from "common/features/worldmap/WorldMap";
import {onMounted, Ref, ref} from "vue";
import {TiledWrapper} from "@/model/TiledWrapper";
import {WorldMapId} from "common/tiled/WorldMapId";
import Panzoom from "@panzoom/panzoom";

defineProps<{
  worldMap: WorldMap
}>()

const stackHeight = ref()
const tiledWrapper: Ref<TiledWrapper> = ref() as Ref<TiledWrapper>;

const worldPanzoom = ref();
const playerPanzoom = ref();

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
  worldPanzoom.value = Panzoom(tiledWrapper.value.canvas, panZoomOptions)
  playerPanzoom.value = Panzoom(tiledWrapper.value.playerCanvas, panZoomOptions)
  tiledWrapper.value.canvas.parentElement?.addEventListener('wheel', worldPanzoom.value.zoomWithWheel)
  tiledWrapper.value.canvas.parentElement?.addEventListener('wheel', () => {
    tiledWrapper.value.currentScale = worldPanzoom.value.getScale();
  })
  tiledWrapper.value.playerCanvas.parentElement?.addEventListener('wheel', playerPanzoom.value.zoomWithWheel)
  // setTimeout(() => {
  //   this.worldPanZoom.pan(-770, -800);
  // })
  // setTimeout(() => {
  //   this.playerPanZoom.pan(-770, -800);
  // })
})

</script>

<template>
  <div class="m-2 overflow-hidden bg-pink-100 border-2 border-black">
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
