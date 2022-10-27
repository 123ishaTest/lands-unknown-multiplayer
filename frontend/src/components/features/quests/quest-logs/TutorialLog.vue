<script setup lang="ts">
import {TutorialQuest} from "common/features/quests/instances/tutorial/TutorialQuest";
import {computed} from "vue";
import {TutorialStepId} from "common/features/quests/instances/tutorial/TutorialStepId";

const props = defineProps<{
  quest: TutorialQuest,
}>()

const progress  = computed(() => {
  return props.quest.currentIndex;
})

</script>

<template>
  <div class="">
    <p class="text-lg font-semibold text-center">{{ quest.name }}</p>
    <div class="flex flex-col text-center">
      <span v-if="!quest.isStarted"> Maybe I can work with this survivor to get of this island</span>
      <p v-if="progress === TutorialStepId.Talk">I should explore the forest</p>
    </div>
  </div>

</template>

<style scoped>

</style>
