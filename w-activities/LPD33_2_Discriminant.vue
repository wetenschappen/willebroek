<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhMathOperations,
  PhArrowClockwise, PhLightbulb, PhBrain, PhPencilSimpleLine, PhBookOpen
} from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Discriminant en Oplossingen' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhMathOperations }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])

const mainArea = ref(null)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const attemptCount = ref(0)
const hintCount = ref(0)

// ========== PEDAGOGICAL STATE ==========
const showWorkedExample = ref(true)
const showPrediction = ref(false)
const predictionAnswer = ref(null)
const predictionSubmitted = ref(false)
const predictionCorrect = ref(false)
const showWhy = ref(false)
const whyText = ref('')
const showReflection = ref(false)
const reflectionAnswer = ref('')
const reflectionDone = ref(false)
const errorDetected = ref('')

const feedback = ref({ type: 'info', text: 'Pas de sliders aan om de juiste discriminant te krijgen.' })

const currentInternalLevel = ref(0)
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')

// ========== LEVEL GENERATION ==========
const levels = ref([])

function generateLevel(index) {
  switch (index) {
    case 0: {
      // Level 1: Apply — make D > 0 (2 solutions)
      return {
        goalText: 'Maak een parabool met exact 2 snijpunten met de x-as. (D > 0)',
        targetRoots: 2,
        predictionQuestion: 'Hoeveel snijpunten heeft een parabool als D > 0?',
        predictionOptions: [0, 1, 2],
        predictionCorrect: 2,
        worked: {
          problem: '2x² + 5x + 3 = 0',
          steps: [
            'a = 2, b = 5, c = 3',
            'D = b² − 4ac = 25 − 24 = 1',
            'D > 0 → 2 oplossingen'
          ],
          answer: 'D = 1 → 2 snijpunten'
        },
        whyExplanation: 'De discriminant D = b²−4ac staat onder het wortelteken in de abc-formule. Als D > 0, kun je twee verschillende wortels trekken, dus twee x-waarden waar de parabool de x-as snijdt.',
        reflectionQuestion: 'Waarom vertelt D ons het aantal snijpunten zonder de abc-formule te gebruiken?'
      }
    }
    case 1: {
      // Level 2: Analyze — make D = 0 (1 solution / tangent)
      return {
        goalText: 'Zorg dat de parabool de x-as op precies 1 punt raakt. (D = 0)',
        targetRoots: 1,
        predictionQuestion: 'Wat is D als de parabool de x-as precies raakt?',
        predictionOptions: ['D > 0', 'D = 0', 'D < 0'],
        predictionCorrect: 'D = 0',
        worked: {
          problem: 'x² + 4x + 4 = 0',
          steps: [
            'a = 1, b = 4, c = 4',
            'D = 16 − 16 = 0',
            'D = 0 → 1 raakpunt'
          ],
          answer: 'D = 0 → 1 raakpunt'
        },
        whyExplanation: 'Als D = 0, dan is √D = 0. De abc-formule geeft x = −b/(2a), precies één oplossing. De parabool raakt de x-as in de top.',
        reflectionQuestion: 'Waarom heeft een parabool met D = 0 precies één oplossing, en niet twee dezelfde?'
      }
    }
    case 2: {
      // Level 3: Evaluate — make D < 0 (no real solutions)
      return {
        goalText: 'Maak een parabool die de x-as nergens raakt. (D < 0)',
        targetRoots: 0,
        predictionQuestion: 'Wat is D als de parabool de x-as nergens raakt?',
        predictionOptions: ['D > 0', 'D = 0', 'D < 0'],
        predictionCorrect: 'D < 0',
        worked: {
          problem: 'x² + 2x + 5 = 0',
          steps: [
            'a = 1, b = 2, c = 5',
            'D = 4 − 20 = −16',
            'D < 0 → geen reële oplossingen'
          ],
          answer: 'D = −16 → 0 snijpunten'
        },
        whyExplanation: 'Als D < 0, moet je √(negatief getal) berekenen. Dat kan niet in ℝ. De parabool zweeft boven of onder de x-as zonder hem te raken.',
        reflectionQuestion: 'Waarom heeft een negatieve discriminant geen reële oplossingen? Leg uit met de abc-formule.'
      }
    }
  }
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

// ========== SLIDER VALUES ==========
const valA = ref(1)
const valB = ref(0)
const valC = ref(0)

const disc = computed(() => (valB.value * valB.value) - (4 * valA.value * valC.value))
const roots = computed(() => {
  const d = disc.value
  if (valA.value === 0) return []
  if (d < 0) return []
  if (d === 0) return [-valB.value / (2 * valA.value)]
  return [(-valB.value - Math.sqrt(d)) / (2 * valA.value), (-valB.value + Math.sqrt(d)) / (2 * valA.value)]
})

// ========== HINTS ==========
function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    'D = b²−4ac. Welke combinatie van a, b, c geeft het gewenste teken voor D?',
    'Voorbeeld: a=1, b=4, c=4 → D = 16−16 = 0. Pas aan voor jouw doel.',
    'Concept: D > 0 nodig voor 2 snijpunten, D = 0 voor 1 raakpunt, D < 0 voor geen snijpunten.'
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

// ========== PREDICTION GATE ==========
function checkPrediction() {
  if (predictionAnswer.value === null) return
  const corr = currentLevelData.value.predictionCorrect
  predictionCorrect.value = Array.isArray(corr)
    ? predictionAnswer.value === corr[currentInternalLevel.value]
    : predictionAnswer.value === corr
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Pas nu de sliders aan.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk nog eens na. Hoe hangt D samen met het aantal snijpunten?' }
  }
}

