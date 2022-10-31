<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import ActionQueue from "@/components/features/actionqueue/ActionQueue.vue";
import Skills from "@/components/features/skills/Skills.vue";
import WorldMap from "@/components/features/worldmap/WorldMap.vue";
import {ApiClient} from "@/model/ApiClient";
import {LocalPlayer} from "@/model/LocalPlayer";
import Inventory from "@/components/features/inventory/Inventory.vue";
import Equipment from "@/components/features/equipment/Equipment.vue";
import KeyItems from "@/components/features/keyitems/KeyItems.vue";
import ToolBelt from "@/components/features/toolbelt/ToolBelt.vue";
import Quests from "@/components/features/quests/Quests.vue";

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
          <KeyItems></KeyItems>
          <ToolBelt :tool-belt="LocalPlayer.player.toolBelt"></ToolBelt>
          <Equipment class="flex-grow" :equipment="LocalPlayer.player.equipment"></Equipment>
        </div>
        <div class="flex flex-col flex-grow">
          <WorldMap class="flex-grow h-96"
                    :world-map="LocalPlayer.player.worldMap"
                    :queue="LocalPlayer.player.actionQueue"
                    :facility-list="LocalPlayer.player.facilityList"
                    :action-list="LocalPlayer.player.actionList"
                    :generator-list="LocalPlayer.player.generatorList"
          ></WorldMap>
          <Quests class="h-56" :quests="LocalPlayer.player.quests"></Quests>
        </div>
        <div class="flex flex-col w-96">
          <ActionQueue class="h-72" :queue="LocalPlayer.player.actionQueue"></ActionQueue>
          <Inventory class="flex-grow" :inventory="LocalPlayer.player.inventory"></Inventory>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
