<script setup lang="ts">
import {ActionQueue} from "common/features/actionqueue/ActionQueue";
import ProgressBar from "@/components/tools/ProgressBar.vue";

defineProps<{
  queue: ActionQueue
}>()
</script>

<template>
  <div style="border: 1px solid black">
    <p>Action Queue</p>
    <ProgressBar v-if="queue.actions.length > 0" :percentage="queue.actions[0].getProgress().getPercentage()" bg-class="bg-red-100" fg-class="bg-black"></ProgressBar>
  </div>
</template>

<style scoped>

</style>
