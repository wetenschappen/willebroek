<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhArrowsClockwise, PhArrowClockwise, PhLightbulb, PhTarget } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Transformaties: Puntspiegeling = Rotatie' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhArrowsClockwise }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null)
const shouldPulse = ref(false)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Gebruik de slider om de vorm te draaien.' })
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
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')
const attemptCount = ref(0)

const levels = ref([])
function generateLevel() {
  const cx = 250, cy = 200
  levels.value = [
    makeLevel([[150,100],[200,100],[200,150],[250,150],[250,200],[150,200]], cx, cy, 1, 'L-vorm'),
    makeLevel([[100,150],[200,100],[150,200]], cx, cy, 2, 'Asymmetrische driehoek'),
    makeLevel([[200,100],[250,50],[300,150],[200,150]], cx, cy, 3, 'Willekeurige vierhoek')
  ]
}
function makeLevel(points, cx, cy, l, label) {
  const shapePts = points.map(p => `${p[0]},${p[1]}`).join(' '), rotatedPts = points.map(p => `${2*cx - p[0]},${2*cy - p[1]}`).join(' ')
  const colors = ['rgba(99,102,241,0.8)','rgba(236,72,153,0.8)','rgba(16,185,129,0.8)'], strokes = ['#4f46e5','#db2777','#059669']
  return { goalText: `Opdracht ${l}: ${label}`, centerX: cx, centerY: cy, shapeSVG: `<polygon points="${shapePts}" fill="${colors[l-1]}" stroke="${strokes[l-1]}" stroke-width="3" stroke-linejoin="round" />`, targetSVG: `<polygon points="${rotatedPts}" fill="none" stroke="#94a3b8" stroke-width="4" stroke-dasharray="8 4" stroke-linejoin="round" />` }
}
const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

const rotation = ref(0)
const userAns = ref(null)
const isOverlapping = computed(() => rotation.value === 180)

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; feedback.value = { type: 'info', text: 'Gebruik de slider om de vorm te draaien.' }; rotation.value = 0; userAns.value = null; attemptCount.value = 0; hintCount.value = 0; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false }

function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    'Wat gebeurt er met een punt als je het 180 graden draait rond C?',
    'Probeer eerst met één punt: (x,y) wordt (-x,-y) bij 180 rotatie.',
    'Sleep de slider naar 180 en kijk of de vormen overlappen.'
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = parseInt(predictionAnswer.value) === 180
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist! Een puntspiegeling = 180° rotatie. Laten we het testen.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk na: een puntspiegeling draait een punt naar de overkant. Hoeveel graden?' }
  }
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('puntspiegeling') || text.includes('rotatie') || text.includes('180') || text.includes('centrum')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt het verband.<br/><br/><strong>LPD 23 bewezen:</strong> Je kan uitleggen waarom puntspiegeling en 180° rotatie equivalent zijn.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom een puntspiegeling hetzelfde is als een rotatie van 180°. Gebruik "puntspiegeling" en "rotatie".' }
  }
}

function checkAnswer() {
  isChecked.value = true; attemptCount.value++
  if (userAns.value === 180) {
    if (isOverlapping.value) {
      isCorrect.value = true
      hintCount.value = 0
      const whyExplanation = 'Een puntspiegeling is wiskundig exact hetzelfde als een rotatie van 180 graden (halve draai). Elk punt (x,y) wordt afgebeeld op (-x, -y) ten opzichte van het centrum. Daarom valt de vorm perfect samen met het spiegelbeeld na een halve draai.'
      showWhyExplanation(whyExplanation)
      showReflection.value = true
      feedback.value = { type: 'success', text: 'Prima! Een puntspiegeling is exact een rotatie van 180°.' }
    }
    else { isCorrect.value = false; if (attemptCount.value >= 3) feedback.value = { type: 'error', text: 'Niet helemaal... 180 is correct! Zet de slider op 180.' }; else feedback.value = { type: 'error', text: '180 klopt! Zet de slider ook naar 180 om het te bewijzen.' } }
  } else { isCorrect.value = false
    if (userAns.value === 360 || userAns.value === 0) feedback.value = { type: 'error', text: 'Niet helemaal... 0 of 360 = geen draaiing. Je moet exact een halve draai maken (180).' }
    else if (isOverlapping.value) feedback.value = { type: 'error', text: `Vorm overlapt! Lees de hoek bovenaan de slider af.` }
    else feedback.value = { type: 'error', text: 'Niet helemaal... Sleep tot de vormen overlappen. Dat gebeurt bij 180.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over puntspiegeling en rotatie.' }
    return
  }
  if (currentInternalLevel.value < totalInternalLevels - 1) { currentInternalLevel.value++; resetActivityState(); nextTick(() => mainArea.value?.focus()) } else { if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1); else emit('complete') }
}

