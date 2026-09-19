<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhTrendUp,
  PhArrowClockwise, PhLightbulb, PhBrain, PhPencilSimpleLine, PhBookOpen
} from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Richtingscoëfficiënt' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhTrendUp }
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

const feedback = ref({ type: 'info', text: 'Bereken de richtingscoëfficiënt en stel de slider in.' })

const currentInternalLevel = ref(0)
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')

// ========== LEVEL GENERATION ==========
const levels = ref([])

function generateLevel(index) {
  switch (index) {
    case 0: {
      // Level 1: Apply — calculate a = y/x from given point
      const px = Math.floor(Math.random() * 4) + 1 // 1-4
      const py = Math.floor(Math.random() * 8) + 2 // 2-9
      const a = Math.round((py / px) * 10) / 10
      return {
        goalText: `De lijn gaat door de oorsprong en punt (${px}, ${py}). Bereken de richtingscoëfficiënt.`,
        answer: a,
        predictionQuestion: `Als een lijn door (0,0) en (${px}, ${py}) gaat, is de richtingscoëfficiënt...`,
        predictionOptions: [a, a * 2, px / py, a + 1].map(v => Math.round(v * 10) / 10).filter((v, i, arr) => arr.indexOf(v) === i),
        predictionCorrect: a,
        worked: {
          problem: `Lijn door (0,0) en (${px}, ${py})`,
          steps: [
            `Formule: a = y / x`,
            `Invullen: a = ${py} / ${px}`,
            `Berekenen: a = ${a}`
          ],
          answer: a
        },
        whyExplanation: `De richtingscoëfficiënt is de verhouding tussen de verticale en horizontale verandering. Omdat de lijn door de oorsprong gaat, is a gewoon y gedeeld door x.`,
        reflectionQuestion: 'Waarom noemen we a de "richtingscoëfficiënt"? Wat vertelt het getal over de lijn?'
      }
    }
    case 1: {
      // Level 2: Analyze — determine sign and magnitude from description
      const isPositive = Math.random() > 0.5
      const magnitude = Math.floor(Math.random() * 3) + 1 // 1-3
      const a = isPositive ? magnitude : -magnitude
      const desc = isPositive ? 'stijgend' : 'dalend'
      return {
        goalText: `Een ${desc} lijn gaat door (0,0) en (2, ${Math.abs(a) * 2}). Bereken a.`,
        answer: a,
        predictionQuestion: `Een ${desc} lijn heeft een... richtingscoëfficiënt.`,
        predictionOptions: ['Positieve', 'Negatieve', 'Nul'],
        predictionCorrect: isPositive ? 'Positieve' : 'Negatieve',
        worked: {
          problem: `${desc.charAt(0).toUpperCase() + desc.slice(1)} lijn door (0,0) en (2, ${Math.abs(a) * 2})`,
          steps: [
            `${isPositive ? 'Stijgend' : 'Dalend'} = ${isPositive ? 'positief' : 'negatief'} teken`,
            `a = ${Math.abs(a) * 2} / 2 = ${Math.abs(a)}`,
            `Dus a = ${a}`
          ],
          answer: a
        },
        whyExplanation: `Een stijgende lijn heeft een positieve richtingscoëfficiënt, een dalende lijn een negatieve. Het getal geeft aan hoe steil de lijn is.`,
        reflectionQuestion: 'Waarom heeft een dalende lijn een negatieve richtingscoëfficiënt? Leg uit in termen van de coördinaten.'
      }
    }
    case 2: {
      // Level 3: Evaluate — horizontal line (a=0)
      return {
        goalText: 'Een horizontale lijn gaat door (0, 5). Wat is de richtingscoëfficiënt?',
        answer: 0,
        predictionQuestion: 'Een horizontale lijn heeft een richtingscoëfficiënt van...',
        predictionOptions: [0, 1, 'Ongedefinieerd'],
        predictionCorrect: 0,
        worked: {
          problem: 'Horizontale lijn door (0, 5)',
          steps: [
            'Horizontaal = geen verticale verandering',
            'a = Δy / Δx = 0 / Δx',
            'Dus a = 0'
          ],
          answer: 0
        },
        whyExplanation: `Een horizontale lijn verandert niet in de y-richting, dus Δy = 0. Daardoor is a = 0/Δx = 0. Een verticale lijn zou Δx = 0 hebben, wat niet kan (delen door nul).`,
        reflectionQuestion: 'Waarom is de richtingscoëfficiënt van een horizontale lijn nul, maar van een verticale lijn ongedefinieerd?'
      }
    }
  }
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

// ========== HINTS (3-level, never give answer) ==========
function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    'De richtingscoëfficiënt is de verhouding: a = Δy / Δx. Welke coördinaten heb je?',
    'Voor een lijn door (0,0) en (x,y) is a = y/x. Vul de getallen in.',
    'Bereken: a = ___ / ___. Welk getal komt uit?'
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

// ========== PREDICTION GATE ==========
function checkPrediction() {
  if (predictionAnswer.value === null) return
  const corr = currentLevelData.value.predictionCorrect
  if (typeof corr === 'number') {
    predictionCorrect.value = Math.abs(parseFloat(predictionAnswer.value) - corr) < 0.01
  } else {
    predictionCorrect.value = predictionAnswer.value === corr
  }
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Stel nu de slider in.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk nog eens na. Wat betekent de richtingscoëfficiënt?' }
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
      ? 'LPD 22: Je berekent de richtingscoëfficiënt uit twee punten en past de formule a = y/x correct toe.'
      : currentInternalLevel.value === 1
        ? 'LPD 22: Je analyseert het verband tussen het teken van a en de richting van de lijn.'
        : 'LPD 22: Je evalueert speciale gevallen (horizontaal) en begrijpt waarom a = 0.'
    feedback.value = { type: 'success', text: lpdText }
  } else {
    let errMsg = ''
    if (currentInternalLevel.value === 0) {
      if (userVal > correctVal + 0.5) {
        errMsg = 'Te steil. a = y/x, niet x/y. Controleer de formule.'
      } else if (userVal < correctVal - 0.5) {
        errMsg = 'Te vlak. a = y/x. Vul de juiste coördinaten in.'
      } else {
        errMsg = 'Niet exact. a = y/x. Bereken het nauwkeuriger.'
      }
    } else if (currentInternalLevel.value === 1) {
      if ((userVal > 0 && correctVal < 0) || (userVal < 0 && correctVal > 0)) {
        errMsg = 'Verkeerd teken! Dalend = negatief, stijgend = positief.'
      } else {
        errMsg = 'Juiste richting, maar verkeerde waarde. a = Δy/Δx.'
      }
    } else {
      if (userVal !== 0) {
        errMsg = 'Horizontaal = geen verandering in y. Dus a = ___.'
      }
    }
    const finalErr = attemptCount.value >= 3
      ? 'Kijk naar het voorbeeld. a = Δy / Δx. Vul de getallen in.'
      : errMsg
    errorDetected.value = finalErr
    feedback.value = { type: 'error', text: finalErr }
  }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

// ========== REFLECTION ==========
function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('richting') || text.includes('helling') || text.includes('steil') || text.includes('verandering')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt wat de richtingscoëfficiënt betekent.<br/><br/><strong>LPD 22 bewezen:</strong> Je kan de richtingscoëfficiënt berekenen en verklaren wat het getal over de lijn vertelt.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit wat de richtingscoëfficiënt vertelt. Gebruik woorden als "richting", "helling" of "verandering" en leg uit waarom.' }
  }
}

