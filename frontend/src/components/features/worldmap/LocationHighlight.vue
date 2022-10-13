<script setup lang="ts">

import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {FacilityList} from "common/features/facilities/FacilityList";
import {computed, ref} from "vue";
import {ApiClient} from "@/model/ApiClient";
import {TravelRequest} from "common/api/worldmap/TravelRequest";
import {ActionList} from "common/features/actionlist/ActionList";
import Facility from "@/components/features/worldmap/Facility.vue";

const props = defineProps<{
  location: WorldLocation,
  facilityList: FacilityList,
  actionList: ActionList,
}>()

const facilities = computed(() => {
  return props.location?._facilities.map(type => props.facilityList.getFacility(type)) ?? [];
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

</script>

<template>
  <div class="h-96 w-64 p-2 flex flex-col bg-gray-700 opacity-90 justify-between">
    <div class="flex flex-row m-2 justify-center">
      <div>{{ location.displayName }}</div>
      <hr/>
    </div>

    <div v-if="hasFacilities" class="flex flex-col m-2 justify-center">
      <p class="text-center">Facilities</p>
      <hr>
      <div class="flex flex-row flex-wrap">
        <div v-for="(facility, index) in facilities" :key="facility.type"
             @click="selectFacility(index)"
             class="border-2 border-black p-2 m-2">
          {{ facility.description }}
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
