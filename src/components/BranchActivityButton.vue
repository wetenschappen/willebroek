<script setup>
import { PhCaretRight } from '@phosphor-icons/vue'

defineProps({
  title: String,
  category: String,
  icon: Object
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
      <PhCaretRight weight="regular" aria-hidden="true" />
    </span>
  </button>
</template>