watch(() => props.isOpen, (val) => { if (val) { currentInternalLevel.value = 0; generateLevel(); resetActivityState(); nextTick(() => mainArea.value?.focus()); window.addEventListener('keydown', handleKeydown) } else { window.removeEventListener('keydown', handleKeydown) } }, { immediate: true })
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
              Een puntspiegeling is gelijk aan een rotatie van hoeveel graden?
            </p>
            <div class="flex items-center gap-2">
              <input type="number" v-model.number="predictionAnswer" placeholder="?" min="0" max="360"
                     class="w-24 p-2 text-lg font-bold text-center border-2 border-amber-300 rounded-lg bg-white focus:border-amber-500 focus:outline-none" />
              <span class="font-black text-sm text-slate-500">°</span>
              <button @click="checkPrediction" :disabled="predictionAnswer === null"
                      class="px-4 py-2 font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 disabled:opacity-50 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Voorspel
              </button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Puntspiegeling = Rotatie van 180°
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Neem een willekeurig punt P van de figuur.</p>
              <p><strong>Stap 2:</strong> Spiegel P door centrum C: P' ligt aan de overkant, op dezelfde lijn, op dezelfde afstand.</p>
              <p><strong>Stap 3:</strong> Draai P 180° rond C. Vergelijk de posities.</p>
              <p class="font-bold text-amber-600">Conclusie: puntspiegeling en rotatie 180° geven exact hetzelfde resultaat voor elk punt.</p>
            </div>
          </div>

          <div v-if="!showPrediction" class="text-center bg-amber-50 p-4 border border-amber-200 rounded-xl shadow-sm mb-6 animate-fadeIn">
            <p class="font-bold text-amber-800">{{ levelLabels ? levelLabels[currentInternalLevel] + ' — ' : '' }}{{ currentLevelData.goalText }}</p>
          </div>

          <div class="p-4 mt-6 border border-slate-200 bg-slate-50 rounded-xl shadow-inner">
            <label class="block text-sm font-bold text-slate-700 mb-2">Conclusie:</label>
            <div class="flex items-center gap-2 mb-2 text-slate-700 font-medium text-sm">Een puntspiegeling is gelijk aan een rotatie van:</div>
            <div class="flex items-center gap-2">
              <input type="number" v-model.number="userAns" placeholder="..." :disabled="isCorrect"
                class="flex-1 font-bold text-xl p-4 border-2 border-amber-400 rounded-lg focus:border-amber-500 text-center bg-white" />
              <span class="font-black text-2xl text-slate-500">°</span>
            </div>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op! Veelgemaakte fouten:</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>90 of 270 = kwartdraai. De vorm staat dan haaks, niet gespiegeld.</li>
              <li>360 = volledige draai. De vorm ligt terug op de startpositie.</li>
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
            <p class="text-sm text-slate-700 mb-3">Waarom is een puntspiegeling hetzelfde als een rotatie van 180°? Wat gebeurt er met de afstand tot het centrum?</p>
            <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
              class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              rows="3" placeholder="Een puntspiegeling is hetzelfde als rotatie 180° omdat..."></textarea>
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
          <div class="w-full max-w-2xl flex flex-col items-center">
            <div class="mb-12 w-full max-w-sm bg-white p-6 rounded-xl shadow-sm border border-slate-200 z-10">
              <div class="flex justify-between items-end mb-4">
                <label class="font-bold text-slate-500 uppercase tracking-widest text-xs flex items-center gap-2"><PhArrowsClockwise weight="bold" /> Rotatie</label>
                <span class="font-black text-2xl tabular-nums" :class="isOverlapping ? 'text-amber-600' : 'text-amber-600'">{{ rotation }}°</span>
              </div>
              <input type="range" min="0" max="360" step="1" v-model.number="rotation" :disabled="isCorrect" class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" :class="isOverlapping ? 'accent-emerald-500' : ''" />
            </div>
            <div class="relative bg-white shadow-md rounded-xl overflow-hidden border-4 border-slate-200 p-4" :key="currentInternalLevel">
              <svg width="500" height="400" viewBox="0 0 500 400" class="block">
                <g v-html="currentLevelData.targetSVG"></g>
                <circle :cx="currentLevelData.centerX" :cy="currentLevelData.centerY" r="6" fill="#1e293b" />
                <text :x="currentLevelData.centerX" :y="currentLevelData.centerY - 15" font-weight="bold" fill="#1e293b" text-anchor="middle">C</text>
                <g :transform="`rotate(${rotation}, ${currentLevelData.centerX}, ${currentLevelData.centerY})`">
                  <g :class="isOverlapping ? '[&>*]:fill-emerald-500/80 [&>*]:stroke-emerald-600' : ''" v-html="currentLevelData.shapeSVG"></g>
                </g>
              </svg>
            </div>
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
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; height: 28px; width: 28px; border-radius: 50%; background: #f59e0b; border: 4px solid white; cursor: pointer; margin-top: -13px; box-shadow: 0 4px 6px rgba(0,0,0,0.3); }
input[type=range]::-webkit-slider-runnable-track { width: 100%; height: 4px; cursor: pointer; background: #cbd5e1; border-radius: 2px; }
</style>
