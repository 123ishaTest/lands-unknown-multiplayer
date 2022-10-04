<script setup lang="ts">
import InventorySlot from "@/components/features/inventory/InventorySlot.vue";
import {Inventory} from "common/features/inventory/Inventory";
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

const showDetails = computed(() => {
  return selectedSlot.value && !selectedSlot.value.isEmpty();
})


function selectItem(index: number) {
  selectedIndex.value = index;
}

</script>

<template>
  <div class="m-2 overflow-hidden bg-pink-100 border-2 border-black">

    <!--                     @interact="interact"-->

    <div class="flex flex-row">

    <div class="flex flex-row flex-wrap justify-center sm:justify-start">
      <div v-for="(slot, index) in slots" :key="index + '-' + slot.item.id">
        <InventorySlot :slot="slot"
                       :is-selected="index === selectedIndex"
                       :index="index"
                       @click.native="selectItem(index)"
        ></InventorySlot>
      </div>
    </div>

    <InventorySlotDetails
        :class="{'invisible': !showDetails}"
        :slot="selectedSlot"
    >
    </InventorySlotDetails>
    </div>

    <!--      @consume="consumeItem"-->
    <!--      @drop="dropStack"-->
  </div>

</template>

<style scoped>

</style>
