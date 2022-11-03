<script setup lang="ts">
import {TutorialQuest} from "common/features/quests/instances/tutorial/TutorialQuest";
import {computed} from "vue";
import {TutorialStepId} from "common/features/quests/instances/tutorial/TutorialStepId";

const props = defineProps<{
  quest: TutorialQuest,
}>()

const progress = computed(() => {
  return props.quest.currentIndex;
})

const currentStep = computed(() => {
  return props.quest.currentStep;
})

</script>

<template>
  <div class="">
    <span>{{ quest.currentIndex }} / {{ quest.steps.length }}</span>
    <p class="text-lg font-semibold text-center">{{ quest.name }}</p>
    <div class="flex flex-col text-center">
      <span v-if="!quest.isStarted"> Maybe I can work with this survivor to get of this island</span>
      <span v-if="quest.isStarted" class="line-through">The Survivor is badly injured. If we work together, maybe we can get of this island</span>

      <span v-if="progress === TutorialStepId.GoFish">I should travel to the ocean on the east to see if I can capture some
        shrimps</span>
      <span v-if="progress === TutorialStepId.GoFish">I have caught {{ currentStep.getProgress() }} shrimps</span>
      <span v-if="progress > TutorialStepId.GoFish" class="line-through">I have caught enough shrimps</span>
      <span v-if="progress === TutorialStepId.DeliverFish">Let's ask the Survivor what I should do with them</span>
      <span v-if="progress > TutorialStepId.DeliverFish" class="line-through">Turns out you can't eat raw fish, let's try to cook it</span>
      <span v-if="progress === TutorialStepId.InspectBrokenShip">He told me to check the shipwreck to see if the range still works</span>
      <span v-if="progress > TutorialStepId.InspectBrokenShip" class="line-through">Arriving at the shipwreck, I can see that the range still works, unfortunately I need wood to use it</span>
      <span v-if="progress === TutorialStepId.DiscussWithSurvivor">Maybe the Survivor knows where I can find wood</span>
      <span
          v-if="progress === TutorialStepId.ChopWood">There is a small tree to the north, I have chopped {{
          currentStep.getProgress()
        }} wood from it
      </span>
      <span v-if="progress === TutorialStepId.CookShrimp">I have cooked {{ currentStep.getProgress() }} shrimps</span>
      <span v-if="progress > TutorialStepId.CookShrimp" class="line-through">The cooked shrimp smell quite nice</span>
      <span v-if="progress === TutorialStepId.HealAdventurer">Let's bring them back, see if it helps</span>

      <span v-if="quest.isCompleted">Finally we made it of, now let's see what this world has to offer.</span>
    </div>
  </div>

</template>

<style scoped>

</style>
