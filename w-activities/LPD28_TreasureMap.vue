<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhMapPin, PhArrowClockwise, PhLightbulb, PhTarget, PhBrain, PhPencilSimpleLine } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Coordinaten: De Schatkaart' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhMapPin }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null)
const shouldPulse = ref(false)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const isChecked = ref(false)
const attemptCount = ref(0)
const hintLevel = ref(0)
const showHint = ref(false)

// ========== PEDAGOGICAL STATE ==========
const showWorkedExample = ref(false)
const showPrediction = ref(false)
const predictionAnswer = ref(null)
const predictionSubmitted = ref(false)
const showWhy = ref(false)
const whyText = ref('')
const showReflection = ref(false)
const reflectionAnswer = ref('')
const reflectionDone = ref(false)
const errorDetected = ref('')

const feedback = ref({ type: 'info', text: 'Klik op een kruispunt op de schatkaart.' })

const currentInternalLevel = ref(0)
const totalInternalLevels = 3

const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']

const Bloom = computed(() => {
  const labels = ['Toepassen', 'Analyseren', 'Evalueren']
  return labels[currentInternalLevel.value] || 'Toepassen'
})

function randomInt(m, M) { return Math.floor(Math.random() * (M - m + 1)) + m }

const levels = ref([])

function generateLevel() {
  const l = []
  for (let i = 0; i < 3; i++) {
    let x, y
    do { x = randomInt(-3, 3); y = randomInt(-3, 3) } while (x === 0 || y === 0 || x === y)
    l.push({ targetX: x, targetY: y })
  }
  levels.value = l
}

const currentLevel = computed(() => levels.value[currentInternalLevel.value] || { targetX: 0, targetY: 0 })

const hintTexts = computed(() => {
  const t = currentLevel.value
  return [
    `De schat ligt in kwadrant ${t.targetX > 0 ? (t.targetY > 0 ? 'I (x>0, y>0)' : 'IV (x>0, y<0)') : (t.targetY > 0 ? 'II (x<0, y>0)' : 'III (x<0, y<0)')}.`,
    `x = ${t.targetX}. Tel ${Math.abs(t.targetX)} ${t.targetX > 0 ? 'rechts' : 'links'} van 0. y = ${t.targetY}.`,
    `Het exacte antwoord is (${t.targetX}, ${t.targetY}). De laatste stap moet jij zelf zetten!`
  ]
})

const userX = ref(null)
const userY = ref(null)

function clickGrid(x, y) {
  if (isCorrect.value) return
  userX.value = x
  userY.value = y
  checkAnswer()
}

function resetActivityState() {
  isCorrect.value = false
  celebrationDone.value = false
  isChecked.value = false
  attemptCount.value = 0
  hintLevel.value = 0
  showHint.value = false
  feedback.value = { type: 'info', text: 'Klik op een kruispunt.' }
  userX.value = null
  userY.value = null
  showPrediction.value = !predictionSubmitted.value
  predictionAnswer.value = null
  showWhy.value = false
  whyText.value = ''
  showReflection.value = false
  reflectionAnswer.value = ''
  reflectionDone.value = false
  errorDetected.value = ''
}

function submitPrediction() {
  predictionSubmitted.value = true
  showPrediction.value = false
}

function showHintAction() {
  if (!showHint.value) {
    hintLevel.value = 0
    showHint.value = true
  } else if (hintLevel.value < 2) {
    hintLevel.value++
  }
}

function checkAnswer() {
  isChecked.value = true
  const t = currentLevel.value
  if (userX.value === t.targetX && userY.value === t.targetY) {
    isCorrect.value = true
    feedback.value = {
      type: 'success',
      text: `Schat gevonden op (${t.targetX}, ${t.targetY})! Het assenstelsel werkt als een stratenplan: x zegt hoe ver horizontaal, y zegt hoe ver verticaal. De oorsprong (0,0) is het vertrekpunt.`
    }
    showWhy.value = true
    whyText.value = `Het cartesisch stelsel deelt het vlak in vier kwadranten. De x-as (horizontaal) en y-as (verticaal) geven samen een uniek adres aan elk punt. Positieve getallen zijn rechts en omhoog, negatieve getallen links en omlaag. Punt (${t.targetX}, ${t.targetY}) ligt in ${t.targetX > 0 ? (t.targetY > 0 ? 'kwadrant I' : 'kwadrant IV') : (t.targetY > 0 ? 'kwadrant II' : 'kwadrant III')}.`
  } else {
    attemptCount.value++
    if (userX.value === t.targetY && userY.value === t.targetX) {
      feedback.value = { type: 'error', text: `Oeps! Je draaide x en y om! Eerst horizontaal (x), dan verticaal (y). ${hintTexts.value[0]}` }
    } else {
      feedback.value = { type: 'error', text: `Hier ligt geen schat. Doel was (${t.targetX}, ${t.targetY}). ${hintTexts.value[0]}` }
    }
  }
}

