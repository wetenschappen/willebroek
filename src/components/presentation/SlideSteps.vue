<script setup>
import { inject, computed } from 'vue'
import { PhArrowsOutSimple, PhCheck } from '@phosphor-icons/vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const iconMap = inject('iconMap', {})

const visibleSteps = computed(() => {
    if (!props.slide.steps) return []
    return props.slide.steps.slice(0, props.revealedSteps)
})
</script>

<template>
<MathSlideWrapper :title="slide.title || 'Overzicht'">
    <div class="flex flex-col gap-4 max-w-5xl mx-auto py-2">
        <div v-for="(step, idx) in visibleSteps" :key="idx"
             class="flex items-center gap-6 p-4 bg-white border border-slate-200 rounded-xl shadow-sm transition-all duration-300 animate-[fadeInUp_0.25s_ease-out]">
            <div class="w-12 h-12 rounded-lg bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                <component :is="iconMap[step.icon] || PhCheck" :size="28" weight="bold" />
            </div>
            <p class="text-slide-body font-medium text-slate-800 leading-snug" v-html="step.text || step.title || step.content"></p>
        </div>

        <!-- Next step helper when not finished -->
        <div v-if="revealedSteps < (slide.steps?.length || 0)" class="mt-2 flex justify-center">
            <button @click="$emit('revealNext', slide.steps.length)"
                    class="px-5 py-2.5 rounded-lg border border-dashed border-presentation text-presentation hover:bg-presentation-soft transition-colors flex items-center gap-2 text-slide-small font-bold cursor-pointer">
                <span>Stap {{ revealedSteps + 1 }} onthullen<template v-if="slide.steps[revealedSteps]?.title">: {{ slide.steps[revealedSteps].title }}</template></span>
                <span class="bg-presentation text-white px-1.5 py-0.5 rounded font-mono select-none text-slide-small">Spatie / →</span>
            </button>
        </div>
    </div>
</MathSlideWrapper>
</template>
