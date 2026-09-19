<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhBoundingBox, PhArrowClockwise, PhLightbulb, PhTarget } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Volume: De Balk Vullen' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhBoundingBox }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null); const shouldPulse = ref(false)
const isCorrect = ref(false); const celebrationDone = ref(false); const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Stap 1: Bereken het Grondvlak.' })
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

function randomInt(m, M) { return Math.floor(Math.random() * (M - m + 1)) + m }
const levels = ref([])
function generateLevel(idx) { return idx === 0 ? { w: randomInt(3,5), d: randomInt(2,4), h: randomInt(3,5) } : idx === 1 ? { w: randomInt(4,6), d: randomInt(3,5), h: randomInt(4,6) } : { w: randomInt(5,7), d: randomInt(3,5), h: randomInt(5,7) } }

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])
const baseArea = computed(() => currentLevelData.value.w * currentLevelData.value.d)
const totalVol = computed(() => baseArea.value * currentLevelData.value.h)

const step = ref(0); const ansBase = ref(null); const ansVol = ref(null)

function getHint(phase) {
  if (phase === 'base') {
    if (attemptCount.value <= 1) return `Bodem is ${currentLevelData.value.w} x ${currentLevelData.value.d}. Wat is de oppervlakte?`
    if (attemptCount.value === 2) return `L x B = ${currentLevelData.value.w} x ${currentLevelData.value.d} = ?`
    return `Berekening: ${currentLevelData.value.w} x ${currentLevelData.value.d} = ${baseArea.value}`
  }
  if (attemptCount.value <= 1) return `Elke laag heeft oppervlakte ${baseArea.value}. Hoeveel lagen (hoogte)?`
  if (attemptCount.value === 2) return `V = G x h = ${baseArea.value} x ${currentLevelData.value.h} = ?`
  return `${baseArea.value} x ${currentLevelData.value.h} = ${totalVol.value}`
}

function fillBase() {
  if (ansBase.value === baseArea.value) { step.value = 1; attemptCount.value = 0; feedback.value = { type: 'success', text: `Correct! Grondvlak = ${currentLevelData.value.w} x ${currentLevelData.value.d} = ${baseArea.value}. Hoeveel lagen (hoogte ${currentLevelData.value.h})?` } }
  else { attemptCount.value++; feedback.value = { type: 'error', text: getHint('base') } }
}

