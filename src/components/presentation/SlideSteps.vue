<script setup>
import { inject } from 'vue'
import { PhArrowsOutSimple } from '@phosphor-icons/vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const resolveImageUrl = inject('resolveImageUrl')
const iconMap = inject('iconMap', {})
</script>

<template>
<div class="w-full h-full flex flex-col items-center justify-center p-20 bg-white relative">
    <div class="w-full max-w-7xl">
        <div class="flex items-center gap-8 mb-20">
            <div class="h-28 w-3 slide-anchor"></div>
            <h3 class="text-slide-hero font-bold text-slate-900 tracking-tight" v-html="slide.title"></h3>
        </div>
        <div class="grid grid-cols-1 gap-8">
            <div v-for="(step, idx) in slide.steps" :key="idx" 
                 class="flex items-center gap-12 p-10 slide-panel-muted transition-all duration-700"
                 :class="idx < revealedSteps ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'">
                <div class="w-24 h-24 slide-number">
                    <component :is="iconMap[step.icon] || PhArrowsOutSimple" class="text-slide-heading text-white" weight="bold" />
                </div>
                <p class="text-slide-heading font-medium text-slate-800" v-html="step.text || step.title"></p>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>
