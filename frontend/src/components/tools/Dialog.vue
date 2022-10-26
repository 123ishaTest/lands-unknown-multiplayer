<script setup lang="ts">
import {computed} from "vue";
import {LocalPlayer} from "@/model/LocalPlayer";
import {DialogType} from "common/tools/dialog/DialogType";
import {DialogNextRequest} from "common/api/npcs/DialogNextRequest";
import {ApiClient} from "@/model/ApiClient";

const props = defineProps<{}>()

const dialog = computed(() => {
  return LocalPlayer.player.dialog;
})

const isInDialog = computed(() => {
  return dialog.value != null;
})

const isSequence = computed(() => {
  return dialog.value.type === DialogType.Sequence;
})

const isChoice = computed(() => {
  return dialog.value.type === DialogType.Choice;
})

const dialogText = computed(() => {
  return isSequence ? dialog.value.sequence?.getDialogText() : "" ?? "";
})
const choiceDescription = computed(() => {
  return isChoice ? dialog.value.choice?.description : "" ?? "";
})
const choiceOptions = computed(() => {
  return isChoice ? dialog.value.choice?.options : [];
})

function next() {
  ApiClient.send(new DialogNextRequest(), {})
}

function selectOption(index: number) {
  console.log("Select option", index)
}
</script>

<template>
  <div v-if="isInDialog" class="h-32 bg-gray-700 bg-opacity-70 shadow-xl text-white">
    <div v-if="isSequence" class="flex flex-col items-center justify-between h-full">
      <p class="font-semibold">{{ dialogText ? dialogText.speaker : 'null' }}</p>
      <p class="flex-grow text-center">{{ dialogText ? dialogText.text : 'null' }}</p>
      <button class="btn btn-green" @click="next">Next</button>
    </div>
    <div v-else-if="isChoice" class="flex flex-col items-center justify-between">
      <p class="font-semibold">{{ choiceDescription.speaker }}</p>
      <p>{{ choiceDescription.text }}</p>
      <ol>
        <li v-for="(option, index) of choiceOptions" :key="option.label">
          <button class="btn btn-green w-full" @click="selectOption(index)" :disabled="!option.canAccess()">
            <span v-if="!option.canAccess()"> <s> {{ option.label }}</s></span>
            <span v-else> {{ option.label }}</span>
          </button>
        </li>
      </ol>
    </div>

  </div>
</template>

<style scoped>

</style>
