<script setup>
import { inject } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

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
<MathSlideWrapper :title="slide.title">
    <!-- Twee tekstkolommen met een kolomkop en scheidingslijn, zoals een
         vergelijking in een cursus - geen twee reuzepanelen. -->
    <div class="flex-1 grid grid-cols-2 gap-12 mt-2 pb-2">

        <div class="relative pr-12" style="border-right: 2px solid var(--color-slide-line);">
            <h4 class="text-slide-heading font-bold text-slide-ink tracking-tight pb-3 mb-6"
                style="border-bottom: 2px solid var(--color-slide-ink);"
                v-html="slide.left?.title || slide.leftTitle"></h4>

            <p class="text-slide-body leading-relaxed text-slide-ink" v-html="slide.left?.content || slide.leftContent"></p>

            <p v-if="slide.left?.example || slide.leftExample" class="text-slide-body mt-8">
                <span class="font-bold underline italic">Voorbeeld:</span>
                <span class="font-mono font-bold text-slide-ink" v-html="' ' + (slide.left?.example || slide.leftExample)"></span>
            </p>

            <div v-if="slide.left?.image" class="mt-8 flex justify-center">
                <img :src="resolveImageUrl(slide.left.image)" class="rounded-card max-h-[280px] object-contain"
                     style="border: 2px solid var(--color-slide-line);">
            </div>
        </div>

        <div>
            <h4 class="text-slide-heading font-bold text-slide-ink tracking-tight pb-3 mb-6"
                style="border-bottom: 2px solid var(--color-slide-red);"
                v-html="slide.right?.title || slide.rightTitle"></h4>

            <p class="text-slide-body leading-relaxed text-slide-ink" v-html="slide.right?.content || slide.rightContent"></p>

            <p v-if="slide.right?.example || slide.rightExample" class="text-slide-body mt-8">
                <span class="font-bold underline italic">Voorbeeld:</span>
                <span class="font-mono font-bold text-slide-red" v-html="' ' + (slide.right?.example || slide.rightExample)"></span>
            </p>

            <div v-if="slide.right?.image" class="mt-8 flex justify-center">
                <img :src="resolveImageUrl(slide.right.image)" class="rounded-card max-h-[280px] object-contain"
                     style="border: 2px solid var(--color-slide-line);">
            </div>
        </div>
    </div>
</MathSlideWrapper>
</template>
