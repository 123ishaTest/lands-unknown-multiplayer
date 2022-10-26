<script setup lang="ts">
import {computed} from "vue";
import KeyItem from "@/components/features/keyitems/KeyItem.vue";
import {LocalPlayer} from "@/model/LocalPlayer";

const keyItems = computed(() => {
  return LocalPlayer.player.keyItems
})
</script>

<template>
  <div class="panel">
    <div class="flex flex-row flex-wrap justify-between gap-2">
      <KeyItem v-for="item in keyItems.items" :key="item.id" :item="item"></KeyItem>
    </div>
  </div>
</template>

<style scoped>

</style>
