<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhCompass, PhArrowClockwise, PhLightbulb, PhTarget, PhBrain, PhPencilSimpleLine } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Constructie: Driehoek met Passer' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhCompass }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null)
const shouldPulse = ref(false)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Klik op de eerste passer-knop om te beginnen.' })
const attemptCount = ref(0)
const showWorkedExample = ref(false)
const showPrediction = ref(true)
const predictionAnswer = ref(null)
const predictionSubmitted = ref(false)
const predictionCorrect = ref(false)
const showWhy = ref(false)
const whyText = ref('')
const showReflection = ref(false)
const reflectionAnswer = ref('')
const reflectionDone = ref(false)
const hintCount = ref(0)

const currentInternalLevel = ref(0)
const totalInternalLevels = ref(3)
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')
const levels = ref([])

function generateLevel() {
  const pool = [
    { goalText: 'Opdracht A: Zijden 5, 4 en 3 cm', baseLen: 5, rA: 4, rB: 3, pA: { x: 175, y: 350 }, pB: { x: 425, y: 350 }, pC: { x: 335, y: 230 }, successMsg: 'Perfect! Dit is een rechthoekige driehoek (5² = 4² + 3²).', hint1: 'Start met een cirkel vanuit A met straal 4.', hint2: 'Teken dan een cirkel vanuit B met straal 3.', hint3: 'Het snijpunt van beide cirkels is... (vul aan)' },
    { goalText: 'Opdracht B: Zijden 5, 5 en 4 cm', baseLen: 5, rA: 5, rB: 4, pA: { x: 175, y: 350 }, pB: { x: 425, y: 350 }, pC: { x: 345, y: 166.7 }, successMsg: 'Knap! Twee zijden even lang = gelijkbenig.', hint1: 'Cirkel A met straal 5, cirkel B met straal 4.', hint2: 'De cirkels hebben verschillende stralen.', hint3: 'Het snijpunt is het derde ... van de driehoek.' },
    { goalText: 'Opdracht C: Zijden 6, 5 en 5 cm', baseLen: 6, rA: 5, rB: 5, pA: { x: 150, y: 350 }, pB: { x: 450, y: 350 }, pC: { x: 300, y: 150 }, successMsg: 'Fantastisch! Symmetrisch = gelijkbenig.', hint1: 'Beide cirkels hebben dezelfde straal 5.', hint2: 'Symmetrie! Het snijpunt ligt in het midden.', hint3: 'Verbind A, B en het ... voor de gelijkbenige driehoek.' }
  ]
  const shuffled = [...pool].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, 3)
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])
function getHint() { const d = currentLevelData.value; if (!d) return ''; if (attemptCount.value >= 3) return d.hint3; if (attemptCount.value >= 2) return d.hint2; return d.hint1 }

const circleADrawn = ref(false)
const circleBDrawn = ref(false)
const pointCPlaced = ref(false)

function drawCircleA() { if (isCorrect.value) return; circleADrawn.value = true; feedback.value = { type: 'info', text: `Mooi! Elk punt op deze cirkel ligt ${currentLevelData.value.rA} eenheden van A.` } }
function drawCircleB() { if (isCorrect.value) return; if (!circleADrawn.value) { attemptCount.value++; feedback.value = { type: 'error', text: 'Teken eerst de cirkel vanuit A! ' + getHint() }; return }; circleBDrawn.value = true; feedback.value = { type: 'info', text: `Goed. Snijpunt = ${currentLevelData.value.rB} eenheden van B.` } }
function placePointC() { if (isCorrect.value) return; if (!circleADrawn.value || !circleBDrawn.value) { attemptCount.value++; feedback.value = { type: 'error', text: 'Eerst beide cirkels tekenen! ' + getHint() }; return }; pointCPlaced.value = true; isCorrect.value = true; hintCount.value = 0
  const whyExplanation = `De passerconstructie gebruikt de eigenschap: elk punt op een cirkel ligt op een vaste afstand van het middelpunt. Het snijpunt van twee cirkels ligt dus op de juiste afstand van beide punten.`
  showWhyExplanation(whyExplanation)
  showReflection.value = true
  feedback.value = { type: 'success', text: currentLevelData.value.successMsg }
}

