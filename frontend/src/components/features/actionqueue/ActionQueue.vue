<script setup lang="ts">
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import ProgressBar from "@/components/tools/ProgressBar.vue";

defineProps<{
  queue: ActionQueue
}>()
</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <div v-if="queue.currentAction">
      <p class="text-xl">Current action</p>
      <hr class="mb-4 border-black">


      <p>{{ queue.currentAction.description }}</p>
      <p>{{ queue.currentAction.getProgress() }}</p>
      <ProgressBar :percentage="queue.currentAction.getProgress().getPercentage()" bg-class="bg-pink-200"
                   fg-class="bg-pink-500"></ProgressBar>
    </div>
    <hr class="mb-4 border-black">

    <p class="text-xl">Generators</p>
    <hr class="mb-4 border-black">

    <div v-for="(generator) in queue.generators">
      <span>- {{ generator.description }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>
