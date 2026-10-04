<script setup>
import { PhClock } from '@phosphor-icons/vue'

defineProps({
  step: String,
  title: String,
  time: String
})

defineEmits(['start-timer'])
</script>

<template>
  <section class="timeline-line">
    <header class="timeline-heading">
      <div class="timeline-phase">
        <span class="timeline-letter" aria-hidden="true">{{ step }}</span>
        <h2 class="timeline-phase-title">
          <span>{{ title }}</span>
          </h2>
      </div>
      <button
        v-if="time"
        type="button"
        class="timeline-time"
        title="Timer starten"
        @click="$emit('start-timer', time)"
      >
        <PhClock aria-hidden="true" />
        {{ time }}
      </button>
    </header>

    <div class="timeline-content">
      <slot></slot>
    </div>
  </section>
</template>
