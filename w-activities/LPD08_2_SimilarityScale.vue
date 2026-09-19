<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhBoundingBox,
  PhArrowClockwise, PhLightbulb, PhBrain, PhPencilSimpleLine, PhBookOpen
} from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Gelijkvormigheid en Schaal' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhBoundingBox }
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

const feedback = ref({ type: 'info', text: 'Bereken de schaalfactor en stel de slider in.' })

const currentInternalLevel = ref(0)
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')

// ========== LEVEL GENERATION ==========
const levels = ref([])

function generateLevel(index) {
  switch (index) {
    case 0: {
      // Level 1: Apply — find k given area ratio
      const k = [2, 3, 1.5][Math.floor(Math.random() * 3)]
      const areaRatio = k * k
      return {
        goalText: `De oppervlakte van het beeld is ${areaRatio}× de oppervlakte van het origineel. Wat is de schaalfactor k?`,
        answer: k,
        predictionQuestion: `Als de oppervlakte ${areaRatio}× zo groot wordt, dan is de schaalfactor k = ...`,
        predictionOptions: [k, areaRatio, k / 2, Math.sqrt(areaRatio) + 1].map(v => Math.round(v * 10) / 10).filter((v, i, arr) => arr.indexOf(v) === i),
        predictionCorrect: k,
        worked: {
          problem: `Oppervlakte-beeld = ${areaRatio} × Oppervlakte-origineel`,
          steps: [
            `Oppervlakte schaalt met k²`,
            `k² = ${areaRatio}`,
            `k = √${areaRatio} = ${k}`
          ],
          answer: k
        },
        whyExplanation: `Bij 2D-schaling worden beide dimensies met k vermenigvuldigd. De oppervlakte is lengte × breedte, dus oppervlakte schaalt met k × k = k².`,
        reflectionQuestion: 'Waarom schaalt oppervlakte met k² en niet met k? Leg uit in je eigen woorden.'
      }
    }
    case 1: {
      // Level 2: Analyze — given k, find volume ratio
      const k = [2, 3, 1.5][Math.floor(Math.random() * 3)]
      const volRatio = Math.round(k * k * k * 100) / 100
      return {
        goalText: `Een 3D-figuur wordt vergroot met schaalfactor k = ${k}. Hoeveel keer zo groot wordt het volume?`,
        answer: volRatio,
        predictionQuestion: `Bij 3D-schaling met k = ${k} wordt het volume... keer zo groot.`,
        predictionOptions: [volRatio, k * k, k, volRatio * 2].map(v => Math.round(v * 10) / 10).filter((v, i, arr) => arr.indexOf(v) === i),
        predictionCorrect: volRatio,
        worked: {
          problem: `3D-schaal met k = ${k}`,
          steps: [
            `Volume schaalt met k³`,
            `k³ = ${k}³ = ${volRatio}`,
            `Volume wordt ${volRatio}× zo groot`
          ],
          answer: volRatio
        },
        whyExplanation: `Bij 3D-schaling worden alle drie de dimensies met k vermenigvuldigd. Volume = lengte × breedte × hoogte, dus volume schaalt met k × k × k = k³.`,
        reflectionQuestion: 'Waarom schaalt volume met k³? Wat betekent dat voor een kubus met zijde 2 die je vergroot met k=3?'
      }
    }
    case 2: {
      // Level 3: Evaluate — reverse: given volume ratio, find k
      const k = 2
      const volRatio = k * k * k
      return {
        goalText: `Het volume van een beeld is ${volRatio}× het origineel. Wat is de schaalfactor k?`,
        answer: k,
        predictionQuestion: `Als het volume ${volRatio}× zo groot wordt, dan is k = ...`,
        predictionOptions: [k, volRatio / 3, Math.sqrt(volRatio), k + 1],
        predictionCorrect: k,
        worked: {
          problem: `Volume-beeld = ${volRatio} × Volume-origineel`,
          steps: [
            `Volume schaalt met k³`,
            `k³ = ${volRatio}`,
            `k = ³√${volRatio} = ${k}`
          ],
          answer: k
        },
        whyExplanation: `Om de schaalfactor terug te vinden uit het volume, neem je de derdemachtswortel. Als k³ = 8, dan is k = ³√8 = 2.`,
        reflectionQuestion: 'Waarom moet je bij volume de derdemachtswortel nemen om k te vinden, en bij oppervlakte de vierkantswortel?'
      }
    }
  }
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

// ========== ORIGINAL SHAPE DIMENSIONS ==========
const origWidth = 80
const origHeight = 60

// ========== HINTS ==========
function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    'Bij 2D: oppervlakte schaalt met k². Bij 3D: volume schaalt met k³. Welke formule heb je nodig?',
    `Als k² = ${currentLevelData.value.answer * currentLevelData.value.answer}, dan is k = √(...). Bereken het.`,
    `k = √(oppervlakte-verhouding) of k = ³√(volume-verhouding). Wat is het antwoord?`
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

// ========== PREDICTION GATE ==========
function checkPrediction() {
  if (predictionAnswer.value === null) return
  const corr = currentLevelData.value.predictionCorrect
  predictionCorrect.value = typeof corr === 'number'
    ? Math.abs(parseFloat(predictionAnswer.value) - corr) < 0.01
    : predictionAnswer.value === corr
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Stel nu de slider in.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk nog eens na. Hoe schaalt oppervlakte/volume met k?' }
  }
}

