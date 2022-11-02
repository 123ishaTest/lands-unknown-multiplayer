<script setup lang="ts">
import {computed} from "vue";
import {LocalPlayer} from "@/model/LocalPlayer";
import {DialogNextRequest} from "common/api/npcs/DialogNextRequest";
import {ApiClient} from "@/model/ApiClient";
import {DialogText} from "common/tools/dialog/DialogText";
import Npc from "@/components/features/npcs/Npc.vue";
import {NpcId} from "common/features/npcs/NpcId";

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
    <div class="flex flex-row items-center w-full">
      <span class="flex-1"></span>
      <p class="flex-1 text-center">{{ dialogText ? dialogText.text : 'null' }}</p>
      <Npc class="flex-1" v-if="speaker.id !== NpcId.Player" :id="speaker.id"></Npc>
      <span v-else class="flex-1"></span>
    </div>

    <button class="hover:text-gray-400" @click="next">Next</button>
  </div>
</template>

<style scoped>

</style>
