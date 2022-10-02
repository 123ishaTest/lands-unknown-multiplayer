<script setup lang="ts">
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {WorldMap} from "common/features/worldmap/WorldMap";
import {computed, onMounted, type Ref, ref, watch} from "vue";
import {TiledWrapper} from "@/model/TiledWrapper";
import {WorldMapId} from "common/tiled/WorldMapId";
import Panzoom from "@panzoom/panzoom";
import {TravelAction} from "common/features/worldmap/TravelAction";
import {ApiClient} from "@/model/ApiClient";
import {TravelRequest} from "common/api/TravelRequest";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import {TravelType} from "common/features/worldmap/roads/TravelType";

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
  if (queue.isTraveling()) {
    return (queue.generators[0].currentAction as TravelAction).getWorldPosition()
  }
});


watch(playerPosition, (newPosition) => {
  if (!newPosition) {
    return;
  }
  const travelType = queue.isTraveling() ? ((queue.generators[0].currentAction as TravelAction).road.travelType) : TravelType.Walk;
  // TODO render planned roads
  tiledWrapper.value.renderPlayer(newPosition.x, newPosition.y, [], travelType);
});

const currentLocation = computed(() => {
  return worldMap.getCurrentLocation();
})

watch(currentLocation, (newLocation) => {
  if (!newLocation) {
    return;
  }
  tiledWrapper.value.renderPlayer(newLocation.worldPosition.x, newLocation.worldPosition.y)
})

const showPointer = computed(() => {
  return tiledWrapper.value && tiledWrapper.value.isHoveringOverClickBox;
});

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
      () => {
        const currentLocation = worldMap.getCurrentLocation();
        if (currentLocation) {
          tiledWrapper.value.renderPlayer(currentLocation.worldPosition.x, currentLocation.worldPosition.y)
        }
      },
      // TODO check type
      (clickBox: any) => {
        console.log("clicked box", clickBox)
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
})

</script>

<template>
  <div class="m-2 overflow-hidden bg-pink-100 border-2 border-black">
    <div id="canvas-stack" class="w-full relative"
         :style="'height:' + stackHeight + 'px;'">
      <div class="w-full h-12 p-2 flex flex-row items-center text-white bg-gray-700 opacity-70 absolute z-30">
        <span>You are currently at {{ worldMap.playerLocation.id }}: {{ playerPosition }}</span>
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