function checkReflection() {
  const a = reflectionAnswer.value.toLowerCase()
  const conceptWords = ['coordinaat', 'coördinaat', 'assen', 'x-as', 'y-as', 'horizontaal', 'verticaal', 'kwadrant', 'punt', 'positie', 'kaart', 'raster', 'stelsel']
  const reasonWords = ['omdat', 'dus', 'daarom', 'want', 'als', 'dan', 'doordat', 'hierdoor', 'nodig', 'helpt', 'handig']
  const hasConcept = conceptWords.some(w => a.includes(w))
  const hasReason = reasonWords.some(w => a.includes(w))
  const minLen = a.length >= 20
  if (hasConcept && hasReason && minLen) {
    reflectionDone.value = true
    return true
  }
  if (!minLen) feedback.value = { type: 'error', text: 'Schrijf een volledige zin (minimaal 20 tekens).' }
  else if (!hasConcept) feedback.value = { type: 'error', text: 'Probeer vaktaal te gebruiken, zoals "coördinaten", "assenstelsel" of "kwadrant".' }
  else feedback.value = { type: 'error', text: 'Leg ook uit WAAROM coördinaten handig zijn, gebruik woorden zoals "omdat" of "daarom".' }
  return false
}

function handleNext() {
  if (!reflectionDone.value && showReflection.value) {
    if (!checkReflection()) return
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
    generateLevel()
    currentInternalLevel.value = 0
    predictionSubmitted.value = false
    showPrediction.value = true
    resetActivityState()
    nextTick(() => mainArea.value?.focus())
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
}, { immediate: true })

