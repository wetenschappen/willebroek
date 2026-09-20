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
<div class="w-full h-full flex flex-col items-center justify-center p-20 bg-white relative">
    <div class="w-full max-w-7xl text-center">
        <h3 class="text-slide-heading uppercase tracking-[0.2em] text-ink-soft mb-16 font-bold" v-html="slide.title"></h3>
        
        <div class="slide-panel p-20 mb-8 inline-block font-mono">
            <p class="text-slide-display font-bold text-slate-900">{{ slide.equation }}</p>
        </div>
        
        <!-- Subtitle under the equation -->
        <p v-if="slide.subtitle" class="text-slide-heading text-slate-700 mb-16">{{ slide.subtitle }}</p>

        <div v-if="slide.parts && slide.parts.length" class="flex justify-center gap-12">
            <div v-for="(part, idx) in slide.parts" :key="idx" 
                 class="p-10 slide-panel text-left w-[520px]"
                 :class="part.color === 'violet' ? 'border-slate-400' : 'border-presentation'">
                <h4 class="text-slide-heading uppercase tracking-widest font-bold mb-6 text-slate-600">
                    {{ part.label }}
                </h4>
                <ul class="space-y-4">
                     <li v-for="item in part.items" :key="item" class="text-slide-heading text-slate-700">{{ item }}</li>
                </ul>
             </div>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>
