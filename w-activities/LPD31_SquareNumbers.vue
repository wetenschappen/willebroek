<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhSquaresFour,
  PhArrowClockwise, PhLightbulb, PhBrain, PhPencilSimpleLine, PhBookOpen
} from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Patronen: Vierkantsgetallen' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhSquaresFour }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])

const mainArea = ref(null)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const attemptCount = ref(0)
const hintCount = ref(0)

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

const feedback = ref({ type: 'info', text: 'Ontdek het patroon en vul het antwoord in.' })
const currentInternalLevel = ref(0)
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')

const levels = ref([])

function generateLevel(index) {
  if (index === 0) {
    return {
      name: 'Vierkantsgetallen',
      sequence: [1, 4, 9, 16],
      formula: 'n²',
      fig4Ans: 16,
      predictionQuestion: 'Wat is het 4e vierkantsgetal?',
      predictionOptions: [16, 12, 20],
      predictionCorrect: 16,
      worked: {
        problem: 'Vierkantsgetallen: 1², 2², 3², 4²...',
        steps: [
          '1² = 1',
          '2² = 4',
          '3² = 9',
          '4² = 16'
        ],
        answer: 16
      },
      whyExplanation: 'Vierkantsgetallen groeien met de oneven getallen: 1, 1+3=4, 4+5=9, 9+7=16. Dit komt omdat (n+1)² = n² + 2n + 1. De toename 2n+1 is altijd oneven.',
      reflectionQuestion: 'Waarom is het verschil tussen opeenvolgende vierkantsgetallen altijd oneven?'
    }
  } else if (index === 1) {
    return {
      name: 'Driehoeksgetallen',
      sequence: [1, 3, 6, 10],
      formula: 'n(n+1)/2',
      fig4Ans: 10,
      predictionQuestion: 'Wat is het 4e driehoeksgetal?',
      predictionOptions: [10, 9, 12],
      predictionCorrect: 10,
      worked: {
        problem: 'Driehoeksgetallen: 1, 3, 6, 10...',
        steps: [
          '1 = 1',
          '1+2 = 3',
          '1+2+3 = 6',
          '1+2+3+4 = 10'
        ],
        answer: 10
      },
      whyExplanation: 'Driehoeksgetallen zijn de som van de eerste n natuurlijke getallen. Je bouwt een driehoek: rij 1 heeft 1 blokje, rij 2 heeft 2, rij 3 heeft 3, enzovoort.',
      reflectionQuestion: 'Hoe zie je in de formule n(n+1)/2 terug dat het om een opeenvolgende som gaat?'
    }
  } else {
    return {
      name: 'Vijfhoekgetallen',
      sequence: [1, 5, 12, 22],
      formula: 'n(3n-1)/2',
      fig4Ans: 22,
      predictionQuestion: 'Wat is het 4e vijfhoekgetal?',
      predictionOptions: [22, 20, 25],
      predictionCorrect: 22,
      worked: {
        problem: 'Vijfhoekgetallen: 1, 5, 12, 22...',
        steps: [
          '1(3·1-1)/2 = 1',
          '2(3·2-1)/2 = 5',
          '3(3·3-1)/2 = 12',
          '4(3·4-1)/2 = 22'
        ],
        answer: 22
      },
      whyExplanation: 'Vijfhoekgetallen bouwen vijfhoekige patronen. De formule n(3n-1)/2 komt van het tellen van blokjes in steeds groter wordende vijfhoeken.',
      reflectionQuestion: 'Waarom groeien vijfhoekgetallen sneller dan driehoeksgetallen?'
    }
  }
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const l = currentLevelData.value
  const hints = [
    `Kijk naar het patroon. Hoeveel blokjes komen erbij bij elke figuur?`,
    `Verschillen: ${l.sequence[1]-l.sequence[0]}, ${l.sequence[2]-l.sequence[1]}, ... Wat is het volgende verschil?`,
    `Bereken: ${l.sequence[2]} + ___ = het 4e getal.`
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = parseInt(predictionAnswer.value) === currentLevelData.value.predictionCorrect
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Vul nu het antwoord in.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Bereken het verschil tussen opeenvolgende getallen.' }
  }
}

const userAnswer = ref(null)
const showFig4 = ref(false)

