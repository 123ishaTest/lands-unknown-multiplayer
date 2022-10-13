<script setup lang="ts">
import {computed, ref} from "vue";
import type {Bank} from "common/features/bank/Bank";
import BankSlot from "@/components/features/bank/BankSlot.vue";
import type {ItemId} from "common/features/items/ItemId";
import {ApiClient} from "@/model/ApiClient";
import {WithdrawItemByIdRequest} from "common/api/banking/WithdrawItemByIdRequest";

const props = defineProps<{
  bank: Bank
}>()

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


    <div class="flex flex-row">
      <div class="flex flex-row flex-wrap justify-center sm:justify-start">
        <div v-for="(slot, index) in slots" :key="index + '-' + slot.item.id">
          <BankSlot :slot="slot"
                    :index="index"
                    @click.native="withdrawItems(slot.item.id, selectedAmount)"
          ></BankSlot>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
