<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhMagnifyingGlass, PhArrowClockwise, PhLightbulb, PhTarget, PhBrain, PhPencilSimpleLine } from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean, title: { type: String, default: 'Congruentie: Vind de Tweeling' }, instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 }, totalSteps: { type: Number, default: 1 }, fullscreen: { type: Boolean, default: false }, icon: { type: Object, default: () => PhMagnifyingGlass }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])
const mainArea = ref(null); const shouldPulse = ref(false)
const isCorrect = ref(false); const celebrationDone = ref(false); const isChecked = ref(false)
const feedback = ref({ type: 'info', text: 'Selecteer een driehoek en het kenmerk.' })
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

const levelBlueprints = [
  { goalText: 'Opdracht 1: ZHZ', targetSVG: '<polygon points="20,130 180,130 96,65" fill="rgba(14,165,233,0.2)" stroke="#0284c7" stroke-width="4" stroke-linejoin="round" /><path d="M 50 130 A 30 30 0 0 0 42 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="55" y="120" font-weight="bold" font-size="12" fill="#ef4444">40</text><text x="100" y="145" font-weight="bold" fill="#0284c7" text-anchor="middle">8</text><text x="45" y="90" font-weight="bold" fill="#0284c7">5</text>',
    optA: { svg: '<polygon points="20,130 180,130 96,65" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><path d="M 150 130 A 30 30 0 0 1 155 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="130" y="120" font-weight="bold" font-size="12" fill="#ef4444">40</text><text x="100" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">8</text><text x="45" y="90" font-weight="bold" fill="#64748b">5</text>', isCorrect: false, errorRule: 'ZZH', errorMsg: 'De hoek ligt NIET tussen de zijden. Dit is ZZH, geen geldig kenmerk!' },
    optB: { svg: '<polygon points="180,130 20,130 104,65" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><path d="M 150 130 A 30 30 0 0 1 158 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="130" y="120" font-weight="bold" font-size="12" fill="#ef4444">40</text><text x="100" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">8</text><text x="145" y="90" font-weight="bold" fill="#64748b">5</text>', isCorrect: true, correctRule: 'ZHZ', successMsg: 'Perfect! De hoek (40) ligt ingesloten tussen de twee zijden (5 en 8). ZHZ!' },
    optC: { svg: '<polygon points="20,130 120,130 70,65" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><path d="M 50 130 A 30 30 0 0 0 42 105" fill="none" stroke="#ef4444" stroke-width="3" /><path d="M 90 130 A 30 30 0 0 1 98 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="45" y="125" font-weight="bold" font-size="10" fill="#ef4444">40</text><text x="75" y="125" font-weight="bold" font-size="10" fill="#ef4444">40</text><text x="70" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">5</text>', isCorrect: false, errorRule: 'HZH', errorMsg: 'Je hebt maar 1 zijde gegeven. Het doel eist 5 en 8.' } },
  { goalText: 'Opdracht 2: HZH', targetSVG: '<polygon points="20,130 160,130 70,50" fill="rgba(14,165,233,0.2)" stroke="#0284c7" stroke-width="4" stroke-linejoin="round" /><text x="90" y="145" font-weight="bold" fill="#0284c7" text-anchor="middle">10</text><path d="M 45 130 A 25 25 0 0 0 35 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="45" y="120" font-weight="bold" font-size="12" fill="#ef4444">50</text><path d="M 135 130 A 25 25 0 0 1 145 110" fill="none" stroke="#ef4444" stroke-width="3" /><text x="125" y="120" font-weight="bold" font-size="12" fill="#ef4444">30</text>',
    optA: { svg: '<polygon points="20,130 160,130 70,50" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><text x="90" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">10</text><path d="M 60 70 A 15 15 0 0 1 80 70" fill="none" stroke="#ef4444" stroke-width="3" /><text x="70" y="85" font-weight="bold" font-size="12" fill="#ef4444">50</text><path d="M 135 130 A 25 25 0 0 1 145 110" fill="none" stroke="#ef4444" stroke-width="3" /><text x="125" y="120" font-weight="bold" font-size="12" fill="#ef4444">30</text>', isCorrect: false, errorRule: 'ZHH', errorMsg: 'Een hoek is verplaatst naar de top. Geen HZH meer.' },
    optB: { svg: '<polygon points="20,130 120,130 50,50" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><text x="70" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">7</text><path d="M 45 130 A 25 25 0 0 0 35 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="45" y="120" font-weight="bold" font-size="12" fill="#ef4444">50</text><path d="M 95 130 A 25 25 0 0 1 105 110" fill="none" stroke="#ef4444" stroke-width="3" /><text x="85" y="120" font-weight="bold" font-size="12" fill="#ef4444">30</text>', isCorrect: false, errorRule: 'HZH', errorMsg: 'HZH klopt, maar basis is 7, niet 10.' },
    optC: { svg: '<polygon points="160,130 20,130 110,50" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><text x="90" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">10</text><path d="M 45 130 A 25 25 0 0 0 55 110" fill="none" stroke="#ef4444" stroke-width="3" /><text x="50" y="120" font-weight="bold" font-size="12" fill="#ef4444">30</text><path d="M 135 130 A 25 25 0 0 1 125 105" fill="none" stroke="#ef4444" stroke-width="3" /><text x="135" y="120" font-weight="bold" font-size="12" fill="#ef4444">50</text>', isCorrect: true, correctRule: 'HZH', successMsg: 'Uitstekend! Zijde 10 ingesloten tussen hoeken 30 en 50. HZH!' } },
  { goalText: 'Opdracht 3: ZZ90', targetSVG: '<polygon points="20,130 150,130 20,30" fill="rgba(14,165,233,0.2)" stroke="#0284c7" stroke-width="4" stroke-linejoin="round" /><polyline points="20,110 40,110 40,130" fill="none" stroke="#ef4444" stroke-width="3" /><text x="85" y="145" font-weight="bold" fill="#0284c7" text-anchor="middle">4</text><text x="100" y="75" font-weight="bold" fill="#0284c7">5</text>',
    optA: { svg: '<polygon points="20,130 150,130 20,30" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><polyline points="20,110 40,110 40,130" fill="none" stroke="#ef4444" stroke-width="3" /><text x="85" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">4</text><text x="5" y="85" font-weight="bold" fill="#64748b">5</text>', isCorrect: false, errorRule: 'ZHZ', errorMsg: '5 is een RECHTHOEKSZIJDE, bij doel is 5 de SCHUINE zijde.' },
    optB: { svg: '<polygon points="150,130 20,130 150,30" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><polyline points="150,110 130,110 130,130" fill="none" stroke="#ef4444" stroke-width="3" /><text x="85" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">4</text><text x="60" y="75" font-weight="bold" fill="#64748b">5</text>', isCorrect: true, correctRule: 'ZZ90', successMsg: 'Geniaal! ZZ90: een zijde, schuine zijde en rechte hoek. Enige uitzondering!' },
    optC: { svg: '<polygon points="20,130 150,130 80,30" fill="none" stroke="#64748b" stroke-width="4" stroke-linejoin="round" /><text x="85" y="145" font-weight="bold" fill="#64748b" text-anchor="middle">4</text><text x="120" y="75" font-weight="bold" fill="#64748b">5</text><path d="M 50 130 A 30 30 0 0 0 45 105" fill="none" stroke="#ef4444" stroke-width="3" />', isCorrect: false, errorRule: 'ZZH', errorMsg: 'Geen rechte hoek! ZZH valstrik.' } }
]
const levels = ref([])
function generateLevel() { levels.value = levelBlueprints.map(bp => ({...bp, optA:{...bp.optA}, optB:{...bp.optB}, optC:{...bp.optC}})) }
const currentLevelData = computed(() => levels.value[currentInternalLevel.value])
const selectedTriangle = ref(null); const selectedRule = ref('')