// ========== USER INPUT ==========
const sliderValue = ref(1)

function checkSlider() {
  if (isCorrect.value) return
  attemptCount.value++
  const userVal = parseFloat(sliderValue.value)
  const correctVal = currentLevelData.value.answer

  if (Math.abs(userVal - correctVal) < 0.01) {
    isCorrect.value = true
    hintCount.value = 0
    errorDetected.value = ''
    showWhyExplanation(currentLevelData.value.whyExplanation)

    const lpdText = currentInternalLevel.value === 0
      ? 'LPD 8: Je berekent de schaalfactor uit de oppervlakte-verhouding met k = √(opp-verh).'
      : currentInternalLevel.value === 1
        ? 'LPD 8: Je analyseert hoe volume schaalt met k³ bij 3D-figuren.'
        : 'LPD 8: Je evalueert de schaalfactor uit een volume-verhouding met k = ³√(vol-verh).'
    feedback.value = { type: 'success', text: lpdText }
  } else {
    let errMsg = ''
    if (currentInternalLevel.value === 0) {
      if (Math.abs(userVal - correctVal * correctVal) < 0.01) {
        errMsg = `Let op! Je hebt k² = ${correctVal * correctVal} gevonden, maar we zoeken k zelf. k = √${correctVal * correctVal} = ${correctVal}.`
      } else {
        errMsg = `Niet correct. k² = opp-verhouding. k = √(opp-verhouding) = ?`
      }
    } else if (currentInternalLevel.value === 1) {
      if (Math.abs(userVal - correctVal / currentLevelData.value.answer) < 0.01) {
        errMsg = 'Je deelt in plaats van te vermenigvuldigen. Volume = k³, dus vermenigvuldig.'
      } else {
        errMsg = `Volume schaalt met k³ = ${currentLevelData.value.answer}³ = ?`
      }
    } else {
      if (Math.abs(userVal * userVal * userVal - 8) > 0.01 && Math.abs(userVal - 2) > 0.01) {
        errMsg = 'k³ = 8. Welk getal tot de derde macht geeft 8?'
      } else {
        errMsg = 'Neem de derdemachtswortel: k = ³√(volume-verhouding).'
      }
    }
    feedback.value = { type: 'error', text: attemptCount.value >= 3
      ? 'Kijk naar het voorbeeld. Gebruik de formule: k = √(opp) of k = ³√(vol).'
      : errMsg }
  }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

// ========== REFLECTION ==========
function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('dimensie') || text.includes('k²') || text.includes('k³') || text.includes('vierkant') || text.includes('derde')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt hoe schaling werkt in verschillende dimensies.<br/><br/><strong>LPD 8 bewezen:</strong> Je kan schaalberekeningen maken voor 2D en 3D en verklaren waarom de exponenten verschillen.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom oppervlakte met k² schaalt en volume met k³. Gebruik het woord "dimensie" en leg uit waarom.' }
  }
}

