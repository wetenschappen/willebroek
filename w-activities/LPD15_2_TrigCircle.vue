<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import {
  PhX, PhCheckCircle, PhWarningCircle, PhArrowRight, PhCircleDashed,
  PhArrowClockwise, PhLightbulb, PhBrain, PhPencilSimpleLine, PhBookOpen
} from '@phosphor-icons/vue'
import MathText from './MathText.vue'
import SuccessCelebration from './SuccessCelebration.vue'

const props = defineProps({
  isOpen: Boolean,
  title: { type: String, default: 'Goniometrische Cirkel' },
  instruction: { type: String, default: '' },
  currentStep: { type: Number, default: 1 },
  totalSteps: { type: Number, default: 1 },
  fullscreen: { type: Boolean, default: false },
  icon: { type: Object, default: () => PhCircleDashed }
})

const emit = defineEmits(['close', 'complete', 'update:currentStep'])

const mainArea = ref(null)
const isCorrect = ref(false)
const celebrationDone = ref(false)
const attemptCount = ref(0)
const hintCount = ref(0)

const showWorkedExample = ref(true)
const showPrediction = ref(false)
const predictionAnswer = ref(null)
const predictionSubmitted = ref(false)
const predictionCorrect = ref(false)
const showWhy = ref(false)
const whyText = ref('')
const showReflection = ref(false)
const reflectionAnswer = ref('')
const reflectionDone = ref(false)

const feedback = ref({ type: 'info', text: 'Draai de slider naar de juiste hoek.' })
const currentInternalLevel = ref(0)
const totalInternalLevels = 3
const levelLabels = ['Toepassen', 'Analyseren', 'Evalueren']
const Bloom = computed(() => levelLabels[currentInternalLevel.value] || 'Toepassen')

const levels = ref([])

function generateLevel(index) {
  const specialAngles = [30, 45, 60, 90]
  const q3Angles = [210, 225, 240, 330]
  
  if (index === 0) {
    const target = specialAngles[Math.floor(Math.random() * 4)]
    return {
      goal: `Draai naar ${target}°.`,
      targetAngle: target,
      check: (a) => a === target,
      predictionQuestion: `In welk kwadrant ligt ${target}°?`,
      predictionOptions: ['I', 'II', 'III', 'IV'],
      predictionCorrect: 'I',
      worked: {
        problem: `${target}° op eenheidscirkel`,
        steps: [
          `${target}° ligt in kwadrant I (0-90°)`,
          `sin(${target}°) = ${Math.sin(target * Math.PI / 180).toFixed(3)}`,
          `cos(${target}°) = ${Math.cos(target * Math.PI / 180).toFixed(3)}`
        ],
        answer: `${target}°`
      },
      whyExplanation: `Op de eenheidscirkel is sin(θ) het y-coördinaat en cos(θ) het x-coördinaat. Voor ${target}° liggen beide coördinaten in kwadrant I, dus beide zijn positief.`,
      reflectionQuestion: 'Waarom zijn sin en cos beide positief in kwadrant I?'
    }
  } else if (index === 1) {
    const target = q3Angles[Math.floor(Math.random() * 4)]
    return {
      goal: `Zoek een hoek in Q3 met sin ≈ ${Math.sin(target * Math.PI / 180).toFixed(3)}.`,
      targetAngle: target,
      check: (a) => a === target,
      predictionQuestion: `In Q3: zijn sin en cos positief of negatief?`,
      predictionOptions: ['Beide positief', 'Beide negatief', 'Sin positief'],
      predictionCorrect: 'Beide negatief',
      worked: {
        problem: `Hoek in Q3 (180-270°)`,
        steps: [
          `Q3 = linksonder (180-270°)`,
          `x en y zijn negatief in Q3`,
          `Dus sin < 0 en cos < 0`
        ],
        answer: `${target}°`
      },
      whyExplanation: `In kwadrant III zijn zowel het x-coördinaat (cos) als het y-coördinaat (sin) negatief. De hoek ligt tussen 180° en 270°, dus beide projecties op de assen zijn negatief.`,
      reflectionQuestion: 'Waarom zijn in Q3 zowel sin als cos negatief? Leg uit met de coördinaten.'
    }
  } else {
    const threshold = 140 + Math.floor(Math.random() * 20)
    return {
      goal: `Zoek een hoek in Q2 tussen ${threshold}° en 180° waarbij cos < -0.8.`,
      targetAngle: threshold,
      check: (a) => a >= threshold && a <= 180,
      predictionQuestion: `In Q2 is cos positief of negatief?`,
      predictionOptions: ['Positief', 'Negatief'],
      predictionCorrect: 'Negatief',
      worked: {
        problem: `Hoek in Q2 (90-180°)`,
        steps: [
          `Q2 = linksboven (90-180°)`,
          `x is negatief in Q2`,
          `Dus cos < 0 in Q2`
        ],
        answer: `${threshold}°`
      },
      whyExplanation: `In kwadrant II is het x-coördinaat negatief (links van de y-as), dus cos is negatief. Het y-coördinaat is positief (boven de x-as), dus sin is positief.`,
      reflectionQuestion: 'Waarom is cos negatief in Q2 maar sin positief? Leg uit met de projecties op de assen.'
    }
  }
}

