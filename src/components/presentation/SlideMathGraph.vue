<script setup>
import { inject, computed, ref, watch } from 'vue'
import MathGraphSvg from '../activities/MathGraphSvg.vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'
import { PhCheckCircle, PhCheck, PhX } from '@phosphor-icons/vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 },
    parsedCursusLink: { type: Object, default: () => ({}) },
    currentMathConfigForAnalysis: { type: Object, default: null }
})

const emit = defineEmits(['revealNext', 'selectAnswer', 'checkAnswer', 'copyLink', 'showConfetti'])

const interactivePoint = ref(null)

watch(() => props.revealedSteps, () => {
    interactivePoint.value = null
})

watch(() => props.slide, () => {
    interactivePoint.value = null
})

function handleGraphClick({ x, y }) {
    if (!props.currentMathConfigForAnalysis) return
    
    // Snap x to nearest 0.1
    const snappedX = Math.round(x * 10) / 10
    let finalX = snappedX
    let finalY = y
    let label = `(${finalX.toFixed(1)}, ${finalY.toFixed(1)})`
    
    const config = props.currentMathConfigForAnalysis
    if (config.functions && config.functions.length > 0) {
        let nearestFn = null
        let minDistance = Infinity
        let bestY = y
        
        config.functions.forEach(f => {
            try {
                const fVal = f.fn(finalX)
                if (fVal !== null && !isNaN(fVal) && isFinite(fVal)) {
                    const dist = Math.abs(fVal - y)
                    if (dist < minDistance) {
                        minDistance = dist
                        nearestFn = f
                        bestY = fVal
                    }
                }
            } catch (e) {}
        })
        
        if (nearestFn) {
            finalY = Math.round(bestY * 10) / 10
            label = `(${finalX.toFixed(1)}, ${finalY.toFixed(1)})`
        }
    } else {
        finalX = Math.round(x * 2) / 2
        finalY = Math.round(y * 2) / 2
        label = `(${finalX.toFixed(1)}, ${finalY.toFixed(1)})`
    }
    
    interactivePoint.value = {
        id: 'interactive-point',
        x: finalX,
        y: finalY,
        color: '#ea580c', // Amber-600
        label: label
    }
}

const projections = computed(() => {
    if (!interactivePoint.value) return []
    const { x, y } = interactivePoint.value
    return [
        { x1: 0, y1: y, x2: x, y2: y, color: '#ea580c', dashed: true, width: 1.5 },
        { x1: x, y1: 0, x2: x, y2: y, color: '#ea580c', dashed: true, width: 1.5 }
    ]
})

const mergedConfig = computed(() => {
    const baseConfig = props.currentMathConfigForAnalysis
    if (!baseConfig) return null
    
    const configCopy = { ...baseConfig }
    configCopy.points = configCopy.points ? [...configCopy.points] : []
    configCopy.segments = configCopy.segments ? [...configCopy.segments] : []
    
    if (interactivePoint.value) {
        configCopy.points.push(interactivePoint.value)
    }
    if (projections.value.length > 0) {
        configCopy.segments.push(...projections.value)
    }
    
    return configCopy
})
</script>