function selectTriangle(opt) { if (isCorrect.value) return; selectedTriangle.value = opt }

function resetActivityState() { isCorrect.value = false; celebrationDone.value = false; isChecked.value = false; feedback.value = { type: 'info', text: 'Selecteer een driehoek en het kenmerk.' }; selectedTriangle.value = null; selectedRule.value = ''; attemptCount.value = 0; hintCount.value = 0; showPrediction.value = true; predictionAnswer.value = null; predictionSubmitted.value = false; predictionCorrect.value = false; showWhy.value = false; whyText.value = ''; showReflection.value = false; reflectionAnswer.value = ''; reflectionDone.value = false }

function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    'Vergelijk de doel-driehoek met de opties. Welke gegevens zijn gelijk?',
    'Let op: welke zijden en hoeken zijn gemarkeerd?',
    'Denk aan de volgorde: ZHZ (hoek tussen zijden) vs ZZH (hoek niet ertussen).'
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  const correctAns = currentLevelData.value['opt' + predictionAnswer.value]?.isCorrect || false
  predictionCorrect.value = correctAns
  predictionSubmitted.value = true
  if (correctAns) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Goed gezien! Controleer nu met het juiste kenmerk.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Niet juist. Vergelijk de gemarkeerde gegevens met het doel.' }
  }
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('congruentie') || text.includes('zijde') || text.includes('hoek') || text.includes('gelijk')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt congruentie.<br/><br/><strong>LPD 24 bewezen:</strong> Je kan de vier congruentiekenmerken toepassen.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom we verschillende congruentiekenmerken nodig hebben. Gebruik "congruentie" en "zijde" of "hoek".' }
  }
}

