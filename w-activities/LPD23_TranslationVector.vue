<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhNavigationArrow, PhArrowClockwise, PhLightbulb, PhTarget } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Transformaties: De Vector-Motor' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhNavigationArrow }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null)
const shouldPulse = ref(false)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Sleep de punt van de rode pijl.' })
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
  levels.value = [
    makeLevelCoords(80,180,380,180, 120,380, '<polygon points="0,0 60,0 30,-50" fill="currentColor" stroke="inherit" stroke-width="3" />', 'Perfect! De vector stuurt de driehoek horizontaal naar rechts.'),
    makeLevelCoords(60,220,320,60, 180,370, '<rect x="0" y="-40" width="40" height="40" fill="currentColor" stroke="inherit" stroke-width="3" />', 'Goed zo! Diagonaal verschoven: X positief, Y negatief.'),
    makeLevelCoords(420,90,90,260, 370,270, '<polygon points="0,0 20,-40 60,-40 40,0" fill="currentColor" stroke="inherit" stroke-width="3" />', 'Uitstekend! Negatieve verschuiving: X en Y hebben juiste tekens.')
  ]
}
function makeLevelCoords(sx, sy, tx, ty, vox, voy, svg, msg) {
  return { goalText: `Opdracht ${levels.value.length + 1}`, startX: sx, startY: sy, targetX: tx, targetY: ty, vecOriginX: vox, vecOriginY: voy, shapeSVG: svg, successMsg: msg }
}
const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

const vecTipX = ref(100)
const vecTipY = ref(350)
const dx = computed(() => vecTipX.value - currentLevelData.value.vecOriginX)
const dy = computed(() => vecTipY.value - currentLevelData.value.vecOriginY)
const objX = computed(() => currentLevelData.value.startX + dx.value)
const objY = computed(() => currentLevelData.value.startY + dy.value)
let isDragging = false

function startDrag(e) { if (isCorrect.value) return; isDragging = true; updateVector(e) }
function onDrag(e) { if (!isDragging) return; updateVector(e) }
function endDrag() { isDragging = false; checkWinCondition() }
function updateVector(e) {
  let cx = e.clientX || (e.touches ? e.touches[0].clientX : 0), cy = e.clientY || (e.touches ? e.touches[0].clientY : 0)
  const svgEl = document.getElementById('vector-svg')
  if (svgEl) { const r = svgEl.getBoundingClientRect(); vecTipX.value = Math.max(20, Math.min(580, cx - r.left)); vecTipY.value = Math.max(20, Math.min(430, cy - r.top)) }
}

function checkWinCondition() {
  const d = currentLevelData.value; const dist = Math.sqrt(Math.pow(objX.value - d.targetX, 2) + Math.pow(objY.value - d.targetY, 2))
  if (dist < 15) {
    vecTipX.value = d.vecOriginX + (d.targetX - d.startX); vecTipY.value = d.vecOriginY + (d.targetY - d.startY)
    isCorrect.value = true
    hintCount.value = 0
    const whyExplanation = 'Een translatievector (a,b) verplaatst elk punt (x,y) naar (x+a, y+b). De richting en grootte van de vector bepalen de volledige verplaatsing.'
    showWhyExplanation(whyExplanation)
    showReflection.value = true
    isChecked.value = true
    feedback.value = { type: 'success', text: d.successMsg }
  }
  else { isCorrect.value = false; isChecked.value = false; attemptCount.value++; if (dist > 50) feedback.value = { type: 'error', text: 'Niet helemaal... Sleep de pijlpunt verder tot de vorm exact op de stippellijn past.' } }
}

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; feedback.value = { type: 'info', text: 'Sleep de punt van de rode pijl.' }; vecTipX.value = currentLevelData.value.vecOriginX; vecTipY.value = currentLevelData.value.vecOriginY; attemptCount.value = 0; hintCount.value = 0; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false }

function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = ['Sleep de punt van de rode pijl naar de juiste positie.', 'De vector (a,b) verplaatst de figuur a naar rechts en b omhoog.', 'Let op de coördinaten van de pijlpunt ten opzichte van de oorsprong.' ]
  feedback.value = { type: 'info', text: hints[idx] }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  const v = currentLevelData.value
  const dx = v.vecTipX - v.vecOriginX
  const dy = v.vecTipY - v.vecOriginY
  predictionCorrect.value = Math.abs(predictionAnswer.value[0] - dx) < 5 && Math.abs(predictionAnswer.value[1] - dy) < 5
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat!' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Niet juist. Sleep de pijl naar de juiste positie.' }
  }
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('vector') || text.includes('pijl') || text.includes('translat') || text.includes('verplaats')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie!<br/><br/><strong>LPD 23 bewezen:</strong> Je begrijpt vectoren als verplaatsingen.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit wat een vector voorstelt. Gebruik "vector" en "verplaatsing".' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over vectoren.' }
    return
  }
  if (currentInternalLevel.value < totalInternalLevels - 1) { currentInternalLevel.value++; resetActivityState(); nextTick(() => mainArea.value?.focus()) } else { if (props.currentStep < props.totalSteps) emit('update:currentStep', props.currentStep + 1); else emit('complete') }
}

watch(() => props.isOpen, (val) => { if (val) { currentInternalLevel.value = 0; generateLevel(); resetActivityState(); nextTick(() => mainArea.value?.focus()); window.addEventListener('keydown', handleKeydown) } else { window.removeEventListener('keydown', handleKeydown) } }, { immediate: true })
watch(currentInternalLevel, () => { if (levels.value.length > 0) { vecTipX.value = currentLevelData.value.vecOriginX; vecTipY.value = currentLevelData.value.vecOriginY } })
function handleKeydown(e) { if (e.key === 'Escape' && props.isOpen) emit('close') }
onMounted(() => document.addEventListener('fullscreenchange', () => {}))
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown) })
</script>

