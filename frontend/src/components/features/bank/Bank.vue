<script setup lang="ts">
import {computed, ref} from "vue";
import {Bank} from "common/features/bank/Bank";
import BankSlot from "@/components/features/bank/BankSlot.vue";
import {ItemId} from "common/features/items/ItemId";
import {ApiClient} from "@/model/ApiClient";
import {WithdrawItemByIdRequest} from "common/api/WithdrawItemByIdRequest";

const props = defineProps<{
  bank: Bank
}>()

const selectedSlotIndex = ref(0);

const selectedAmount = ref(1);
const amountOptions = ref([
  {text: '1x', value: 1},
  {text: '10x', value: 10},
  {text: '100x', value: 100},
  {text: 'All', value: Infinity},
])

const slots = computed(() => {
  return props.bank.slots;
});

const selectedSlot = computed(() => {
  return slots.value[selectedSlotIndex.value]
})

const selectItem = (index: number) => {
  selectedSlotIndex.value = index;
};

const withdrawItems = (id: ItemId, amount: number) => {
  ApiClient.send(new WithdrawItemByIdRequest(), {
    "id": id,
    "amount": amount,
  })
};

</script>

<template>
  <div class="m-2 overflow-hidden bg-pink-100 border-2 border-black">
    <select v-model="selectedAmount">
      <option v-for="option in amountOptions" :value="option.value">{{ option.text }}</option>
    </select>

    <button @click="withdrawItems(selectedSlot.item.id, 1)" class="border-2 border-black p-2 m-2">Withdraw</button>

    <div class="flex flex-row">
      <div class="flex flex-row flex-wrap justify-center sm:justify-start">
        <div v-for="(slot, index) in slots" :key="index + '-' + slot.item.id">
          <BankSlot :slot="slot"
                    :is-selected="index === selectedSlotIndex"
                    :index="index"
                    @click.native="selectItem(index)"
          ></BankSlot>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
