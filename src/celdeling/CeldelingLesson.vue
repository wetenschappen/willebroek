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
      <div v-if="step.activity" class="celdeling-sim-embed">
        <CycleSimulation
          v-if="step.activity === 'cycle-interphase' || step.activity === 'cycle-damage'"
          :key="step.id"
          :initial-step="step.initialStep ?? 0"
          :initial-dna-damage="Boolean(step.initialDnaDamage)"
        />
        <MitosisSimulation
          v-else-if="step.activity === 'mitosis-phases'"
          :key="step.id"
          :initial-phase="step.initialPhase ?? 1"
        />
        <MeiosisSimulation
          v-else-if="step.activity === 'meiosis-divisions' || step.activity === 'meiosis-variation'"
          :key="step.id"
          :initial-phase="step.initialPhase ?? 0"
        />
      </div>
    </template>
  </GuidedPath>
</template>

<style scoped>
.celdeling-sim-embed {
  margin: 24px -32px;
  padding: 20px;
  border: 2px solid var(--color-line-strong);
  border-top: 6px solid var(--color-digital);
  border-radius: var(--radius-card);
  background: var(--color-paper);
}
.celdeling-sim-embed :deep(.fullscreen-body) {
  overflow: visible;
  padding: 0;
}
@media (max-width: 860px) {
  .celdeling-sim-embed {
    margin: 24px 0;
    padding: 16px;
  }
}
</style>
