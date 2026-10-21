<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])
</script>

<template>
<!-- Standaard inhoudsslide: kop en voettekst zoals elke andere inhoudsslide,
     de inhoud als vloeiende tekst. -->
<MathSlideWrapper :title="slide.title">
    <div class="text-slide-heading text-slide-ink leading-relaxed max-w-[1500px] mt-2">
        <div v-html="slide.content || slide.text"></div>
    </div>
</MathSlideWrapper>
</template>

<style scoped>
</style>
