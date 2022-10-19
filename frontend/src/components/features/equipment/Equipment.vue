<script setup lang="ts">
import {PlayerEquipment} from "common/features/equipment/PlayerEquipment";
import {EquipmentType} from "common/features/equipment/EquipmentType";
import EquipmentSlot from "@/components/features/equipment/EquipmentSlot.vue";

const props = defineProps<{
  equipment: PlayerEquipment
}>()

</script>

<template>
  <div class="panel">
    <div class="grid gap-4 grid-cols-3 grid-rows-3">
      <!-- ... -->
      <span></span>
      <EquipmentSlot :item="equipment.equipment.head" :type="EquipmentType.Head"></EquipmentSlot>
      <span></span>
      <EquipmentSlot :item="equipment.equipment.cloak" :type="EquipmentType.Cloak"></EquipmentSlot>
      <EquipmentSlot :item="equipment.equipment.neck" :type="EquipmentType.Neck"></EquipmentSlot>
      <span></span>
      <EquipmentSlot :item="equipment.equipment.mainHand" :type="EquipmentType.MainHand"></EquipmentSlot>
      <EquipmentSlot :item="equipment.equipment.body" :type="EquipmentType.Body"></EquipmentSlot>
      <EquipmentSlot :item="equipment.equipment.offHand" :type="EquipmentType.OffHand"></EquipmentSlot>
      <span></span>
      <EquipmentSlot :item="equipment.equipment.legs" :type="EquipmentType.Legs"></EquipmentSlot>
      <span></span>
      <span></span>
      <EquipmentSlot :item="equipment.equipment.feet" :type="EquipmentType.Feet"></EquipmentSlot>
      <EquipmentSlot :item="equipment.equipment.ring" :type="EquipmentType.Ring"></EquipmentSlot>

    </div>
  </div>

</template>

<style scoped>

</style>
