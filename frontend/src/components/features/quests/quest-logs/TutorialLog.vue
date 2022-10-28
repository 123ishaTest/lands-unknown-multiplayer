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

const currentStep = computed(() => {
  return props.quest.currentStep;
})

</script>

<template>
  <div class="">
    <span>{{quest.currentIndex}} / {{quest.steps.length}}</span>
    <span>Progress {{currentStep?.getProgress()}}</span>
    <p class="text-lg font-semibold text-center">{{ quest.name }}</p>
    <div class="flex flex-col text-center">
      <span v-if="!quest.isStarted"> Maybe I can work with this survivor to get of this island</span>
      <p v-if="progress === TutorialStepId.GoFish">I should travel to the ocean on the east to see if I can capture some shrimps</p>
      <p v-if="progress > TutorialStepId.GoFish">I have caught enough shrimp</p>
      <p v-if="progress === TutorialStepId.GoFish">I have caught {{currentStep.getProgress()}} shrimps</p>
      <p v-if="progress > TutorialStepId.DeliverFish">Let's ask the Survivor what I should do with them</p>
    </div>
  </div>

</template>

<style scoped>

</style>
