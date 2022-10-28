<script setup lang="ts">
import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {FacilityList} from "common/features/facilities/FacilityList";
import {computed, ref} from "vue";
import {ApiClient} from "@/model/ApiClient";
import {TravelRequest} from "common/api/worldmap/TravelRequest";
import {ActionList} from "common/features/actionlist/ActionList";
import Facility from "@/components/features/worldmap/Facility.vue";
import {GeneratorRequest} from "common/api/worldmap/GeneratorRequest";
import {GeneratorList} from "common/features/actionlist/GeneratorList";
import Icon from "@/components/tools/Icon.vue";
import {LocalPlayer} from "@/model/LocalPlayer";
import {TalkToNpcRequest} from "common/api/npcs/TalkToNpcRequest";

const props = defineProps<{
  location: WorldLocation,
  facilityList: FacilityList,
  actionList: ActionList,
  generatorList: GeneratorList,
}>()

const facilities = computed(() => {
  console.log("here", props.location)
  return props.location?._facilities?.map(type => props.facilityList.getFacility(type)) ?? [];
})

const hasFacilities = computed(() => {
  return facilities.value.length > 0;
})

const facilityIndex = ref(0);

const selectedFacility = computed(() => {
  return facilities.value[facilityIndex.value];
})

function selectFacility(index: number) {
  facilityIndex.value = index
}

function travel() {
  ApiClient.send(new TravelRequest(), {
    "type": props.location.identifier.type,
    "target": props.location.identifier.id,
  })
}


const generators = computed(() => {
  return props.location?._possibleGenerators?.map(id => props.generatorList.getGenerator(id)) ?? [];
})

const hasGenerators = computed(() => {
  return generators.value.length > 0;
})


const npcs = computed(() => {
  return props.location?.npcs?.map(id => LocalPlayer.player.npcList.getNpc(id)) ?? [];
})

const hasNpcs = computed(() => {
  return npcs.value.length > 0;
})

function talkToNpc(index: number) {
  ApiClient.send(new TalkToNpcRequest(), {
    "type": props.location.identifier.type,
    "target": props.location.identifier.id,
    "npcIndex": index,
  })
}


function scheduleGenerator(index: number) {
  ApiClient.send(new GeneratorRequest(), {
    "type": props.location.identifier.type,
    "target": props.location.identifier.id,
    "generatorIndex": index,
    "repeats": 10,
  })
}

</script>

<template>
  <div class="h-min w-64 p-2 flex flex-col bg-gray-700 justify-between">
    <div class="flex flex-row m-2 justify-center">
      <div>{{ location.displayName }}</div>
      <hr/>
    </div>

    <div v-if="hasGenerators" class="flex flex-col m-2 justify-center">
      <p class="text-center">Actions</p>
      <hr>
      <div class="flex flex-row flex-wrap">
        <button v-for="(generator, index) in generators" :key="generator.id"
                @click="scheduleGenerator(index)"
                class="border-2 border-black p-2 m-2">
          {{ generator.description }}
        </button>
      </div>
    </div>

    <div v-if="hasNpcs" class="flex flex-col m-2 justify-center">
      <p class="text-center">Npcs</p>
      <hr>
      <div class="flex flex-row flex-wrap">
        <button v-for="(npc, index) in npcs" :key="npc.id"
                @click="talkToNpc(index)"
                class="border-2 border-black p-2 m-2">
          {{ npc.name }}
        </button>
      </div>
    </div>

    <div v-if="hasFacilities" class="flex flex-col m-2 justify-center">
      <p class="text-center">Facilities</p>
      <hr>
      <div class="flex flex-row flex-wrap">
        <div v-for="(facility, index) in facilities" :key="facility.type"
             @click="selectFacility(index)"
             class="border-2 border-black p-1 m-1"
             :class="{'bg-gray-500': index=== facilityIndex}"
        >
          <Icon :icon="facility.icon" :value="facility.description" :title="facility.description" :dimension="32"/>
        </div>
      </div>

      <Facility
          :action-list="actionList"
          :location="location"
          :facility="selectedFacility"
          :facility-index="facilityIndex"
      ></Facility>
    </div>

    <button @click="travel()" class="p-2 border-2 border-black">Travel</button>
  </div>
</template>

<style scoped>

</style>
