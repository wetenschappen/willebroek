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
  <MathSlideWrapper :title="slide.title || 'Herhaling'">
    <div class="flex flex-col gap-6">
      <!-- Intro text -->
      <div v-if="slide.intro" 
           class="p-6 bg-white border border-slate-200 rounded-xl text-slide-body text-slate-700 leading-relaxed shadow-sm"
           v-html="slide.intro">
      </div>
      
      <!-- Questions List -->
      <div class="flex flex-col gap-6">
        <div v-for="(question, index) in slide.questions"
             :key="index"
             class="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          
          <div class="flex items-start gap-4">
            <!-- Question Number -->
            <div class="flex-shrink-0 w-11 h-11 bg-slate-900 text-white rounded-full flex items-center justify-center text-slide-body font-bold">
              {{ index + 1 }}
            </div>
            <!-- Question Text -->
            <div class="text-slide-heading font-bold text-slate-800 leading-snug pt-1" v-html="question.question"></div>
          </div>
          
          <!-- Answer Box (Amber Highlight, No Left Border) -->
          <div v-if="index < revealedSteps" class="mt-5 ml-15 p-6 bg-presentation-soft border border-presentation rounded-xl animate-[fadeInUp_0.3s_ease-out]">
            <div class="text-slide-small font-bold text-presentation uppercase tracking-wider mb-2">Antwoord</div>
            <div class="text-slide-body text-slate-700 leading-relaxed" v-html="question.answer"></div>
          </div>
          
        </div>
      </div>
    </div>
  </MathSlideWrapper>
</template>
