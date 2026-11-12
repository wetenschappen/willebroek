<script setup>
import GuidedPath from '../guided/GuidedPath.vue'
import { lesson, steps } from './lesson.js'
import { STORAGE_KEY } from './progress.js'
</script>

<template>
  <GuidedPath :lesson="lesson" :steps="steps" :storage-key="STORAGE_KEY" />
</template>
