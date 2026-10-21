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
  <MathSlideWrapper :title="slide.title || 'Afbeeldingen'">
    <!-- Beelden met een bijschrift onder een dunne regel, zoals figuren in een
         cursus - zonder kaartjes rond elke afbeelding. -->
    <div class="grid gap-10 h-full flex-1 min-h-0"
         :class="{
           'grid-cols-2': !slide.columns || slide.columns === 2,
           'grid-cols-3': slide.columns === 3,
           'grid-cols-4': slide.columns === 4,
         }">
      <figure v-for="(img, idx) in slide.images" :key="idx" class="flex flex-col h-full min-h-0 m-0">
        <div class="flex-1 min-h-[220px] overflow-hidden flex items-center justify-center">
          <img :src="resolveImageUrl(img.src)" class="max-w-full max-h-full object-contain">
        </div>
        <figcaption class="mt-4 pt-3 text-center" style="border-top: 2px solid var(--color-slide-line);">
          <p class="text-slide-body text-slide-ink font-semibold" v-html="img.caption"></p>
          <p v-if="img.title" class="text-slide-small text-slide-ink font-medium" v-html="img.title"></p>
        </figcaption>
      </figure>
    </div>
  </MathSlideWrapper>
</template>
