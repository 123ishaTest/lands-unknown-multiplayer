<script setup lang="ts">
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import type {WorldMap} from "common/features/worldmap/WorldMap";
import {computed, onMounted, type Ref, ref} from "vue";
import {TiledWrapper} from "@/model/TiledWrapper";
import {WorldMapId} from "common/tiled/WorldMapId";
import Panzoom from "@panzoom/panzoom";
import {ApiClient} from "@/model/ApiClient";
import type {WorldPosition} from "common/tiled/types/WorldPosition";
import {LocalPlayer} from "@/model/LocalPlayer";
import LocationHighlight from "@/components/features/worldmap/LocationHighlight.vue";
import type {FacilityList} from "common/features/facilities/FacilityList";
import type {ActionList} from "common/features/actionlist/ActionList";
import type {GeneratorList} from "common/features/actionlist/GeneratorList";
import Dialog from "@/components/tools/dialog/Dialog.vue";

const props = defineProps<{
  worldMap: WorldMap,
  queue: ActionQueue,
  facilityList: FacilityList,
  actionList: ActionList,
  generatorList: GeneratorList,
}>()

const stackHeight = ref()
const tiledWrapper: Ref<TiledWrapper> = ref() as Ref<TiledWrapper>;

const worldPanzoom = ref();
const playerPanzoom = ref();

function updateStackHeight() {
  stackHeight.value = window.innerHeight - 100;
  return stackHeight;
}

const playerPosition = computed(() => {
  return props.queue.getTravelingPosition() ?? props.worldMap.getCurrentLocation()?.worldPosition as WorldPosition;
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

const highlightedLocation = ref();
const showHighlight = computed(() => {
  return highlightedLocation.value != null;
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
      // TODO check type
      (clickBox: any) => {
        const id = clickBox.properties[0].value;
        highlightedLocation.value = props.worldMap.getRoi(id)
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
      <div class="w-full flex flex-col justify-between h-full text-white absolute z-30 pointer-events-none	">
        <div class="flex flex-row">
          <div class="h-min p-2 bg-gray-600 opacity-90 flex flex-col flex-grow">
            <span>Location: {{ worldMap.playerLocation.id }}: {{ playerPosition }} </span>
            <span>end of queue: {{ queue.getPlayerLocationAtEndOfQueue() }}</span>
          </div>
          <LocationHighlight v-if="showHighlight"
                             class="pointer-events-auto"
                             :facility-list="facilityList"
                             :action-list="actionList"
                             :generator-list="generatorList"
                             :location="highlightedLocation">
          </LocationHighlight>
        </div>

        <Dialog class="w-full p-4 z-30 pointer-events-auto"></Dialog>

      </div>
      <div class="w-full h-full block">
        <canvas id="world-canvas" class="pixelated absolute z-10"
                :class="{'cursor-pointer': showPointer}">
        </canvas>
        <canvas id="player-canvas" class="pixelated absolute z-20"
                :class="{'cursor-pointer': showPointer}"></canvas>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
