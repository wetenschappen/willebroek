<script setup>
import { computed } from 'vue'

const props = defineProps({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  length: { type: Number, default: 64 },
  color: { type: String, required: true },
  accentColor: { type: String, default: '' },
  accentSide: { type: String, default: 'right' },
  shape: { type: String, default: 'double' },
  rotation: { type: Number, default: 0 },
  label: { type: String, default: 'Chromosoom' }
})

// Use SVG user coordinates, not a bounding-box-relative CSS transform.
const transform = computed(() => `translate(${props.x} ${props.y}) rotate(${props.rotation}) scale(${props.length / 64})`)
const accentPath = computed(() => {
  if (props.shape === 'single') return 'M -5 16 Q -8 24 -13 30'
  return props.accentSide === 'left'
    ? 'M -5 16 Q -8 24 -13 30'
    : 'M 5 16 Q 8 24 13 30'
})
</script>

<template>
  <g :transform="transform" class="chromosome-glyph" role="img" :aria-label="label">
    <title>{{ label }}</title>
    <template v-if="shape === 'double'">
      <!-- Two continuous sister chromatids meet at the centromere. -->
      <path d="M -13 -30 C -10 -18 -3 -8 -3 0 C -3 8 -10 18 -13 30" :stroke="color" />
      <path d="M 13 -30 C 10 -18 3 -8 3 0 C 3 8 10 18 13 30" :stroke="color" />
      <path v-if="accentColor" :d="accentPath" :stroke="accentColor" />
      <ellipse cx="0" cy="0" rx="7" ry="3.5" class="chromosome-centromere" />
    </template>
    <template v-else-if="shape === 'chromatin'">
      <path d="M -20 -20 C -35 -7 15 -17 13 -2 S -24 -3 -15 13 S 24 4 20 23" :stroke="color" class="chromatin-strand" />
      <path v-if="accentColor" d="M -15 13 C -6 29 24 4 20 23" :stroke="accentColor" class="chromatin-strand" />
    </template>
    <template v-else>
      <path d="M -13 -30 C -10 -18 0 -9 0 0 C 0 9 -10 18 -13 30" :stroke="color" />
      <path v-if="accentColor" :d="accentPath" :stroke="accentColor" />
      <circle cx="0" cy="0" r="3.5" class="chromosome-centromere" />
    </template>
  </g>
</template>

<style scoped>
.chromosome-glyph path { fill: none; stroke-width: 7; stroke-linecap: round; stroke-linejoin: round; }
.chromosome-glyph .chromatin-strand { stroke-width: 3; }
.chromosome-centromere { fill: var(--color-ink); stroke: var(--color-panel); stroke-width: 1.25; }
</style>