const currentLevelData = computed(() => levels.value[currentInternalLevel.value])

const angle = ref(45)
const angleRad = computed(() => angle.value * (Math.PI / 180))
const cosVal = computed(() => Math.cos(angleRad.value))
const sinVal = computed(() => Math.sin(angleRad.value))

function showHint() {
  hintCount.value++
  const idx = Math.min(hintCount.value - 1, 2)
  const hints = [
    `Kijk naar de eenheidscirkel. Welk kwadrant heeft de gevraagde eigenschappen?`,
    `Voorbeeld: sin(30°) = 0.5, cos(30°) = 0.866. Beide positief = Q1.`,
    `Draai de slider naar de juiste hoek. Controleer sin en cos.`
  ]
  feedback.value = { type: 'info', text: hints[idx] }
}

function checkPrediction() {
  if (predictionAnswer.value === null) return
  predictionCorrect.value = predictionAnswer.value === currentLevelData.value.predictionCorrect
  predictionSubmitted.value = true
  if (predictionCorrect.value) {
    showPrediction.value = false
    feedback.value = { type: 'success', text: 'Juist ingeschat! Draai nu de slider.' }
  } else {
    attemptCount.value++
    feedback.value = { type: 'error', text: 'Denk na over de tekens in elk kwadrant.' }
  }
}

watch(angle, (newAngle) => {
  if (isCorrect.value || !currentLevelData.value || showPrediction.value || showWorkedExample.value || showReflection.value) return
  
  attemptCount.value++
  if (currentLevelData.value.check(newAngle)) {
    isCorrect.value = true
    hintCount.value = 0
    showWhyExplanation(currentLevelData.value.whyExplanation)
    
    const lpdText = currentInternalLevel.value === 0
      ? 'LPD 15: Je past de eenheidscirkel toe om sin en cos te bepalen in Q1.'
      : currentInternalLevel.value === 1
        ? 'LPD 15: Je analyseert de tekens van sin en cos in Q3.'
        : 'LPD 15: Je evalueert cos-waarden in Q2 en begrijpt waarom ze negatief zijn.'
    feedback.value = { type: 'success', text: lpdText }
  } else {
    let errMsg = ''
    if (currentInternalLevel.value === 0) {
      if (newAngle > 0 && newAngle < 90 && newAngle !== currentLevelData.value.targetAngle && Math.abs(newAngle - currentLevelData.value.targetAngle) < 10) {
        errMsg = 'Dichtbij, maar niet exact. Zet de slider op de juiste hoek.'
      } else {
        errMsg = `Niet correct. Draai naar ${currentLevelData.value.targetAngle}°.`
      }
    } else if (currentInternalLevel.value === 1) {
      if (newAngle > 0 && newAngle < 180) {
        errMsg = 'Let op! Q3 is linksonder (180-270°).'
      } else {
        errMsg = `Niet correct. Zoek een hoek tussen 180° en 270°.`
      }
    } else {
      if (newAngle > 180) {
        errMsg = 'Let op! Q2 is 90-180°.'
      } else {
        errMsg = `Niet correct. Kies een hoek tussen ${currentLevelData.value.targetAngle}° en 180°.`
      }
    }
    feedback.value = { type: 'error', text: attemptCount.value >= 3 ? 'Kijk naar het voorbeeld. Welk kwadrant past?' : errMsg }
  }
})

