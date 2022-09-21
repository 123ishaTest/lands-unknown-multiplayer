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
    <div v-if="queue.currentAction">

      <div v-for="(generator, index) in queue.generators">
        <div v-if="index === 0">
          <p>{{ generator.description }}</p>

<!--          {{generator.currentAction}}-->
          {{ generator.currentAction.currentProgress }}
          <ProgressBar :percentage="generator.currentAction.getProgress().getPercentage()" bg-class="bg-pink-200"
                       fg-class="bg-pink-500"></ProgressBar>
          <hr class="mb-4 border-black">
        </div>
        <p v-else>{{ generator.description }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
