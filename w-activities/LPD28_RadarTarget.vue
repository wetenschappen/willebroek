<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhCrosshair, PhArrowClockwise, PhLightbulb, PhTarget, PhBrain, PhPencilSimpleLine } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Coordinaten: Radar Detectie' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhCrosshair }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null)
const shouldPulse = ref(false)
const isCorrect = ref(false)
const celebrationDone = ref(false)
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

const feedback = ref({ type: 'info', text: 'Klik op de radar om te vuren.' })

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
  levels.value = [
    { targetX: randomInt(-3, 3), targetY: randomInt(-3, 3) },
    { targetX: randomInt(-5, 5), targetY: randomInt(-5, 5) },
    { targetX: randomInt(-5, 5), targetY: randomInt(-5, 5) }
  ]
}

const currentLevel = computed(() => levels.value[currentInternalLevel.value] || { targetX: 0, targetY: 0 })

const hintTexts = computed(() => {
  const t = currentLevel.value
  return [
    `Het doel ligt in kwadrant ${t.targetX > 0 ? (t.targetY > 0 ? 'I (rechtsboven)' : 'IV (rechtsonder)') : (t.targetY > 0 ? 'II (linksboven)' : 'III (linksonder)')}.`,
    `Het doel is ${Math.abs(t.targetX)} stap(pen) ${t.targetX >= 0 ? 'rechts' : 'links'} en ${Math.abs(t.targetY)} ${t.targetY >= 0 ? 'omhoog' : 'omlaag'}.`,
    `Het exacte doel is (${t.targetX}, ${t.targetY}). De laatste stap moet jij zelf zetten!`
  ]
})

const userX = ref(null)
const userY = ref(null)

function clickRadar(x, y) {
  if (isCorrect.value) return
  userX.value = x
  userY.value = y
  checkAnswer()
}

function resetActivityState() {
  isCorrect.value = false
  celebrationDone.value = false
  attemptCount.value = 0
  hintLevel.value = 0
  showHint.value = false
  userX.value = null
  userY.value = null
  feedback.value = { type: 'info', text: 'Klik op de radar.' }
  showPrediction.value = !predictionSubmitted.value
  predictionAnswer.value = null
  showWhy.value = false
  whyText.value = ''
  showReflection.value = false
  reflectionAnswer.value = ''
  reflectionDone.value = false
  errorDetected.value = ''
}

function getHintText(t) {
  if (attemptCount.value === 1) return `Doel is x ${t.targetX >= 0 ? 'rechts' : 'links'} en y ${t.targetY >= 0 ? 'boven' : 'onder'}.`
  if (attemptCount.value === 2) return `${Math.abs(t.targetX)} ${t.targetX >= 0 ? 'rechts' : 'links'}, ${Math.abs(t.targetY)} ${t.targetY >= 0 ? 'omhoog' : 'omlaag'}.`
  return `Doel = (${t.targetX}, ${t.targetY}).`
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
  const t = currentLevel.value
  if (userX.value === t.targetX && userY.value === t.targetY) {
    isCorrect.value = true
    feedback.value = {
      type: 'success',
      text: `BOEM! Voltreffer! (${t.targetX}, ${t.targetY}). Coördinaten worden altijd genoteerd als (x, y) met x eerst (horizontaal) en y daarna (verticaal). De oorsprong (0,0) is het snijpunt van de x-as en y-as.`
    }
    showWhy.value = true
    whyText.value = `Het cartesisch coördinatenstelsel geeft elk punt een uniek adres (x, y). De x-coördinaat (${t.targetX}) zegt hoe ver het punt links of rechts van de oorsprong ligt, de y-coördinaat (${t.targetY}) zegt hoe ver omhoog of omlaag. Deze ordening is een internationale afspraak.`
  } else {
    attemptCount.value++
    if (userX.value === t.targetY && userY.value === t.targetX) {
      feedback.value = { type: 'error', text: `Mis! Je hebt x en y omgedraaid! Eerst horizontaal, dan verticaal. ${hintTexts.value[0]}` }
    } else {
      feedback.value = { type: 'error', text: `Mis op (${userX.value}, ${userY.value}). ${hintTexts.value[0]}` }
    }
  }
}

