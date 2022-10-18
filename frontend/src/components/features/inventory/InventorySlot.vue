<script setup lang="ts">
import type {InventorySlot} from "common/features/inventory/InventorySlot";
import {computed} from "vue";

const props = defineProps<{
  slot: InventorySlot,
  isSelected: boolean,
  index: number,
}>()

const canDrag = computed(() => {
  return !props.slot.isEmpty();
});

function onDrop(evt: DragEvent, indexTo: number) {
  if (!evt.dataTransfer) {
    return;
  }
  const indexFrom = parseInt(evt.dataTransfer.getData('index'));
  // TODO emit
  // this.$emit('interact', {'from': indexFrom, 'to': indexTo})
}

function startDrag(evt: DragEvent, index: number) {
  if (!canDrag) {
    evt.preventDefault();
    return;
  }
  if (!evt.dataTransfer) {
    return;
  }
  evt.dataTransfer.dropEffect = 'move'
  evt.dataTransfer.effectAllowed = 'move'
  evt.dataTransfer.setData('index', index.toString());
}

const itemImage = () => {
  return new URL(`/src/assets/items/${props.slot.item.image}.png`, import.meta.url).href;
};

</script>

<template>
  <div class="w-12 h-12 b-2 bg-gray-500 m-0.5 border-gray-300 border-2 text-white text-sm lg:text-xl rounded"
       :title="slot.item.name"
       draggable="true"
       @dragstart="startDrag($event,index)"
       @drop="onDrop($event, index)"
       @dragover.prevent
       @dragenter.prevent
       :class="{'border-red-400': isSelected}">
    <div v-if="!slot.isEmpty()">
      <div class="flex flex-row justify-end">
        <span class="text-xs rounded-3xl text-yellow-300 absolute px-1">{{ slot.amount }}{{slot.item.maxStack < Infinity ? "/" + slot.item.maxStack : ""}}</span>
      </div>

      <div class="flex flex-row items-center justify-center p-1">
        <img style="width: 32px; height: 32px;"
             class="pixelated"
             :src="itemImage()"
             :alt="slot.item.name"
        >
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>
