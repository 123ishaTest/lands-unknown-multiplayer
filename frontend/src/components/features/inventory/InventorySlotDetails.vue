<script setup lang="ts">
import {InventorySlot} from "common/features/inventory/InventorySlot";
import {computed, ref} from "vue";
import {Consumable} from "common/features/items/instances/Consumable";
import {ItemId} from "common/features/items/ItemId";
import {ApiClient} from "@/model/ApiClient";
import {DepositItemByIdRequest} from "common/api/DepositItemByIdRequest";

const props = defineProps<{
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
    <div>
      {{ item.name }}
    </div>
    <div>{{ item.description }}</div>
    <div class="flex flex-row justify-between items-center">
      <div>1</div>
      <div>{{ maxAmount }}</div>
    </div>
    <div class="flex flex-row">
      <input type="range" class="rounded-lg bg-gray-400 h-4 w-full my-2" v-model="selectedAmount" min="1"
             :max="maxAmount"/>
    </div>
    <div class="flex flex-row flex-wrap -m-1">
      <input type="text" class="input-primary w-48 text-black" v-model="selectedAmount"/>
      <button class="m-2 p-2 border-2 border-black" @click="selectedAmount=maxAmount - 1">All but one</button>
      <button class="m-2 p-2 border-2 border-black" @click="selectedAmount=maxAmount">All</button>
    </div>
    <div v-if="isAtBank" class="flex flex-row flex-wrap items-center">
      <button @click="depositItems(item.id, selectedAmount)" class="border-2 border-black p-2 m-2">Deposit</button>
    </div>
    <div class="flex flex-row flex-wrap items-center">
      <!--      <button v-if="isConsumable" class="btn btn-blue" @click="consumeItem">{{ item.consumeLabel }}-->
      <!--        ({{ selectedAmount }})-->
      <!--      </button>-->
      <!--      <button class="btn btn-red" @click="dropItem">Drop Stack</button>-->
    </div>
  </div>
</template>

<style scoped>

</style>