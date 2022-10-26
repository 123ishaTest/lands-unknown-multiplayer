<script setup lang="ts">
import {computed} from "vue";
import {LocalPlayer} from "@/model/LocalPlayer";
import {DialogNextRequest} from "common/api/npcs/DialogNextRequest";
import {ApiClient} from "@/model/ApiClient";
import {DialogChoice} from "common/tools/dialog/DialogChoice";
import {DialogChoiceRequest} from "common/api/npcs/DialogChoiceRequest";

const props = defineProps<{
  dialogChoice: DialogChoice<any>
}>()

function next() {
  ApiClient.send(new DialogNextRequest(), {})
}

const description = computed(() => {
  return props.dialogChoice.description;
})

const options = computed(() => {
  return props.dialogChoice.options;
})

const speaker = computed(() => {
  const npcId = description.value.speaker;
  return LocalPlayer.player.npcList.getNpc(npcId)
})

function selectOption(index: number) {
  ApiClient.send(new DialogChoiceRequest(), {
    "index": index
  })
}


</script>

<template>
  <div class="flex flex-col items-center justify-between">
    <p class="font-semibold">{{ speaker.name }}</p>
    <p>{{ description.text }}</p>
    <ol>
      <li v-for="(option, index) of options" :key="option.label">
        <button class="btn btn-green w-full" @click="selectOption(index)" :disabled="!option.canAccess()">
          <span class="hover:text-gray-400" v-if="!option.canAccess()"> <s> {{ option.label }}</s></span>
          <span class="hover:text-gray-400" v-else> {{ option.label }}</span>
        </button>
      </li>
    </ol>
  </div>
</template>

<style scoped>

</style>
