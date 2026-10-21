<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
    slide: { type: Object, required: true },
    revealedSteps: { type: Number, default: 0 }
})

const emit = defineEmits(['revealNext'])
</script>

<template>
<MathSlideWrapper :title="slide.title || 'Denkvraag'">
    <!-- Denkvraag als grote leestekst, niet als stapel geneste kaders. -->
    <div class="flex flex-col h-full pb-2">
        <p class="text-slide-heading font-bold text-slide-ink leading-snug max-w-[1500px]" v-html="slide.question"></p>

        <p v-if="slide.hint && revealedSteps === 0" class="slide-hint mt-8">
            <span v-html="slide.hint"></span>
        </p>

        <!-- Onthulknop in de slideknoppen-taal -->
        <div v-if="revealedSteps === 0" class="mt-12">
            <button @click="$emit('revealNext', 1)" class="slide-btn slide-btn-primary">
                <span>Toon antwoord</span>
                <span class="slide-key" style="background: transparent; color: inherit; border-color: currentColor;">S</span>
            </button>
        </div>

        <!-- Onthuld antwoord: één accentvlak met tekstlabel -->
        <div v-else class="mt-10 slide-panel-answer p-8 animate-[fadeInUp_0.3s_ease-out] max-w-[1500px]">
            <div class="slide-meta mb-3" style="color: var(--color-slide-red);">Antwoord</div>
            <div class="text-slide-heading text-slide-ink font-medium leading-relaxed" v-html="slide.revealText || slide.answer"></div>
        </div>
    </div>
</MathSlideWrapper>
</template>