<template>
<MathSlideWrapper solution :title="slide.title">
    
    <div class="flex-1 flex gap-8 mt-4 pb-8 h-full min-h-[500px]">
        
        <!-- Graph Area -->
        <div class="w-[55%] relative h-[calc(100vh-280px)]">
            <div class="relative h-full bg-white border border-slide-line rounded-xl flex items-center justify-center p-4 overflow-hidden shadow-sm">
                <!-- Grid decoration -->
                <div class="absolute inset-0 pointer-events-none opacity-[0.01]" 
                     style="background-image: radial-gradient(#0f172a 2px, transparent 2px); background-size: 24px 24px;">
                </div>
                
                <Transition name="fade-image" mode="out-in">
                   <MathGraphSvg :key="'graph-'+revealedSteps" v-if="mergedConfig" :config="mergedConfig" @graph-click="handleGraphClick" class="max-w-full max-h-full drop-shadow-sm transition-all duration-500 relative z-10" />
                </Transition>

                <!-- Interactive Coordinates Overlay Badge -->
                <div v-if="interactivePoint" class="absolute bottom-6 left-6 bg-white px-5 py-3 rounded-card flex items-center gap-3 z-20" style="border: 2px solid var(--color-slide-ink); box-shadow: var(--shadow-rest);">
                    <div class="w-3 h-3 rounded-full" style="background: var(--color-digital);"></div>
                    <div class="text-slide-body font-bold tracking-wide text-slide-ink">
                        Geselecteerd: <span class="font-mono text-slide-body ml-1" style="color: var(--color-digital);">{{ interactivePoint.x.toFixed(1) }} ↦ {{ interactivePoint.y.toFixed(1) }}</span>
                    </div>
                    <button @click.stop="interactivePoint = null" class="btn-close ml-2" aria-label="Selectie wissen">
                        <PhX weight="regular" />
                    </button>
                </div>
            </div>
        </div>
        
        <!-- Steps Area -->
        <div class="w-[45%] flex flex-col gap-6 h-[calc(100vh-280px)]">
            <div class="flex-1 overflow-y-auto pr-2 exercise-scroll">
                <div class="space-y-4">
                    <div v-for="(step, idx) in slide.steps" :key="idx" 
                        class="relative transition-all duration-300"
                        :class="idx < revealedSteps ? 'opacity-50 grayscale-[0.5] scale-[0.98]' : (idx === revealedSteps ? 'opacity-100 scale-100' : 'opacity-0 translate-y-8 absolute pointer-events-none')">
                        
                        <div class="relative rounded-xl border p-6 bg-white transition-all duration-300 overflow-hidden shadow-sm"
                             :class="idx === revealedSteps ? 'border-slide-red bg-slide-red-soft' : 'border-slide-line bg-white'">
                            
                            <div class="flex items-start gap-4 mb-3">
                                <!-- Clean Navy/Amber indicators -->
                                <div class="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 shadow-sm font-bold text-slide-body"
                                     :class="idx < revealedSteps ? 'bg-slide-ink text-white border border-line-strong' : 'bg-slide-red text-white border border-slide-red'">
                                    <PhCheck v-if="idx < revealedSteps" weight="bold" class="text-slide-body" />
                                    <span v-else>{{ idx + 1 }}</span>
                                </div>
                                <h4 class="text-slide-body font-bold text-slide-ink mt-1.5" v-html="step.title"></h4>
                            </div>
                            <div class="text-slide-body leading-relaxed text-slide-ink pl-14" v-html="step.description"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Table Box -->
            <div v-if="slide.steps[revealedSteps]?.table && slide.tableColumns" class="shrink-0 animate-[fadeInUp_0.3s_ease-out]">
                <div class="bg-white rounded-xl border border-slide-line shadow-sm p-6 overflow-hidden relative">
                    <h3 v-if="slide.tableTitle" class="text-slide-small font-bold text-slide-ink uppercase tracking-widest mb-4 shrink-0" v-html="slide.tableTitle"></h3>
                    
                    <div class="rounded-lg border border-slide-line overflow-hidden bg-white">
                        <table class="w-full text-slide-body text-left">
                            <thead class="bg-slide-soft border-b border-slide-line">
                                <tr>
                                    <th v-for="col in slide.tableColumns" :key="col.key" class="px-5 py-3 font-bold text-slide-ink border-r border-slide-line last:border-r-0 uppercase tracking-wide text-slide-small" v-html="col.label"></th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slide-line">
                                <tr v-for="(row, i) in slide.steps[revealedSteps].table" :key="i" 
                                    class="transition-colors hover:bg-slide-soft/50"
                                    :class="{'bg-slide-red-soft': row.highlight}">
                                    <td v-for="col in slide.tableColumns" :key="col.key" class="px-5 py-3 border-r border-slide-line last:border-r-0" :class="row.highlight ? 'text-slide-red font-bold' : 'text-slide-ink'" v-html="row[col.key]"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            
            <!-- Completed Banner -->
            <div v-if="revealedSteps >= slide.steps.length" class="mt-4 p-5 rounded-xl bg-slide-red-soft border border-slide-red flex items-center justify-center gap-3 animate-[fadeInUp_0.4s_ease-out] shadow-sm">
                <div class="w-8 h-8 rounded-full bg-slide-red-soft text-slide-red border border-slide-red flex items-center justify-center shadow-inner">
                    <PhCheckCircle weight="fill" class="text-slide-body" />
                </div>
                <span class="text-slide-body font-bold text-slide-red tracking-wide uppercase">Oefening voltooid</span>
            </div>
        </div>
    </div>
</MathSlideWrapper>
</template>

<style scoped>
@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
