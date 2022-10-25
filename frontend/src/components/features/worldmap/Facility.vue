<script setup lang="ts">

import {computed, ref} from "vue";
import {Facility} from "common/features/facilities/Facility";
import {ActionList} from "common/features/actionlist/ActionList";
import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {ApiClient} from "@/model/ApiClient";
import {FacilityRequest} from "common/api/worldmap/FacilityRequest";
import RecipeAction from "@/components/tools/RecipeAction.vue";

const props = defineProps<{
  location: WorldLocation,
  facility: Facility,
  facilityIndex: number,
  actionList: ActionList,
}>()

const actions = computed(() => {
  return props.facility?.actions.map(id => props.actionList.getAction(id)) ?? [];
})

function scheduleAction(index: number) {
  ApiClient.send(new FacilityRequest(), {
    "type": props.location.identifier.type,
    "target": props.location.identifier.id,
    "facilityIndex": props.facilityIndex,
    "actionIndex": index,
    "repeats": repeats.value,
  })
}

let repeats = ref(1);

</script>

<template>
  <div class="flex flex-col bg-gray-700">
    <div class="flex flex-row m-2 justify-center">
      <div>{{ facility.description }}</div>
      <hr/>
    </div>
    <div class="flex flex-col m-2 justify-center">

      <p class="text-center">Actions</p>
      <hr>
      <input class="bg-gray-800" type="number" v-model.number="repeats">

      <div class="flex flex-row flex-wrap">

        <div v-for="(action, index) in actions" :key="action.id">
          <RecipeAction :action="action" v-if="action.input"></RecipeAction>
          <button
              v-else
              @click="scheduleAction(index)"
              class="border-2 border-black p-2 m-2">
            {{ action.description }}
          </button>

        </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

</style>
