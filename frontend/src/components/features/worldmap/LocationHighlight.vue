<script setup lang="ts">

import {WorldLocation} from "common/features/worldmap/WorldLocation";
import {FacilityList} from "common/features/facilities/FacilityList";
import {computed} from "vue";
import {ApiClient} from "@/model/ApiClient";
import {TravelRequest} from "common/api/TravelRequest";

const props = defineProps<{
  location: WorldLocation,
  facilityList: FacilityList,
}>()

const facilities = computed(() => {
  return props.location?._facilities.map(type => props.facilityList.getFacility(type)) ?? [];
})

const hasFacilities = computed(() => {
  return facilities.value.length > 0;
})

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
        <div v-for="facility in facilities" :key="facility.type"
        class="border-2 border-black p-2 m-2">
          {{ facility.description }}
        </div>
      </div>

    </div>

    <button @click="travel()" class="p-2 border-2 border-black">Travel</button>
  </div>
</template>

<style scoped>

</style>
