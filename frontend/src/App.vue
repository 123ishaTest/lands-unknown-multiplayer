<script setup lang="ts">
import LoginFlow from "@/components/LoginFlow.vue";
import Wallet from "@/components/Wallet.vue";
import {player} from "common/Content"
import {Connection} from "@/Connection";
import {ref} from "vue";
import _ from "lodash";

let ourPlayer = ref(player)
Connection.onGameStateSync.subscribe((gameState) => {
  ourPlayer = ref(_.merge(ourPlayer.value, gameState.data));
})
</script>

<template>
  <div>
    <p>Epic game</p>

    <LoginFlow></LoginFlow>
    <Wallet :wallet="ourPlayer.wallet"></Wallet>
  </div>
</template>

<style scoped>

</style>