function checkReflection() {
  const a = reflectionAnswer.value.toLowerCase()
  const conceptWords = ['coordinaat', 'coördinaat', 'assen', 'x-as', 'y-as', 'horizontaal', 'verticaal', 'positie', 'punt', 'oorsprong', 'kwadrant', 'raster']
  const reasonWords = ['omdat', 'dus', 'daarom', 'want', 'als', 'dan', 'doordat', 'hierdoor', 'nodig', 'belangrijk']
  const hasConcept = conceptWords.some(w => a.includes(w))
  const hasReason = reasonWords.some(w => a.includes(w))
  const minLen = a.length >= 20
  if (hasConcept && hasReason && minLen) {
    reflectionDone.value = true
    return true
  }
  if (!minLen) feedback.value = { type: 'error', text: 'Schrijf een volledige zin (minimaal 20 tekens).' }
  else if (!hasConcept) feedback.value = { type: 'error', text: 'Probeer vaktaal te gebruiken, zoals "coördinaten", "assenstelsel" of "horizontaal".' }
  else feedback.value = { type: 'error', text: 'Leg ook uit WAAROM coördinaten belangrijk zijn, gebruik woorden zoals "omdat" of "daarom".' }
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
<div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-slate-100">
  <div class="absolute inset-0 bg-black/50" @click="emit('close')" role="button" tabindex="0" @keydown.enter.prevent="emit('close')" @keydown.space.prevent="emit('close')" aria-label="Sluiten"></div>
  <div class="relative flex flex-col w-screen h-screen overflow-hidden shadow-md bg-slate-800">
    <header class="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700 shrink-0 shadow-sm">
      <div class="flex items-center gap-4">
        <div class="flex items-center justify-center p-2 rounded-lg bg-amber-500/20">
          <component :is="props.icon" weight="fill" class="w-6 h-6 text-amber-400" />
        </div>
        <div>
          <h2 class="text-lg font-bold text-slate-100">{{ title }}</h2>
          <p class="text-xs font-medium text-slate-400">Level {{ currentInternalLevel + 1 }} van {{ totalInternalLevels }}</p>
        </div>
      </div>
      <button @click="emit('close')" class="relative p-2 text-slate-400 transition-colors rounded-full hover:bg-slate-700 hover:text-white"><PhX class="w-6 h-6" /></button>
    </header>
    <main class="flex flex-1 overflow-hidden">
      <div class="flex-col hidden w-full max-w-sm bg-slate-800 border-r border-slate-700 shadow-inner md:flex z-10">
        <div ref="mainArea" tabindex="-1" class="flex-1 p-6 overflow-y-auto">
          <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-400 uppercase">Instructies</h3>
          <MathText :content="props.instruction" class="mb-6 prose prose-sm prose-invert text-slate-300" />

          <!-- PREDICTION GATE -->
          <div v-if="showPrediction" class="p-5 border-2 border-amber-500/50 bg-amber-500/10 rounded-xl mb-6 animate-fadeIn">
            <div class="flex items-center gap-2 mb-3">
              <PhBrain weight="fill" class="w-5 h-5 text-amber-400" />
              <span class="font-bold text-amber-300 text-sm">Voorspel eerst!</span>
            </div>
            <p class="text-sm text-amber-200 mb-3">Het radarscherm toont een assenstelsel. Wat is de juiste volgorde van coördinaten?</p>
            <div class="flex gap-2">
              <button @click="predictionAnswer = 'eerst x'; submitPrediction()" class="flex-1 py-2 px-3 text-sm font-bold rounded-lg border-2 transition-colors" :class="predictionAnswer === 'eerst x' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-700 text-amber-300 border-amber-600/50 hover:bg-amber-600/30'">Eerst x (horizontaal)</button>
              <button @click="predictionAnswer = 'eerst y'; submitPrediction()" class="flex-1 py-2 px-3 text-sm font-bold rounded-lg border-2 transition-colors" :class="predictionAnswer === 'eerst y' ? 'bg-amber-500 text-white border-amber-500' : 'bg-slate-700 text-amber-300 border-amber-600/50 hover:bg-amber-600/30'">Eerst y (verticaal)</button>
            </div>
          </div>

          <!-- WORKED EXAMPLE -->
          <div class="mb-4 p-4 bg-indigo-900/40 border border-indigo-700 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-indigo-300 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Coördinaten
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-indigo-200 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Lees eerst de horizontale positie (x-as).</p>
              <p><strong>Stap 2:</strong> Lees dan de verticale positie (y-as).</p>
              <p><strong>Stap 3:</strong> Noteer als (x, y). Altijd horizontaal eerst!</p>
              <p class="font-bold text-indigo-300">Positief x = rechts, negatief x = links. Positief y = omhoog, negatief y = omlaag.</p>
            </div>
          </div>

          <!-- COORDINATE DISPLAY -->
          <div class="p-4 border border-emerald-900 bg-emerald-900/30 rounded-xl shadow-inner text-center">
            <label class="block text-sm font-bold text-emerald-400 mb-2">Jouw schot:</label>
            <div class="flex items-center justify-center gap-2 text-3xl font-black text-slate-300 mb-2">
              <span>(</span>
              <span class="w-16 p-2 rounded-lg bg-slate-900 border" :class="userX !== null ? 'border-emerald-500 text-emerald-400' : 'border-slate-600 text-slate-500'">{{ userX !== null ? userX : 'x' }}</span>
              <span>,</span>
              <span class="w-16 p-2 rounded-lg bg-slate-900 border" :class="userY !== null ? 'border-blue-500 text-blue-400' : 'border-slate-600 text-slate-500'">{{ userY !== null ? userY : 'y' }}</span>
              <span>)</span>
            </div>
            <p class="text-xs text-slate-500 mt-2">Klik op de radar om te vuren</p>
          </div>

          <!-- BLOOM'S LABEL -->
          <div class="mt-3 flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-900/60 text-indigo-300">{{ Bloom }}</span>
            <span class="text-xs text-slate-500">niveau</span>
          </div>

          <!-- HINTS -->
          <div v-if="showHint && !isCorrect" class="mt-4 p-4 bg-indigo-900/40 border border-indigo-700 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2"><PhLightbulb weight="fill" class="w-4 h-4" /> Hint {{ hintLevel + 1 }}</h4>
            <p class="text-sm text-indigo-200">{{ hintTexts[hintLevel] }}</p>
            <button v-if="hintLevel < 2" @click="hintLevel++" class="mt-2 text-xs font-bold text-indigo-400 underline">Nog een hint</button>
          </div>

          <!-- ERROR ANALYSIS -->
          <div class="mt-4 p-4 bg-red-900/30 border border-red-700 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-300 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-200 space-y-1 list-disc list-inside">
              <li>Verwar x en y niet! Eerst horizontaal (x), dan verticaal (y).</li>
              <li>Positief x is rechts, negatief x is links. Positief y is omhoog, negatief y is omlaag.</li>
            </ul>
          </div>

          <!-- WHY EXPLANATION -->
          <div v-if="showWhy && !showReflection && !reflectionDone" class="mt-4 p-4 bg-indigo-900/40 border border-indigo-700 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2"><PhPencilSimpleLine weight="fill" class="w-4 h-4" /> Waarom werkt dit?</h4>
            <p class="text-xs text-indigo-200">{{ whyText }}</p>
            <button @click="showReflection = true" class="mt-3 text-xs font-bold text-indigo-300 underline">Naar reflectie</button>
          </div>

          <!-- REFLECTION -->
          <div v-if="showReflection && !reflectionDone" class="mt-4 p-4 bg-indigo-900/40 border border-indigo-700 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2"><PhBrain weight="fill" class="w-5 h-5" /> Reflectie</h4>
            <p class="text-xs text-indigo-200 mb-2">Waarom is de volgorde (x, y) belangrijk? Wat gebeurt er als je ze omdraait?</p>
            <textarea v-model="reflectionAnswer" class="w-full p-3 text-sm border border-indigo-600 rounded-lg bg-slate-900 text-slate-100" rows="3" placeholder="Typ je antwoord in volledige zinnen..."></textarea>
            <button @click="checkReflection()" :disabled="reflectionAnswer.length < 5" class="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg disabled:opacity-50 hover:bg-indigo-500 transition-colors">Bevestig reflectie</button>
          </div>

          <!-- REFLECTION DONE -->
          <div v-if="reflectionDone" class="mt-4 p-4 bg-emerald-900/30 border border-emerald-700 rounded-xl animate-fadeIn">
            <h4 class="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2"><PhTarget weight="fill" class="w-5 h-5" /> LPD-bewijs</h4>
            <p class="text-xs text-emerald-200 mb-2">Ik kan coördinaten (x, y) aflezen en noteren in een assenstelsel.</p>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="lpd-radar" v-model="reflectionDone" class="w-4 h-4 accent-emerald-600" />
              <label for="lpd-radar" class="text-xs text-emerald-200 font-medium">Ik bevestig dat ik dit beheers.</label>
            </div>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="p-6 bg-slate-900 border-t border-slate-700 shrink-0">
          <div v-if="feedback.text" class="flex items-start gap-4 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn" role="status" aria-live="polite" aria-atomic="true" :class="{'bg-emerald-900/50 text-emerald-300 border border-emerald-800': feedback.type === 'success', 'bg-red-900/50 text-red-300 border border-red-800': feedback.type === 'error', 'bg-blue-900/50 text-blue-300 border border-blue-800': feedback.type === 'info'}">
            <component :is="feedback.type === 'success' ? PhCheckCircle : PhWarningCircle" class="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
            <span class="leading-snug">{{ feedback.text }}</span>
          </div>
          <div class="flex items-center gap-4">
            <button @click="resetActivityState" class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-400 bg-slate-800 border border-slate-600 hover:bg-slate-700"><PhArrowClockwise /></button>
            <button v-if="!isCorrect" @click="showHintAction()" class="flex-1 py-4 font-bold text-slate-300 rounded-lg border-2 border-slate-600 bg-slate-800 hover:bg-slate-700 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
              <PhLightbulb weight="fill" class="w-5 h-5 text-amber-400" />
              <span>{{ showHint ? 'Hint ' + (hintLevel + 1) : 'Hint' }}</span>
            </button>
            <button v-if="!isCorrect" class="flex-1 py-4 font-bold text-slate-500 text-center rounded-lg border border-slate-700 bg-slate-800/50 cursor-default">Klik op radar</button>
            <button v-if="isCorrect && !reflectionDone" @click="showReflection = true" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-slate-900 transition-all rounded-lg shadow-md bg-amber-500 hover:bg-amber-400">
              <span>Reflecteer</span>
              <PhArrowRight weight="bold" />
            </button>
            <button v-if="isCorrect && reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-slate-900 transition-all rounded-lg shadow-md bg-amber-500 hover:bg-amber-400">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span>
              <PhArrowRight weight="bold" />
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT PANEL: RADAR -->
      <div class="flex flex-col flex-1 overflow-hidden bg-slate-900">
        <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative">
          <div class="relative bg-slate-800 shadow-md rounded-full overflow-hidden border-8 border-slate-700 p-2">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_#064e3b_0%,_#020617_100%)]"></div>
            <svg width="400" height="400" viewBox="0 0 400 400" class="block relative z-10">
              <circle cx="200" cy="200" r="200" fill="none" stroke="#10b981" stroke-width="2" opacity="0.3" />
              <circle cx="200" cy="200" r="160" fill="none" stroke="#10b981" stroke-width="1" opacity="0.2" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#10b981" stroke-width="1" opacity="0.2" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="#10b981" stroke-width="1" opacity="0.2" />
              <circle cx="200" cy="200" r="40" fill="none" stroke="#10b981" stroke-width="1" opacity="0.2" />
              <g stroke="#10b981" stroke-width="1" opacity="0.15">
                <line v-for="i in 11" :key="'vg'+i" :x1="(i-1)*40" y1="0" :x2="(i-1)*40" y2="400" />
                <line v-for="i in 11" :key="'hg'+i" x1="0" :y1="(i-1)*40" x2="400" :y2="(i-1)*40" />
              </g>
              <line x1="0" y1="200" x2="400" y2="200" stroke="#10b981" stroke-width="2" opacity="0.5" />
              <line x1="200" y1="0" x2="200" y2="400" stroke="#10b981" stroke-width="2" opacity="0.5" />
              <text x="380" y="190" font-weight="bold" fill="#10b981" font-size="12" opacity="0.7">x</text>
              <text x="210" y="20" font-weight="bold" fill="#10b981" font-size="12" opacity="0.7">y</text>
              <g fill="#10b981" font-size="8" opacity="0.5" font-weight="bold">
                <text x="360" y="215" text-anchor="middle">5</text>
                <text x="280" y="215" text-anchor="middle">2</text>
                <text x="120" y="215" text-anchor="middle">-2</text>
                <text x="40" y="215" text-anchor="middle">-4</text>
                <text x="185" y="40" dominant-baseline="middle">4</text>
                <text x="185" y="120" dominant-baseline="middle">2</text>
                <text x="180" y="280" dominant-baseline="middle">-2</text>
              </g>
              <g v-for="xi in 11" :key="'cx'+xi">
                <g v-for="yi in 11" :key="'cy'+yi">
                  <circle :cx="(xi-1)*40" :cy="(yi-1)*40" r="12" fill="transparent" class="cursor-crosshair hover:fill-emerald-500/30 transition-colors" @click="clickRadar(xi-6, 6-yi)" role="button" tabindex="0" @keydown.enter.prevent="clickRadar(xi-6, 6-yi)" @keydown.space.prevent="clickRadar(xi-6, 6-yi)" aria-label="Selecteer" />
                </g>
              </g>
              <g>
                <circle :cx="200+currentLevel.targetX*40" :cy="200-currentLevel.targetY*40" r="6" fill="#34d399" />
                <circle :cx="200+currentLevel.targetX*40" :cy="200-currentLevel.targetY*40" r="3" fill="#ecfdf5" />
              </g>
              <g v-if="userX !== null && userY !== null" class="animate-fadeIn pointer-events-none">
                <circle :cx="200+userX*40" :cy="200-userY*40" r="20" fill="none" :stroke="isCorrect ? '#34d399' : '#ef4444'" stroke-width="4" />
                <circle :cx="200+userX*40" :cy="200-userY*40" r="4" :fill="isCorrect ? '#34d399' : '#ef4444'" />
                <text v-if="isCorrect" :x="200+userX*40" :y="200-userY*40-25" text-anchor="middle" font-weight="900" font-size="16" fill="#34d399" class="animate-fadeIn" style="animation-delay:0.5s">BOEM!</text>
                <text v-else :x="200+userX*40" :y="200-userY*40-25" text-anchor="middle" font-weight="900" font-size="14" fill="#f87171" class="animate-fadeIn" style="animation-delay:0.3s">MIS!</text>
              </g>
              <g class="animate-spin-radar origin-center">
                <line x1="200" y1="200" x2="200" y2="0" stroke="#34d399" stroke-width="2" opacity="0.8" />
                <path d="M 200 200 L 200 0 A 200 200 0 0 1 250 6 Z" fill="rgba(52,211,153,0.2)" />
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
.animate-fadeIn {
  animation: fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
.animate-spin-radar {
  animation: spin 4s linear infinite;
  transform-origin: 200px 200px;
}
@keyframes spin {
  100% { transform: rotate(360deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
