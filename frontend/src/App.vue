<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import Wallet from "@/components/features/wallet/Wallet.vue";
import {player} from "common/Content"
import {Connection} from "@/Connection";
import {reactive} from "vue";
import ActionQueue from "@/components/features/actionqueue/ActionQueue.vue";
import type {Player} from "common/Player";

player.initialize()
let ourPlayer: Player = reactive(player) as Player
Connection.onGameStateSync.subscribe((gameState) => {
  ourPlayer.load(gameState.data);
  ourPlayer.isLoggedIn = true;
})
</script>

<template>
  <div>
    <div class="flex flex-row h-24 bg-pink-600 justify-center items-center">
      <p class="text-xl font-bold">Lands Unknown Multiplayer (for real this time)</p>
    </div>
    <LoginFlow v-if="!ourPlayer.isLoggedIn"></LoginFlow>

    <div v-else>
      <Wallet :wallet="ourPlayer.wallet"></Wallet>
      <ActionQueue :queue="ourPlayer.actionQueue"></ActionQueue>
    </div>
  </div>
</template>

<style scoped>

</style>
