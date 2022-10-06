<script setup lang="ts">
import {InventorySlot} from "common/features/inventory/InventorySlot";
import {computed, ref} from "vue";
import {Consumable} from "common/features/items/instances/Consumable";
import {ItemId} from "common/features/items/ItemId";
import {ApiClient} from "@/model/ApiClient";
import {DepositItemByIdRequest} from "common/api/DepositItemByIdRequest";

const props = defineProps<{
  slot: InventorySlot,
  isAtBank: boolean
}>()

const item = computed(() => {
  return props.slot.item;
});

const maxAmount = computed(() => {
  return props.slot.amount;
});

const isConsumable = computed(() => {
  return props.slot.item instanceof Consumable;
});

const selectedAmount = ref(0);

const depositItems = (id: ItemId, amount: number) => {
  ApiClient.send(new DepositItemByIdRequest(), {
    "id": id,
    "amount": amount,
  })
};
</script>

<template>
  <div class="bg-gray-500 flex flex-col p-4 text-white">
    <div>
      {{ item.name }}
    </div>
    <div>{{ item.description }}</div>
    <div class="flex flex-row justify-between items-center">
      <div>0</div>
      <div>{{ maxAmount }}</div>
    </div>
    <div class="flex flex-row">
      <input type="range" class="rounded-lg bg-gray-400 h-4 w-full" v-model="selectedAmount" min="0"
             :max="slot.amount"/>
    </div>
    <div class="flex flex-row flex-wrap -m-1">
      <input type="text" class="input-primary w-48" v-model="selectedAmount"/>
      <button class="btn btn-blue" @click="selectedAmount=maxAmount - 1">All but one</button>
      <button class="btn btn-blue" @click="selectedAmount=maxAmount">All</button>
    </div>
    <div v-if="isAtBank" class="flex flex-row flex-wrap items-center">
      <button @click="depositItems(item.id, selectedAmount)" class="border-2 border-black p-2 m-2">Deposit</button>
    </div>
    <div class="flex flex-row flex-wrap items-center">
      <button> Actiosn go ehre</button>
      <!--      <button v-if="isConsumable" class="btn btn-blue" @click="consumeItem">{{ item.consumeLabel }}-->
      <!--        ({{ selectedAmount }})-->
      <!--      </button>-->
      <!--      <button class="btn btn-red" @click="dropItem">Drop Stack</button>-->
    </div>
  </div>
</template>

<style scoped>

</style>
