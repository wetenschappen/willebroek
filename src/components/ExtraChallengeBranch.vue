<script setup>
import { PhPlus, PhMinus } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  label: { type: String, default: 'Extra materiaal' }
})

const emit = defineEmits(['update:isOpen'])
function toggle() { emit('update:isOpen', !props.isOpen) }
</script>

<template>
  <div class="extra-branch">
    <button
      type="button"
      class="extra-branch-toggle"
      :class="{ open: isOpen }"
      :aria-expanded="isOpen"
      @click="toggle"
    >
      <PhMinus v-if="isOpen" weight="bold" aria-hidden="true" />
      <PhPlus v-else weight="bold" aria-hidden="true" />
      {{ label }}
    </button>

    <div v-if="isOpen" class="extra-branch-content">
      <slot></slot>
    </div>
  </div>
</template>
