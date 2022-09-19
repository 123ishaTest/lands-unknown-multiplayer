<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import Wallet from "@/components/Wallet.vue";
import {player} from "common/Content"
import {Connection} from "@/Connection";
import {ref} from "vue";
import _ from "lodash";

let ourPlayer = ref(player)
Connection.onGameStateSync.subscribe((gameState) => {
  _.merge(ourPlayer.value, gameState.data);
})
</script>

<template>
  <div>
    <p class="bg-red-100">Epic game</p>
    Hello world!
    <LoginFlow></LoginFlow>
    <Wallet :wallet="ourPlayer.wallet"></Wallet>
  </div>
</template>

<style scoped>

</style>
