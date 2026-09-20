<script setup>
const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])
</script>

<template>
<div class="w-full h-full flex flex-col items-center justify-center p-20 bg-paper">
    <div class="w-full max-w-6xl">
        <h3 class="text-slide-title font-bold text-slate-900 mb-12 tracking-tight pb-8" style="border-bottom: 2px solid var(--color-line-strong);" v-html="slide.title"></h3>
        <div class="text-slide-heading text-slate-800">
            <div v-html="slide.content || slide.text"></div>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>
