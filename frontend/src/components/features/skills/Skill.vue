<script setup lang="ts">
import ProgressBar from "@/components/tools/ProgressBar.vue";
import {Skill} from "common/features/skills/Skill";
import {computed} from "vue";

const props = defineProps<{
  skill: Skill,
  fgColor: string,
}>()

const progress = computed(() => {
  return props.skill.getLevelProgress()
})

const percentage = computed(() => {
  return props.skill.getLevelProgress().getPercentage()
})

</script>

<template>
  <div class="border-2 border-black m-2 p-2">
    <div class="relative pt-1">
      <div class="flex justify-between">
        {{skill.fgColor}}
        <p>{{ skill.name }}. {{ skill.getLevel() }} / {{ skill.maxLevel }}</p>
        <p>{{ progress.actual }} / {{ progress.target }}</p>
      </div>
      <ProgressBar :percentage="percentage"
                   :fg-class="fgColor"
                   bg-class="bg-gray-300"
      >
      </ProgressBar>
    </div>
  </div>
</template>

<style scoped>

</style>
