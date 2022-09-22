<script setup lang="ts">
import {Skills} from "common/features/skills/Skills";
import Skill from "@/components/features/skills/Skill.vue";

defineProps<{
  skills: Skills
}>()
</script>

<template>
  <div class="m-2 p-4 bg-pink-100 border-2 border-black">
    <p class="text-xl">Skills</p>
    <hr class="mb-4 border-black">
    <Skill :skill="skills.mining" fgColor="bg-gray-600"></Skill>
    <Skill :skill="skills.smithing" fgColor="bg-gray-800"></Skill>
    <Skill :skill="skills.woodCutting" fgColor="bg-green-600"></Skill>
    <Skill :skill="skills.fishing" fgColor="bg-blue-600"></Skill>
    <Skill :skill="skills.cooking" fgColor="bg-yellow-500"></Skill>
  </div>
</template>

<style scoped>

</style>
