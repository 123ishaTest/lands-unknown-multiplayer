<script setup lang="ts">
import {ApiClient} from "@/model/ApiClient";
import {computed} from "vue";
import {itemImage, toolImage} from "@/util/Images";
import {ToolType} from "common/features/toolbelt/ToolType";
import {UnEquipToolRequest} from "common/api/toolbelt/UnEquipToolRequest";
import {Tool} from "common/features/toolbelt/Tool";

const props = defineProps<{
  type: ToolType
  item?: Tool
}>()

const hasItem = computed(() => {
  return props.item != undefined;
});

function unEquip() {
  if (!props.item) {
    return;
  }
  ApiClient.send(new UnEquipToolRequest(), {
    type: props.item.toolType,
  })
}
</script>

<template>
  <div class="w-12 h-12 b-2 m-0.5 border-gray-300 border-2 text-white text-sm lg:text-xl rounded" :title="type">
    <div class="flex flex-row h-full items-center justify-center">
      <img v-if="hasItem" style="width: 32px; height: 32px;"
           @click="unEquip()"
           class="pixelated cursor-pointer"
           :src="itemImage(item.image)"
           :alt="item.name"
      >
      <img v-else style="width: 32px; height: 32px;"
           class="pixelated opacity-30"
           :src="toolImage(type)"
           :alt="type"
      >
    </div>
  </div>

</template>

<style scoped>

</style>