function checkAnswer() {
  if (userAnswer.value === null) {
    feedback.value = { type: 'error', text: 'Vul een getal in.' }
    return
  }
  attemptCount.value++
  const l = currentLevelData.value
  
  if (parseInt(userAnswer.value) === l.fig4Ans) {
    isCorrect.value = true
    hintCount.value = 0
    showFig4.value = true
    showWhyExplanation(l.whyExplanation)
    
    const lpdText = currentInternalLevel.value === 0
      ? 'LPD 31: Je herkent en berekent vierkantsgetallen (n²).'
      : currentInternalLevel.value === 1
        ? 'LPD 31: Je analyseert driehoeksgetallen en hun formule.'
        : 'LPD 31: Je evalueert vijfhoekgetallen en hun groeipatroon.'
    feedback.value = { type: 'success', text: lpdText }
  } else {
    const userNum = parseInt(userAnswer.value)
    const linearGuess = l.sequence[2] + (l.sequence[2] - l.sequence[1])
    if (userNum === linearGuess) {
      feedback.value = { type: 'error', text: `Let op! Het patroon is NIET lineair. De verschillen groeien: +${l.sequence[1]-l.sequence[0]}, +${l.sequence[2]-l.sequence[1]}, +...` }
    } else if (userNum === Math.round(l.fig4Ans / 2)) {
      feedback.value = { type: 'error', text: `Te klein. Kijk naar het visuele patroon en tel zorgvuldig.` }
    } else {
      feedback.value = { type: 'error', text: `Niet helemaal. Bereken het verschil: ${l.sequence[2]} + ___ = ?` }
    }
  }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('oneven') || text.includes('verschil') || text.includes('groeien') || text.includes('formule') || text.includes('n²')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt het patroon.<br/><br/><strong>LPD 31 bewezen:</strong> Je kan patronen herkennen, de formule toepassen en verklaren waarom het patroon werkt.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom het patroon werkt. Gebruik woorden als "verschil", "groeien" of "formule" en leg uit waarom.' }
  }
}

