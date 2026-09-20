<script setup>
import { inject } from 'vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const resolveImageUrl = inject('resolveImageUrl')
</script>

<template>
<!-- Beeldslide: een donkere foto is niet leesbaar tegen een witte muur, dus de
     afbeelding staat naast de tekst op een licht vlak. -->
<div class="absolute inset-0 bg-paper flex items-stretch">
    <div class="flex-1 flex flex-col items-start justify-center px-16 py-12">
        <div class="w-16 h-2 mb-8" style="background: var(--color-presentation);"></div>
        <h3 class="text-5xl font-bold text-slate-900 mb-6 tracking-tight" v-html="slide.title"></h3>
        <p v-if="slide.subtitle" class="text-2xl text-slate-700 leading-relaxed" v-html="slide.subtitle"></p>
        <p v-if="slide.credit" class="mt-8 font-mono text-sm text-slate-600">{{ slide.credit }}</p>
    </div>
    <div class="w-2/5 shrink-0 p-8">
        <img
            :src="resolveImageUrl(slide.image)"
            alt=""
            class="w-full h-full object-cover rounded-card"
            style="border: 2px solid var(--color-line-strong);"
        />
    </div>
</div>
</template>

<style scoped>
</style>
