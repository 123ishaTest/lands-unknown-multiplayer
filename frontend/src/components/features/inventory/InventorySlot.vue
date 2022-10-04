<script setup lang="ts">
import {InventorySlot} from "common/features/inventory/InventorySlot";
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


</script>

<template>
  <div class="w-24 h-24 lg:w-36 lg:h-36 b-2 bg-gray-500 m-2 p-2 border-gray-300 border-4 text-white text-sm lg:text-xl"
       draggable="true"
       @dragstart="startDrag($event,index)"
       @drop="onDrop($event, index)"
       @dragover.prevent
       @dragenter.prevent
       :class="{'border-red-400': isSelected}">
    <div v-if="!slot.isEmpty()">
      <div class="flex flex-col">
        <div>{{ slot.item.name }}</div>
        <div>{{ slot.amount }} / {{ slot.item.maxStack }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