function skipWorkedExample() {
  showWorkedExample.value = false
  showPrediction.value = currentInternalLevel.value >= 1
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Ontdek het patroon.' }
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
  showWhy.value = false
  whyText.value = ''
  showReflection.value = false
  reflectionAnswer.value = ''
  reflectionDone.value = false
  userAnswer.value = null
  showFig4.value = false
  
  showWorkedExample.value = currentInternalLevel.value === 0
  showPrediction.value = currentInternalLevel.value >= 1
  
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Ontdek het patroon.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over patronen.' }
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
            </div>
          </div>
        </div>
        <button @click="emit('close')" class="p-2 text-slate-500 transition-colors rounded-full hover:bg-slate-100 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
          <PhX class="w-6 h-6" />
        </button>
      </header>
      <main class="flex flex-1 overflow-hidden">
        <div class="flex-col hidden w-full max-w-sm bg-white border-r border-slate-200 md:flex z-10">
          <div class="flex-1 p-6 overflow-y-auto">
            <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">Instructies</h3>
            <MathText :content="props.instruction || 'Ontdek het patroon in de rij getallen. Hoeveel blokjes heeft figuur 4?'" class="mb-4 prose prose-sm text-slate-600" />
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
                Antwoord: {{ currentLevelData.worked.answer }}
              </div>
              <button @click="skipWorkedExample" class="mt-3 w-full py-2 text-sm font-bold text-amber-700 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Begrepen! Zelf proberen →
              </button>
            </div>
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
              <button v-if="predictionAnswer !== null && !predictionSubmitted" @click="checkPrediction" class="mt-3 w-full py-2 text-sm font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Bevestig voorspelling
              </button>
            </div>
            <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-4 shadow-inner">
              <div class="text-center">
                <p class="font-bold text-slate-700 mb-3 text-sm">Hoeveel blokjes in Figuur 4?</p>
                <p class="text-sm text-slate-600 mb-4">{{ currentLevelData.name }}: {{ currentLevelData.sequence.slice(0, 3).join(', ') }}, ...</p>
                <input type="number" v-model.number="userAnswer" placeholder="..." :disabled="isCorrect" class="w-full font-bold text-lg p-2 border-2 border-slate-300 rounded-lg focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none text-center bg-white transition-colors tabular-nums" />
                <button @click="checkAnswer" :disabled="isCorrect || userAnswer === null" class="mt-4 w-full px-6 py-3 font-bold text-white rounded-xl bg-slate-800 hover:bg-slate-900 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                  Controleer
                </button>
              </div>
            </div>
            <div v-if="showWhy && !showReflection" class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Waarom werkt dit?</span>
              </div>
              <p class="text-sm text-amber-700">{{ whyText }}</p>
            </div>
            <div v-if="showReflection" class="p-4 border border-amber-200 bg-amber-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhPencilSimpleLine class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Reflectie</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.reflectionQuestion }}</p>
              <textarea v-model="reflectionAnswer" :disabled="reflectionDone" class="w-full p-3 border-2 border-amber-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" rows="4" placeholder="Het patroon werkt omdat..."></textarea>
              <button v-if="!reflectionDone" @click="checkReflection" :disabled="!reflectionAnswer.trim()" class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-amber-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                Bevestig reflectie
              </button>
            </div>
          </div>
          <div class="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
            <div v-if="feedback.text" class="flex items-start gap-3 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn" role="status" aria-live="polite" aria-atomic="true" :class="{'bg-amber-50 text-amber-800 border border-amber-200': feedback.type === 'success', 'bg-red-50 text-red-800 border border-red-200': feedback.type === 'error', 'bg-blue-50 text-blue-800 border border-blue-200': feedback.type === 'info'}">
              <component :is="feedback.type === 'success' ? PhCheckCircle : feedback.type === 'error' ? PhWarningCircle : PhLightbulb" class="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
              <span class="leading-snug" v-html="feedback.text"></span>
            </div>
            <div class="flex items-center gap-4">
              <button @click="resetActivityState" class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <PhArrowClockwise />
              </button>
              <button v-if="!showWorkedExample && !showPrediction && !showReflection && !isCorrect" @click="showHint" class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
                <PhLightbulb weight="fill" class="w-5 h-5 text-amber-500" />
                Hint
              </button>
              <button v-if="isCorrect && !showReflection" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Volgende stap' }}</span>
                <PhArrowRight weight="bold" />
              </button>
              <button v-if="isCorrect && showReflection && reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span>
                <PhArrowRight weight="bold" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
          <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
            <div class="w-full max-w-3xl space-y-6">
              <div class="bg-white px-10 py-8 rounded-xl shadow-md border-2 border-slate-200 flex items-center justify-center min-h-[120px]">
                <div v-if="showWorkedExample" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">VOORBEELD</p>
                  <p class="text-4xl font-mono font-black text-amber-700">{{ currentLevelData.name }}</p>
                </div>
                <div v-else-if="showPrediction" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT — Voorspel eerst</p>
                  <p class="text-2xl font-mono font-black text-slate-700 opacity-60">{{ currentLevelData.sequence.slice(0, 3).join(', ') }}, ...</p>
                </div>
                <div v-else-if="showReflection" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">REFLECTIE</p>
                  <p class="text-3xl font-bold text-amber-700">Reflecteer op wat je leerde</p>
                </div>
                <div v-else class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT</p>
                  <p class="text-2xl font-mono font-black text-slate-800">{{ currentLevelData.sequence.slice(0, 3).join(', ') }}, ...</p>
                </div>
              </div>
              <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-md">
                <div class="flex items-end justify-center gap-8 min-h-[200px]">
                  <div v-for="figIdx in 4" :key="'fig'+figIdx" class="flex flex-col items-center gap-4" :class="figIdx===4 && !showFig4 ? 'opacity-30' : ''">
                    <div v-if="figIdx < 4 || showFig4" class="grid gap-1" :style="{gridTemplateColumns: `repeat(${figIdx}, 1fr)`}">
                      <div v-for="i in currentLevelData.sequence[figIdx-1] || 0" :key="'f'+figIdx+i" class="w-8 h-8 rounded-lg shadow-sm bg-amber-500 border border-amber-600"></div>
                    </div>
                    <div v-else class="w-32 h-32 border-4 border-dashed border-slate-300 rounded-xl flex items-center justify-center">
                      <span class="font-black text-4xl text-slate-300">?</span>
                    </div>
                    <span class="font-bold uppercase text-xs tracking-widest text-slate-500">Fig {{ figIdx }}</span>
                  </div>
                </div>
              </div>
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p class="font-bold text-slate-700 text-sm mb-2">Formule</p>
                <div class="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <MathText :content="'\( ' + currentLevelData.formula + ' \)'" class="text-2xl font-mono font-bold text-amber-700" />
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
