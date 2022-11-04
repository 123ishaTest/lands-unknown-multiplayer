<script setup lang="ts">

import {AbstractQuest} from "common/features/quests/AbstractQuest";
import {computed} from "vue";
import {QuestStatus} from "common/features/quests/QuestStatus";

const props = defineProps<{
  quest: AbstractQuest,
}>()

const status = computed(() => {
  return props.quest.status;
})

const color = computed(() => {
  switch (status.value) {
    case QuestStatus.NotStarted:
      return 'text-red-500 hover:text-red-400';
    case QuestStatus.Started:
      return 'text-yellow-500 hover:text-yellow-400';
    case QuestStatus.Finished:
      return 'text-green-500 hover:text-green-400';
    default:
      return 'text-gray-500 hover:text-gray-400';
  }
})

</script>

<template>
  <div class="no-select cursor-pointer">
    <span :class="color">{{ quest.name }}</span>
  </div>

</template>

<style scoped>

</style>
