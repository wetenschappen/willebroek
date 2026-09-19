<script setup>
import { PhCaretRight, PhCheck } from '@phosphor-icons/vue'

defineProps({
  title: String,
  category: String,
  icon: Object,
  isDone: Boolean
})

defineEmits(['click'])
</script>

<template>
  <button type="button" @click="$emit('click')" class="branch-activity">
    <span class="lesson-activity-copy">
      <span class="activity-meta">{{ category }}</span>
      <strong>{{ title }}</strong>
    </span>
    <span class="lesson-activity-action">
      <PhCheck v-if="isDone" weight="bold" aria-hidden="true" />
      <PhCaretRight v-else weight="regular" aria-hidden="true" />
    </span>
  </button>
</template>