function fillAll() {
  isChecked.value = true
  if (ansVol.value === totalVol.value) {
    step.value = 2
    isCorrect.value = true
    hintCount.value = 0
    const whyExplanation = `Volume = oppervlakte grondvlak x hoogte = ${baseArea.value} x ${currentLevelData.value.h} = ${totalVol.value}. Je stapelt laagjes blokjes op elkaar. Elke laag heeft dezelfde oppervlakte en er zijn ${currentLevelData.value.h} lagen.`
    showWhyExplanation(whyExplanation)
    showReflection.value = true
    feedback.value = { type: 'success', text: `Briljant! Volume = ${totalVol.value}.` } }
  else { isCorrect.value = false; attemptCount.value++
    if (ansVol.value === baseArea.value) feedback.value = { type: 'error', text: `${baseArea.value} is een laag. Hoeveel lagen (h = ${currentLevelData.value.h})?` }
    else feedback.value = { type: 'error', text: getHint('volume') }
  }
}

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; feedback.value = { type: 'info', text: 'Bereken het Grondvlak.' }; step.value = 0; ansBase.value = null; ansVol.value = null; attemptCount.value = 0; hintCount.value = 0; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false; if (levels.value.length === 0) levels.value = [0,1,2].map(i => generateLevel(i)) }

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
            <p class="text-sm text-amber-800 mb-3">Wat denk jij dat het antwoord is?</p>
            <div class="flex gap-2">
              <button @click="predictionAnswer = true; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Ik weet het</button>
              <button @click="predictionAnswer = false; checkPrediction()" class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100">Ik twijfel</button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Volume berekenen
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Bereken de oppervlakte van het grondvlak (G = l x b).</p>
              <p><strong>Stap 2:</strong> Vermenigvuldig met de hoogte (V = G x h).</p>
              <p><strong>Waarom?</strong> Je vult de balk laag per laag. Elke laag heeft oppervlakte G, en er passen h lagen in.</p>
            </div>
          </div>

          <div class="p-4 border border-slate-200 bg-slate-50 rounded-xl shadow-inner flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <label class="text-sm font-bold text-slate-700">1. Oppervlakte Grondvlak (G):</label>
              <div class="flex items-center gap-2">
                <input type="number" v-model.number="ansBase" placeholder="L x B" :disabled="step > 0" class="w-full font-bold text-lg p-2 border-2 border-slate-300 rounded-lg text-center bg-white" />
                <button @click="fillBase" v-if="step === 0" class="px-4 py-2 bg-amber-600 text-white rounded-lg font-bold hover:bg-amber-500 active:scale-95">Vul Laag</button>
                <PhCheckCircle v-if="step > 0" weight="fill" class="w-8 h-8 text-amber-500 shrink-0 animate-fadeIn" />
              </div>
            </div>
            <div class="flex flex-col gap-2 pt-4 border-t border-slate-200" :class="step === 0 ? 'opacity-50 pointer-events-none' : ''">
              <label class="text-sm font-bold text-slate-700">2. Totaal Volume (G x h):</label>
              <div class="flex items-center gap-2">
                <input type="number" v-model.number="ansVol" placeholder="G x h" :disabled="isCorrect" class="w-full font-bold text-xl p-4 border-2 border-amber-400 rounded-lg text-center bg-white" />
                <span class="font-black text-slate-500">cm</span>
              </div>
            </div>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>Volume is niet hetzelfde als oppervlakte! De derde dimensie (hoogte) telt mee.</li>
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
            <button v-if="!isCorrect" @click="fillAll" :disabled="step === 0 || ansVol === null" class="flex-1 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-slate-800 hover:bg-slate-900 disabled:opacity-50">Vul Doos</button>
            <button v-else @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
              <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span><PhArrowRight weight="bold" />
            </button>
          </div>
        </div>
        </div>
      </div>
      <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
        <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
          <div class="w-full max-w-2xl flex flex-col items-center">
            <div class="relative bg-white shadow-md rounded-xl overflow-hidden border-2 border-slate-200 p-8 flex items-center justify-center" style="width:500px;height:500px" :key="currentInternalLevel">
              <svg width="400" height="400" viewBox="-200 -250 400 400">
                <g stroke="#94a3b8" stroke-width="2" stroke-dasharray="4 4" fill="none">
                  <line :x1="-currentLevelData.d*26" :y1="currentLevelData.d*15" :x2="-currentLevelData.d*26" :y2="currentLevelData.d*15 - currentLevelData.h*30" />
                  <line :x1="-currentLevelData.d*26" :y1="currentLevelData.d*15" :x2="currentLevelData.w*26 - currentLevelData.d*26" :y2="currentLevelData.w*15 + currentLevelData.d*15" />
                </g>
                <g v-if="step >= 1">
                  <template v-for="h in (step===2 ? currentLevelData.h : 1)" :key="'h'+h">
                    <template v-for="z in currentLevelData.d" :key="'z'+z">
                      <template v-for="x in currentLevelData.w" :key="'x'+x">
                        <g :transform="`translate(${(x-1)*26 - (z-1)*26}, ${(x-1)*15 + (z-1)*15 - (h-1)*30})`" class="animate-fadeIn" :style="`animation-delay: ${(h-1)*0.1+(z-1)*0.02+(x-1)*0.02}s`">
                          <polygon points="0,-30 26,-15 0,0 -26,-15" fill="#3b82f6" stroke="#1d4ed8" stroke-width="1" />
                          <polygon points="-26,-15 0,0 0,30 -26,15" fill="#60a5fa" stroke="#1d4ed8" stroke-width="1" />
                          <polygon points="0,0 26,-15 26,15 0,30" fill="#2563eb" stroke="#1d4ed8" stroke-width="1" />
                        </g>
                      </template>
                    </template>
                  </template>
                </g>
                <g stroke="#334155" stroke-width="3" fill="none">
                  <line x1="0" y1="0" :x2="currentLevelData.w*26" :y2="currentLevelData.w*15" />
                  <line x1="0" y1="0" :x2="-currentLevelData.d*26" :y2="currentLevelData.d*15" />
                  <line x1="0" :y1="-currentLevelData.h*30" :x2="currentLevelData.w*26" :y2="currentLevelData.w*15 - currentLevelData.h*30" />
                  <line x1="0" :y1="-currentLevelData.h*30" :x2="-currentLevelData.d*26" :y2="currentLevelData.d*15 - currentLevelData.h*30" />
                  <line :x1="currentLevelData.w*26" :y1="currentLevelData.w*15 - currentLevelData.h*30" :x2="currentLevelData.w*26 - currentLevelData.d*26" :y2="currentLevelData.w*15 + currentLevelData.d*15 - currentLevelData.h*30" />
                  <line :x1="-currentLevelData.d*26" :y1="currentLevelData.d*15 - currentLevelData.h*30" :x2="currentLevelData.w*26 - currentLevelData.d*26" :y2="currentLevelData.w*15 + currentLevelData.d*15 - currentLevelData.h*30" />
                  <line x1="0" y1="0" x2="0" :y2="-currentLevelData.h*30" />
                  <line :x1="currentLevelData.w*26" :y1="currentLevelData.w*15" :x2="currentLevelData.w*26" :y2="currentLevelData.w*15 - currentLevelData.h*30" />
                  <line :x1="-currentLevelData.d*26" :y1="currentLevelData.d*15" :x2="-currentLevelData.d*26" :y2="currentLevelData.d*15 - currentLevelData.h*30" />
                </g>
                <text :x="(currentLevelData.w*26)/2+15" :y="(currentLevelData.w*15)/2+15" font-weight="bold" fill="#1e293b">Breedte = {{ currentLevelData.w }}</text>
                <text :x="-(currentLevelData.d*26)/2-25" :y="(currentLevelData.d*15)/2-5" font-weight="bold" fill="#1e293b">Diepte = {{ currentLevelData.d }}</text>
                <text :x="currentLevelData.w*26+15" :y="currentLevelData.w*15-(currentLevelData.h*30)/2+5" font-weight="bold" fill="#1e293b">Hoogte = {{ currentLevelData.h }}</text>
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
.animate-fadeIn { animation: fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
</style>
