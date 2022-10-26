<script setup lang="ts">
import {computed} from "vue";
import {LocalPlayer} from "@/model/LocalPlayer";
import {DialogNextRequest} from "common/api/npcs/DialogNextRequest";
import {ApiClient} from "@/model/ApiClient";
import {DialogText} from "common/tools/dialog/DialogText";

const props = defineProps<{
  dialogText: DialogText
}>()

function next() {
  ApiClient.send(new DialogNextRequest(), {})
}

const speaker = computed(() => {
  const npcId = props.dialogText?.speaker;
  return LocalPlayer.player.npcList.getNpc(npcId)
})

</script>

<template>
  <div class="flex flex-col items-center justify-between h-full">
    <p class="font-semibold">{{ speaker.name }}</p>
    <p class="flex-grow text-center">{{ dialogText ? dialogText.text : 'null' }}</p>
    <button class="hover:text-gray-400" @click="next">Next</button>
  </div>
</template>

<style scoped>

</style>
