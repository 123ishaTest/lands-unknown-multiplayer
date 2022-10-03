<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import Wallet from "@/components/features/wallet/Wallet.vue";
import ActionQueue from "@/components/features/actionqueue/ActionQueue.vue";
import Skills from "@/components/features/skills/Skills.vue";
import WorldMap from "@/components/features/worldmap/WorldMap.vue";
import {ApiClient} from "@/model/ApiClient";
import {LocalPlayer} from "@/model/LocalPlayer";

LocalPlayer.init()

ApiClient.onGameStateSync.subscribe((gameState) => {
  LocalPlayer.player.load(gameState.data);
  LocalPlayer.player.isLoggedIn = true;
})

</script>

<template>
  <div>
    <div class="flex flex-row h-24 bg-pink-600 justify-center items-center">
      <p class="text-xl font-bold">Lands Unknown Multiplayer ({{LocalPlayer.player.userName}})</p>
    </div>
    <LoginFlow v-if="!LocalPlayer.player.isLoggedIn"></LoginFlow>

    <div v-else>
      <Wallet :wallet="LocalPlayer.player.wallet"></Wallet>
      <div class="flex flex-row flex-wrap">
        <WorldMap class="flex-grow w-96" :world-map="LocalPlayer.player.worldMap" :queue="LocalPlayer.player.actionQueue"></WorldMap>
        <ActionQueue class="w-96" :queue="LocalPlayer.player.actionQueue"></ActionQueue>
      </div>
      <Skills :skills="LocalPlayer.player.skills"></Skills>

    </div>
  </div>
</template>

<style scoped>

</style>
