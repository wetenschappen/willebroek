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
<MathSlideWrapper :title="slide.title">
    <!-- Waardetabel zoals in een cursus: de formule centraal erboven, daarna
         een echte tabel, en de noot als gewone monotekst - geen kaders. -->
    <div class="flex flex-col items-center mt-4 pb-2">

        <div v-if="slide.formula" class="text-slide-heading font-bold font-mono text-slide-ink mb-10" v-html="slide.formula"></div>

        <table class="text-slide-heading border-collapse" style="border: 2px solid var(--color-slide-ink);">
            <thead>
                <tr style="background: var(--color-slide-ink); color: #ffffff;">
                    <th class="px-8 py-4 text-center font-bold font-mono text-slide-heading min-w-[160px]"
                        style="border-right: 2px solid var(--color-slide-ink);">{{ slide.xLabel || 'x' }}</th>
                    <th v-for="(row, idx) in slide.rows" :key="'x-'+idx"
                        class="px-8 py-4 text-center font-bold font-mono text-slide-heading min-w-[110px]"
                        :style="{
                            borderRight: '2px solid var(--color-slide-ink)',
                            background: row.highlight ? 'var(--color-slide-red)' : 'transparent'
                        }">
                        <span v-html="row.x"></span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr style="border-top: 2px solid var(--color-slide-ink);">
                    <td class="px-8 py-4 text-center font-bold font-mono text-slide-heading"
                        style="border-right: 2px solid var(--color-slide-ink); background: var(--color-slide-soft); color: var(--color-slide-ink);">
                        {{ slide.yLabel || 'f(x)' }}
                    </td>
                    <td v-for="(row, idx) in slide.rows" :key="'y-'+idx"
                        class="px-8 py-4 text-center font-mono text-slide-heading"
                        :style="{
                            borderRight: '2px solid var(--color-slide-line)',
                            color: row.highlight ? 'var(--color-slide-red)' : 'var(--color-slide-ink)',
                            fontWeight: row.highlight ? 800 : 500,
                            background: row.highlight ? 'var(--color-slide-red-soft)' : 'var(--color-slide-paper)'
                        }">
                        <span v-html="row.y"></span>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="slide.note" class="slide-meta mt-8 normal-case" style="letter-spacing: 0.02em;" v-html="slide.note"></p>
    </div>

</MathSlideWrapper>
</template>

<style scoped>
td:last-child, th:last-child {
    border-right: none !important;
}
</style>
