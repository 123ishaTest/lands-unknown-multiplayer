<script setup lang="ts">
import {WorldMap} from "common/features/worldmap/WorldMap";
import {TravelRequest} from "common/api/TravelRequest";
import {ApiClient} from "@/model/ApiClient";
import {WorldLocationType} from "common/features/worldmap/WorldLocationType";
import {WorldLocationId} from "common/features/worldmap/WorldLocationId";

defineProps<{
  worldMap: WorldMap
}>()

const moveToDocks = () => {
  ApiClient.send(new TravelRequest(), {
    "type": WorldLocationType.RegionOfInterest,
    "target": WorldLocationId.Docks,
  })
}

const moveSomewhereElse = () => {
  ApiClient.send(new TravelRequest(), {
    "type": WorldLocationType.RegionOfInterest,
    "target": WorldLocationId.OtherPlace,
  })
}

</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <p>Worldmap goes here</p>
    <p>You are here: {{ worldMap.playerLocation }}</p>
    <button class="border-2 m-2 p-4 border-black" @click="moveToDocks">Move to Docks</button>
    <button class="border-2 m-2 p-4 border-black" @click="moveSomewhereElse">Move to Somewhere Else</button>
  </div>
</template>

<style scoped>

</style>
