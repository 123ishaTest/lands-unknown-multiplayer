<script setup lang="ts">
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {WorldMap} from "common/features/worldmap/WorldMap";
import {computed, onMounted, type Ref, ref} from "vue";
import {TiledWrapper} from "@/model/TiledWrapper";
import {WorldMapId} from "common/tiled/WorldMapId";
import Panzoom from "@panzoom/panzoom";
import {ApiClient} from "@/model/ApiClient";
import {TravelRequest} from "common/api/TravelRequest";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import {LocalPlayer} from "@/model/LocalPlayer";

const {worldMap, queue} = defineProps<{
  worldMap: WorldMap,
  queue: ActionQueue
}>()

const stackHeight = ref()
const tiledWrapper: Ref<TiledWrapper> = ref() as Ref<TiledWrapper>;

const worldPanzoom = ref();
const playerPanzoom = ref();

function updateStackHeight() {
  stackHeight.value = window.innerHeight - 200;
  return stackHeight;
}

const playerPosition = computed(() => {
  return queue.getTravelingPosition() ?? worldMap.getCurrentLocation()?.worldPosition as WorldPosition;
});

const showPointer = computed(() => {
  return tiledWrapper.value && tiledWrapper.value.isHoveringOverClickBox;
});

ApiClient.onPlayerPositionsSync.subscribe((sync) => {
  // Throw away ourselves from the server, overwrite with more accurate local data
  sync.data = sync.data.filter(position => {
    return position.displayName !== LocalPlayer.player.userName;
  })
  sync.data.push({
    displayName: LocalPlayer.player.userName,
    position: playerPosition.value,
  })
  tiledWrapper.value.renderPlayers(sync.data);
})


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
        ApiClient.send(new TravelRequest(), {
          "type": WorldLocationType.RegionOfInterest,
          "target": clickBox.properties[0].value,
        })
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
})

</script>

<template>
  <div class="m-2 overflow-hidden bg-pink-100 border-2 border-black">
    <div id="canvas-stack" class="w-full relative"
         :style="'height:' + stackHeight + 'px;'">
      <div class="w-full h-12 p-2 flex flex-row items-center text-white bg-gray-700 opacity-70 absolute z-30">
        <span>You are currently at {{ worldMap.playerLocation.id }}: {{ playerPosition }} end of queue: {{queue.getPlayerLocationAtEndOfQueue()}}</span>
      </div>
      <canvas id="world-canvas" class="pixelated absolute z-10"
              :class="{'cursor-pointer': showPointer}">
      </canvas>
      <canvas id="player-canvas" class="pixelated absolute z-20"
              :class="{'cursor-pointer': showPointer}"></canvas>
    </div>
  </div>
</template>

<style scoped>
.pixelated {
  image-rendering: -moz-crisp-edges;
  image-rendering: pixelated;
  -ms-interpolation-mode: nearest-neighbor;
}
</style>
