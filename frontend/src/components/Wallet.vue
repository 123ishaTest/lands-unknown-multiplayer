<script setup lang="ts">
import {IgtWallet} from "common/features/wallet/Wallet";

defineProps<{
  wallet: IgtWallet
}>()
</script>

<template>
  <div style="border: 1px solid black">
    <p>Wallet</p>
    <p>You have {{ wallet.money }} money</p>
  </div>
</template>

<style scoped>

</style>
