<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

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
    <!-- Definitie zoals in een cursus: de term als inhoudskop met een
         regelscheiding, dan lopende tekst, voorwaarden als lijst en
         voorbeelden met een onderstreepte aanloop zoals in de lesnota's. -->
    <div class="pb-2">
        <h4 class="text-slide-heading font-bold text-slide-ink tracking-tight pb-4 mb-8"
            style="border-bottom: 2px solid var(--color-slide-ink);"
            v-html="slide.term || 'Definitie'"></h4>

        <!-- Formule centraal en groter, zoals een formule op zichzelf in de cursus -->
        <div v-if="slide.formula" class="text-center py-2 mb-8">
            <p class="text-slide-heading text-slide-ink font-bold" v-html="slide.formula"></p>
        </div>

        <div v-html="slide.explanation || slide.definition || slide.text"
             class="text-slide-body text-slide-ink leading-relaxed max-w-[1500px]"></div>

        <ul v-if="slide.conditions && slide.conditions.length"
            class="slide-list text-slide-body text-slide-ink leading-relaxed mt-8">
            <li v-for="(condition, idx) in slide.conditions" :key="idx" v-html="condition"></li>
        </ul>

        <!-- Voorbeelden met de klassieke onderstreepte aanloop -->
        <div v-if="slide.examples && slide.examples.length" class="mt-8 space-y-5">
            <div v-for="(example, idx) in slide.examples" :key="idx" class="text-slide-body text-slide-ink leading-relaxed">
                <span class="font-bold underline italic">Voorbeeld:</span>
                <span class="font-bold" v-html="' ' + example.formula"></span>
                <span v-if="example.note" class="text-slide-ink" v-html="' — ' + example.note"></span>
            </div>
        </div>

        <!-- Verwante termen als één monoregel, geen rij pillen -->
        <p v-if="slide.relatedTerms && slide.relatedTerms.length" class="slide-meta mt-10 pt-6 normal-case"
           style="border-top: 2px solid var(--color-slide-line); letter-spacing: 0.02em;">
            Zie ook: {{ slide.relatedTerms.join(' · ') }}
        </p>
    </div>
</MathSlideWrapper>
</template>
