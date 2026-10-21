<script setup>
import { ref } from 'vue'
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
})

// De modal luistert naar 'selectAnswer' met { id, correct } voor de
// Juist-melding; 'answer' met de volledige keuze blijft voor compatibiliteit.
const emit = defineEmits(['answer', 'selectAnswer'])

const selectedAnswer = ref(null)

const isCorrect = (index) => {
  const opt = props.slide.options[index]
  if (typeof opt === 'object' && opt !== null && opt.correct !== undefined) {
    return !!opt.correct
  }
  return props.slide.correct === index
}

const getOptionText = (option) => {
  if (typeof option === 'string') return option
  return option.text || option.label || ''
}

const getOptionLabel = (option, index) => {
  if (typeof option === 'object' && option !== null && (option.id || option.label) && option.text) {
    return option.id || option.label
  }
  return String.fromCharCode(65 + index)
}

const handleAnswer = (index) => {
  if (selectedAnswer.value !== null) return
  selectedAnswer.value = index
  const correct = isCorrect(index)
  emit('selectAnswer', { id: getOptionLabel(props.slide.options[index], index), correct })
  emit('answer', { selectedIndex: index, isCorrect: correct })
}
</script>

<template>
<MathSlideWrapper :title="slide.title || 'Begripscheck'">
    <!-- Meerkeuze als tekstlijst met letters, zoals een vraag in een
         proefwerk - geen raster van vier kaartjes. -->
    <div class="pb-2 max-w-[1500px]">
        <p class="text-slide-heading text-slide-ink font-bold leading-snug mb-10" v-html="slide.question"></p>

        <div style="border-top: 2px solid var(--color-slide-line);">
            <button
                v-for="(option, index) in slide.options"
                :key="index"
                @click="handleAnswer(index)"
                :disabled="selectedAnswer !== null"
                class="mc-row w-full text-left cursor-pointer focus:outline-none flex items-center gap-8 px-4 py-5 transition-colors duration-200"
                :style="{
                    borderBottom: '2px solid var(--color-slide-line)',
                    background: selectedAnswer !== null && isCorrect(index) ? 'var(--color-workbook-soft)'
                              : (selectedAnswer === index && !isCorrect(index) ? 'var(--color-slide-red-soft)' : 'transparent'),
                    opacity: selectedAnswer !== null && selectedAnswer !== index && !isCorrect(index) ? 0.45 : 1
                }"
            >
                <!-- Letter in mono, zoals antwoordopties in een cursus -->
                <span class="font-mono font-bold text-slide-heading w-14 shrink-0"
                      :style="{ color: selectedAnswer !== null && isCorrect(index) ? 'var(--color-workbook)' : 'var(--color-slide-red)' }">
                    {{ getOptionLabel(option, index) }}.
                </span>

                <span class="text-slide-body font-semibold text-slide-ink flex-1 leading-snug" v-html="getOptionText(option)"></span>

                <!-- Statusicoon: kleur is nooit de enige drager -->
                <svg v-if="selectedAnswer !== null && isCorrect(index)" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-workbook)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <svg v-else-if="selectedAnswer === index && !isCorrect(index)" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="var(--color-slide-red)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
        </div>

        <!-- Uitleg als gevolglijn in één accentvlak -->
        <div v-if="selectedAnswer !== null && slide.explanation" class="mt-8 slide-panel-answer p-8 animate-[fadeInUp_0.3s_ease-out]">
            <div class="slide-meta mb-3" style="color: var(--color-slide-red);">Uitleg</div>
            <div class="text-slide-body text-slide-ink leading-relaxed font-semibold" v-html="slide.explanation"></div>
        </div>
    </div>
</MathSlideWrapper>
</template>

<style scoped>
.mc-row:not(:disabled):hover {
    background: var(--color-slide-soft) !important;
}
.mc-row:focus-visible {
    outline: none;
    box-shadow: inset var(--focus-ring);
}
</style>
