<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
  slide: {
    type: Object,
    required: true
  },
  revealedSteps: {
    type: Number,
    default: 0
  }
})
</script>

<template>
  <!-- Herhaling als genummerde vragenlijst; het onthulde antwoord staat
       ingesprongen onder de vraag met een tekstlabel - geen vraagkaartjes. -->
  <MathSlideWrapper :title="slide.title || 'Herhaling'">
    <div class="pb-2 max-w-[1500px]">
      <p v-if="slide.intro" class="text-slide-body text-slide-ink leading-relaxed mb-8" v-html="slide.intro"></p>

      <div style="border-top: 2px solid var(--color-slide-line);">
        <div v-for="(question, index) in slide.questions"
             :key="index"
             class="py-6 px-2"
             style="border-bottom: 2px solid var(--color-slide-line);">

          <div class="flex items-baseline gap-6">
            <span class="font-mono font-bold text-slide-heading text-slide-red w-14 shrink-0">{{ index + 1 }}.</span>
            <div class="text-slide-heading font-bold text-slide-ink leading-snug" v-html="question.question"></div>
          </div>

          <div v-if="index < revealedSteps" class="mt-4 ml-20 animate-[fadeInUp_0.3s_ease-out]">
            <span class="font-bold text-slide-body" style="color: var(--color-slide-red);">Antwoord:&nbsp;</span>
            <span class="text-slide-body text-slide-ink leading-relaxed" v-html="question.answer"></span>
          </div>
        </div>
      </div>
    </div>
  </MathSlideWrapper>
</template>
