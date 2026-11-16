<script setup>
import GuidedPath from '../guided/GuidedPath.vue'
import CompressionLab from './CompressionLab.vue'
import { lesson, steps, STORAGE_KEY } from './compression-pilot.js'
</script>

<template>
  <GuidedPath :lesson="lesson" :steps="steps" :storage-key="STORAGE_KEY">
    <template #activity="{ step }">
      <CompressionLab v-if="step.activity === 'gas-compression'" :key="step.id" :initial-volume="step.initialVolume" />
    </template>
  </GuidedPath>
</template>
