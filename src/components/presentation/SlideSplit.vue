<script setup>
import { inject } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const resolveImageUrl = inject('resolveImageUrl')
</script>

<template>
  <MathSlideWrapper :title="slide.title || 'Uitleg'">
    <!-- Tekst rechtstreeks op het papier naast de figuur - geen tekstkader
         binnen de slide. -->
    <div class="grid grid-cols-2 gap-12 h-full flex-1 min-h-0">
      <div class="flex flex-col h-full min-h-0" :class="{ 'order-first': slide.imagePosition === 'right', 'order-last': slide.imagePosition === 'left' }">
        <div class="flex-1 overflow-y-auto exercise-scroll pr-4">
          <div class="text-slide-body leading-relaxed text-slide-ink" v-html="slide.content || slide.text"></div>
        </div>
      </div>

      <div class="relative h-full min-h-0"
           :class="{ 'order-last': slide.imagePosition === 'right' || !slide.imagePosition, 'order-first': slide.imagePosition === 'left' }">
        <img :src="resolveImageUrl(slide.image)" class="w-full h-full object-cover rounded-card"
             style="border: 2px solid var(--color-slide-ink);">
      </div>
    </div>
  </MathSlideWrapper>
</template>
