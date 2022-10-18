<script setup lang="ts">
import InventorySlot from "@/components/features/inventory/InventorySlot.vue";
import type {Inventory} from "common/features/inventory/Inventory";
import {computed, ref} from "vue";
import InventorySlotDetails from "@/components/features/inventory/InventorySlotDetails.vue";

const props = defineProps<{
  inventory: Inventory
}>()

const selectedIndex = ref(0);

const slots = computed(() => {
  return props.inventory.slots;
});

const selectedSlot = computed(() => {
  return slots.value[selectedIndex.value]
})

const maxAmountForSelectedId = computed(() => {
  return props.inventory.getTotalAmount(selectedSlot.value.item.id);
})

const showDetails = computed(() => {
  return selectedSlot.value && !selectedSlot.value.isEmpty();
})

function selectItem(index: number) {
  selectedIndex.value = index;
}

</script>

<template>
  <div class="panel">
    <div class="flex flex-col h-full">
      <div class="flex flex-row flex-grow flex-wrap justify-center sm:justify-start">
        <div v-for="(slot, index) in slots" :key="index + '-' + slot.item.id">
          <InventorySlot :slot="slot"
                         :is-selected="index === selectedIndex"
                         :index="index"
                         @click.native="selectItem(index)"
          ></InventorySlot>
        </div>
      </div>

      <!-- TODO properly check if we're at a bank-->
      <InventorySlotDetails
          :max-amount="maxAmountForSelectedId"
          :class="{'invisible': !showDetails}"
          :slot="selectedSlot"
          :is-at-bank="true"
      >
      </InventorySlotDetails>
    </div>
  </div>

</template>

<style scoped>

</style>