<template>
<div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-800" @mouseup="endDrag" @mouseleave="endDrag" @touchend="endDrag" @mousemove="onDrag" @touchmove.prevent="onDrag">
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
            <p class="text-sm text-amber-800 mb-3">Wat is de translatievector voor deze opdracht?<br />Sleep de pijl om te testen.</p>
            <div class="flex gap-2">
              <button @click="predictionAnswer = true; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Ik weet de richting</button>
              <button @click="predictionAnswer = false; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Ik gok</button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Translatie met vector
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Een translatievector (a,b) zegt: verschuif elk punt a eenheden horizontaal en b eenheden verticaal.</p>
              <p><strong>Stap 2:</strong> Positieve a = naar rechts, negatieve a = naar links. Positieve b = omhoog, negatieve b = omlaag.</p>
              <p><strong>Stap 3:</strong> Elk punt van de figuur ondergaat dezelfde verschuiving. De vorm blijft identiek.</p>
            </div>
          </div>

          <div v-if="!showPrediction" class="text-center bg-amber-50 p-4 border border-amber-200 rounded-xl shadow-sm mb-6 animate-fadeIn">
            <p class="font-bold text-amber-800">{{ levelLabels ? levelLabels[currentInternalLevel] + ' — ' : '' }}{{ currentLevelData.goalText }}</p>
          </div>

          <div class="p-4 mt-6 border border-slate-200 bg-slate-50 rounded-xl shadow-inner">
            <h4 class="font-bold text-slate-700 mb-2">Vector Eigenschappen</h4>
            <ul class="space-y-2 font-mono text-sm text-slate-600">
              <li>Verschuiving X: <strong :class="dx === 0 ? 'text-slate-400' : (dx > 0 ? 'text-amber-600' : 'text-red-600')">{{ dx > 0 ? '+' : ''}}{{ Math.round(dx) }}</strong></li>
              <li>Verschuiving Y: <strong :class="dy === 0 ? 'text-slate-400' : (dy > 0 ? 'text-red-600' : (dy < 0 ? 'text-amber-600' : 'text-slate-400'))">{{ dy > 0 ? '-' : (dy < 0 ? '+' : '') }}{{ Math.abs(Math.round(dy)) }}</strong></li>
            </ul>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op! Veelgemaakte fouten:</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>De richting van de vector moet overeenkomen met de verschuiving: omhoog is positief Y.</li>
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
            <p class="text-sm text-slate-700 mb-3">Waarom bepaalt een vector de translatie volledig? Wat zegt het teken van a en b over de richting?</p>
            <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
              class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              rows="3" placeholder="Een vector bepaalt de translatie omdat..."></textarea>
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
          <div class="relative bg-white shadow-md rounded-xl overflow-hidden border-2 border-slate-200 p-2">
            <svg id="vector-svg" width="600" height="450" viewBox="0 0 600 450" class="block bg-slate-50" :key="currentInternalLevel">
              <g stroke="#e2e8f0" stroke-width="1">
                <line v-for="i in 12" :key="'v'+i" :x1="i*50" y1="0" :x2="i*50" y2="450" /><line v-for="i in 9" :key="'h'+i" x1="0" :y1="i*50" x2="600" :y2="i*50" />
              </g>
              <defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><polygon points="0 0,10 5,0 10" fill="#ef4444" /></marker></defs>
              <g :transform="`translate(${currentLevelData.targetX}, ${currentLevelData.targetY})`" color="#94a3b8" v-html="currentLevelData.shapeSVG" stroke-dasharray="6 4" fill="transparent"></g>
              <g :transform="`translate(${currentLevelData.startX}, ${currentLevelData.startY})`" color="transparent" fill="rgba(148,163,184,0.2)" v-html="currentLevelData.shapeSVG"></g>
              <g :transform="`translate(${objX}, ${objY})`" class="transition-all duration-75" color="#0284c7" fill="rgba(14,165,233,0.8)" v-html="currentLevelData.shapeSVG"></g>
              <g v-if="dx !== 0 || dy !== 0" opacity="0.3"><line :x1="currentLevelData.startX" :y1="currentLevelData.startY" :x2="objX" :y2="objY" stroke="#0ea5e9" stroke-width="2" stroke-dasharray="4 4" /></g>
              <g>
                <circle :cx="currentLevelData.vecOriginX" :cy="currentLevelData.vecOriginY" r="6" fill="#1e293b" />
                <line :x1="currentLevelData.vecOriginX" :y1="currentLevelData.vecOriginY" :x2="vecTipX" :y2="vecTipY" stroke="#ef4444" stroke-width="6" marker-end="url(#arrow)" />
                <circle :cx="vecTipX" :cy="vecTipY" r="20" fill="rgba(239,68,68,0.3)" stroke="#ef4444" stroke-width="2" class="cursor-pointer hover:scale-125 transition-transform origin-center" :class="isCorrect ? 'pointer-events-none opacity-0' : ''" @mousedown.stop="startDrag" @touchstart.stop.prevent="startDrag" />
                <text :x="currentLevelData.vecOriginX - 10" :y="currentLevelData.vecOriginY + 25" font-weight="bold" fill="#1e293b" font-family="monospace">Start</text>
              </g>
            </svg>
          </div>
          <p v-if="!isCorrect" class="mt-6 text-sm font-bold text-slate-500 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">Sleep de transparante rode knop aan het einde van de pijl.</p>
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
