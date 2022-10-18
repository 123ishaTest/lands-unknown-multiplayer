<script setup lang="ts">
import type {Skills} from "common/features/skills/Skills";
import Skill from "@/components/features/skills/Skill.vue";

const props = defineProps<{
  skills: Skills
}>()
</script>

<template>
  <div class="panel">
    <div class="flex flex-row flex-wrap justify-between gap-2">
      <Skill class="flex-1" image="mining" :skill="skills.mining" fgColor="bg-gray-600"></Skill>
      <Skill class="flex-1" image="smithing" :skill="skills.smithing" fgColor="bg-gray-800"></Skill>
      <Skill class="flex-1" image="woodcutting" :skill="skills.woodCutting" fgColor="bg-green-600"></Skill>
      <Skill class="flex-1" image="fishing" :skill="skills.fishing" fgColor="bg-blue-600"></Skill>
      <Skill class="flex-1" image="cooking" :skill="skills.cooking" fgColor="bg-yellow-500"></Skill>
      <!-- For padding, can probably be solved with CSS-->
      <div class="flex-1 border-2 border-transparent"></div>
      <div class="flex-1 border-2 border-transparent"></div>
      <div class="flex-1 border-2 border-transparent"></div>
    </div>
  </div>
</template>

<style scoped>

</style>
