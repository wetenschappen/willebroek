<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhCube, PhArrowClockwise, PhEye, PhLightbulb, PhTarget, PhBrain, PhPencilSimpleLine } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Ruimtemeetkunde: De Optische Illusie' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhCube }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null); const shouldPulse = ref(false)
const isCorrect = ref(false); const celebrationDone = ref(false); const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Klik op "Verander Perspectief" om rond de kubus te wandelen.' })
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

function shuffleArray(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i+1)); [a[i], a[j]] = [a[j], a[i]] }; return a }

const illusionTemplates = [
  { goalText: 'Het X-patroon',
    svg2D: '<rect x="100" y="50" width="200" height="200" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="2" /><line x1="100" y1="50" x2="300" y2="250" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><line x1="100" y1="250" x2="300" y2="50" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><rect x="100" y="50" width="200" height="200" fill="transparent" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" />',
    svg3D: '<line x1="50" y1="100" x2="150" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="100" x2="350" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="50" y1="300" x2="150" y2="230" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="300" x2="350" y2="230" stroke="#94a3b8" stroke-width="2" /><rect x="150" y="30" width="200" height="200" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="150" y1="230" x2="350" y2="30" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><rect x="50" y="100" width="200" height="200" fill="rgba(255,255,255,0.5)" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" /><line x1="50" y1="100" x2="250" y2="300" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><circle cx="200" cy="130" r="15" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />',
    correctAns: 'kruisend',
    successMsg: 'Perfect! In 2D lijkt het X-patroon alsof de lijnen snijden. In 3D zie je: de ene lijn zit vooraan, de andere achteraan. Ze zijn KRUISEND: niet evenwijdig en niet snijdend.' },
  { goalText: 'Het Dak', svg2D: '<rect x="100" y="50" width="200" height="200" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="2" /><line x1="100" y1="250" x2="200" y2="50" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><line x1="300" y1="250" x2="200" y2="50" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><rect x="100" y="50" width="200" height="200" fill="transparent" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" />',
    svg3D: '<line x1="50" y1="100" x2="150" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="100" x2="350" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="50" y1="300" x2="150" y2="230" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="300" x2="350" y2="230" stroke="#94a3b8" stroke-width="2" /><rect x="150" y="30" width="200" height="200" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="350" y1="230" x2="250" y2="30" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><rect x="50" y="100" width="200" height="200" fill="rgba(255,255,255,0.5)" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" /><line x1="50" y1="300" x2="150" y2="100" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><circle cx="200" cy="65" r="15" fill="none" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 4" />',
    correctAns: 'kruisend',
    successMsg: 'Fantastisch! Het dakje lijkt te snijden, maar in 3D stopt de ene vooraan, de andere achteraan. Kruisend!' },
  { goalText: 'Diagonale verwarring', svg2D: '<rect x="100" y="50" width="200" height="200" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="2" /><line x1="100" y1="50" x2="200" y2="250" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><line x1="200" y1="50" x2="300" y2="250" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><rect x="100" y="50" width="200" height="200" fill="transparent" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" />',
    svg3D: '<line x1="50" y1="100" x2="150" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="100" x2="350" y2="30" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="50" y1="300" x2="150" y2="230" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="300" x2="350" y2="230" stroke="#94a3b8" stroke-width="2" /><rect x="150" y="30" width="200" height="200" fill="rgba(148,163,184,0.1)" stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 2" /><line x1="250" y1="30" x2="350" y2="230" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><rect x="50" y="100" width="200" height="200" fill="rgba(255,255,255,0.5)" stroke="#3b82f6" stroke-width="4" stroke-linejoin="round" /><line x1="50" y1="100" x2="150" y2="300" stroke="#ef4444" stroke-width="6" stroke-linecap="round" /><circle cx="200" cy="180" r="15" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4 4" />',
    correctAns: 'evenwijdig',
    successMsg: 'Heel goed! Deze lijnen lopen in dezelfde richting. Ze zijn EVENWIJDIG, ook in 3D.' }
]

const levels = ref([])
const currentLevelData = computed(() => levels.value[currentInternalLevel.value])
const is3D = ref(false); const userAns = ref('')

function getHint() {
  const t = currentLevelData.value
  if (attemptCount.value <= 1) return 'Gebruik de "Verander Perspectief" knop.'
  if (attemptCount.value === 2) {
    if (!is3D.value) return 'Klik op de knop voor 3D!'
    if (t.correctAns === 'kruisend') return 'De lijnen zitten in verschillende vlakken. Ze snijden NIET en zijn NIET evenwijdig.'
    return 'Lopen ze in exact dezelfde richting?'
  }
  if (t.correctAns === 'kruisend') return 'Kruisend = niet evenwijdig en niet snijdend.'
  return 'Evenwijdig = zelfde richting, als treinsporen.'
}

function togglePerspective() { if (isCorrect.value) return; is3D.value = !is3D.value; if (is3D.value) feedback.value = { type: 'success', text: 'Kijk! De echte ligging wordt zichtbaar in 3D.' } }


