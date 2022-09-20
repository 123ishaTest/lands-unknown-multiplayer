<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import Wallet from "@/components/features/wallet/Wallet.vue";
import {player} from "common/Content"
import {Connection} from "@/Connection";
import {reactive} from "vue";
import ActionQueue from "@/components/features/actionqueue/ActionQueue.vue";

player.initialize()
let ourPlayer = reactive(player)
Connection.onGameStateSync.subscribe((gameState) => {
  ourPlayer.load(gameState.data);
})
</script>

<template>
  <div>
    <p class="bg-red-100">Epic game</p>
    Hello world!
    <LoginFlow></LoginFlow>
    <Wallet :wallet="ourPlayer.wallet"></Wallet>
    <ActionQueue :queue="ourPlayer.actionQueue"></ActionQueue>
  </div>
</template>

<style scoped>

</style>
