<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import ActionQueue from "@/components/features/actionqueue/ActionQueue.vue";
import Skills from "@/components/features/skills/Skills.vue";
import WorldMap from "@/components/features/worldmap/WorldMap.vue";
import {ApiClient} from "@/model/ApiClient";
import {LocalPlayer} from "@/model/LocalPlayer";
import Inventory from "@/components/features/inventory/Inventory.vue";

LocalPlayer.init()

ApiClient.onGameStateSync.subscribe((gameState) => {
  LocalPlayer.player.load(gameState.data);
  LocalPlayer.player.isLoggedIn = true;
})

</script>

<template>
  <div>
    <div class="flex flex-row h-12 bg-gray-400 justify-center items-center shadow-2xl">
      <p class="text-xl font-bold">Lands Unknown Multiplayer ({{ LocalPlayer.player.userName }})</p>
    </div>
    <LoginFlow v-if="!LocalPlayer.player.isLoggedIn"></LoginFlow>

    <div v-else>
      <div class="flex flex-row flex-wrap">
        <div class="flex flex-col w-96">
          <Skills :skills="LocalPlayer.player.skills"></Skills>
        </div>
        <WorldMap class="flex-grow w-96"
                  :world-map="LocalPlayer.player.worldMap"
                  :queue="LocalPlayer.player.actionQueue"
                  :facility-list="LocalPlayer.player.facilityList"
                  :action-list="LocalPlayer.player.actionList"
                  :generator-list="LocalPlayer.player.generatorList"
        ></WorldMap>
        <div class="flex flex-col w-96">
          <ActionQueue class="h-96" :queue="LocalPlayer.player.actionQueue"></ActionQueue>
          <Inventory class=flex-grow :inventory="LocalPlayer.player.inventory"></Inventory>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