// ========== SLIDER CHECK ==========
const debounceTimer = ref(null)

watch([valA, valB, valC], () => {
  if (debounceTimer.value) clearTimeout(debounceTimer.value)
  debounceTimer.value = setTimeout(() => {
    if (isCorrect.value || showPrediction.value || showWorkedExample.value || showReflection.value) return
    if (valA.value === 0) {
      feedback.value = { type: 'error', text: 'Let op! a = 0 geeft geen parabool.' }
      return
    }
    attemptCount.value++
    if (roots.value.length === currentLevelData.value.targetRoots) {
      isCorrect.value = true
      hintCount.value = 0
      errorDetected.value = ''
      showWhyExplanation(currentLevelData.value.whyExplanation)

      const lpdText = currentInternalLevel.value === 0
        ? 'LPD 33: Je past de discriminant toe om het aantal oplossingen te bepalen (D > 0).'
        : currentInternalLevel.value === 1
          ? 'LPD 33: Je analyseert het verband tussen D = 0 en het raakpunt.'
          : 'LPD 33: Je evalueert waarom D < 0 geen reële oplossingen geeft.'
      feedback.value = { type: 'success', text: lpdText }
    } else {
      let errMsg = ''
      if (currentLevelData.value.targetRoots === 2 && disc.value <= 0) {
        errMsg = 'D moet positief zijn voor 2 snijpunten. Probeer b groter te maken of c kleiner.'
      } else if (currentLevelData.value.targetRoots === 1 && disc.value !== 0) {
        errMsg = disc.value > 0 ? 'D > 0 geeft 2 snijpunten. Maak D = 0 door b² = 4ac.' : 'D < 0 geeft geen snijpunten. Maak D = 0.'
      } else if (currentLevelData.value.targetRoots === 0 && disc.value >= 0) {
        errMsg = 'D moet negatief zijn. Maak b² < 4ac.'
      }
      feedback.value = { type: 'error', text: attemptCount.value >= 3
        ? 'Kijk naar het voorbeeld. D = b²−4ac. Welke kant moet D op?'
        : errMsg }
    }
  }, 400)
})

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

// ========== REFLECTION ==========
function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('wortel') || text.includes('discriminant') || text.includes('abc') || text.includes('b²') || text.includes('negatief')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt de rol van de discriminant.<br/><br/><strong>LPD 33 bewezen:</strong> Je kan de discriminant berekenen en verklaren waarom D het aantal oplossingen bepaalt.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom D het aantal snijpunten bepaalt. Gebruik de abc-formule en leg uit wat er gebeurt als D negatief is.' }
  }
}

// ========== HANDLERS ==========
function skipWorkedExample() {
  showWorkedExample.value = false
  showPrediction.value = currentInternalLevel.value >= 1
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Pas de sliders aan.' }
  }
}

