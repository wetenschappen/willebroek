<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhPolygon, PhArrowClockwise, PhCopy, PhLightbulb, PhTarget } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Oppervlakte: Trapezium' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhPolygon }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null); const shouldPulse = ref(false)
const isCorrect = ref(false); const celebrationDone = ref(false); const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Klik op de knop om het trapezium te klonen.' })
const attemptCount = ref(0); const currentInternalLevel = ref(0); const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']

const Bloom = computed(() => {
  const labels = ['Toepassen', 'Analyseren', 'Evalueren']
  return labels[currentInternalLevel.value] || 'Toepassen'
})

const showWorkedExample = ref(false); const showReflection = ref(false); const reflectionAnswer = ref(''); const lpdConfirmed = ref(false)

function randomInt(m, M) { return Math.floor(Math.random() * (M - m + 1)) + m }
const levels = ref([])
function generateLevel(idx) { return idx === 0 ? { baseTop: randomInt(2,4), baseBot: randomInt(5,8), height: randomInt(3,5) } : idx === 1 ? { baseTop: randomInt(3,6), baseBot: randomInt(7,10), height: randomInt(4,7) } : { baseTop: randomInt(4,8), baseBot: randomInt(8,12), height: randomInt(5,8) } }

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])
const targetArea = computed(() => ((currentLevelData.value.baseTop + currentLevelData.value.baseBot) * currentLevelData.value.height) / 2)
const totalArea = computed(() => (currentLevelData.value.baseTop + currentLevelData.value.baseBot) * currentLevelData.value.height)

const step = ref(0); const userAns = ref(null)

function transformShape() { if (isCorrect.value) return; step.value = 1; feedback.value = { type: 'success', text: `Kijk! Twee trapeziums = een groot PARALLELLOGRAM (basis ${currentLevelData.value.baseTop + currentLevelData.value.baseBot}, hoogte ${currentLevelData.value.height}). Bereken en deel door 2.` } }

function getHint() {
  if (attemptCount.value <= 1) return `Kijk naar de totale onderkant na het klonen.`
  if (attemptCount.value === 2) return `Het parallellogram heeft basis = (Boven + Onder) en hoogte = h. Deel door 2.`
  return `Berekening: (${currentLevelData.value.baseTop} + ${currentLevelData.value.baseBot}) x ${currentLevelData.value.height} / 2 = ?`
}

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; feedback.value = { type: 'info', text: 'Klik op de knop.' }; step.value = 0; userAns.value = null; attemptCount.value = 0; showReflection.value = false; reflectionAnswer.value = ''; lpdConfirmed.value = false; if (levels.value.length === 0) levels.value = [0,1,2].map(i => generateLevel(i)) }

function checkAnswer() {
  isChecked.value = true
  if (userAns.value === targetArea.value) {
    if (step.value === 1) {
      isCorrect.value = true
      hintCount.value = 0
      const whyExplanation = `De formule (boven + onder) x hoogte / 2 = (${currentLevelData.value.baseTop}+${currentLevelData.value.baseBot}) x ${currentLevelData.value.height} / 2 = ${targetArea.value}. Dit komt van het parallellogram dat twee trapeziums vormt. Omdat er 2 inzitten, delen we door 2.`
      showWhyExplanation(whyExplanation)
      showReflection.value = true
      feedback.value = { type: 'success', text: `Super! De oppervlakte = ${targetArea.value}.` } }
    else { isCorrect.value = false; attemptCount.value++; feedback.value = { type: 'error', text: `${targetArea.value} is correct! Klik eerst op de knop.` } }
  } else { isCorrect.value = false; attemptCount.value++
    if (userAns.value === totalArea.value) feedback.value = { type: 'error', text: `${totalArea.value} is het GROTE parallellogram. Deel door 2 voor een trapezium.` }
    else feedback.value = { type: 'error', text: getHint() }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over de oppervlakte.' }
    return
  }
  if (currentInternalLevel.value < totalInternalLevels - 1) { currentInternalLevel.value++; resetActivityState(); nextTick(() => mainArea.value?.focus()) } else { if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1); else emit('complete') }
}

watch(() => props.isOpen, (val) => { if (val) { currentInternalLevel.value = 0; levels.value = [0,1,2].map(i => generateLevel(i)); resetActivityState(); nextTick(() => mainArea.value?.focus()); window.addEventListener('keydown', handleKeydown) } else { window.removeEventListener('keydown', handleKeydown) } }, { immediate: true })
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
          <div class="flex items-center gap-2"><p class="text-xs font-medium text-slate-500">Level {{ currentInternalLevel + 1 }} van {{ totalInternalLevels }}</p>
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
            <p class="text-sm text-amber-800 mb-3">Wat is de formule voor de oppervlakte?</p>
            <div class="flex gap-2">
              <button @click="predictionAnswer = 'basis'; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Basis × hoogte</button>
              <button @click="predictionAnswer = 'lengte'; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Lengte × breedte</button>
              <button @click="predictionAnswer = 'diag'; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">½ × diagonaal</button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Trapezium
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Kloon het trapezium en draai het 180.</p>
              <p><strong>Stap 2:</strong> Plaats het gekloonde trapezium tegen het origineel.</p>
              <p><strong>Stap 3:</strong> Ze vormen samen een PARALLELLOGRAM met basis = (boven + onder).</p>
              <p class="font-bold text-amber-600">EEN trapezium = helft van het parallellogram.</p>
            </div>
          </div>

          <div class="p-4 mt-6 border border-sky-200 bg-sky-50 rounded-xl shadow-inner text-center">
            <label class="block text-sm font-bold text-sky-900 mb-2">Oppervlakte EEN Trapezium:</label>
            <div class="flex items-center gap-2">
              <input type="number" v-model.number="userAns" placeholder="..." :disabled="isCorrect" class="w-full font-bold text-xl p-4 border-2 border-amber-400 rounded-lg text-center bg-white" />
              <span class="font-black text-2xl text-slate-500">cm</span>
            </div>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>Vergeet niet te delen door 2. Het parallellogram heeft TWEE trapeziums.</li>
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
            <p class="text-sm text-slate-700 mb-3">Waarom blijft de oppervlakte hetzelfde na knippen en schuiven?</p>
            <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
              class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              rows="3" placeholder="De oppervlakte blijft hetzelfde omdat..."></textarea>
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
            <button v-if="!isCorrect && !showPrediction" @click="checkAnswer" class="flex-1 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-slate-800 hover:bg-slate-900">Controleer</button>
            <button v-else-if="isCorrect && showReflection && !reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span><PhArrowRight weight="bold" />
            </button>
            <button v-else-if="isCorrect && showReflection && reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span><PhArrowRight weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
        <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
          <div class="relative bg-white shadow-md rounded-xl overflow-hidden border-2 border-slate-200 p-8" :key="currentInternalLevel">
            <p class="text-center text-slate-400">📐 Visualisatie</p>
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
.animate-fadeIn { animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
