<script setup lang="ts">
import {RecipeAction} from "common/features/actionlist/instances/RecipeAction";
import ItemIcon from "@/components/tools/ItemIcon.vue";
import Icon from "@/components/tools/Icon.vue";

const props = defineProps<{
  action: RecipeAction,
}>()

</script>

<template>
  <div>
    <div class="flex flex-col border-2 p-1">
      <div class="flex flex-row justify-center">
        <span>{{ action.description }}</span>
      </div>
      <div class="flex flex-row">
        <ItemIcon v-for="item in action.input" :item-id="item.id" :amount="item.amount">{{ item.id }} ,</ItemIcon>
        <Icon icon="arrow-right" title="Produces" :dimension="32"></Icon>
        <ItemIcon v-for="item in action.output" :item-id="item.id" :amount="item.amount">{{ item.id }} ,</ItemIcon>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>
