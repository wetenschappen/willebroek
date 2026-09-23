<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'
import PedagogyPanel from './shared/PedagogyPanel.vue'

defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])
</script>

<template>
<MathSlideWrapper :title="slide.title || 'Definitie'">
    <PedagogyPanel variant="theory" :title="slide.term || 'Definitie'">
        <div v-if="slide.formula" class="text-center py-4 mb-4">
            <p class="text-slide-title text-slate-800 font-bold" v-html="slide.formula"></p>
        </div>
        
        <div v-html="slide.explanation || slide.definition || slide.text" class="text-slide-body text-slate-700 font-medium leading-relaxed"></div>
        
        <ul v-if="slide.conditions && slide.conditions.length" class="mt-6 space-y-3">
            <li v-for="(condition, idx) in slide.conditions" :key="idx" 
                class="text-slide-small text-slate-600 flex items-start gap-3 bg-slate-50 border border-slate-200 p-3 rounded-lg">
                <div class="w-5 h-5 rounded-full bg-white border border-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                    <span class="w-2 rounded-full bg-presentation"></span>
                </div>
                <span v-html="condition" class="pt-0.5"></span>
            </li>
        </ul>
    </PedagogyPanel>
    
    <!-- Examples Grid -->
    <div v-if="slide.examples && slide.examples.length" class="grid grid-cols-2 gap-4 mt-4">
        <div v-for="(example, idx) in slide.examples" :key="idx"
             class="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col">
            <p class="text-slide-body font-bold text-slate-800 mb-2" v-html="example.formula"></p>
            <p class="text-slide-small text-slate-600 leading-relaxed font-medium" v-html="example.note"></p>
        </div>
    </div>
    
    <!-- Related Terms -->
    <div v-if="slide.relatedTerms && slide.relatedTerms.length" class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
        <span v-for="(term, idx) in slide.relatedTerms" :key="idx"
              class="px-3 py-1 bg-white border border-slate-200 shadow-sm rounded-full text-slide-small text-ink-soft font-bold tracking-wide uppercase cursor-default">
            {{ term }}
        </span>
    </div>
</MathSlideWrapper>
</template>
