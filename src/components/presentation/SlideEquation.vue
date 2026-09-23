<script setup>
import { computed } from 'vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const displayItems = computed(() => {
    if (props.slide.variables && props.slide.variables.length) {
        return props.slide.variables.map(v => ({
            title: v.symbol || v.label,
            details: [
                v.meaning,
                v.unit ? `Eenheid: ${v.unit}` : null
            ].filter(Boolean)
        }))
    }
    if (props.slide.parts && props.slide.parts.length) {
        return props.slide.parts.map(p => ({
            title: p.label || p.symbol,
            details: p.items || [
                p.meaning,
                p.unit ? `Eenheid: ${p.unit}` : null
            ].filter(Boolean)
        }))
    }
    return []
})
</script>

<template>
<div class="w-full h-full flex flex-col items-center justify-center p-16 bg-paper relative">
    <div class="w-full max-w-7xl text-center flex flex-col items-center">
        <h3 class="text-slide-heading text-ink-soft mb-8 font-bold" v-html="slide.title"></h3>
        
        <!-- Equation Box with Dedicated KaTeX Styling -->
        <div class="equation-formula slide-panel p-8 mb-6 inline-block font-mono max-w-4xl w-full text-center"
             style="border: 2px solid var(--color-line-strong); background: var(--color-panel); box-shadow: var(--shadow-rest);">
            <div class="font-mono font-bold text-slate-900" v-html="slide.equation"></div>
        </div>
        
        <!-- Subtitle under the equation -->
        <p v-if="slide.subtitle" class="text-slide-heading text-slate-700 mb-8 max-w-3xl" v-html="slide.subtitle"></p>

        <!-- Variables / Parts Grid -->
        <div v-if="displayItems.length" class="w-full grid gap-6 text-left max-w-6xl mt-2"
             :class="displayItems.length > 3 ? 'grid-cols-4' : (displayItems.length === 3 ? 'grid-cols-3' : 'grid-cols-2')">
            <div v-for="(item, idx) in displayItems" :key="idx" 
                 class="p-6 slide-panel text-left flex flex-col"
                 style="border: 2px solid var(--color-line); background: var(--color-panel); border-radius: var(--radius-card);">
                <h4 class="text-slide-heading font-bold mb-3 text-presentation" v-html="item.title"></h4>
                <ul class="space-y-2 mt-auto">
                     <li v-for="(detail, dIdx) in item.details" :key="dIdx" class="text-slide-body text-slate-700 font-medium" v-html="detail"></li>
                </ul>
             </div>
        </div>
    </div>
</div>
</template>

<style scoped>
.equation-formula :deep(.katex) {
    font-size: 3rem;
    line-height: 1.2;
}
.equation-formula :deep(.katex-display) {
    margin: 0;
}
</style>