function showWhyExplanation(text) {
  showWhy.value = true
  whyText.value = text
}

function checkReflection() {
  const text = reflectionAnswer.value.toLowerCase().trim()
  const hasConcept = text.includes('coördinaat') || text.includes('projectie') || text.includes('x-as') || text.includes('y-as') || text.includes('kwadrant')
  const hasReason = text.includes('omdat') || text.includes('want') || text.includes('dus') || text.includes('daarom')
  if (hasConcept && hasReason && text.length > 15) {
    reflectionDone.value = true
    feedback.value = { type: 'success', text: 'Uitstekende reflectie! Je begrijpt de eenheidscirkel.<br/><br/><strong>LPD 15 bewezen:</strong> Je kan sin en cos bepalen op de eenheidscirkel en verklaren waarom de tekens verschillen per kwadrant.' }
    isCorrect.value = true
  } else {
    attemptCount.value++
    feedback.value = { type: 'info', text: 'Leg uit waarom sin en cos verschillende tekens hebben per kwadrant. Gebruik de woorden "coördinaat" of "projectie" en leg uit waarom.' }
  }
}

function skipWorkedExample() {
  showWorkedExample.value = false
  showPrediction.value = currentInternalLevel.value >= 1
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Draai de slider naar de juiste hoek.' }
  }
}

function resetActivityState() {
  isCorrect.value = false
  celebrationDone.value = false
  attemptCount.value = 0
  hintCount.value = 0
  predictionAnswer.value = null
  predictionSubmitted.value = false
  predictionCorrect.value = false
  showWhy.value = false
  whyText.value = ''
  showReflection.value = false
  reflectionAnswer.value = ''
  reflectionDone.value = false
  angle.value = 45
  
  showWorkedExample.value = currentInternalLevel.value === 0
  showPrediction.value = currentInternalLevel.value >= 1
  
  if (currentInternalLevel.value >= 1) {
    feedback.value = { type: 'info', text: 'Voorspel eerst: wat verwacht je?' }
  } else {
    feedback.value = { type: 'info', text: 'Draai de slider naar de juiste hoek.' }
  }
}

function handleNext() {
  if (currentInternalLevel.value === totalInternalLevels - 1 && !showReflection.value && !reflectionDone.value) {
    showReflection.value = true
    showWhy.value = false
    isCorrect.value = false
    feedback.value = { type: 'info', text: 'Reflecteer op wat je leerde over de eenheidscirkel.' }
    return
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
    levels.value = [generateLevel(0), generateLevel(1), generateLevel(2)]
    currentInternalLevel.value = 0
    resetActivityState()
    nextTick(() => mainArea.value?.focus())
    window.addEventListener('keydown', handleKeydown)
  } else {
    window.removeEventListener('keydown', handleKeydown)
  }
}, { immediate: true })