// ========== HANDLERS ==========
function skipWorkedExample() {
  showWorkedExample.value = false
  showPrediction.value = currentInternalLevel.value >= 1
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Stel de slider in op de juiste schaalfactor.' }
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
  sliderValue.value = 1

  showWorkedExample.value = currentInternalLevel.value === 0
  showPrediction.value = currentInternalLevel.value >= 1

  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Bereken de schaalfactor en stel de slider in.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over schaling.' }
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

// ========== COMPUTED SCALED DIMENSIONS ==========
const scaledWidth = computed(() => Math.round(origWidth * sliderValue.value))
const scaledHeight = computed(() => Math.round(origHeight * sliderValue.value))
const scaledArea = computed(() => Math.round(origWidth * origHeight * sliderValue.value * sliderValue.value))
const origArea = origWidth * origHeight

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
            <MathText :content="props.instruction || 'Bij gelijkvormigheid schalen lengtes met k, oppervlaktes met k², en volumes met k³. Bereken de schaalfactor en stel de slider in.'" class="mb-4 prose prose-sm text-slate-600" />

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
                Antwoord: k = {{ currentLevelData.worked.answer }}
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
              <div class="text-center">
                <p class="font-bold text-slate-700 mb-3 text-sm">Bereken en stel in:</p>
                <MathText :content="currentLevelData.goalText" class="text-lg font-mono font-bold text-slate-800 mb-4" />
                <div class="space-y-3">
                  <div class="bg-white p-3 rounded-lg border border-slate-200">
                    <label class="block text-sm font-bold text-slate-700 mb-2">k: <span class="text-amber-600 font-mono text-lg tabular-nums">{{ sliderValue }}</span></label>
                    <input type="range" v-model.number="sliderValue" min="0.5" max="4" step="0.5"
                           class="w-full accent-amber-500"
                           :disabled="isCorrect" />
                  </div>
                  <button @click="checkSlider"
                          :disabled="isCorrect"
                          class="w-full px-6 py-3 font-bold text-white rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                    Controleer
                  </button>
                </div>
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
                rows="4" placeholder="Oppervlakte schaalt met k² omdat..."></textarea>
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

        <!-- RIGHT CONTENT PANEL — visualization -->
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

              <!-- Triangle visualization -->
              <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-md">
                <div class="text-center mb-4">
                  <p class="font-bold text-slate-700">Schaalfactor k = <span class="text-amber-600 tabular-nums">{{ sliderValue }}</span></p>
                </div>
                <div class="flex items-end justify-center gap-8">
                  <!-- Original -->
                  <div class="text-center">
                    <p class="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Origineel</p>
                    <svg :width="origWidth + 20" :height="origHeight + 20" class="mx-auto">
                      <polygon :points="'10,' + (origHeight + 10) + ' ' + (origWidth / 2 + 10) + ',10 ' + (origWidth + 10) + ',' + (origHeight + 10)"
                               fill="#f1f5f9" stroke="#64748b" stroke-width="2"/>
                    </svg>
                    <p class="text-xs text-slate-500 mt-1 tabular-nums">Opp = {{ origArea }}</p>
                  </div>
                  <!-- Arrow -->
                  <div class="text-2xl text-amber-500 font-bold pb-8">×{{ sliderValue }}</div>
                  <!-- Scaled -->
                  <div class="text-center">
                    <p class="text-xs font-bold text-amber-600 mb-2 uppercase tracking-wider">Beeld</p>
                    <svg :width="scaledWidth + 20" :height="scaledHeight + 20" class="mx-auto">
                      <polygon :points="'10,' + (scaledHeight + 10) + ' ' + (scaledWidth / 2 + 10) + ',10 ' + (scaledWidth + 10) + ',' + (scaledHeight + 10)"
                               :fill="isCorrect ? '#fef3c7' : '#fff7ed'" :stroke="isCorrect ? '#f59e0b' : '#f97316'" stroke-width="2"/>
                    </svg>
                    <p class="text-xs font-bold mt-1 tabular-nums" :class="isCorrect ? 'text-amber-600' : 'text-slate-500'">Opp = {{ scaledArea }}</p>
                  </div>
                </div>
                <div class="mt-4 text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <p class="text-sm text-slate-600">Oppervlakte-verhouding: <span class="font-bold text-amber-700 tabular-nums">{{ (sliderValue * sliderValue).toFixed(1) }}×</span></p>
                </div>
              </div>

              <!-- Step-by-step breakdown -->
              <div v-if="isCorrect && showWhy && !showReflection" class="bg-white p-6 rounded-xl border-2 border-amber-200 shadow-md animate-fadeIn">
                <div class="flex items-center gap-2 mb-4">
                  <PhCheckCircle class="w-6 h-6 text-amber-500" weight="fill" />
                  <span class="font-bold text-amber-700">Juist! Stappenplan:</span>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div v-for="(step, si) in currentLevelData.worked.steps" :key="si"
                       class="p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                    <div class="text-xs font-bold text-amber-600 uppercase mb-1">Stap {{ si + 1 }}</div>
                    <div class="text-sm font-mono font-bold text-slate-700">{{ step }}</div>
                  </div>
                </div>
              </div>

              <!-- Scaling reference -->
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p class="font-bold text-slate-700 text-sm mb-2">Schaalregels</p>
                <div class="grid grid-cols-3 gap-2 text-center">
                  <div class="p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div class="font-bold text-amber-700 text-sm">Lengte</div>
                    <div class="text-xs text-slate-600">×k</div>
                  </div>
                  <div class="p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div class="font-bold text-amber-700 text-sm">Oppervlakte</div>
                    <div class="text-xs text-slate-600">×k²</div>
                  </div>
                  <div class="p-2 rounded-lg bg-amber-50 border border-amber-200">
                    <div class="font-bold text-amber-700 text-sm">Volume</div>
                    <div class="text-xs text-slate-600">×k³</div>
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

<style scoped>
:root { font-family: 'Inter', sans-serif; }
.pattern-grid { background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 2rem 2rem; }
.animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
</style>
