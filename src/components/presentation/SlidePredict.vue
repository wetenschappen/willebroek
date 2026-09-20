<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'
import PedagogyPanel from './shared/PedagogyPanel.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 }
})

const emit = defineEmits(['revealNext'])
</script>

<template>
<MathSlideWrapper :title="slide.title || 'Denkvraag'">
    <PedagogyPanel variant="formula" title="Denkvraag" icon="question">
        <div class="text-slide-heading font-bold text-slate-800 leading-relaxed mb-6" v-html="slide.question"></div>
        
        <!-- Button (Flat Border, No Gradients/Glows) -->
        <div v-if="revealedSteps === 0" class="flex justify-center mt-8 mb-4">
            <button @click="$emit('revealNext', 1)" 
                    class="px-8 py-4 bg-presentation text-white rounded-xl font-bold text-slide-body shadow-sm hover:bg-presentation transition-colors flex items-center gap-3 cursor-pointer border border-presentation">
                <span class="tracking-wider uppercase">Toon Antwoord</span>
                <div class="text-presentation text-slide-small px-2 py-0.5 bg-presentation-soft rounded border border-presentation font-mono font-bold">
                    S
                </div>
            </button>
        </div>
        
        <!-- Answer Reveal (No Glows/Gradients) -->
        <div v-else class="mt-8 animate-[fadeInUp_0.3s_ease-out]">
            <div class="relative py-4">
                <div class="absolute inset-0 flex items-center">
                    <div class="w-full border-t border-presentation"></div>
                </div>
                <div class="relative flex justify-center">
                    <span class="bg-presentation-soft px-4 py-1.5 text-presentation font-bold tracking-wider text-slide-small uppercase rounded-lg border border-presentation shadow-sm">
                        Antwoord
                    </span>
                </div>
            </div>
            
            <div class="text-slide-heading text-slate-700 font-medium leading-relaxed bg-presentation-soft p-8 rounded-xl border border-presentation mt-4">
                <span v-html="slide.revealText || slide.answer" class="block"></span>
            </div>
        </div>
    </PedagogyPanel>
</MathSlideWrapper>
</template>
