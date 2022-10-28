<script setup lang="ts">
import type {InventorySlot} from "common/features/inventory/InventorySlot";
import {computed, ref} from "vue";
import {Consumable} from "common/features/items/instances/Consumable";
import type {ItemId} from "common/features/items/ItemId";
import {ApiClient} from "@/model/ApiClient";
import {DepositItemByIdRequest} from "common/api/banking/DepositItemByIdRequest";
import {DropInventorySlotRequest} from "common/api/inventory/DropInventorySlotRequest";
import {Equipment} from "common/features/equipment/Equipment";
import {EquipItemRequest} from "common/api/inventory/EquipItemRequest";
import {Tool} from "common/features/toolbelt/Tool";
import {EquipToolRequest} from "common/api/toolbelt/EquipToolRequest";

const props = defineProps<{
  index: number;
  maxAmount: number
  slot: InventorySlot,
  isAtBank: boolean
}>()

const item = computed(() => {
  return props.slot.item;
});

const isConsumable = computed(() => {
  return props.slot.item instanceof Consumable;
});

const isTool = computed(() => {
  return props.slot.item instanceof Tool;
});

const isEquipable = computed(() => {
  return props.slot.item instanceof Equipment;
});

function equipItem() {
  ApiClient.send(new EquipItemRequest(), {
    index: props.index,
  })
}

function equipTool() {
  ApiClient.send(new EquipToolRequest(), {
    index: props.index,
  })
}

function dropItems() {
  ApiClient.send(new DropInventorySlotRequest(), {
    index: props.index,
  })
}

const selectedAmount = ref(1);

const depositItems = (id: ItemId, amount: number) => {
  ApiClient.send(new DepositItemByIdRequest(), {
    "id": id,
    "amount": amount,
  })
  selectedAmount.value = 1;
};
</script>

<template>
  <div class="bg-gray-500 flex flex-col p-4 text-white">
    <div> {{ item.name }} - {{ item.description }}</div>
    <div class="flex flex-row justify-between items-center">
      <div>1</div>
      <div>{{ maxAmount }}</div>
    </div>
    <div class="flex flex-row">
      <input type="range" class="rounded-lg bg-gray-400 h-4 w-full my-2" v-model="selectedAmount" min="1"
             :max="maxAmount"/>
    </div>
    <div class="flex flex-row flex-wrap -m-1 space-x-1">
      <input type="text" class="input-primary w-12 h-12 text-black" v-model="selectedAmount"/>
      <button class="p-2 border-2 border-black" @click="selectedAmount=maxAmount - 1">All but one</button>
      <button class="p-2 border-2 border-black" @click="selectedAmount=maxAmount">All</button>
    </div>
    <div v-if="isAtBank" class="flex flex-row flex-wrap items-center">
      <button @click="depositItems(item.id, selectedAmount)" class="border-2 border-black p-2 m-2">Deposit</button>
    </div>
    <div class="flex flex-row flex-wrap items-center">
      <button v-if="isEquipable" class="p-2 border-2 border-black" @click="equipItem">Equip</button>
      <button v-if="isTool" class="p-2 border-2 border-black" @click="equipTool">Equip</button>
      <button class="p-2 border-2 border-black" @click="dropItems()">Drop Stack</button>
    </div>
  </div>
</template>

<style scoped>

</style>
