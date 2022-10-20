<script setup lang="ts">
import {EquipmentType} from "common/features/equipment/EquipmentType";
import {Equipment} from "common/features/equipment/Equipment";
import {ApiClient} from "@/model/ApiClient";
import {UnEquipItemRequest} from "common/api/inventory/UnEquipItemRequest";

const props = defineProps<{
  type: EquipmentType
  item: Equipment
}>()

const backgroundImage = () => {
  return new URL(`/src/assets/equipment/${props.type}.png`, import.meta.url).href;
};

function unEquip() {
  if(!props.item) {
    return;
  }
  ApiClient.send(new UnEquipItemRequest(), {
    type: props.item.equipmentType,
  })
}

</script>

<template>
  <div class="h-24 w-24 border-2 rounded bg-amber-900" :title="type">
    <div class="flex flex-row items-center justify-center p-3">
      <img style="width: 64px; height: 64px;"
           class="pixelated opacity-30"
           :src="backgroundImage()"
           :alt="type"
      >
      <p @click="unEquip()">{{item?.name}}</p>
    </div>
  </div>

</template>

<style scoped>

</style>
