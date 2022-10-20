<script setup lang="ts">
import {EquipmentType} from "common/features/equipment/EquipmentType";
import {Equipment} from "common/features/equipment/Equipment";
import {ApiClient} from "@/model/ApiClient";
import {UnEquipItemRequest} from "common/api/inventory/UnEquipItemRequest";
import {computed} from "vue";

const props = defineProps<{
  type: EquipmentType
  item?: Equipment
}>()

const backgroundImage = () => {
  return new URL(`/src/assets/generated/equipment/${props.type}.png`, import.meta.url).href;
};

const itemImage = () => {
  return new URL(`/src/assets/generated/items/${props.item?.image}.png`, import.meta.url).href;
};


const hasItem = computed(() => {
  return props.item != undefined;
});

function unEquip() {
  if (!props.item) {
    return;
  }
  ApiClient.send(new UnEquipItemRequest(), {
    type: props.item.equipmentType,
  })
}

</script>

<template>
  <div class="h-24 w-24 border-2 rounded bg-gray-600" :title="type">
    <div class="flex flex-row items-center justify-center p-3">

      <img v-if="hasItem" style="width: 64px; height: 64px;"
           @click="unEquip()"
           class="pixelated"
           :src="itemImage()"
           :alt="item.name"
      >
      <img v-else style="width: 64px; height: 64px;"
           class="pixelated opacity-30"
           :src="backgroundImage()"
           :alt="type"
      >
    </div>
  </div>

</template>

<style scoped>

</style>