function handleKeydown(e) { if (e.key === 'Escape' && props.isOpen) emit('close') }
onMounted(() => {})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
<div v-if="isOpen" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 text-slate-800">
    <div class="absolute inset-0 bg-slate-900/10 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none min-w-[44px] min-h-[44px]"
         @click="emit('close')" role="button" tabindex="0"
         @keydown.enter.prevent="emit('close')" @keydown.space.prevent="emit('close')" aria-label="Sluiten"></div>
    <div ref="mainArea" tabindex="-1" class="relative flex flex-col w-screen h-screen overflow-hidden shadow-md bg-white">
      <header class="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center p-2 rounded-lg bg-amber-50">
            <component :is="props.icon" weight="fill" class="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <h2 class="text-lg font-bold text-slate-900">{{ title }}</h2>
            <div class="flex items-center gap-3">
              <div class="flex gap-1">
                <span v-for="i in totalInternalLevels" :key="i"
                      class="w-2.5 h-2.5 rounded-full border"
                      :class="i <= currentInternalLevel + 1 ? 'bg-amber-500 border-amber-600' : 'bg-slate-200 border-slate-300'">
                </span>
              </div>
              <span class="text-xs font-semibold text-slate-500">{{ levelLabels[currentInternalLevel] }} — Level {{ currentInternalLevel + 1 }}</span>
            </div>
          </div>
        </div>
        <button @click="emit('close')" class="p-2 text-slate-500 transition-colors rounded-full hover:bg-slate-100 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
          <PhX class="w-6 h-6" />
        </button>
      </header>
      <main class="flex flex-1 overflow-hidden">
        <div class="flex-col hidden w-full max-w-sm bg-white border-r border-slate-200 md:flex z-10">
          <div class="flex-1 p-6 overflow-y-auto">
            <h3 class="mb-2 text-sm font-bold tracking-wider text-slate-500 uppercase">Instructies</h3>
            <MathText :content="props.instruction || 'Gebruik de eenheidscirkel om sin en cos te bepalen. Draai de slider naar de juiste hoek.'" class="mb-4 prose prose-sm text-slate-600" />
            <div v-if="showWorkedExample" class="bg-amber-50 p-4 rounded-lg mb-4 border-l-4 border-amber-400 animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Voorbeeld — Doe ik voor</span>
              </div>
              <MathText :content="'\( ' + currentLevelData.worked.problem + ' \)'" class="text-sm font-mono font-bold text-slate-800 mb-3" />
              <div class="space-y-1.5 text-sm text-slate-700">
                <div v-for="(step, si) in currentLevelData.worked.steps" :key="si" class="flex items-start gap-2">
                  <span class="text-amber-500 font-bold shrink-0 mt-0.5">{{ si + 1 }}.</span>
                  <span v-html="step"></span>
                </div>
              </div>
              <button @click="skipWorkedExample" class="mt-3 w-full py-2 text-sm font-bold text-amber-700 bg-white border-2 border-amber-300 rounded-lg hover:bg-amber-100 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Begrepen! Zelf proberen →
              </button>
            </div>
            <div v-if="showPrediction && !showWorkedExample" class="p-4 border border-amber-200 bg-amber-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhLightbulb class="w-5 h-5 text-amber-600" weight="fill" />
                <span class="font-bold text-amber-800 text-sm">Voorspel</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.predictionQuestion }}</p>
              <div class="flex flex-col gap-2">
                <button v-for="opt in currentLevelData.predictionOptions" :key="opt"
                        @click="predictionAnswer = opt"
                        class="w-full py-2 px-3 rounded-lg font-bold text-sm transition-colors border-2 text-left focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none"
                        :class="predictionAnswer === opt ? 'bg-amber-500 text-white border-amber-600' : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'">
                  {{ opt }}
                </button>
              </div>
              <button v-if="predictionAnswer !== null && !predictionSubmitted" @click="checkPrediction" class="mt-3 w-full py-2 text-sm font-bold text-white bg-amber-600 rounded-lg hover:bg-amber-500 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                Bevestig voorspelling
              </button>
            </div>
            <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="p-4 border border-slate-200 bg-slate-50 rounded-xl space-y-4 shadow-inner">
              <div class="text-center">
                <p class="font-bold text-slate-700 mb-3 text-sm">{{ currentLevelData.goal }}</p>
                <label class="block text-sm font-bold text-slate-700 mb-2">Hoek: <span class="text-amber-600 font-mono text-lg tabular-nums">{{ angle }}°</span></label>
                <input type="range" v-model.number="angle" min="0" max="360" step="1" class="w-full accent-amber-500" :disabled="isCorrect" />
                <div class="flex gap-3 mt-4">
                  <div class="flex-1 bg-white p-3 rounded-lg border border-slate-200 text-center">
                    <div class="text-xs text-amber-600 font-bold mb-1">cos</div>
                    <div class="font-mono text-lg tabular-nums">{{ cosVal.toFixed(3) }}</div>
                  </div>
                  <div class="flex-1 bg-white p-3 rounded-lg border border-slate-200 text-center">
                    <div class="text-xs text-amber-500 font-bold mb-1">sin</div>
                    <div class="font-mono text-lg tabular-nums">{{ sinVal.toFixed(3) }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="showWhy && !showReflection" class="mt-4 p-4 bg-indigo-50 border border-indigo-200 rounded-xl animate-fadeIn">
              <div class="flex items-center gap-2 mb-2">
                <PhBrain class="w-5 h-5 text-indigo-600" weight="fill" />
                <span class="font-bold text-indigo-800 text-sm">Waarom werkt dit?</span>
              </div>
              <p class="text-sm text-indigo-700">{{ whyText }}</p>
            </div>
            <div v-if="showReflection" class="p-4 border border-indigo-200 bg-indigo-50 rounded-xl animate-fadeIn mb-4">
              <div class="flex items-center gap-2 mb-3">
                <PhPencilSimpleLine class="w-5 h-5 text-indigo-600" weight="fill" />
                <span class="font-bold text-indigo-800 text-sm">Reflectie</span>
              </div>
              <p class="text-sm text-slate-700 mb-3">{{ currentLevelData.reflectionQuestion }}</p>
              <textarea v-model="reflectionAnswer" :disabled="reflectionDone" class="w-full p-3 border-2 border-indigo-200 rounded-lg text-sm bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none" rows="4" placeholder="Sin en cos hebben verschillende tekens omdat..."></textarea>
              <button v-if="!reflectionDone" @click="checkReflection" :disabled="!reflectionAnswer.trim()" class="mt-3 w-full py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 disabled:opacity-40 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none">
                Bevestig reflectie
              </button>
            </div>
          </div>
          <div class="p-6 bg-slate-50 border-t border-slate-200 shrink-0">
            <div v-if="feedback.text" class="flex items-start gap-3 p-4 mb-4 text-sm font-medium rounded-lg animate-fadeIn" role="status" aria-live="polite" aria-atomic="true" :class="{'bg-amber-50 text-amber-800 border border-amber-200': feedback.type === 'success', 'bg-red-50 text-red-800 border border-red-200': feedback.type === 'error', 'bg-blue-50 text-blue-800 border border-blue-200': feedback.type === 'info'}">
              <component :is="feedback.type === 'success' ? PhCheckCircle : feedback.type === 'error' ? PhWarningCircle : PhLightbulb" class="w-5 h-5 shrink-0 mt-0.5" weight="fill" />
              <span class="leading-snug" v-html="feedback.text"></span>
            </div>
            <div class="flex items-center gap-4">
              <button @click="resetActivityState" class="p-4 text-lg font-medium transition-colors rounded-lg text-slate-500 bg-white border border-slate-200 hover:bg-slate-100 shadow-sm active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <PhArrowClockwise />
              </button>
              <button v-if="!showWorkedExample && !showPrediction && !showReflection && !isCorrect" @click="showHint" class="flex-1 py-4 font-bold text-slate-600 rounded-lg border-2 border-slate-300 bg-white hover:bg-slate-50 transition-colors active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none flex items-center justify-center gap-2">
                <PhLightbulb weight="fill" class="w-5 h-5 text-amber-500" />
                Hint
              </button>
              <button v-if="isCorrect && !showReflection" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Volgende stap' }}</span>
                <PhArrowRight weight="bold" />
              </button>
              <button v-if="isCorrect && showReflection && reflectionDone" @click="handleNext" class="flex items-center justify-center flex-1 gap-2 py-4 font-bold text-white transition-all rounded-lg shadow-md bg-amber-600 hover:bg-amber-500 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:outline-none">
                <span>{{ currentInternalLevel < totalInternalLevels - 1 ? 'Volgend Level' : 'Afronden' }}</span>
                <PhArrowRight weight="bold" />
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col flex-1 overflow-hidden bg-slate-50">
          <div class="flex flex-col flex-1 p-6 overflow-y-auto items-center justify-center relative pattern-grid">
            <div class="w-full max-w-3xl space-y-6">
              <div class="bg-white px-10 py-8 rounded-xl shadow-md border-2 border-slate-200 flex items-center justify-center min-h-[120px]">
                <div v-if="showWorkedExample" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">VOORBEELD</p>
                  <p class="text-4xl font-mono font-black text-amber-700">{{ currentLevelData.worked.problem }}</p>
                </div>
                <div v-else-if="showPrediction" class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT — Voorspel eerst</p>
                  <p class="text-2xl font-mono font-black text-slate-700 opacity-60">{{ currentLevelData.goal }}</p>
                </div>
                <div v-else-if="showReflection" class="text-center">
                  <p class="text-sm text-indigo-600 font-bold mb-2">REFLECTIE</p>
                  <p class="text-3xl font-bold text-indigo-700">Reflecteer op wat je leerde</p>
                </div>
                <div v-else class="text-center">
                  <p class="text-sm text-amber-600 font-bold mb-2">JOUW BEURT</p>
                  <p class="text-2xl font-mono font-black text-slate-800">{{ currentLevelData.goal }}</p>
                </div>
              </div>
              <div v-if="!showWorkedExample && !showPrediction && !showReflection" class="bg-white p-6 rounded-xl border-2 border-slate-200 shadow-md">
                <svg viewBox="-150 -150 300 300" class="w-full max-w-md mx-auto bg-white rounded-lg border border-slate-200">
                  <circle cx="0" cy="0" r="100" fill="none" stroke="#64748b" stroke-width="2"/>
                  <line x1="-140" y1="0" x2="140" y2="0" stroke="#64748b" stroke-width="1"/>
                  <line x1="0" y1="-140" x2="0" y2="140" stroke="#64748b" stroke-width="1"/>
                  <line x1="0" y1="0" :x1="100 * cosVal" :y1="-100 * sinVal" stroke="#f97316" stroke-width="3"/>
                  <circle :cx="100 * cosVal" :cy="-100 * sinVal" r="6" fill="#f97316" stroke="#fff" stroke-width="2"/>
                  <line :x1="100 * cosVal" :y1="0" :x2="100 * cosVal" :y2="-100 * sinVal" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4"/>
                  <line x1="0" y1="0" :x2="100 * cosVal" y2="0" stroke="#f97316" stroke-width="2" stroke-dasharray="4"/>
                  <text :x="100 * cosVal + 10" :y="-100 * sinVal - 10" class="text-sm" fill="#f97316" font-weight="bold">({{ cosVal.toFixed(2) }}, {{ sinVal.toFixed(2) }})</text>
                  <text x="130" y="-5" class="text-xs" fill="#64748b">x</text>
                  <text x="5" y="-130" class="text-xs" fill="#64748b">y</text>
                </svg>
              </div>
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                <p class="font-bold text-slate-700 text-sm mb-2">Eenheidscirkel</p>
                <div class="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <MathText content="'\( \\cos(\\theta) = x, \\quad \\sin(\\theta) = y \)'" class="text-xl font-mono font-bold text-amber-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  <SuccessCelebration :show="isCorrect && !celebrationDone" @done="celebrationDone = true" :is-level-complete="currentInternalLevel >= totalInternalLevels - 1 && reflectionDone" />
  </div>
</template>

<style scoped>
:root { font-family: 'Inter', sans-serif; }
.pattern-grid { background-image: linear-gradient(to right, #e2e8f0 1px, transparent 1px), linear-gradient(to bottom, #e2e8f0 1px, transparent 1px); background-size: 2rem 2rem; }
.animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
</style>