// ========== HANDLERS ==========
function skipWorkedExample() {
  showWorkedExample.value = false
  showPrediction.value = currentInternalLevel.value >= 1
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat voor richtingscoëfficiënt verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Stel de slider in op de juiste waarde.' }
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

  showWorkedExample.value = currentInternalLevel.value === 0
  showPrediction.value = currentInternalLevel.value >= 1

  const data = currentLevelData.value
  sliderValue.value = data && data.answer > 0 ? -3 : 3

  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat voor richtingscoëfficiënt verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Bereken de richtingscoëfficiënt en stel de slider in.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over de richtingscoëfficiënt.' }
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
            <MathText :content="props.instruction || 'Bereken de richtingscoëfficiënt a = Δy/Δx en stel de slider in.'" class="mb-4 prose prose-sm text-slate-600" />

            <!-- Worked Example (I do) — shown only on level 0 -->
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
                Antwoord: a = {{ currentLevelData.worked.answer }}
              </div>
              <button @click="skipWorkedExample"
                      class="mt-3 w-full py-2 text-sm font-bold text-amber-700 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Begrepen! Zelf proberen →
              </button>
            </div>

            <!-- Prediction Gate (we do) — levels 1+ -->
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

            <!-- Task Area (you do) -->
            <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-4 shadow-inner">
              <div class="text-center">
                <p class="font-bold text-slate-700 mb-3 text-sm">Bereken en stel in:</p>
                <MathText :content="currentLevelData.goalText" class="text-lg font-mono font-bold text-slate-800 mb-4" />
                <div class="space-y-3">
                  <div class="bg-white p-3 rounded-lg border border-slate-200">
                    <label class="block text-sm font-bold text-slate-700 mb-2">a: <span class="text-amber-600 font-mono text-lg tabular-nums">{{ sliderValue }}</span></label>
                    <input type="range" v-model.number="sliderValue" min="-5" max="5" step="1"
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
                rows="4" placeholder="De richtingscoëfficiënt vertelt..."></textarea>
              <button v-if="!reflectionDone" @click="checkReflection"
                      :disabled="!reflectionAnswer.trim()"
                      class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-amber-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                Bevestig reflectie
              </button>
            </div>

            <!-- LET OP! ERROR SECTION -->
            <div v-if="!isCorrect && attemptCount > 0 && errorDetected" class="mt-4 p-4 border border-red-200 bg-red-50 rounded-xl animate-fadeIn">
              <h4 class="flex items-center gap-2 text-sm font-bold text-red-800 mb-1">
                <PhWarningCircle weight="fill" class="w-4 h-4" />
                Let op!
              </h4>
              <p class="text-sm text-red-700">{{ errorDetected }}</p>
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

              <!-- Graph visualization -->
              <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-md">
                <div class="text-center mb-4">
                  <p class="font-bold text-slate-700">Grafiek: f(x) = {{ sliderValue }}x</p>
                </div>
                <svg viewBox="-50 -50 100 100" class="w-full max-w-md mx-auto bg-white rounded-lg border border-slate-200">
                  <!-- Grid -->
                  <line v-for="i in [-40,-30,-20,-10,10,20,30,40]" :key="'gx'+i" :x1="i" y1="-50" :x2="i" y2="50" stroke="#e2e8f0" stroke-width="0.5"/>
                  <line v-for="i in [-40,-30,-20,-10,10,20,30,40]" :key="'gy'+i" x1="-50" :y1="i" x2="50" :y2="i" stroke="#e2e8f0" stroke-width="0.5"/>
                  <!-- Axes -->
                  <line x1="-50" y1="0" x2="50" y2="0" stroke="#64748b" stroke-width="1"/>
                  <line x1="0" y1="-50" x2="0" y2="50" stroke="#64748b" stroke-width="1"/>
                  <!-- Line -->
                  <line x1="-50" :y1="50 * sliderValue" x2="50" :y2="-50 * sliderValue" stroke="#f97316" stroke-width="2"/>
                  <!-- Labels -->
                  <text x="45" y="-5" class="text-xs" fill="#64748b">x</text>
                  <text x="5" y="-45" class="text-xs" fill="#64748b">y</text>
                </svg>
              </div>

              <!-- Step-by-step breakdown (shown after correct answer) -->
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

              <!-- Formula reference -->
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p class="font-bold text-slate-700 text-sm mb-2">Formule richtingscoëfficiënt</p>
                <div class="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <MathText content="'\( a = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1} \)'" class="text-2xl font-mono font-bold text-amber-700" />
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
