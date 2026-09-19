<script setup>
import { ref, watch, nextTick, onMounted, onUnmounted, computed } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhCube, PhArrowClockwise, PhCornersOut, PhLightbulb, PhTarget, PhBrain } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Oppervlakte: De Kubus Ontvouwen' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhCube }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null); const shouldPulse = ref(false)
const isCorrect = ref(false); const celebrationDone = ref(false); const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Klik op de knop om de kubus uit te vouwen.' })
const currentInternalLevel = ref(0); const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']

const Bloom = computed(() => {
  const labels = ['Toepassen', 'Analyseren', 'Evalueren']
  return labels[currentInternalLevel.value] || 'Toepassen'
})
; const attemptCount = ref(0)
const showWorkedExample = ref(false); const showPrediction = ref(true); const predictionAnswer = ref(null); const predictionSubmitted = ref(false); const predictionCorrect = ref(false); const showWhy = ref(false); const whyText = ref(''); const showReflection = ref(false); const reflectionAnswer = ref(''); const reflectionDone = ref(false); const hintCount = ref(0)

function randomInt(m, M) { return Math.floor(Math.random() * (M - m + 1)) + m }
const levels = ref([])
function generateLevel(idx) { return idx === 0 ? { side: randomInt(2,4) } : idx === 1 ? { side: randomInt(3,5) } : { side: randomInt(4,6) } }

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])
const singleArea = computed(() => currentLevelData.value.side * currentLevelData.value.side)
const totalArea = computed(() => singleArea.value * 6)

const userAns = ref(null); const isUnfolded = ref(false)

function getHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    'Ontvouw de kubus. Hoeveel vierkanten zie je?',
    `Een vlak = ${currentLevelData.value.side} x ${currentLevelData.value.side} = ${singleArea.value}.`,
    `Methode: ${singleArea.value} x 6 = ___`
  ]
  return hints[idx]
}

function showHint() {
  feedback.value = { type: 'info', text: getHint() }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = parseInt(predictionAnswer.value) === totalArea.value
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Ontvouw nu de kubus om te controleren.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk na: hoeveel vlakken heeft een kubus? Wat is de oppervlakte van één vlak?' }
  }
}

function unfoldCube() { if (isCorrect.value) return; isUnfolded.value = true; feedback.value = { type: 'success', text: `Prima! Een kubus = 6 vierkanten van ${currentLevelData.value.side} x ${currentLevelData.value.side}.` } }

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; hintCount.value = 0; feedback.value = { type: 'info', text: 'Klik op de knop.' }; isUnfolded.value = false; userAns.value = null; attemptCount.value = 0; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false; if (levels.value.length === 0) levels.value = [0,1,2].map(i => generateLevel(i)) }

