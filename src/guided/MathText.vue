<script setup>
import { computed } from 'vue'
import 'katex/dist/katex.min.css'
import { parseMathText } from './math.js'

const props = defineProps({
  text: { type: [String, Number], default: '' },
  tag: { type: String, default: 'span' },
})
const parts = computed(() => {
  try { return parseMathText(props.text) }
  catch {
    // De contenttests falen hard op elke ongeldige formule; een runtimefout
    // blijft zichtbaar als fout, niet als ogenschijnlijk geldige platte LaTeX.
    return [{ type: 'error', value: 'Deze formule kan niet getoond worden. Vraag je leerkracht om hulp.' }]
  }
})
</script>

<template>
  <component :is="tag" class="guided-math-text">
    <template v-for="(part, index) in parts" :key="index">
      <span v-if="part.type === 'math'" :class="part.display ? 'guided-math-block' : 'guided-math-inline'" v-html="part.html"></span>
      <span v-else-if="part.type === 'error'" class="guided-math-error" role="alert">{{ part.value }}</span>
      <template v-else>{{ part.value }}</template>
    </template>
  </component>
</template>

<style scoped>
.guided-math-text { min-width: 0; overflow-wrap: break-word; }
.guided-math-inline { display: inline-block; max-width: 100%; vertical-align: baseline; }
.guided-math-block { display: block; max-width: 100%; padding: 8px 0; overflow-x: auto; }
.guided-math-block :deep(.katex-display) { margin: 8px 0; text-align: left; }
.guided-math-error { color: var(--color-presentation); font-weight: 600; }
</style>
