<script setup lang="ts">
import ProgressBar from "@/components/tools/ProgressBar.vue";
import type {Skill} from "common/features/skills/Skill";
import {computed} from "vue";

const props = defineProps<{
  image: string,
  skill: Skill,
  fgColor: string,
}>()

const progress = computed(() => {
  return props.skill.getLevelProgress()
})

const percentage = computed(() => {
  return props.skill.getLevelProgress().getPercentage()
})

const skillImage = computed(() => {
  return new URL(`/src/assets/skills/${props.image}.png`, import.meta.url).href;
});

</script>

<template>
  <div class="border-2 rounded border-black flex flex-col" :title="skill.name">
    <div class="flex flex-row items-center justify-center w-16 h-12">
      <img style="width: 32px; height: 36px" :src="skillImage" :alt="skill.name" class="pixelated">
      <span>{{ skill.getLevel() }}</span>
    </div>
    <ProgressBar
        class="rounded-none"
        :percentage="percentage"
        :fg-class="fgColor"
        bg-class="bg-gray-300"
        :title="Math.floor(progress.actual)+ '/' + Math.ceil(progress.target)"
    >
    </ProgressBar>
  </div>

</template>

<style scoped>

</style>
