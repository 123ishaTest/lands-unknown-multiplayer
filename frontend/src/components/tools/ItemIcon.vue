<script setup lang="ts">
import {itemImage} from "@/util/Images";
import {computed} from "vue";
import {ItemId} from "common/features/items/ItemId";
import {LocalPlayer} from "@/model/LocalPlayer";

const props = defineProps<{
  itemId: ItemId,
  amount: number
  dimension?: number,
}>()

const size = computed(() => {
  return `width: ${props.dimension ?? 32}px; height: ${props.dimension ?? 32}px`;
})

const item = computed(() => {
  return LocalPlayer.player.itemList.getItem(props.itemId);
})
</script>

<template>
  <div class="flex flex-col" :title="item.name">
    <img :src="itemImage(item.image) " :alt="item.name"
         class="pixelated"
         :style="size"
    >
    <span class="text-sm text-yellow-300 text-center -mt-1">{{ amount }}</span>
  </div>

</template>

<style scoped>

</style>
