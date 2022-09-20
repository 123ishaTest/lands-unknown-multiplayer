<script setup lang="ts">

defineProps<{
  percentage: number,
  bgClass: string,
  fgClass: string,
}>()
</script>

<template>
  <div class="overflow-hidden h-2 mb-4 text-xs flex rounded" :class="bgClass">
    <div :style="{'width' : percentage * 100 + '%'}"
         class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
         :class="fgClass">
    </div>
  </div>
</template>

<style scoped>

</style>
