<script setup>
import { computed } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

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
<MathSlideWrapper :title="slide.title || 'Formule'">
    <!-- Formule centraal zoals in een cursus, met de grootheden eronder als
         label-waarderijen - geen vier reuzeboxen. -->
    <div class="pb-2">
        <div class="equation-formula text-center py-6 mb-4">
            <span class="font-mono font-bold text-slide-ink" v-html="slide.equation"></span>
        </div>

        <p v-if="slide.subtitle" class="text-slide-body text-slide-ink text-center mb-10 max-w-4xl mx-auto leading-relaxed" v-html="slide.subtitle"></p>

        <div v-if="displayItems.length" class="slide-rows text-slide-body max-w-[1500px] mx-auto">
            <div v-for="(item, idx) in displayItems" :key="idx" class="slide-row">
                <div class="slide-row-label text-slide-heading font-mono" v-html="item.title"></div>
                <div class="slide-row-value leading-relaxed">
                    <span v-for="(detail, dIdx) in item.details" :key="dIdx" v-html="detail + (dIdx < item.details.length - 1 ? ' — ' : '')"></span>
                </div>
            </div>
        </div>
    </div>
</MathSlideWrapper>
</template>

<style scoped>
.equation-formula :deep(.katex) {
    font-size: 3.4rem;
    line-height: 1.2;
}
.equation-formula :deep(.katex-display) {
    margin: 0;
}
</style>
