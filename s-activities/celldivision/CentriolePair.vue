<script setup>
defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  rotation: { type: Number, default: 0 },
  aster: { type: Boolean, default: false }
})
</script>

<template>
  <g :transform="`translate(${x} ${y}) rotate(${rotation})`" aria-label="Centriolenpaar">
    <g v-if="aster" fill="none" stroke="var(--color-line)" stroke-width="1.5">
      <path v-for="angle in [0, 45, 90, 135, 180, 225, 270, 315]" :key="angle" :transform="`rotate(${angle})`" d="M 11 0 L 26 0" />
    </g>
    <g fill="var(--color-panel)" stroke="var(--color-ink-soft)" stroke-width="1.5">
      <rect x="-10" y="-6" width="7" height="16" rx="2" />
      <path d="M -8 -4 V 8 M -5 -4 V 8" />
      <rect x="0" y="-9" width="16" height="7" rx="2" />
      <path d="M 2 -7 H 14 M 2 -4 H 14" />
    </g>
  </g>
</template>