function handleKeydown(e) {
  if (e.key === 'Escape' && props.isOpen) emit('close')
}

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
        <div>
          <h2 class="text-lg font-bold text-slate-900">{{ title }}</h2>
          <p class="text-xs font-medium text-slate-500">Level {{ currentInternalLevel + 1 }} van {{ totalInternalLevels }}</p>
        </div>
      </div>
      <button @click="emit('close')" class="relative p-2 text-slate-500 transition-colors rounded-full hover:bg-slate-100"><PhX class="w-6 h-6" /></button>
    </header>
    <main class="flex flex-1 overflow-hidden">
      <div class="flex-col hidden w-full max-w-sm bg-white border-r border-slate-200 shadow-inner-light md:flex z-10">
        <div ref="mainArea" tabindex="-1" class="flex-1 p-6 overflow-y-auto">
          <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">Instructies</h3>
          <MathText :content="props.instruction" class="mb-6 prose prose-sm text-slate-600" />

          <!-- PREDICTION GATE -->
          <div v-if="showPrediction" class="p-5 border-2 border-amber-300 bg-amber-50 rounded-xl mb-6 animate-fadeIn">
            <div class="flex items-center gap-2 mb-3">
              <PhBrain weight="fill" class="w-5 h-5 text-amber-600" />
              <span class="font-bold text-amber-800 text-sm">Voorspel eerst!</span>
            </div>
            <p class="text-sm text-amber-700 mb-3">Op een schatkaart werken we met coördinaten. Wat is de juiste volgorde?</p>
            <div class="flex gap-2">
              <button @click="predictionAnswer = 'eerst x'; submitPrediction()" class="flex-1 py-2 px-4 text-sm font-bold rounded-lg border-2 transition-colors" :class="predictionAnswer === 'eerst x' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100'">Eerst x (horizontaal)</button>
              <button @click="predictionAnswer = 'eerst y'; submitPrediction()" class="flex-1 py-2 px-4 text-sm font-bold rounded-lg border-2 transition-colors" :class="predictionAnswer === 'eerst y' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100'">Eerst y (verticaal)</button>
              <button @click="predictionAnswer = 'maakt niet uit'; submitPrediction()" class="flex-1 py-2 px-4 text-sm font-bold rounded-lg border-2 transition-colors" :class="predictionAnswer === 'maakt niet uit' ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-amber-700 border-amber-300 hover:bg-amber-100'">Maakt niet uit</button>
            </div>
          </div>

          <!-- WORKED EXAMPLE -->
          <div class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Schatkaart
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Bepaal het kwadrant. x>0 = rechts, x<0 = links. y>0 = omhoog, y<0 = omlaag.</p>
              <p><strong>Stap 2:</strong> Tel het aantal stappen horizontaal vanaf 0.</p>
              <p><strong>Stap 3:</strong> Tel het aantal stappen verticaal vanaf 0.</p>
              <p class="font-bold text-amber-600">Schat = (x, y). Eerst horizontaal, dan verticaal.</p>
            </div>
          </div>

          <!-- COORDINATE DISPLAY -->
          <div class="p-4 border border-slate-200 bg-slate-50 rounded-xl shadow-inner text-center">
            <label class="block text-sm font-bold text-slate-700 mb-2">Jouw klik:</label>
            <div class="flex items-center justify-center gap-2 text-3xl font-black text-slate-700">
              <span>(</span>
              <div class="w-16 p-2 rounded-lg shadow-sm border" :class="userX !== null ? 'border-amber-400 bg-white text-amber-600' : 'border-slate-200 bg-slate-50 text-slate-300'">{{ userX !== null ? userX : 'x' }}</div>
              <span>,</span>
              <div class="w-16 p-2 rounded-lg shadow-sm border" :class="userY !== null ? 'border-blue-300 bg-white text-blue-600' : 'border-slate-200 bg-slate-50 text-slate-300'">{{ userY !== null ? userY : 'y' }}</div>
              <span>)</span>
            </div>
            <p class="mt-3 text-xs text-amber-600 font-medium">Tip: Kwadrant {{ currentLevel.targetX > 0 && currentLevel.targetY > 0 ? 'I' : currentLevel.targetX < 0 && currentLevel.targetY > 0 ? 'II' : currentLevel.targetX < 0 && currentLevel.targetY < 0 ? 'III' : 'IV' }}</p>
          </div>

          <!-- BLOOM'S LABEL -->
          <div class="mt-3 flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">{{ Bloom }}</span>
            <span class="text-xs text-slate-400">niveau</span>
          </div>

          <!-- HINTS -->
          <div v-if="showHint && !isCorrect" class="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-amber-700 mb-2 flex items-center gap-2"><PhLightbulb weight="fill" class="w-4 h-4" /> Hint {{ hintLevel + 1 }}</h4>
            <p class="text-sm text-amber-800">{{ hintTexts[hintLevel] }}</p>
            <button v-if="hintLevel < 2" @click="hintLevel++" class="mt-2 text-xs font-bold text-amber-600 underline">Nog een hint</button>
          </div>

          <!-- ERROR ANALYSIS -->
          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>Altijd eerst x (horizontaal), dan y (verticaal).</li>
              <li>Let op de tekens: -x is links, -y is omlaag.</li>
            </ul>
          </div>

          <!-- WHY EXPLANATION -->
          <div v-if="showWhy && !showReflection && !reflectionDone" class="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-indigo-700 mb-2 flex items-center gap-2"><PhPencilSimpleLine weight="fill" class="w-4 h-4" /> Waarom werkt dit?</h4>
            <p class="text-xs text-indigo-600">{{ whyText }}</p>
            <button @click="showReflection = true" class="mt-3 text-xs font-bold text-indigo-700 underline">Naar reflectie</button>
          </div>

          <!-- REFLECTION -->
          <div v-if="showReflection && !reflectionDone" class="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-indigo-700 mb-2 flex items-center gap-2"><PhBrain weight="fill" class="w-5 h-5" /> Reflectie</h4>
            <p class="text-xs text-indigo-600 mb-2">Waarom gebruiken we vier kwadranten in een assenstelsel? Wat is het nut van negatieve coördinaten?</p>
            <textarea v-model="reflectionAnswer" class="w-full p-3 text-sm border border-indigo-300 rounded-lg bg-white" rows="3" placeholder="Typ je antwoord in volledige zinnen..."></textarea>
            <button @click="checkReflection()" :disabled="reflectionAnswer.length < 5" class="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg disabled:opacity-50 hover:bg-indigo-500 transition-colors">Bevestig reflectie</button>
          </div>

          <!-- REFLECTION DONE -->
          <div v-if="reflectionDone" class="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-emerald-700 mb-2 flex items-center gap-2"><PhTarget weight="fill" class="w-5 h-5" /> LPD-bewijs</h4>
            <p class="text-xs text-emerald-600 mb-2">Ik kan een punt in het cartesisch vlak aanduiden met coördinaten (x, y).</p>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="lpd-treasure" v-model="reflectionDone" class="w-4 h-4 accent-emerald-600" />
              <label for="lpd-treasure" class="text-xs text-emerald-700 font-medium">Ik bevestig dat ik dit beheers.</label>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
          <div v-if="feedback.text" class="flex items-start gap-4 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn" role="status" aria-live="polite" aria-atomic="true" :class="{'bg-amber-50 text-amber-800': feedback.type === 'success', 'bg-red-100 text-red-800': feedback.type === 'error', 'bg-blue-100 text-blue-800': feedback.type === 'info'}">
            <component :is="feedback.type === 'success' ? PhCheckCircle : PhWarningCircle" class="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
            <span class="leading-snug">{{ feedback.text }}</span>
          </div>
          <div class="flex items-center gap-4">
            <button @click="resetActivityState" class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 shadow-sm"><PhArrowClockwise /></button>
            <button v-if="!isCorrect" @click="showHintAction()" class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
              <PhLightbulb weight="fill" class="w-5 h-5 text-amber-500" />
              <span>{{ showHint ? 'Hint ' + (hintLevel + 1) : 'Hint' }}</span>
            </button>
            <button v-if="!isCorrect" class="flex-1 py-4 font-bold text-slate-400 text-center rounded-lg shadow-md bg-slate-100 cursor-default">Klik op kaart</button>
            <button v-if="isCorrect && !reflectionDone" @click="showReflection = true" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>Reflecteer</span>
              <PhArrowRight weight="bold" />
            </button>
            <button v-if="isCorrect && reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span>
              <PhArrowRight weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL: TREASURE MAP -->
      <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
        <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-map">
          <div class="relative bg-[#fdfbf7] shadow-md rounded-xl overflow-hidden border-4 border-slate-800 p-4">
            <svg width="500" height="500" viewBox="0 0 500 500" class="block">
              <g stroke="#cbd5e1" stroke-width="1">
                <line v-for="i in 11" :key="'vg'+i" :x1="(i-1)*50" y1="0" :x2="(i-1)*50" y2="500" />
                <line v-for="i in 11" :key="'hg'+i" x1="0" :y1="(i-1)*50" x2="500" :y2="(i-1)*50" />
              </g>
              <line x1="0" y1="250" x2="500" y2="250" stroke="#0ea5e9" stroke-width="4" />
              <line x1="250" y1="0" x2="250" y2="500" stroke="#f97316" stroke-width="4" />
              <text x="480" y="240" font-weight="bold" fill="#0ea5e9" font-size="16">x</text>
              <text x="260" y="20" font-weight="bold" fill="#f97316" font-size="16">y</text>
              <text x="260" y="240" font-weight="bold" fill="#334155" font-size="12">0</text>
              <text x="440" y="40" fill="#e2e8f0" font-size="20" font-weight="900">I</text>
              <text x="40" y="40" fill="#e2e8f0" font-size="20" font-weight="900">II</text>
              <text x="40" y="480" fill="#e2e8f0" font-size="20" font-weight="900">III</text>
              <text x="440" y="480" fill="#e2e8f0" font-size="20" font-weight="900">IV</text>
              <g v-for="x in 11" :key="'ix'+x">
                <g v-for="y in 11" :key="'iy'+y">
                  <circle :cx="(x-1)*50" :cy="(y-1)*50" r="15" fill="transparent" class="cursor-crosshair hover:fill-amber-500/30 transition-colors" @click="clickGrid(x-6, 6-y)" role="button" tabindex="0" @keydown.enter.prevent="clickGrid(x-6, 6-y)" @keydown.space.prevent="clickGrid(x-6, 6-y)" aria-label="Selecteer" />
                </g>
              </g>
              <g v-if="userX !== null && userY !== null" class="animate-fadeIn pointer-events-none">
                <circle :cx="(userX+5)*50" :cy="(5-userY)*50" r="12" fill="none" :stroke="isCorrect ? '#10b981' : '#ef4444'" stroke-width="4" />
                <circle :cx="(userX+5)*50" :cy="(5-userY)*50" r="4" :fill="isCorrect ? '#10b981' : '#ef4444'" />
                <text v-if="isCorrect" :x="(userX+5)*50" :y="(5-userY)*50-20" text-anchor="middle" font-size="28">💎</text>
              </g>
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
.pattern-map {
  background-color: #f8fafc;
  background-image: url('data:image/svg+xml;utf8,<svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0 L 100 100 M 100 0 L 0 100" stroke="rgba(0,0,0,0.03)" stroke-width="1"/></svg>');
}
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
