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
<!-- Titelslide: licht werkblad, geen serif, geen groot decoratief icoon.
     Rood is het presentatietype. -->
<div class="absolute inset-0 bg-paper flex flex-col items-center justify-center p-20 select-none">
    <div class="w-24 h-2 mb-12" style="background: var(--color-presentation);"></div>
    <h2 class="text-7xl font-bold mb-6 text-center tracking-tight text-slate-900" v-html="slide.title"></h2>
    <p v-if="slide.subtitle" class="text-3xl text-slate-700 max-w-5xl mx-auto leading-relaxed text-center" v-html="slide.subtitle"></p>
    <span v-if="slide.badge" class="mt-16 badge badge-class">{{ slide.badge }}</span>
</div>
</template>

<style scoped>
</style>