function checkAnswer() {
  isChecked.value = true; attemptCount.value++
  if (selectedTriangle.value === null || selectedRule.value === '') { isCorrect.value = false; feedback.value = { type: 'error', text: 'Kies een driehoek en een kenmerk.' }; return }
  const optData = currentLevelData.value['opt' + selectedTriangle.value]
  if (optData.isCorrect && selectedRule.value === optData.correctRule) {
    isCorrect.value = true
    hintCount.value = 0
    const whyExplanation = 'Congruentiekenmerken zijn regels die garanderen dat twee driehoeken identiek zijn (ZZZ, ZHZ, HZH, ZZ90). Elk kenmerk gebruikt een andere combinatie van zijden en hoeken, maar ze geven allemaal voldoende informatie om de vorm uniek te bepalen.'
    showWhyExplanation(whyExplanation)
    showReflection.value = true
    feedback.value = { type: 'success', text: optData.successMsg }
  }
  else { isCorrect.value = false
    if (!optData.isCorrect) feedback.value = { type: 'error', text: optData.errorMsg }
    else feedback.value = { type: 'error', text: `Juiste driehoek! Maar het kenmerk is ${optData.correctRule}.` }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over congruentiekenmerken.' }
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
            <p class="text-sm text-amber-800 mb-3">Welke optie (A, B of C) is congruent met het doel?</p>
            <div class="flex gap-2">
              <button v-for="opt in ['A','B','C']" :key="opt" @click="predictionAnswer = opt; checkPrediction()"
                      class="flex-1 px-3 py-2 text-sm font-bold text-amber-800 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100 transition-colors active:scale-[0.98]">
                Optie {{ opt }}
              </button>
            </div>
          </div>

          <div v-if="!showPrediction" class="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
            <button @click="showWorkedExample = !showWorkedExample" class="flex items-center gap-2 text-sm font-bold text-amber-700 w-full text-left">
              <PhLightbulb weight="fill" class="w-4 h-4" /> Voorbeeld: Congruentie herkennen
            </button>
            <div v-if="showWorkedExample" class="mt-3 text-sm text-amber-800 space-y-2 animate-fadeIn">
              <p><strong>ZHZ:</strong> twee zijden en de ingesloten hoek gelijk.</p>
              <p><strong>HZH:</strong> een zijde en de twee aanliggende hoeken gelijk.</p>
              <p><strong>ZZZ:</strong> alle drie de zijden gelijk.</p>
              <p><strong>ZZ90:</strong> bij een rechte hoek: een rechthoekszijde en schuine zijde gelijk.</p>
              <p class="font-bold text-amber-600">Zoek naar de juiste combinatie!</p>
            </div>
          </div>

          <div v-if="!showPrediction" class="text-center bg-amber-50 p-4 border border-amber-200 rounded-xl shadow-sm mb-6 animate-fadeIn">
            <p class="font-bold text-amber-800">{{ levelLabels ? levelLabels[currentInternalLevel] + ' — ' : '' }}{{ currentLevelData.goalText }}</p>
          </div>

          <div v-if="!showPrediction" class="p-4 border border-slate-200 bg-slate-50 rounded-xl shadow-inner">
            <label class="block text-sm font-bold text-slate-700 mb-2">Kenmerk:</label>
            <select v-model="selectedRule" :disabled="isCorrect" class="w-full p-4 border-2 border-slate-300 rounded-lg font-bold text-slate-700 bg-white">
              <option value="" disabled>Kies...</option>
              <option value="ZZZ">ZZZ (Zijde-Zijde-Zijde)</option>
              <option value="ZHZ">ZHZ (Zijde-Hoek-Zijde)</option>
              <option value="HZH">HZH (Hoek-Zijde-Hoek)</option>
              <option value="ZZ90">ZZ90 (Rechthoekszijde-Schuine Zijde bij 90°)</option>
              <option value="ZZH">ZZH (Zijde-Zijde-Hoek) — Let op: geen geldig kenmerk!</option>
            </select>
          </div>

          <div class="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl" v-if="!isCorrect && attemptCount > 0">
            <h4 class="text-sm font-bold text-red-700 mb-2 flex items-center gap-2"><PhWarningCircle weight="fill" class="w-4 h-4" /> Let op!</h4>
            <ul class="text-xs text-red-600 space-y-1 list-disc list-inside">
              <li>De juiste combinatie van gegevens bepalen is cruciaal.</li>
              <li>ZZH is NOOIT geldig, behalve bij een rechte hoek (ZZ90).</li>
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
            <p class="text-sm text-slate-700 mb-3">Waarom zijn er vier verschillende congruentiekenmerken? Wat hebben ze gemeen?</p>
            <textarea v-model="reflectionAnswer" :disabled="reflectionDone"
              class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
              rows="3" placeholder="Verschillende congruentiekenmerken zijn nodig omdat..."></textarea>
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
            <button v-if="!isCorrect && !showPrediction && !showReflection" @click="showHint" class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
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
        <div class="flex flex-col flex-1 p-8 overflow-y-auto items-center justify-center relative pattern-grid">
          <div class="w-full max-w-sm bg-white p-6 rounded-xl shadow-md border-4 border-slate-300 mb-8 flex flex-col items-center">
            <h4 class="font-bold text-slate-500 uppercase tracking-widest text-xs mb-4">Doel</h4>
            <svg width="200" height="150" viewBox="0 0 200 150" v-html="currentLevelData.targetSVG"></svg>
          </div>
          <div class="flex gap-6 w-full max-w-4xl justify-center">
            <div v-for="opt in ['A','B','C']" :key="opt" @click="selectTriangle(opt)" class="bg-white p-4 rounded-xl shadow-sm border-4 cursor-pointer transition-all hover:scale-105" :class="selectedTriangle === opt ? (isCorrect && currentLevelData['opt'+opt].isCorrect ? 'border-emerald-500 bg-amber-50' : 'border-amber-500 bg-amber-50') : 'border-slate-200'" role="button" tabindex="0" @keydown.enter.prevent="selectTriangle(opt)" @keydown.space.prevent="selectTriangle(opt)" aria-label="Optie">
              <h4 class="font-bold text-slate-400 mb-2">Optie {{ opt }}</h4>
              <svg width="150" height="120" viewBox="0 0 200 150" v-html="currentLevelData['opt'+opt].svg"></svg>
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
</style>
