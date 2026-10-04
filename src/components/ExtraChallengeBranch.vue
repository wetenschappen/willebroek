<script setup>
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
      <span class="activity-meta">EXTRA</span>
      <strong>{{ label }}</strong>
      <span class="extra-branch-indicator" aria-hidden="true">{{ isOpen ? '−' : '+' }}</span>
    </button>

    <div v-if="isOpen" class="extra-branch-content">
      <slot></slot>
    </div>
  </div>
</template>
