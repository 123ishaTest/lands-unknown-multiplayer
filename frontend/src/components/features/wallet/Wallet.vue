<script setup lang="ts">
import type {IgtWallet} from "common/features/wallet/Wallet";

defineProps<{
  wallet: IgtWallet
}>()
</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <p class="text-xl">Wallet</p>
    <hr class="mb-4 border-black">
    <p>You have {{ wallet.money }} money</p>
  </div>
</template>

<style scoped>

</style>
