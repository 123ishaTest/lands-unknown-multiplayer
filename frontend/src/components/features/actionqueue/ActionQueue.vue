<script setup lang="ts">
import {ActionQueue} from "common/features/actionqueue/ActionQueue";
import ProgressBar from "@/components/tools/ProgressBar.vue";

defineProps<{
  queue: ActionQueue
}>()
</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <p class="text-xl">Action Queue</p>
    <hr class="mb-4 border-black">
    <div v-if="queue.actions.length > 0">
      <ProgressBar :percentage="queue.actions[0].getProgress().getPercentage()" bg-class="bg-pink-200"
                   fg-class="bg-pink-500"></ProgressBar>
      <p>{{ queue.actions[0].description }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>
