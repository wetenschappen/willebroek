<script setup>
import { computed } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'
const props = defineProps({ slide: { type: Object, required: true }, revealedSteps: { type: Number, default: 0 } })
const emit = defineEmits(['revealNext'])
const visible = computed(() => (props.slide.steps || []).slice(0, props.revealedSteps))
</script>
<template>
  <MathSlideWrapper solution :title="slide.title">
    <div class="book-example text-slide-body text-slide-ink">
      <div v-if="slide.problem || slide.figure" class="book-problem" :class="{ 'book-problem-figure': slide.figure }"><p v-if="slide.problem" v-html="slide.problem"></p><figure v-if="slide.figure" v-html="slide.figure"></figure></div>
      <div v-for="(step, i) in visible" :key="i" class="book-line"><strong v-html="step.label + ':'"></strong><div v-html="step.content"></div></div>
      <button v-if="revealedSteps < (slide.steps?.length || 0)" class="book-reveal text-slide-small" @click="emit('revealNext', slide.steps.length)">{{ slide.steps[revealedSteps].label }} onthullen · Spatie / →</button>
    </div>
  </MathSlideWrapper>
</template>
<style scoped>
.book-example { line-height: 1.35; padding-top: 8px; }
.book-problem { margin-bottom: 32px; }
.book-problem p { margin: 0; }
.book-problem-figure { display: grid; grid-template-columns: minmax(0, 1fr) 420px; gap: 32px; align-items: start; }
.book-problem figure { margin: 0; }
.book-problem :deep(svg) { width: 100%; max-height: 300px; }
.book-line { display: grid; grid-template-columns: 240px minmax(0, 1fr); gap: 24px; margin: 24px 0; align-items: baseline; }
.book-line > strong { color: var(--color-slide-red); }
.book-reveal { border: 2px dashed var(--color-slide-red); color: var(--color-slide-red); padding: 12px 24px; border-radius: var(--radius-control); margin-top: 16px; background: var(--color-slide-paper); font-weight: 700; cursor: pointer; }
</style>
