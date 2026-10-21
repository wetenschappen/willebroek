<script setup>
import { inject, computed } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'
import MathGraphSvg from '../activities/MathGraphSvg.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const resolveImageUrl = inject('resolveImageUrl')

const hasGraph = computed(() => {
    return props.slide.image || props.currentMathConfigForAnalysis
})
</script>

<template>
<MathSlideWrapper :title="slide.title">
    <!-- Eigenschappen als label-waarderijen met regelscheiding, zoals een
         cursustabel - niet als een raster van kaartjes. -->
    <div class="flex gap-12 mt-2 pb-2 items-start">
        <div class="flex-1 slide-rows text-slide-body">
            <div v-for="(prop, idx) in slide.properties" :key="idx" class="slide-row">
                <div class="slide-row-label text-slide-body" v-html="prop.label"></div>
                <div class="slide-row-value leading-relaxed" v-html="prop.value"></div>
            </div>
        </div>

        <!-- Grafiek of afbeelding naast de rijen: een licht vlak met zichtbare
             rand, zoals een figuur in de cursus. -->
        <div v-if="hasGraph" class="w-[620px] shrink-0 slide-panel flex items-center justify-center p-8 self-stretch">
            <img v-if="slide.image" :src="resolveImageUrl(slide.image)" class="max-w-full max-h-full object-contain" />
            <MathGraphSvg v-else-if="currentMathConfigForAnalysis"
                          :config="currentMathConfigForAnalysis"
                          class="max-w-full max-h-full" />
        </div>
    </div>

    <!-- Kernzin als gevolglijn, geen apart kadertje. -->
    <ul v-if="slide.summary" class="slide-list text-slide-body text-slide-ink font-semibold leading-relaxed mt-6">
        <li class="slide-arrow" v-html="slide.summary"></li>
    </ul>
</MathSlideWrapper>
</template>
