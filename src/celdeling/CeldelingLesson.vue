<script setup>
import GuidedPath from '../guided/GuidedPath.vue'
import CycleSimulation from '../../s-activities/celldivision/CycleSimulation.vue'
import MitosisSimulation from '../../s-activities/celldivision/MitosisSimulation.vue'
import MeiosisSimulation from '../../s-activities/celldivision/MeiosisSimulation.vue'
import { lesson, steps } from './lesson.js'
import { STORAGE_KEY } from './progress.js'
</script>

<template>
  <GuidedPath :lesson="lesson" :steps="steps" :storage-key="STORAGE_KEY">
    <template #activity="{ step }">
      <div v-if="step.activity" class="celdeling-sim-focus">
        <CycleSimulation
          v-if="step.activity === 'cycle-interphase' || step.activity === 'cycle-damage'"
          :key="step.id"
          focus-mode
          :initial-step="step.initialStep ?? 0"
          :initial-dna-damage="Boolean(step.initialDnaDamage)"
        />
        <MitosisSimulation
          v-else-if="step.activity === 'mitosis-phases'"
          :key="step.id"
          focus-mode
          :initial-phase="step.initialPhase ?? 1"
        />
        <MeiosisSimulation
          v-else-if="step.activity === 'meiosis-divisions' || step.activity === 'meiosis-variation'"
          :key="step.id"
          focus-mode
          :initial-phase="step.initialPhase ?? 0"
        />
      </div>
    </template>
  </GuidedPath>
</template>

<style scoped>
.celdeling-sim-focus {
  margin-top: 4px;
}
.celdeling-sim-focus :deep(.fullscreen-body) {
  overflow: visible;
  padding: 0;
}
</style>
