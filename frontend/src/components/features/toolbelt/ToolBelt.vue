<script setup lang="ts">
import {ToolBelt} from "common/features/toolbelt/ToolBelt";
import {computed} from "vue";
import ToolSlot from "@/components/features/toolbelt/ToolSlot.vue";

const props = defineProps<{
  toolBelt: ToolBelt
}>()

const tools = computed(() => {
  return props.toolBelt.tools;
})

const toolTypes = computed(() => {
  return Object.keys(props.toolBelt.tools);
})
</script>

<template>
  <div class="panel">
    <div class="flex flex-row flex-wrap">
      <ToolSlot v-for="type in toolTypes" :type="type" :item="tools[type]"></ToolSlot>
    </div>
  </div>

</template>

<style scoped>

</style>
