<script setup>
import { computed } from 'vue'
import { PhCheck, PhCaretRight } from '@phosphor-icons/vue'

const props = defineProps({
  type: { type: String, default: 'digital' },
  meta: String,
  title: String,
  description: String,
  time: String,
  isDone: Boolean,
  locked: Boolean
})

defineEmits(['click'])

const typeClasses = computed(() => ({
  class: 'card-class',
  paper: 'card-paper',
  digital: 'card-digital',
  check: 'card-check'
}[props.type]))

const badgeText = computed(() => ({
  class: 'PRESENTATIE',
  paper: 'BOEK / BUNDEL',
  digital: 'DIGITAAL',
  check: 'DIGITAAL'
}[props.type]))

const actionText = computed(() => ({
  class: 'Open presentatie',
  paper: 'Open boek / bundel',
  digital: 'Start digitaal',
  check: 'Controleer digitaal'
}[props.type]))
</script>

<template>
  <button
    type="button"
    @click="!locked && $emit('click')"
    :class="['lesson-activity', typeClasses, { 'card-interactive': !locked, 'card-locked': locked, 'card-done': isDone }]"
    :disabled="locked"
  >
    <span class="lesson-activity-copy">
      <span class="activity-meta">{{ meta || badgeText }}</span>
      <strong>{{ title }}</strong>
      <span v-if="description" class="activity-description">{{ description }}</span>
    </span>
    <span class="lesson-activity-action">
      <PhCheck v-if="isDone" weight="bold" aria-hidden="true" />
      <span v-else>{{ actionText }}</span>
      <PhCaretRight v-if="!isDone" weight="regular" aria-hidden="true" />
    </span>
  </button>
</template>