function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  feedback.value = { type: 'info', text: getHint() }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = parseInt(predictionAnswer.value) === 3
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist! 3 stappen: cirkel A, cirkel B, snijpunt C.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk na: je moet twee cirkels tekenen en dan het snijpunt markeren. Hoeveel stappen?' }
  }
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('cirkel') || text.includes('snijpunt') || text.includes('afstand') || text.includes('passer')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt de constructie.<br/><br/><strong>LPD 22 bewezen:</strong> Je kan een driehoek construeren met passer en verklaren waarom het werkt.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom het snijpunt van twee cirkels het derde hoekpunt van de driehoek geeft. Gebruik "cirkel" en "afstand".' }
  }
}

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; attemptCount.value = 0; hintCount.value = 0; feedback.value = { type: 'info', text: 'Klik op de eerste knop.' }; circleADrawn.value = false; circleBDrawn.value = false; pointCPlaced.value = false; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false }

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels.value - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over de passerconstructie.' }
    return
  }
  if (currentInternalLevel.value < totalInternalLevels.value - 1) { currentInternalLevel.value++; resetActivityState(); nextTick(() => mainArea.value?.focus()) } else { if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1); else emit('complete') }
}

watch(() => props.isOpen, (val) => { if (val) { currentInternalLevel.value = 0; levels.value = generateLevel(); resetActivityState(); nextTick(() => mainArea.value?.focus()); window.addEventListener('keydown', handleKeydown) } else { window.removeEventListener('keydown', handleKeydown) } }, { immediate: true })
function handleKeydown(e) { if (e.key === 'Escape' && props.isOpen) emit('close') }
onMounted(() => document.addEventListener('fullscreenchange', () => {}))
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })
</script>

