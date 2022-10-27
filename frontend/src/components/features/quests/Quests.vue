<script setup lang="ts">
import {Quests} from "common/features/quests/Quests";
import Quest from "@/components/features/quests/Quest.vue";
import TutorialLog from "@/components/features/quests/quest-logs/TutorialLog.vue";
import {QuestId} from "common/features/quests/QuestId";

const props = defineProps<{
  quests: Quests
}>()
</script>

<template>
  <div class="panel">
    <div class="flex flex-row h-full space-x-4">
      <div class="flex flex-col">
        <Quest :quest="quest" v-for="quest in quests.list" :key="quest.id"></Quest>
      </div>
      <div class="flex flex-row flex-grow">
        <div class="px-2 w-full border-l-2 flex flex-col">
          <TutorialLog :quest="quests.getQuest(QuestId.Tutorial)"></TutorialLog>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
