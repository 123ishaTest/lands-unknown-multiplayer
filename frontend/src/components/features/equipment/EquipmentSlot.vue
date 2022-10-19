<script setup lang="ts">
import {EquipmentType} from "common/features/equipment/EquipmentType";
import {Equipment} from "common/features/equipment/Equipment";

const props = defineProps<{
  type: EquipmentType
  item: Equipment
}>()

const itemImage = () => {
  return new URL(`/src/assets/equipment/${props.type}.png`, import.meta.url).href;
};


</script>

<template>
  <div class="h-24 w-24 border-2 rounded bg-amber-900" :title="type">
    <div class="flex flex-row items-center justify-center p-3">
      <img style="width: 64px; height: 64px;"
           class="pixelated opacity-30"
           :src="itemImage()"
           :alt="type"
      >
    </div>
  </div>

</template>

<style scoped>

</style>