<template>
<div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-800">
  <div class="absolute inset-0 bg-slate-900/10" @click="emit('close')" role="button" tabindex="0" @keydown.enter.prevent="emit('close')" @keydown.space.prevent="emit('close')" aria-label="Sluiten"></div>
  <div class="relative flex flex-col w-screen h-screen overflow-hidden shadow-md bg-white">
    <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm">
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center p-2 rounded-lg bg-amber-100">
          <component :is="props.icon" weight="fill" class="w-6 h-6 text-amber-600" />
        </div>
        <div><h2 class="text-lg font-bold text-slate-900">{{ title }}</h2>
          <div class="flex items-center gap-2">
            <p class="text-xs font-medium text-slate-500">Level {{ currentInternalLevel + 1 }} van {{ totalInternalLevels }}</p>
            <div class="flex gap-1"><div v-for="i in totalInternalLevels" :key="i" class="w-2 h-2 rounded-full" :class="i <= currentInternalLevel + 1 ? 'bg-amber-500' : 'bg-slate-200'"></div></div>
          </div>
        </div>
      </div>
      <button @click="emit('close')" class="relative p-2 text-slate-500 transition-colors rounded-full hover:bg-slate-100"><PhX class="w-6 h-6" /></button>
    </header>
    <main class="flex flex-1 overflow-hidden">
      <div class="flex-col hidden w-full max-w-sm bg-white border-r border-slate-200 shadow-inner-light md:flex z-10">
        <div ref="mainArea" tabindex="-1" class="flex-1 p-6 overflow-y-auto">
          <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">Instructies</h3>
          <MathText :content="instruction" class="mb-6 prose prose-sm text-slate-600" />

          <!-- PREDICTION GATE -->
          <div v-if="showPrediction" class="p-5 border-2 border-amber-300 bg-amber-50 rounded-xl mb-4 animate-fadeIn">
            <div class="flex items-center gap-2 mb-3">
              <PhBrain weight="fill" class="w-5 h-5 text-amber-600" />
              <span class="font-bold text-amber-800">Voorspel eerst!</span>
            </div>
            <p class="text-sm text-amber-800 mb-3">
              Hoeveel passer-cirkels moet je tekenen om een driehoek te construeren?<br />
              <span class="font-bold">1</span> = Eén cirkel, <span class="font-bold">2</span> = Twee cirkels, <span class="font-bold">3</span> = Drie cirkels
            </p>
            <div class="flex items-center gap-2">
              <input type="number" v-model.number="predictionAnswer" placeholder="?" min="1" max="3"
                     class="w-24 p-2 text-lg font-bold text-center border-2 border-amber-300 rounded-lg bg-white focus:border-amber-500 focus:outline-none" />
              <button @click="checkPrediction" :disabled="predictionAnswer === null || predictionAnswer < 1 || predictionAnswer > 3"
                      class="px-4 py-2 font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 disabled:opacity-50 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Voorspel
              </button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Driehoek construeren met passer
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Teken de basis AB (bv. 5 cm).</p>
              <p><strong>Stap 2:</strong> Zet de passer in A met straal = zijde AC. Trek een cirkel.</p>
              <p><strong>Stap 3:</strong> Zet de passer in B met straal = zijde BC. Trek een cirkel.</p>
              <p><strong>Stap 4:</strong> Het snijpunt boven AB is punt C.</p>
              <p class="font-bold text-amber-600">Waarom? Omdat elk punt op een cirkel exact dezelfde afstand heeft tot het middelpunt!</p>
            </div>
          </div>

          <div v-if="!showPrediction" class="text-center bg-amber-50 p-4 border border-amber-200 rounded-xl shadow-sm mb-6 animate-fadeIn">
            <p class="font-bold text-amber-800">{{ levelLabels ? levelLabels[currentInternalLevel] + ' — ' : '' }}{{ currentLevelData.goalText }}</p>
          </div>

          <div class="p-4 border border-slate-200 bg-slate-50 rounded-xl shadow-inner">
            <h4 class="font-bold text-slate-700 mb-3">Stappenplan:</h4>
            <div class="flex flex-col gap-2">
              <button @click="drawCircleA" :disabled="isCorrect || circleADrawn" class="py-2 px-4 rounded-lg border-2 font-bold text-left flex items-center justify-between" :class="circleADrawn ? 'bg-amber-50 border-amber-400 text-amber-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'">
                <span>1. Passer in A (straal {{ currentLevelData.rA }})</span><PhCheckCircle v-if="circleADrawn" weight="fill" class="text-amber-500" />
              </button>
              <button @click="drawCircleB" :disabled="isCorrect || circleBDrawn" class="py-2 px-4 rounded-lg border-2 font-bold text-left flex items-center justify-between" :class="circleBDrawn ? 'bg-amber-50 border-amber-400 text-amber-700' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'">
                <span>2. Passer in B (straal {{ currentLevelData.rB }})</span><PhCheckCircle v-if="circleBDrawn" weight="fill" class="text-amber-500" />
              </button>
              <button @click="placePointC" :disabled="isCorrect || pointCPlaced" class="py-2 px-4 rounded-lg border-2 font-bold text-left flex items-center justify-between" :class="pointCPlaced ? 'bg-amber-50 border-amber-400 text-amber-700' : 'bg-slate-800 border-slate-900 text-white hover:bg-slate-700'">
                <span>3. Verbind Snijpunt C</span><PhCheckCircle v-if="pointCPlaced" weight="fill" class="text-amber-500" />
              </button>
            </div>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op! Veelgemaakte fouten:</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>Vergeet dat beide cirkels dezelfde straal moeten hebben voor een correct snijpunt.</li>
              <li>De som van twee zijden moet groter zijn dan de derde zijde, anders snijden de cirkels elkaar niet.</li>
            </ul>
          </div>

          <!-- WHY EXPLANATION -->
          <div v-if="showWhy && !showReflection" class="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl animate-fadeIn">
            <div class="flex items-center gap-2 mb-2">
              <PhLightbulb class="w-5 h-5 text-indigo-600" weight="fill" />
              <span class="font-bold text-indigo-800 text-sm">Waarom werkt dit?</span>
            </div>
            <p class="text-sm text-indigo-700">{{ whyText }}</p>
          </div>

          <!-- REFLECTION -->
          <div v-if="showReflection && !reflectionDone" class="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl animate-fadeIn">
            <div class="flex items-center gap-2 mb-3">
              <PhPencilSimpleLine class="w-5 h-5 text-indigo-600" weight="fill" />
              <span class="font-bold text-indigo-800 text-sm">Reflectie</span>
            </div>
            <p class="text-sm text-slate-700 mb-3">Waarom is de passer essentieel voor deze constructie? Wat zegt de cirkel over de afstand tot het middelpunt?</p>
            <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
              class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              rows="3" placeholder="De passer is essentieel omdat..."></textarea>
            <button v-if="!reflectionDone" @click="checkReflection" :disabled="!reflectionAnswer.trim()"
              class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
              Bevestig reflectie
            </button>
          </div>
        </div>

        <div class="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
          <div v-if="feedback.text" class="flex items-start gap-4 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn" role="status" aria-live="polite" aria-atomic="true" :class="{'bg-amber-50 text-amber-800': feedback.type === 'success', 'bg-red-100 text-red-800': feedback.type === 'error', 'bg-blue-100 text-blue-800': feedback.type === 'info'}">
            <component :is="feedback.type === 'success' ? PhCheckCircle : PhWarningCircle" class="w-5 h-5 shrink-0 mt-0.5" weight="fill" /><span class="leading-snug">{{ feedback.text }}</span>
          </div>
          <div class="flex items-center gap-4">
            <button @click="resetActivityState" class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 shadow-sm"><PhArrowClockwise /></button>
            <button v-if="!isCorrect && !showPrediction" @click="showHint" class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
              <PhLightbulb weight="fill" class="w-5 h-5 text-amber-500" />
              Hint
            </button>
            <div v-if="!isCorrect && !showPrediction" class="flex-1 py-4"></div>
            <button v-if="isCorrect && showReflection && !reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span><PhArrowRight weight="bold" />
            </button>
            <button v-if="isCorrect && showReflection && reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span><PhArrowRight weight="bold" />
            </button>
          </div>
        </div>
      </div>
      <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
        <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
          <div class="relative bg-white shadow-md rounded-xl overflow-hidden border-2 border-slate-200 p-8" :key="currentInternalLevel">
            <svg width="600" height="500" viewBox="0 0 600 500">
              <g>
                <circle v-if="circleADrawn" :cx="currentLevelData.pA.x" :cy="currentLevelData.pA.y" :r="currentLevelData.rA * 50" fill="none" stroke="#3b82f6" stroke-width="2" stroke-dasharray="8 4" class="animate-fadeIn" />
                <circle v-if="circleADrawn" :cx="currentLevelData.pA.x" :cy="currentLevelData.pA.y" :r="currentLevelData.rA * 50" fill="rgba(59, 130, 246, 0.05)" class="animate-fadeIn" />
                <line v-if="circleADrawn && !pointCPlaced" :x1="currentLevelData.pA.x" :y1="currentLevelData.pA.y" :x2="currentLevelData.pC.x" :y2="currentLevelData.pC.y" stroke="#3b82f6" stroke-width="2" class="animate-fadeIn" />
                <text v-if="circleADrawn && !pointCPlaced" :x="(currentLevelData.pA.x + currentLevelData.pC.x)/2 - 10" :y="(currentLevelData.pA.y + currentLevelData.pC.y)/2 - 10" font-weight="bold" fill="#3b82f6" class="animate-fadeIn">{{ currentLevelData.rA }} cm</text>
                <circle v-if="circleBDrawn" :cx="currentLevelData.pB.x" :cy="currentLevelData.pB.y" :r="currentLevelData.rB * 50" fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="8 4" class="animate-fadeIn" />
                <circle v-if="circleBDrawn" :cx="currentLevelData.pB.x" :cy="currentLevelData.pB.y" :r="currentLevelData.rB * 50" fill="rgba(239, 68, 68, 0.05)" class="animate-fadeIn" />
                <line v-if="circleBDrawn && !pointCPlaced" :x1="currentLevelData.pB.x" :y1="currentLevelData.pB.y" :x2="currentLevelData.pC.x" :y2="currentLevelData.pC.y" stroke="#ef4444" stroke-width="2" class="animate-fadeIn" />
                <text v-if="circleBDrawn && !pointCPlaced" :x="(currentLevelData.pB.x + currentLevelData.pC.x)/2 + 10" :y="(currentLevelData.pB.y + currentLevelData.pC.y)/2 - 10" font-weight="bold" fill="#ef4444" class="animate-fadeIn">{{ currentLevelData.rB }} cm</text>
              </g>
              <g v-if="pointCPlaced" class="animate-fadeIn">
                <polygon :points="`${currentLevelData.pA.x},${currentLevelData.pA.y} ${currentLevelData.pB.x},${currentLevelData.pB.y} ${currentLevelData.pC.x},${currentLevelData.pC.y}`" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" stroke-width="4" stroke-linejoin="round" />
                <circle :cx="currentLevelData.pC.x" :cy="currentLevelData.pC.y" r="5" fill="#1e293b" /><text :x="currentLevelData.pC.x - 5" :y="currentLevelData.pC.y - 15" font-weight="bold" fill="#1e293b">C</text>
                <text :x="(currentLevelData.pA.x + currentLevelData.pC.x)/2 - 20" :y="(currentLevelData.pA.y + currentLevelData.pC.y)/2 - 10" font-weight="bold" fill="#047857">{{ currentLevelData.rA }} cm</text>
                <text :x="(currentLevelData.pB.x + currentLevelData.pC.x)/2 + 10" :y="(currentLevelData.pB.y + currentLevelData.pC.y)/2 - 10" font-weight="bold" fill="#047857">{{ currentLevelData.rB }} cm</text>
              </g>
              <line :x1="currentLevelData.pA.x" :y1="currentLevelData.pA.y" :x2="currentLevelData.pB.x" :y2="currentLevelData.pB.y" stroke="#1e293b" stroke-width="4" />
              <circle :cx="currentLevelData.pA.x" :cy="currentLevelData.pA.y" r="5" fill="#1e293b" /><circle :cx="currentLevelData.pB.x" :cy="currentLevelData.pB.y" r="5" fill="#1e293b" />
              <text :x="currentLevelData.pA.x - 20" :y="currentLevelData.pA.y + 25" font-weight="bold" fill="#1e293b">A</text>
              <text :x="currentLevelData.pB.x + 5" :y="currentLevelData.pB.y + 25" font-weight="bold" fill="#1e293b">B</text>
              <text :x="(currentLevelData.pA.x + currentLevelData.pB.x)/2" :y="currentLevelData.pA.y + 25" font-weight="bold" fill="#64748b" text-anchor="middle">{{ currentLevelData.baseLen }} cm</text>
            </svg>
          </div>
        </div>
      </div>
    </main>
  </div>
  <SuccessCelebration :show="isCorrect && !celebrationDone" @done="celebrationDone = true" :is-level-complete="currentInternalLevel === totalInternalLevels - 1" />
</div>
</template>

<style scoped>
.pattern-grid { background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 2rem 2rem; }
.animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
