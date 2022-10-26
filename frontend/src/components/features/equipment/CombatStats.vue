<script setup lang="ts">
import type {CombatStats} from "common/features/combat/CombatStats";
import Icon from "@/components/tools/Icon.vue";

const props = defineProps<{
  stats: CombatStats
}>()

</script>

<template>
  <div class="grid gap-1 grid-cols-3 grid-rows-2">
    <Icon title="Melee Attack" :dimension="48" icon="sword" :value="stats.meleeAttack"></Icon>
    <Icon title="Range Attack" :dimension="48" icon="bow" :value="stats.rangeAttack"></Icon>
    <Icon title="Mage Attack" :dimension="48" icon="wizard-hat" :value="stats.mageAttack"></Icon>

    <Icon title="Melee Defense" :dimension="48" icon="sword-and-shield" :value="stats.meleeDefense"></Icon>
    <Icon title="Range Defense" :dimension="48" icon="bow-and-shield" :value="stats.rangeDefense"></Icon>
    <Icon title="Mage Defense" :dimension="48" icon="wizard-hat-and-shield" :value="stats.mageDefense"></Icon>
<!--    <p>Max Health {{ stats.maxHealth }}</p>-->
<!--    <p>Dodge Chance {{ stats.dodgeChance }}</p>-->
<!--    <p>Crit. Chance {{ stats.criticalChance }}</p>-->
  </div>
</template>

<style scoped>

</style>
