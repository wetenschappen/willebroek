<script setup>
import { computed } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'
import PedagogyPanel from './shared/PedagogyPanel.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const problemText = computed(() => {
    if (props.slide.problem) return props.slide.problem
    if (props.slide.opgave) return props.slide.opgave
    if (props.slide.situation) return props.slide.situation
    if (props.slide.description) return props.slide.description
    const firstStep = props.slide.steps?.[0]
    if (firstStep && (firstStep.label === 'Situatie' || firstStep.label === 'Opgave' || firstStep.label === 'Gegeven')) {
        return (firstStep.content || firstStep.result || firstStep.text)
    }
    return props.slide.title || 'Uitgewerkt voorbeeld'
})

const displaySteps = computed(() => {
    if (!props.slide.steps) return []
    const firstStep = props.slide.steps[0]
    // If first step was used as problem text and was explicitly 'Situatie' or 'Opgave', omit it from right steps
    if (firstStep && (firstStep.label === 'Situatie' || firstStep.label === 'Opgave') && !props.slide.problem) {
        return props.slide.steps.slice(1)
    }
    return props.slide.steps
})

const visibleSteps = computed(() => {
    return displaySteps.value.slice(0, props.revealedSteps)
})
</script>

<template>
<MathSlideWrapper :title="slide.title || 'Voorbeeld'">
    <div class="grid grid-cols-[0.85fr_1.55fr] gap-8 mt-2 pb-6 items-start">
        <!-- Left: Problem -->
        <div>
            <PedagogyPanel variant="example" title="Opgave">
                <div v-if="slide.method" class="mb-4 inline-flex px-3 py-1 bg-presentation-soft border border-presentation text-presentation rounded-full text-slide-small font-bold">
                    Methode: {{ slide.method }}
                </div>
                <div class="text-slide-body leading-relaxed text-slate-700 font-medium" v-html="problemText"></div>
            </PedagogyPanel>
        </div>
        
        <!-- Right: Solution steps -->
        <div class="flex flex-col gap-3">
            <h4 class="text-slide-small font-bold text-slate-600 mb-1 pl-1">Uitwerking</h4>
            
            <div class="space-y-3">
                <div v-for="(step, idx) in visibleSteps" :key="idx"
                     class="bg-white rounded-xl p-4 border border-slate-200 flex gap-4 shadow-sm items-start animate-[fadeInUp_0.25s_ease-out]">
                    <div class="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-slide-small font-bold shrink-0 mt-0.5">
                        {{ idx + 1 }}
                    </div>
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-slide-small text-presentation mb-0.5 font-bold" v-html="step.action || step.label || step.title || ('Stap ' + (idx + 1))"></p>
                        <div class="text-slide-body text-slate-800 font-medium leading-snug" v-html="step.result || step.content || step.text"></div>
                    </div>
                </div>
            </div>
            
            <!-- Answer Box if provided: only visible when all steps have been revealed -->
            <div v-if="slide.answer && revealedSteps >= displaySteps.length" 
                 class="mt-2 bg-presentation-soft border border-presentation text-slate-800 p-4 rounded-xl shadow-sm animate-[fadeInUp_0.3s_ease-out]">
                 <h4 class="text-slide-small font-bold text-presentation mb-1 flex items-center gap-2">
                     Eindresultaat
                 </h4>
                 <div class="text-slide-body font-bold text-slate-900" v-html="slide.answer"></div>
            </div>

            <!-- Next step reveal button / guide when steps remain -->
            <div v-if="revealedSteps < displaySteps.length" class="mt-2 flex justify-start">
                <button @click="$emit('revealNext', displaySteps.length)"
                        class="px-4 py-2.5 rounded-lg border border-dashed border-presentation text-presentation hover:bg-presentation-soft transition-colors flex items-center gap-2 text-slide-small font-bold cursor-pointer">
                    <span>Stap {{ revealedSteps + 1 }} onthullen<template v-if="displaySteps[revealedSteps]?.label">: {{ displaySteps[revealedSteps].label }}</template></span>
                    <span class="bg-presentation text-white px-1.5 py-0.5 rounded font-mono select-none text-slide-small">Spatie / →</span>
                </button>
            </div>
        </div>
    </div>
</MathSlideWrapper>
</template>