function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = ['Bekijk het object van verschillende kanten.', 'Let op de vorm van het grondvlak en de hoogte.', 'Denk aan de definitie van het type ruimtefiguur.' ]
  feedback.value = { type: 'info', text: hints[idx] }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = predictionAnswer.value === true
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Goed ingeschat!' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Niet juist. Probeer het opnieuw.' }
  }
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('vorm') || text.includes('vlak') || text.includes('laag') || text.includes('ruimte')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie!<br/><br/><strong>LPD bewezen:</strong> Je begrijpt de eigenschappen van ruimtefiguren.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit hoe de vorm van een ruimtefiguur bepaald wordt.' }
  }
}

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; feedback.value = { type: 'info', text: 'Klik op "Verander Perspectief".' }; is3D.value = false; userAns.value = ''; attemptCount.value = 0; hintCount.value = 0; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false; if (levels.value.length === 0) levels.value = shuffleArray(illusionTemplates) }

function checkAnswer() {
  isChecked.value = true
  if (userAns.value === currentLevelData.value.correctAns) {
    if (is3D.value) { isCorrect.value = true; feedback.value = { type: 'success', text: currentLevelData.value.successMsg + ' In de ruimtemeetkunde zijn rechten kruisend als ze geen gemeenschappelijk punt hebben en niet evenwijdig zijn. Dit kan je alleen zien door het 3D-perspectief.' } }
    else { isCorrect.value = false; attemptCount.value++; feedback.value = { type: 'error', text: 'Juist! Maar wissel naar 3D om het visueel te bewijzen.' } }
  } else { isCorrect.value = false; attemptCount.value++; feedback.value = { type: 'error', text: getHint() } }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over ruimtefiguren.' }
    return
  }
  if (currentInternalLevel.value < totalInternalLevels - 1) { currentInternalLevel.value++; resetActivityState(); nextTick(() => mainArea.value?.focus()) } else { if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1); else emit('complete') }
}

watch(() => props.isOpen, (val) => { if (val) { currentInternalLevel.value = 0; levels.value = shuffleArray(illusionTemplates); resetActivityState(); nextTick(() => mainArea.value?.focus()); window.addEventListener('keydown', handleKeydown) } else { window.removeEventListener('keydown', handleKeydown) } }, { immediate: true })
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
            <p class="text-sm text-amber-800 mb-3">Wat denk jij dat het antwoord is?</p>
            <div class="flex gap-2">
              <button @click="predictionAnswer = true; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Ik weet het</button>
              <button @click="predictionAnswer = false; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Ik twijfel</button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Kruisende vs Snijdende rechten
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Snijdend:</strong> rechten die een gemeenschappelijk punt hebben.</p>
              <p><strong>Evenwijdig:</strong> rechten die in dezelfde richting lopen en elkaar nooit snijden.</p>
              <p><strong>Kruisend:</strong> rechten die NIET evenwijdig zijn maar ELKAAR NOOIT SNIJDEN (ze liggen in verschillende vlakken).</p>
              <p class="font-bold text-amber-600">In 2D lijken kruisende rechten op snijdende rechten. Alleen 3D toont het verschil!</p>
            </div>
          </div>

          <div class="text-center bg-amber-50 p-4 border border-amber-200 rounded-xl shadow-sm mb-6 animate-fadeIn">
            <p class="font-bold text-amber-800">{{ levelLabels ? levelLabels[currentInternalLevel] + " — " : "" }}{{ currentLevelData.goalText }}</p>
          </div>

          <div class="p-4 border border-slate-200 bg-slate-50 rounded-xl shadow-inner">
            <label class="block text-sm font-bold text-slate-700 mb-2">Onderlinge ligging:</label>
            <select v-model="userAns" :disabled="isCorrect" class="w-full p-4 border-2 border-slate-300 rounded-lg font-bold text-slate-700 bg-white">
              <option value="" disabled>Kies...</option>
              <option value="snijdend">Snijdende rechten</option>
              <option value="evenwijdig">Evenwijdige rechten</option>
              <option value="kruisend">Kruisende rechten</option>
            </select>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>In 2D lijken kruisende rechten te snijden. Gebruik 3D om te controleren!</li>
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
            <p class="text-sm text-slate-700 mb-3">Wat heb je geleerd over ruimtefiguren en hun eigenschappen?</p>
            <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
              class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              rows="3" placeholder="Ik heb geleerd dat..."></textarea>
            <button v-if="!reflectionDone" @click="checkReflection" :disabled="!reflectionAnswer.trim()"
              class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
              Bevestig reflectie
            </button>
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
      </div>
      <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
        <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
          <div class="w-full max-w-2xl flex flex-col items-center">
            <div class="mb-12">
              <button @click="togglePerspective" :disabled="isCorrect" class="px-6 py-4 font-bold text-white rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95" :class="is3D ? 'bg-amber-600 border-amber-700' : 'bg-slate-800 border-slate-900 hover:bg-slate-700'"><PhEye weight="fill" class="w-6 h-6" /> {{ is3D ? 'Terug naar 2D' : 'Bekijk in 3D' }}</button>
            </div>
            <div class="relative bg-white shadow-md rounded-xl overflow-hidden border-4 border-slate-200 p-8 flex items-center justify-center" style="width:500px;height:400px" :key="currentInternalLevel">
              <svg v-if="!is3D" width="400" height="300" viewBox="0 0 400 300" class="animate-fadeIn" v-html="currentLevelData.svg2D"></svg>
              <svg v-if="is3D" width="400" height="300" viewBox="0 0 400 300" class="animate-fadeIn" v-html="currentLevelData.svg3D"></svg>
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
.animate-fadeIn { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
