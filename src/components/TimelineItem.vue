<script setup>
import { computed } from 'vue'
import { PhCheck, PhClock } from '@phosphor-icons/vue'

const props = defineProps({
  step: String,
  title: String,
  subtitle: String,
  time: String,
  isLast: Boolean,
  status: {
    type: String,
    default: 'pending'
  }
})

defineEmits(['start-timer'])
const isDone = computed(() => props.status === 'done')
const isActive = computed(() => props.status === 'active' || isDone.value)
</script>

<template>
  <section :class="['timeline-line', { active: isActive, 'pb-12': !isLast, 'pb-0': isLast }]">
    <div :class="['timeline-icon absolute -left-[23px] top-0', { active: isActive }]" aria-hidden="true">
      <PhCheck v-if="isDone" weight="bold" />
      <span v-else>{{ step }}</span>
    </div>

    <div class="timeline-heading">
      <h2>{{ title }}</h2>
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
    </div>

    <slot></slot>
  </section>
</template>
