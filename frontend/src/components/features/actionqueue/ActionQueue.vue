<script setup lang="ts">
import type {ActionQueue} from "common/features/actionqueue/ActionQueue";
import ProgressBar from "@/components/tools/ProgressBar.vue";
import {computed} from "vue";

const props = defineProps<{
  queue: ActionQueue
}>()

const hasGenerators = computed(() => {
  return props.queue.generators.length > 0;
});

const hasCurrentAction = computed(() => {
  return props.queue.currentAction != null;
});

</script>

<template>
  <div class="panel overflow-y-auto">
    <div v-if="hasCurrentAction">
      <p class="text-xl">Current action</p>
      <hr class="mb-4 border-black">

      <p>{{ queue.currentAction.description }}</p>
      <p>{{ queue.currentAction.getProgress() }}</p>
      <ProgressBar :percentage="queue.currentAction.getProgress().getPercentage()" bg-class="bg-pink-200"
                   fg-class="bg-pink-500"></ProgressBar>
      <hr class="mb-4 border-black">
    </div>

    <div v-if="hasGenerators">
      <p class="text-xl">Generators</p>
      <hr class="mb-4 border-black">
      <div v-for="(generator) in queue.generators">
        <span>- {{ generator.description }} ({{ generator.repeats }})</span>
      </div>
    </div>
    <span class="italic" v-if="!hasGenerators && !hasCurrentAction">Interact with the World to schedule actions!</span>
  </div>
</template>

<style scoped>

</style>
