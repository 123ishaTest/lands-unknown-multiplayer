<script setup lang="ts">
import {computed} from "vue";
import {npcImage} from "@/util/Images";
import {LocalPlayer} from "@/model/LocalPlayer";
import {NpcId} from "common/features/npcs/NpcId";

const props = defineProps<{
  id: NpcId,
}>()

const npc = computed(() => {
  return LocalPlayer.player.npcList.getNpc(props.id);
})
</script>

<template>
  <div class="flex flex-row items-center justify-center" :title="npc.name">
    <img :src="npcImage(npc.image)" :alt="npc.name"
         class="pixelated m-1"
         style="height: 64px; width: 32px;"
    >
  </div>

</template>

<style scoped>

</style>