function checkAnswer() {
  isChecked.value = true
  if (userAns.value === totalArea.value) {
    if (isUnfolded.value) {
      isCorrect.value = true;
      hintCount.value = 0;
      const whyExplanation = `De oppervlakte van een kubus is de som van de oppervlaktes van alle zes zijvlakken. Door de kubus te ontvouwen (ontwikkeling) zien we alle vlakken plat. Elk vlak is een vierkant met zijde ${currentLevelData.value.side}, dus oppervlakte ${singleArea.value}. Zes keer dat is ${totalArea.value}. Dit is dezelfde redenering als bij het inpakken van een cadeautje: je meet elk vlak apart.`;
      showWhyExplanation(whyExplanation);
      
      const lpdText = currentInternalLevel.value === 0
        ? 'LPD 27: Je berekent de oppervlakte van een kubus via de ontvouwing.'
        : currentInternalLevel.value === 1
          ? 'LPD 27: Je analyseert het verband tussen de ontvouwing en de formule 6z².'
          : 'LPD 27: Je evalueert waarom een kubus precies 6 vlakken heeft.';
      feedback.value = { type: 'success', text: lpdText };
      showReflection.value = true;
    }
    else { isCorrect.value = false; attemptCount.value++; feedback.value = { type: 'error', text: `${totalArea.value} is correct! Maar ontvouw eerst de kubus.` } }
  } else { isCorrect.value = false; attemptCount.value++
    if (userAns.value === singleArea.value) feedback.value = { type: 'error', text: `${singleArea.value} is maar een vlak. Hoeveel vlakken heeft een kubus?` }
    else feedback.value = { type: 'error', text: getHint() }
  }
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('vlak') || text.includes('vierkant') || text.includes('6') || text.includes('kubus')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt de structuur van een kubus.<br/><br/><strong>LPD 27 bewezen:</strong> Je kan de oppervlakte berekenen en verklaren waarom een kubus 6 vlakken heeft.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom een kubus 6 vlakken heeft. Gebruik de woorden "vlak" en "kubus" en leg uit waarom.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over de kubus.' }
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
            <p class="text-sm text-amber-800 mb-3">
              Wat is de totale oppervlakte van een kubus met zijde {{ currentLevelData.side }}?
            </p>
            <div class="flex items-center gap-2">
              <input type="number" v-model.number="predictionAnswer" placeholder="?"
                     class="w-24 p-2 text-lg font-bold text-center border-2 border-amber-300 rounded-lg bg-white focus:border-amber-500 focus:outline-none" />
              <button @click="checkPrediction" :disabled="predictionAnswer === null"
                      class="px-4 py-2 font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 disabled:opacity-50 active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Voorspel
              </button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Kubus ontvouwen
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>Stap 1:</strong> Een kubus heeft 6 gelijke vierkante vlakken.</p>
              <p><strong>Stap 2:</strong> Ontvouw de kubus: alle 6 vlakken worden plat.</p>
              <p><strong>Stap 3:</strong> Een vlak = z x z. Totaal = 6 x z x z.</p>
              <p class="font-bold text-amber-600">Oppervlakte = 6 x z². Niks om te blokken, gewoon logisch nadenken!</p>
            </div>
          </div>

          <div v-if="!showPrediction" class="p-4 border border-slate-200 bg-slate-50 rounded-xl shadow-inner text-center">
            <label class="block text-sm font-bold text-slate-700 mb-2">Totale Oppervlakte:</label>
            <div class="flex items-center gap-2">
              <input type="number" v-model.number="userAns" placeholder="..." :disabled="isCorrect" class="w-full font-bold text-2xl p-4 border-2 border-amber-400 rounded-lg text-center bg-white" />
              <span class="font-black text-2xl text-slate-500">cm²</span>
            </div>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>Oppervlakte is NIET hetzelfde als volume! Volume = z³.</li>
              <li>Tel alle zichtbare vlakken: 6 vierkanten, niet 5 of 4.</li>
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
            <h4 class="text-sm font-bold text-indigo-800 mb-2">Reflectie</h4>
            <p class="text-xs text-indigo-700 mb-2">Waarom heeft een kubus precies 6 vlakken? Wat is het verband tussen de vorm en het aantal vlakken?</p>
            <textarea v-model="reflectionAnswer" class="w-full p-3 text-sm border border-indigo-300 rounded-lg bg-white" rows="2" placeholder="Typ je antwoord..."></textarea>
            <button @click="checkReflection" :disabled="reflectionAnswer.length < 5" class="mt-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-indigo-500 disabled:opacity-50">Bevestig</button>
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
            <button v-else-if="isCorrect && !showReflection" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500">
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
            <div class="mb-12">
              <button @click="unfoldCube" :disabled="isCorrect || isUnfolded" class="px-6 py-4 font-bold bg-slate-800 text-white rounded-xl shadow-md flex items-center gap-2 hover:bg-slate-700 active:scale-95 disabled:opacity-50"><PhCornersOut weight="bold" class="w-6 h-6" /> Ontvouw Kubus</button>
            </div>
            <div class="relative w-[500px] h-[400px] perspective-container flex items-center justify-center" :key="currentInternalLevel">
              <div class="cube-assembly preserve-3d transition-transform duration-1000 ease-in-out w-32 h-32 relative" :style="{ transform: isUnfolded ? 'rotateX(0deg) rotateY(0deg) scale(1.2)' : 'rotateX(-20deg) rotateY(-30deg)' }">
                <div class="face front bg-blue-500 border-2 border-blue-700 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]" :style="{ transform: isUnfolded ? 'rotateY(0deg) translateZ(0px)' : 'rotateY(0deg) translateZ(64px)' }"><span class="font-black text-2xl text-white opacity-80">{{ currentLevelData.side }}x{{ currentLevelData.side }}</span></div>
                <div class="face back bg-amber-500 border-2 border-blue-700 flex items-center justify-center" :style="{ transform: isUnfolded ? 'rotateX(180deg) translateZ(0px) translateY(256px)' : 'rotateY(180deg) translateZ(64px)' }"><span v-if="isUnfolded" class="font-black text-2xl text-white opacity-80" style="transform:rotate(180deg)">{{ currentLevelData.side }}x{{ currentLevelData.side }}</span></div>
                <div class="face top bg-sky-400 border-2 border-sky-600 flex items-center justify-center" :style="{ transform: isUnfolded ? 'rotateX(0deg) translateZ(0px) translateY(-128px)' : 'rotateX(90deg) translateZ(64px)' }"><span v-if="isUnfolded" class="font-black text-2xl text-white opacity-80">{{ currentLevelData.side }}x{{ currentLevelData.side }}</span></div>
                <div class="face bottom bg-cyan-600 border-2 border-cyan-800 flex items-center justify-center" :style="{ transform: isUnfolded ? 'rotateX(0deg) translateZ(0px) translateY(128px)' : 'rotateX(-90deg) translateZ(64px)' }"><span v-if="isUnfolded" class="font-black text-2xl text-white opacity-80">{{ currentLevelData.side }}x{{ currentLevelData.side }}</span></div>
                <div class="face left bg-blue-600 border-2 border-blue-800 flex items-center justify-center" :style="{ transform: isUnfolded ? 'rotateY(0deg) translateZ(0px) translateX(-128px)' : 'rotateY(-90deg) translateZ(64px)' }"><span v-if="isUnfolded" class="font-black text-2xl text-white opacity-80">{{ currentLevelData.side }}x{{ currentLevelData.side }}</span></div>
                <div class="face right bg-amber-500 border-2 border-emerald-700 flex items-center justify-center" :style="{ transform: isUnfolded ? 'rotateY(0deg) translateZ(0px) translateX(128px)' : 'rotateY(90deg) translateZ(64px)' }"><span v-if="isUnfolded" class="font-black text-2xl text-white opacity-80">{{ currentLevelData.side }}x{{ currentLevelData.side }}</span></div>
              </div>
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
.perspective-container { perspective: 1000px; }
.preserve-3d { transform-style: preserve-3d; }
.face { position: absolute; width: 128px; height: 128px; transition: transform 1s cubic-bezier(0.25, 0.1, 0.25, 1); backface-visibility: visible; }
</style>
