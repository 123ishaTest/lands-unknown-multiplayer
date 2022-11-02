<script setup lang="ts">
import {computed} from "vue";
import {LocalPlayer} from "@/model/LocalPlayer";
import {DialogType} from "common/tools/dialog/DialogType";
import {DialogNextRequest} from "common/api/npcs/DialogNextRequest";
import {ApiClient} from "@/model/ApiClient";
import DialogSequence from "@/components/tools/dialog/DialogSequence.vue";
import DialogChoice from "@/components/tools/dialog/DialogChoice.vue";

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
  return isSequence ? dialog.value.sequence?.getDialogText() : null;
})

function next() {
  ApiClient.send(new DialogNextRequest(), {})
}

</script>

<template>
  <div v-if="isInDialog" class="h-36 bg-gray-700 bg-opacity-70 shadow-xl text-white">
    <DialogSequence v-if="isSequence" :dialog-text="dialogText"/>
    <DialogChoice v-if="isChoice" :dialog-choice="dialog.choice"/>
  </div>
</template>

<style scoped>

</style>
