<script setup lang="ts">
import {iconImage} from "@/util/Images";
import {computed} from "vue";

const props = defineProps<{
  icon: string,
  title: string,
  value?: any
  dimension: number,
}>()

const size = computed(() => {
  return `width: ${props.dimension}px; height: ${props.dimension}px`;
})
</script>

<template>
  <div class="flex flex-row items-center justify-center" :title="title">
    <img :src="iconImage(icon) " :alt="title"
         class="pixelated m-1"
         :style="size"
    >
    <span class="flex-1 text-center">{{value}}</span>
  </div>

</template>

<style scoped>

</style>
