<script setup lang="ts">
import {keyItemImage} from "@/util/Images";
import {KeyItem} from "common/features/keyitems/KeyItem";

const props = defineProps<{
  item: KeyItem,
}>()

</script>

<template>
  <div class="w-12 h-12 b-2 bg-gray-500 m-0.5 border-gray-300 border-2 text-white text-sm lg:text-xl rounded"
       :class="{'bg-gray-400 grayscale': !item.isUnlocked}"
       :title="item.name + ' - ' + (item.isUnlocked ? item.description : item.unlockHint)"
    >
    <div class="flex flex-row items-center justify-center p-1">
      <img style="width: 32px; height: 32px;"
           class="pixelated"
           :src="keyItemImage(item.image)"
           :alt="item.name"
      >
    </div>

  </div>

</template>

<style scoped>

</style>
