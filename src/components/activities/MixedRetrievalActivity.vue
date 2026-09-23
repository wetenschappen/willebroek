<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhArrowRight, PhArrowClockwise, PhLightbulb, PhCards } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Kennis-Check' },
  questions: {
    type: Array,
    default: () => [
      { q: "Wat is de discriminant van ax² + bx + c = 0?", a: ["b² - 4ac", "b² + 4ac", "√(b² - 4ac)"], c: 0 },
      { q: "Bij welke D-waarde zijn er twee verschillende reële wortels?", a: ["D < 0", "D = 0", "D > 0"], c: 2 },
      { q: "Wat is de rico van de rechte door (0,0) en (2,4)?", a: ["1/2", "2", "4"], c: 1 }
    ]
  },
  fullscreen: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'complete'])

const currentIndex = ref(0)
const selectedOption = ref(null)
const isChecked = ref(false)
const isCorrect = ref(false)
const isComplete = ref(false)
const score = ref(0)

const currentQuestion = computed(() => props.questions[currentIndex.value])

function selectOption(idx) {
  if (isChecked.value) return
  selectedOption.value = idx
}

function checkAnswer() {
  if (selectedOption.value === null) return
  isChecked.value = true
  isCorrect.value = selectedOption.value === currentQuestion.value.c
  if (isCorrect.value) score.value++
}

function nextQuestion() {
  if (currentIndex.value < props.questions.length - 1) {
    currentIndex.value++
    selectedOption.value = null
    isChecked.value = false
    isCorrect.value = false
  } else {
    isComplete.value = true
    emit('complete')
  }
}

function resetActivity() {
  currentIndex.value = 0
  selectedOption.value = null
  isChecked.value = false
  isCorrect.value = false
  isComplete.value = false
  score.value = 0
}

// Reset on open, Escape to close - no fullscreen API touches
watch(() => props.isOpen, (val) => { if (val) resetActivity() })

function handleKeydown(e) {
  if (e.key === 'Escape' && props.isOpen) emit('close')
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <!-- Fullscreen-activiteitenshell: licht, blauw anker (digitale activiteit). -->
  <div v-if="isOpen" class="modal-fullscreen">

    <!-- Kopbalk -->
    <header class="fullscreen-bar fullscreen-bar-digital">
      <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
        <PhCards weight="fill" class="text-xl"/>
      </div>
      <div class="min-w-0">
        <h2 class="fullscreen-title">{{ title }}</h2>
        <p class="fullscreen-label">Consolidatie en herhaling</p>
      </div>
      <button @click="emit('close')" class="btn-close ml-auto" aria-label="Sluiten">
        <PhX class="text-2xl" />
      </button>
    </header>

    <!-- Voortgangsbalk -->
    <div class="fullscreen-progress">
      <span :style="{ width: ((currentIndex + (isComplete ? 1 : 0)) / questions.length * 100) + '%' }"></span>
    </div>

    <!-- Midden -->
    <div class="fullscreen-body flex flex-col items-center justify-center">

      <div v-if="isComplete" class="text-center max-w-2xl w-full">
        <div class="w-16 h-16 rounded-control flex items-center justify-center mx-auto mb-6" style="background: var(--color-digital-soft); color: var(--color-digital);">
          <PhCheckCircle weight="fill" class="text-4xl"/>
        </div>
        <h2 class="text-3xl font-bold text-slate-900 mb-2">Klaar</h2>
        <p class="text-lg text-slate-700 mb-8">Je scoorde {{ score }} van de {{ questions.length }} punten.</p>
        <div class="flex gap-4 justify-center">
          <button @click="resetActivity" class="btn btn-ghost" style="border: 2px solid var(--color-line-strong);">
            <PhArrowClockwise weight="bold"/> Opnieuw
          </button>
          <button @click="emit('close')" class="btn btn-primary">
            Sluiten
          </button>
        </div>
      </div>

      <div v-else class="w-full max-w-2xl bg-white rounded-card p-8" style="border: 2px solid var(--color-line-strong); box-shadow: var(--shadow-rest);">
        <div class="flex items-center justify-between mb-8">
          <span class="badge badge-digital">Vraag {{ currentIndex + 1 }} van {{ questions.length }}</span>
          <div class="flex gap-1">
             <div v-for="n in questions.length" :key="n" class="w-3 h-3 rounded-full"
                  :style="n-1 < currentIndex
                    ? { background: 'var(--color-digital)' }
                    : n-1 === currentIndex
                      ? { background: 'var(--color-line-strong)' }
                      : { background: 'var(--color-line)' }"></div>
          </div>
        </div>

        <h4 class="text-2xl font-bold text-slate-800 mb-8 leading-tight" v-html="currentQuestion.q"></h4>

        <div class="space-y-3">
          <button v-for="(opt, idx) in currentQuestion.a" :key="idx"
                  @click="selectOption(idx)"
                  :disabled="isChecked"
                  class="w-full p-5 rounded-card border-2 text-left flex items-center justify-between gap-4"
                  :style="isChecked && idx === currentQuestion.c
                    ? { borderColor: 'var(--color-workbook)', background: 'var(--color-workbook-soft)' }
                    : isChecked && selectedOption === idx
                      ? { borderColor: 'var(--color-presentation)', background: 'var(--color-presentation-soft)' }
                      : selectedOption === idx
                        ? { borderColor: 'var(--color-digital)', background: 'var(--color-digital-soft)' }
                        : { borderColor: '#d5dfde', background: '#ffffff' }">
            <span class="font-bold text-lg text-slate-800" v-html="opt"></span>
            <div v-if="isChecked" class="shrink-0">
              <PhCheckCircle v-if="idx === currentQuestion.c" weight="fill" class="text-2xl" style="color: var(--color-workbook);"/>
              <PhXCircle v-else-if="selectedOption === idx" weight="fill" class="text-2xl" style="color: var(--color-presentation);"/>
            </div>
          </button>
        </div>

        <div class="mt-10 flex gap-4">
          <button v-if="!isChecked" @click="checkAnswer" :disabled="selectedOption === null"
                  class="flex-1 btn btn-primary" style="min-height: 56px;">
            Controleer antwoord
          </button>
          <button v-else @click="nextQuestion"
                  class="flex-1 btn btn-primary" style="min-height: 56px;">
            {{ currentIndex < questions.length - 1 ? 'Volgende vraag' : 'Bekijk resultaat' }}
            <PhArrowRight weight="bold" />
          </button>
        </div>
      </div>
    </div>

    <!-- Voetbalk -->
    <footer class="fullscreen-foot">
      <p class="text-sm font-medium text-slate-700 flex items-center gap-2 mr-auto">
        <PhLightbulb weight="fill" style="color: var(--color-action);"/>
        Denk rustig na voor je een optie selecteert.
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Geen in-animaties meer: schermen verschijnen direct en rustig. */
</style>
