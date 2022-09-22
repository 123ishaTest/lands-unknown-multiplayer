<script setup lang="ts">
import {WorldMap} from "common/features/worldmap/WorldMap";

defineProps<{
  worldMap: WorldMap
}>()
</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <p>Worldmap goes here</p>
    <p>You are here: {{worldMap.playerLocation}}</p>
  </div>
</template>

<style scoped>

</style>