function resetActivityState() {
  isCorrect.value = false
  celebrationDone.value = false
  attemptCount.value = 0
  hintCount.value = 0
  predictionAnswer.value = null
  predictionSubmitted.value = false
  predictionCorrect.value = false
  errorDetected.value = ''
  showWhy.value = false
  whyText.value = ''
  showReflection.value = false
  reflectionAnswer.value = ''
  reflectionDone.value = false
  valA.value = 1
  valB.value = 0
  valC.value = 2

  showWorkedExample.value = currentInternalLevel.value === 0
  showPrediction.value = currentInternalLevel.value >= 1

  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Pas de sliders aan.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over de discriminant.' }
    return
  }

  if (currentInternalLevel.value < totalInternalLevels - 1) {
    currentInternalLevel.value++
    resetActivityState()
    nextTick(() => mainArea.value?.focus())
  } else {
    if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1)
    else emit('complete')
  }
}

// ========== LIFECYCLE ==========
watch(() => props.isOpen, (val) => {
  if (val) {
    levels.value = [generateLevel(0), generateLevel(1), generateLevel(2)]
    currentInternalLevel.value = 0
    resetActivityState()
    nextTick(() => mainArea.value?.focus())
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
}, { immediate: true })

function handleKeydown(e) { if (e.key === 'Escape' && props.isOpen) emit('close') }
onMounted(() => {})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
<div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-800">
    <div class="absolute inset-0 bg-slate-900/10 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none min-w-[44px] min-h-[44px]"
         @click="emit('close')" role="button" tabindex="0"
         @keydown.enter.prevent="emit('close')" @keydown.space.prevent="emit('close')" aria-label="Sluiten"></div>
    <div ref="mainArea" tabindex="-1" class="relative flex flex-col w-screen h-screen overflow-hidden shadow-md bg-white">

      <!-- HEADER -->
      <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center p-2 rounded-lg bg-amber-50">
            <component :is="props.icon" weight="fill" class="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-900">{{ title }}</h2>
            <div class="flex items-center gap-3">
              <div class="flex gap-1">
                <span v-for="i in totalInternalLevels" :key="i"
                      class="w-2.5 h-2.5 rounded-full border"
                      :class="i <= currentInternalLevel + 1 ? 'bg-amber-500 border-amber-600' : 'bg-slate-200 border-slate-300'">
                </span>
              </div>
              <span class="text-xs font-semibold text-slate-500">{{ levelLabels[currentInternalLevel] }} — Level {{ currentInternalLevel + 1 }}</span>
              <span v-if="totalSteps > 1" class="text-xs text-slate-400 ml-2">Stap {{ currentStep }} van {{ totalSteps }}</span>
            </div>
          </div>
        </div>
        <button @click="emit('close')"
                class="p-2 text-slate-500 transition-colors rounded-full hover:bg-slate-100 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
          <PhX class="w-6 h-6" />
        </button>
      </header>

      <!-- MAIN -->
      <main class="flex flex-1 overflow-hidden">
        <!-- LEFT SIDEBAR -->
        <div class="flex-col hidden w-full max-w-sm bg-white border-r border-slate-200 md:flex z-10">
          <div class="flex-1 p-6 overflow-y-auto">
            <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">Instructies</h3>
            <MathText :content="props.instruction || 'De discriminant D = b²−4ac bepaalt het aantal snijpunten van de parabool met de x-as. Pas a, b en c aan.'" class="mb-4 prose prose-sm text-slate-600" />

            <!-- Worked Example -->
            <div v-if="showWorkedExample" class="bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-400 animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Voorbeeld — Doe ik voor</span>
              </div>
              <MathText :content="'\( ' + currentLevelData.worked.problem + ' \)'" class="text-sm font-mono font-bold text-slate-800 mb-3" />
              <div class="space-y-1.5 text-sm text-slate-700">
                <div v-for="(step, si) in currentLevelData.worked.steps" :key="si" class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold shrink-0 mt-0.5">{{ si + 1 }}.</span>
                  <span v-html="step"></span>
                </div>
              </div>
              <div class="mt-2 p-2 bg-white rounded-lg text-center font-bold text-amber-700 border border-amber-200">
                {{ currentLevelData.worked.answer }}
              </div>
              <button @click="skipWorkedExample"
                      class="mt-3 w-full py-2 text-sm font-bold text-amber-700 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Begrepen! Zelf proberen →
              </button>
            </div>

            <!-- Prediction Gate -->
            <div v-if="showPrediction && !showWorkedExample" class="p-4 border border-amber-200 bg-amber-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhLightbulb class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Voorspel</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.predictionQuestion }}</p>
              <div class="flex flex-col gap-2">
                <button v-for="opt in currentLevelData.predictionOptions" :key="opt"
                        @click="predictionAnswer = opt"
                        class="w-full py-2 px-3 rounded-lg font-bold text-sm transition-colors border-2 text-left focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                        :class="predictionAnswer === opt ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'">
                  {{ opt }}
                </button>
              </div>
              <button v-if="predictionAnswer !== null && !predictionSubmitted" @click="checkPrediction"
                      class="mt-3 w-full py-2 text-sm font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Bevestig voorspelling
              </button>
            </div>

            <!-- Task Area -->
            <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-4 shadow-inner">
              <div class="text-center bg-white p-4 border border-slate-200 rounded-lg">
                <p class="font-mono text-xl font-black text-slate-700">f(x) = {{ valA }}x² {{ valB >= 0 ? '+' + valB : '−' + Math.abs(valB) }}x {{ valC >= 0 ? '+' + valC : '−' + Math.abs(valC) }}</p>
                <div class="bg-slate-100 p-2 rounded-lg mt-2">
                  <p class="text-xs text-slate-500">D = b² − 4ac</p>
                  <p class="font-mono text-lg font-bold tabular-nums" :class="disc > 0 ? 'text-amber-600' : (disc < 0 ? 'text-red-500' : 'text-blue-600')">D = {{ disc }}</p>
                </div>
              </div>
              <div>
                <label class="block mb-2 text-sm font-bold text-slate-700">a: <span class="tabular-nums">{{ valA }}</span></label>
                <input type="range" v-model.number="valA" min="-3" max="3" step="0.5" class="w-full accent-amber-500" />
              </div>
              <div>
                <label class="block mb-2 text-sm font-bold text-slate-700">b: <span class="tabular-nums">{{ valB }}</span></label>
                <input type="range" v-model.number="valB" min="-6" max="6" step="1" class="w-full accent-amber-500" />
              </div>
              <div>
                <label class="block mb-2 text-sm font-bold text-slate-700">c: <span class="tabular-nums">{{ valC }}</span></label>
                <input type="range" v-model.number="valC" min="-6" max="6" step="1" class="w-full accent-amber-500" />
              </div>
            </div>

            <!-- Why Explanation -->
            <div v-if="showWhy && !showReflection" class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Waarom werkt dit?</span>
              </div>
              <p class="text-sm text-amber-700">{{ whyText }}</p>
            </div>

            <!-- Reflection -->
            <div v-if="showReflection" class="p-4 border border-amber-200 bg-amber-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhPencilSimpleLine class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Reflectie</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.reflectionQuestion }}</p>
              <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
                class="w-full p-3 border-2 border-amber-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                rows="4" placeholder="D bepaalt het aantal snijpunten omdat..."></textarea>
              <button v-if="!reflectionDone" @click="checkReflection"
                      :disabled="!reflectionAnswer.trim()"
                      class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-amber-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                Bevestig reflectie
              </button>
            </div>
          </div>

          <!-- BOTTOM CONTROLS -->
          <div class="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
            <div v-if="feedback.text" class="flex items-start gap-3 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn"
                 role="status" aria-live="polite" aria-atomic="true"
                 :class="{'bg-amber-50 text-amber-800 border border-amber-200': feedback.type === 'success',
                          'bg-red-50 text-red-800 border border-red-200': feedback.type === 'error',
                          'bg-blue-50 text-blue-800 border border-blue-200': feedback.type === 'info'}">
              <component :is="feedback.type === 'success' ? PhCheckCircle : feedback.type === 'error' ? PhWarningCircle : PhLightbulb"
                         class="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
              <span class="leading-snug" v-html="feedback.text"></span>
            </div>
            <div class="flex items-center gap-4">
              <button @click="resetActivityState"
                      class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <PhArrowClockwise />
              </button>

              <button v-if="!showWorkedExample && !showPrediction && !showReflection && !isCorrect"
                      @click="showHint"
                      class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
                <PhLightbulb weight="fill" class="w-5 h-5 text-amber-500" />
                Hint
              </button>

              <button v-if="isCorrect && !showReflection" @click="handleNext"
                      class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Volgende stap' }}</span>
                <PhArrowRight weight="bold" />
              </button>
              <button v-if="isCorrect && showReflection && reflectionDone" @click="handleNext"
                      class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span>
                <PhArrowRight weight="bold" />
              </button>
            </div>
          </div>
        </div>

        <!-- RIGHT CONTENT PANEL -->
        <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
          <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
            <div class="w-full max-w-3xl space-y-6">
              <!-- Formula Display -->
              <div class="bg-white px-10 py-8 rounded-xl shadow-md border-2 border-slate-200 flex items-center justify-center min-h-[120px]">
                <div v-if="showWorkedExample" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">VOORBEELD</p>
                  <MathText :content="'\( ' + currentLevelData.worked.problem + ' \)'" class="text-4xl font-mono font-black text-amber-700" />
                </div>
                <div v-else-if="showPrediction" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT — Voorspel eerst</p>
                  <MathText :content="currentLevelData.goalText" class="text-4xl font-mono font-black text-slate-700 opacity-60" />
                </div>
                <div v-else-if="showReflection" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">REFLECTIE</p>
                  <p class="text-3xl font-bold text-amber-700">Reflecteer op wat je leerde</p>
                </div>
                <div v-else class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT</p>
                  <MathText :content="currentLevelData.goalText" class="text-4xl font-mono font-black text-slate-800" />
                </div>
              </div>

              <!-- Parabola visualization -->
              <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-md">
                <svg viewBox="-120 -120 240 240" class="w-full max-w-md mx-auto bg-white rounded-lg border border-slate-200" style="overflow: visible">
                  <!-- Grid -->
                  <line v-for="i in [-100,-80,-60,-40,-20,20,40,60,80,100]" :key="'gx'+i" :x1="i" y1="-120" :x2="i" y2="120" stroke="#e2e8f0" stroke-width="0.5"/>
                  <line v-for="i in [-100,-80,-60,-40,-20,20,40,60,80,100]" :key="'gy'+i" x1="-120" :y1="i" x2="120" :y2="i" stroke="#e2e8f0" stroke-width="0.5"/>
                  <!-- Axes -->
                  <line x1="-120" y1="0" x2="120" y2="0" stroke="#64748b" stroke-width="1"/>
                  <line x1="0" y1="-120" x2="0" y2="120" stroke="#64748b" stroke-width="1"/>
                  <!-- Parabola -->
                  <path v-if="valA !== 0" :d="parabolaPath" fill="none" stroke="#f97316" stroke-width="2.5"/>
                  <!-- Root markers -->
                  <circle v-for="(r, ri) in roots" :key="ri" :cx="r * 20" cy="0" r="5" fill="#f59e0b" stroke="#fff" stroke-width="2"/>
                </svg>
                <div class="mt-3 text-center">
                  <p class="text-sm text-slate-600">Snijpunten: <span class="font-bold tabular-nums" :class="roots.length === currentLevelData.targetRoots ? 'text-amber-600' : 'text-slate-800'">{{ roots.length }}</span></p>
                </div>
              </div>

              <!-- Discriminant reference -->
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p class="font-bold text-slate-700 text-sm mb-2">Discriminant regels</p>
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div class="p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div class="font-bold text-amber-700 text-sm">D > 0</div>
                    <div class="text-xs text-slate-600">2 snijpunten</div>
                  </div>
                  <div class="p-2 rounded-lg bg-blue-50 border border-blue-200">
                    <div class="font-bold text-blue-700 text-sm">D = 0</div>
                    <div class="text-xs text-slate-600">1 raakpunt</div>
                  </div>
                  <div class="p-2 rounded-lg bg-red-50 border border-red-200">
                    <div class="font-bold text-red-700 text-sm">D < 0</div>
                    <div class="text-xs text-slate-600">0 snijpunten</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  <SuccessCelebration :show="isCorrect && !celebrationDone" @done="celebrationDone = true" :is-level-complete="currentInternalLevel >= totalInternalLevels - 1 && reflectionDone" />
  </div>
</template>

<script>
export default {
  computed: {
    parabolaPath() {
      const a = this.valA, b = this.valB, c = this.valC
      if (a === 0) return ''
      let d = ''
      for (let px = -120; px <= 120; px += 2) {
        const x = px / 20
        const y = a * x * x + b * x + c
        const sy = -y * 20
        if (sy < -120 || sy > 120) continue
        d += (d === '' ? 'M' : 'L') + px + ' ' + sy.toFixed(1) + ' '
      }
      return d
    }
  }
}
</script>

<style scoped>
:root { font-family: 'Inter', sans-serif; }
.pattern-grid { background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 2rem 2rem; }
.animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
</style>
