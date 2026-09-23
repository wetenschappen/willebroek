<script setup>
import { ref, computed } from 'vue'
import { PhX, PhCheckCircle, PhXCircle, PhSmiley, PhSmileyMeh, PhSmileySad, PhPaperPlaneRight, PhClipboardText, PhArrowRight } from '@phosphor-icons/vue'
import MathGraphSvg from '../activities/MathGraphSvg.vue'

const props = defineProps({
  isOpen: Boolean,
  mode: {
    type: String,
    default: 'exit'
  },
  questions: {
    type: Array,
    required: true
  },
  goals: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['close', 'complete'])

const isEntry = computed(() => props.mode === 'entry')

const currentStepIndex = ref(0)
const answers = ref({})
const selectedMood = ref(null)

const selectedLeftItem = ref(null)
const shuffledRightMap = ref({})

const parts = computed(() => {
    const questionParts = props.questions.map((q, index) => ({
        id: q.id || `q${index}`,
        type: q.type || 'mc',
        question: q.question,
        description: q.description,
        options: q.options,
        pairs: q.pairs,
        correct: q.correct,
        mathConfig: q.mathConfig,
        correctPoint: q.correctPoint,
        tolerance: q.tolerance
    }))

    if (isEntry.value) {
        return [
            ...questionParts,
            { id: 'finish', type: 'finish' }
        ]
    }
    return [
        ...questionParts,
        { id: 'mood', type: 'mood', question: 'Hoe ging het vandaag?' },
        { id: 'finish', type: 'finish' }
    ]
})

const currentPart = computed(() => parts.value[currentStepIndex.value])
const totalParts = computed(() => parts.value.length)
const progress = computed(() => ((currentStepIndex.value) / (totalParts.value - 1)) * 100)

function getShuffledRight(part) {
    if (!part.pairs) return []
    if (!shuffledRightMap.value[part.id]) {
        const items = part.pairs.map((p, idx) => ({ text: p.right, originalIndex: idx }))
        // Deterministic offset shuffle so items are not opposite each other
        if (items.length > 1) {
            const shift = 1 + (part.id.charCodeAt(0) % (items.length - 1))
            const shifted = [...items.slice(shift), ...items.slice(0, shift)]
            shuffledRightMap.value[part.id] = shifted
        } else {
            shuffledRightMap.value[part.id] = items
        }
    }
    return shuffledRightMap.value[part.id]
}

function selectMatchingLeft(leftIdx) {
    selectedLeftItem.value = selectedLeftItem.value === leftIdx ? null : leftIdx
}

function selectMatchingRight(partId, rightIdx) {
    if (selectedLeftItem.value === null) return
    if (!answers.value[partId]) answers.value[partId] = {}
    
    // If another left item was already mapped to this right item, remove that mapping
    for (const [k, v] of Object.entries(answers.value[partId])) {
        if (v === rightIdx) delete answers.value[partId][k]
    }

    answers.value[partId][selectedLeftItem.value] = rightIdx
    selectedLeftItem.value = null
}

function unpairMatching(partId, leftIdx) {
    if (answers.value[partId]) {
        delete answers.value[partId][leftIdx]
    }
}

const canProceed = computed(() => {
    const p = currentPart.value
    if (p.type === 'mc') return answers.value[p.id] !== undefined
    if (p.type === 'matching') {
        const userMatches = answers.value[p.id] || {}
        return p.pairs && Object.keys(userMatches).length === p.pairs.length
    }
    if (p.type === 'open') return (answers.value[p.id] || '').trim().length > 10
    if (p.type === 'graph-point') return answers.value[p.id] !== undefined
    if (p.type === 'mood') return selectedMood.value !== null
    return true
})

function nextStep() {
    if (currentStepIndex.value < totalParts.value - 1) {
        currentStepIndex.value++
    }
}

function selectOption(idx) {
    answers.value[currentPart.value.id] = idx
}

function submit() {
    emit('complete')
    currentStepIndex.value++
    if (currentStepIndex.value >= totalParts.value) {
        close()
    }
}

function close() {
    emit('close')
    setTimeout(() => {
        currentStepIndex.value = 0
        answers.value = {}
        selectedMood.value = null
        selectedLeftItem.value = null
        shuffledRightMap.value = {}
    }, 500)
}

const mcScore = computed(() => {
    let correct = 0
    let total = 0
    parts.value.forEach(p => {
        if (p.type === 'mc') {
            total++
            if (answers.value[p.id] === p.correct) correct++
        } else if (p.type === 'graph-point') {
            total++
            const ans = answers.value[p.id]
            if (ans && p.correctPoint) {
                const dx = ans.x - p.correctPoint.x
                const dy = ans.y - p.correctPoint.y
                const dist = Math.sqrt(dx*dx + dy*dy)
                if (dist <= (p.tolerance || 0.5)) correct++
            }
        }
    })
    return { correct, total }
})

function getMoodLabel(mood) {
    if (mood === 'happy') return 'Zeker'
    if (mood === 'meh') return 'Twijfel'
    if (mood === 'sad') return 'Onzeker'
    return ''
}

const questionResults = computed(() => {
    return parts.value
        .filter(p => ['mc', 'graph-point', 'matching'].includes(p.type))
        .map(p => {
            let isCorrect = false
            if (p.type === 'mc') {
                isCorrect = answers.value[p.id] === p.correct
            } else if (p.type === 'graph-point' && p.correctPoint) {
                const ans = answers.value[p.id]
                if (ans) {
                    const dx = ans.x - p.correctPoint.x
                    const dy = ans.y - p.correctPoint.y
                    isCorrect = Math.sqrt(dx*dx + dy*dy) <= (p.tolerance || 0.5)
                }
            } else if (p.type === 'matching') {
                const userMatches = answers.value[p.id] || {}
                const rightItems = getShuffledRight(p)
                isCorrect = Boolean(p.pairs && p.pairs.length > 0 && p.pairs.every((pair, lIdx) => {
                    const rIdx = userMatches[lIdx]
                    return rIdx !== undefined && rightItems[rIdx]?.originalIndex === lIdx
                }))
            }
            return { id: p.id, question: p.question, isCorrect, answer: answers.value[p.id] }
        })
})

const scoredTotal = computed(() => questionResults.value.length)
const scoredCorrect = computed(() => questionResults.value.filter(r => r.isCorrect).length)

const actualQuestionNumber = computed(() => {
    let count = 0
    for (let i = 0; i <= currentStepIndex.value; i++) {
        if (['mc', 'open', 'graph-point', 'matching'].includes(parts.value[i].type)) count++
    }
    return count
})

const totalQuestions = computed(() => {
    return parts.value.filter(p => ['mc', 'open', 'graph-point', 'matching'].includes(p.type)).length
})

function selectGraphPoint(id, pt) {
    answers.value[id] = pt
}

function getGraphConfig(part) {
    const baseConfig = { ...part.mathConfig }
    const ans = answers.value[part.id]
    if (ans) {
        baseConfig.points = [
            ...(baseConfig.points || []),
            { id: 'user-ans', x: ans.x, y: ans.y, color: '#4f46e5', label: 'Jouw Antwoord' }
        ]
    }
    return baseConfig
}

// Eén kleurtype: dit is een digitale activiteit (card-entry en card-exit zijn
// allebei type 'digital'), dus blauw --color-digital. Entry en exit verschillen
// alleen in titel, icoon en vraagset - niet in kleur.
const ACCENT = '#075985'
const ACCENT_SOFT = '#e3f1f5'
const title = computed(() => isEntry.value ? 'Toegangsticket' : 'Exitticket')

/**
 * Antwoordoptie: geselecteerd = blauw met de blauwe zachte vulling.
 * De actieve staat is zichtbaar zonder hover en verschuift de layout niet.
 */
function optionStyle(selected) {
  return selected
    ? { borderColor: ACCENT, background: ACCENT_SOFT, color: '#17252b' }
    : { borderColor: '#d5dfde', background: '#ffffff', color: '#34474e' }
}

function optionHover(event, selected) {
  if (selected) return
  event.currentTarget.style.borderColor = ACCENT
  event.currentTarget.style.background = '#f5f7f6'
}

function optionLeave(event, selected) {
  if (selected) return
  event.currentTarget.style.borderColor = '#d5dfde'
  event.currentTarget.style.background = '#ffffff'
}
</script>

<template>
  <!-- Fullscreen-activiteitenshell: licht, met het kleurtype in de kopbalk.
       Zie docs/DESIGN-SYSTEM.md sectie 14. -->
  <div v-if="isOpen" class="modal-fullscreen">

    <!-- Kopbalk: blauw anker, want dit is een digitale activiteit -->
    <header class="fullscreen-bar fullscreen-bar-digital">
      <div class="p-2 rounded-control shrink-0" :style="{ background: ACCENT_SOFT, color: ACCENT }">
        <PhClipboardText v-if="isEntry" weight="fill" class="text-xl" />
        <PhPaperPlaneRight v-else weight="fill" class="text-xl" />
      </div>
      <div class="min-w-0">
        <h2 class="fullscreen-title">{{ title }}</h2>
        <p class="fullscreen-label">
          <template v-if="['mc', 'open', 'graph-point', 'matching'].includes(currentPart.type)">
            Vraag {{ actualQuestionNumber }} van {{ totalQuestions }}
          </template>
          <template v-else>{{ currentPart.type === 'mood' ? 'Reflectie' : 'Resultaat' }}</template>
        </p>
      </div>
      <button @click="close" class="btn-close ml-auto" aria-label="Sluiten">
        <PhX weight="bold" class="text-xl" />
      </button>
    </header>

    <!-- Voortgangsbalk -->
    <div class="fullscreen-progress" v-if="currentPart.type !== 'finish'">
      <span :style="{ width: progress + '%' }"></span>
    </div>

    <!-- Body -->
    <div class="fullscreen-body flex flex-col">

      <Transition name="fade-slide" mode="out-in">

        <!-- MULTIPLE CHOICE -->
        <div v-if="currentPart.type === 'mc'" :key="'mc-'+currentPart.id" class="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <h4 class="text-2xl md:text-3xl font-bold text-slate-900 mb-8" v-html="currentPart.question"></h4>
            <div class="space-y-4">
            <button
              v-for="(opt, idx) in currentPart.options"
              :key="idx"
              @click="selectOption(idx)"
              @mouseenter="optionHover($event, answers[currentPart.id] === idx)"
              @mouseleave="optionLeave($event, answers[currentPart.id] === idx)"
              class="w-full text-left p-5 md:p-6 rounded-card border-2 flex items-center justify-between gap-4"
              :style="optionStyle(answers[currentPart.id] === idx)"
            >
              <span class="text-base md:text-lg font-medium" v-html="opt"></span>
              <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                   :style="answers[currentPart.id] === idx ? { borderColor: ACCENT, background: ACCENT } : { borderColor: '#b8c8c6' }">
                <div v-if="answers[currentPart.id] === idx" class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </button>
          </div>
        </div>

        <!-- MATCHING QUESTION -->
        <div v-else-if="currentPart.type === 'matching'" :key="'match-'+currentPart.id" class="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <h4 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2" v-html="currentPart.question"></h4>
          <p class="text-slate-600 text-base mb-6" v-html="currentPart.description || 'Klik eerst op een situatie links en kies vervolgens de juiste verklaring rechts.'"></p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-start">
            <!-- Left column: Situations -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-500 mb-1">Situatie / Verschijnsel</p>
              <div
                v-for="(pair, lIdx) in currentPart.pairs"
                :key="'left-'+lIdx"
                @click="selectMatchingLeft(lIdx)"
                class="p-4 rounded-card border-2 cursor-pointer transition-all flex items-center justify-between gap-3 select-none"
                :style="selectedLeftItem === lIdx
                  ? { borderColor: ACCENT, background: ACCENT_SOFT, color: '#17252b' }
                  : (answers[currentPart.id]?.[lIdx] !== undefined
                    ? { borderColor: '#0ea5e9', background: '#f0f9ff', color: '#0369a1' }
                    : { borderColor: '#d5dfde', background: '#ffffff', color: '#34474e' })"
              >
                <div class="flex items-center gap-3">
                  <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                        :style="answers[currentPart.id]?.[lIdx] !== undefined ? { background: '#0284c7', color: '#fff' } : { background: '#e2e8f0', color: '#475569' }">
                    {{ lIdx + 1 }}
                  </span>
                  <span class="text-sm font-medium" v-html="pair.left"></span>
                </div>
                <div v-if="answers[currentPart.id]?.[lIdx] !== undefined" class="flex items-center gap-2">
                  <span class="text-xs font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-control">
                    → {{ String.fromCharCode(65 + answers[currentPart.id][lIdx]) }}
                  </span>
                  <button @click.stop="unpairMatching(currentPart.id, lIdx)" class="text-slate-600 hover:text-slate-900 p-1" title="Ontkoppelen">
                    <PhX weight="bold" class="text-sm" />
                  </button>
                </div>
              </div>
            </div>

            <!-- Right column: Explanations -->
            <div class="space-y-3">
              <p class="text-xs font-bold text-slate-500 mb-1">Fysische verklaring</p>
              <div
                v-for="(rItem, rIdx) in getShuffledRight(currentPart)"
                :key="'right-'+rIdx"
                @click="selectMatchingRight(currentPart.id, rIdx)"
                class="p-4 rounded-card border-2 transition-all flex items-start gap-3 select-none"
                :class="selectedLeftItem !== null ? 'cursor-pointer hover:border-sky-500 hover:bg-sky-50' : 'cursor-default'"
                :style="Object.values(answers[currentPart.id] || {}).includes(rIdx)
                  ? { borderColor: '#0ea5e9', background: '#f0f9ff', color: '#0369a1' }
                  : { borderColor: '#d5dfde', background: '#ffffff', color: '#34474e' }"
              >
                <span class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                      :style="Object.values(answers[currentPart.id] || {}).includes(rIdx) ? { background: '#0284c7', color: '#fff' } : { background: '#e2e8f0', color: '#475569' }">
                  {{ String.fromCharCode(65 + rIdx) }}
                </span>
                <span class="text-sm font-medium leading-relaxed" v-html="rItem.text"></span>
              </div>
            </div>
          </div>
        </div>

        <!-- OPEN QUESTION -->
        <div v-else-if="currentPart.type === 'open'" :key="'open-'+currentPart.id" class="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <h4 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4" v-html="currentPart.question"></h4>
          <p class="text-slate-600 text-base md:text-lg mb-6" v-html="currentPart.description"></p>
          <textarea
            v-model="answers[currentPart.id]"
            class="flex-1 min-h-64 w-full p-6 bg-white border-2 rounded-card outline-none resize-none text-slate-700 text-base md:text-lg leading-relaxed"
            style="border-color: var(--color-line);"
            placeholder="Typ je antwoord hier..."
          ></textarea>
        </div>

        <!-- GRAPH POINT -->
        <div v-else-if="currentPart.type === 'graph-point'" :key="'graph-'+currentPart.id" class="flex-1 flex flex-col max-w-4xl mx-auto w-full">
          <h4 class="text-2xl md:text-3xl font-bold text-slate-900 mb-2" v-html="currentPart.question"></h4>
          <p class="text-slate-600 text-base mb-6" v-html="currentPart.description"></p>
          <div class="flex-1 border-2 rounded-card overflow-hidden bg-white relative cursor-crosshair min-h-[400px]" style="border-color: var(--color-line-strong);">
            <MathGraphSvg
              :config="getGraphConfig(currentPart)"
              @graph-click="(pt) => selectGraphPoint(currentPart.id, pt)"
            />
            <div v-if="answers[currentPart.id]" class="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-control text-sm font-mono font-bold text-slate-700 flex items-center gap-2" style="border: 2px solid var(--color-line-strong);">
              <div class="w-3 h-3 rounded-full" :style="{ background: ACCENT }"></div>
              Gekozen: ({{ answers[currentPart.id].x.toFixed(1) }}, {{ answers[currentPart.id].y.toFixed(1) }})
            </div>
          </div>
        </div>

        <!-- MOOD SELECTOR -->
        <div v-else-if="currentPart.type === 'mood'" :key="'mood-'+currentPart.id" class="flex-1 flex flex-col justify-center items-center text-center max-w-3xl mx-auto w-full">
          <h4 class="text-3xl md:text-4xl font-bold text-slate-900 mb-12" v-html="currentPart.question"></h4>
          <!-- Gevoel: geen eigen kleuren per emotie. Kleur is gereserveerd voor
               activiteitstype; de keuze leest via de rand en het label. -->
          <div class="flex justify-center gap-6 md:gap-8">
            <button v-for="mood in [
                { id: 'happy', label: 'Zeker', icon: PhSmiley },
                { id: 'meh', label: 'Twijfel', icon: PhSmileyMeh },
                { id: 'sad', label: 'Onzeker', icon: PhSmileySad }
              ]"
              :key="mood.id"
              @click="selectedMood = mood.id"
              class="w-28 h-28 md:w-32 md:h-32 rounded-card border-2 flex flex-col items-center justify-center gap-2"
              :style="selectedMood === mood.id
                ? { borderColor: ACCENT, background: ACCENT_SOFT, color: ACCENT }
                : { borderColor: '#d5dfde', background: '#ffffff', color: '#52636a' }"
            >
              <component :is="mood.icon" weight="fill" class="text-5xl md:text-6xl" />
              <span class="text-sm font-bold">{{ mood.label }}</span>
            </button>
          </div>
        </div>

        <!-- FINISH -->
        <div v-else-if="currentPart.type === 'finish'" :key="'finish-'+currentPart.id" class="flex-1 flex flex-col items-center text-center max-w-2xl mx-auto w-full justify-center">
          <div class="w-16 h-16 rounded-control flex items-center justify-center mb-6" :style="{ background: ACCENT_SOFT, color: ACCENT }">
            <PhCheckCircle weight="fill" class="text-4xl"/>
          </div>
          <h4 class="text-3xl font-bold text-slate-900 mb-4" v-if="isEntry">Klaar</h4>
          <h4 class="text-3xl font-bold text-slate-900 mb-4" v-else>Einde van de les</h4>

          <div class="w-full bg-white border-2 rounded-card p-8 mt-4 space-y-6" style="border-color: var(--color-line);">
            <!-- ENTRY: Diagnostic per-question results -->
            <div v-if="isEntry" class="space-y-3">
              <div v-for="(r, i) in questionResults" :key="r.id" class="flex items-start gap-3 text-left p-3 rounded-control" :style="{ background: r.isCorrect ? '#e7f2ea' : '#fde8e9' }">
                <div class="shrink-0 mt-0.5">
                  <PhCheckCircle v-if="r.isCorrect" weight="fill" class="text-lg" style="color: var(--color-workbook);" />
                  <PhXCircle v-else weight="fill" class="text-lg" style="color: var(--color-presentation);" />
                </div>
                <div>
                  <p class="text-sm font-medium text-slate-800" v-html="r.question"></p>
                  <p v-if="!r.isCorrect" class="text-sm mt-1 font-medium" style="color: var(--color-presentation);">Dit onderwerp vraagt nog aandacht.</p>
                </div>
              </div>
            </div>

            <!-- EXIT: Score + mood -->
            <div v-else class="flex justify-center items-center gap-8">
              <div class="text-left">
                <p class="fullscreen-label">Jouw score</p>
                <p class="text-4xl font-bold text-slate-900">{{ scoredCorrect }} <span class="text-slate-600">/</span> {{ scoredTotal }}</p>
              </div>
              <div class="w-px h-12" style="background: var(--color-line);"></div>
              <div class="text-left">
                <p class="fullscreen-label">Gevoel</p>
                <p class="text-xl font-bold text-slate-700">{{ getMoodLabel(selectedMood) }}</p>
              </div>
            </div>

            <!-- EXIT: Goals check -->
            <div class="space-y-3 pt-6 border-t-2" style="border-color: var(--color-line);" v-if="!isEntry && goals && goals.length > 0">
              <p class="fullscreen-label text-center">Ik kan nu...</p>
              <div class="grid grid-cols-1 gap-3 text-left">
                <div v-for="(goal, idx) in goals" :key="idx" class="flex items-center gap-3 text-base text-slate-700">
                  <PhCheckCircle weight="fill" class="shrink-0" style="color: var(--color-workbook);" />
                  <span v-html="goal"></span>
                </div>
              </div>
            </div>

            <!-- ENTRY: Summary line -->
            <div v-if="isEntry && scoredTotal > 0" class="pt-4 border-t-2" style="border-color: var(--color-line);">
              <p class="text-base text-slate-700">
                Je hebt <span class="font-bold" :style="{ color: scoredCorrect >= scoredTotal ? 'var(--color-workbook)' : 'var(--color-presentation)' }">{{ scoredCorrect }} van {{ scoredTotal }}</span> vragen goed.
                <template v-if="scoredCorrect < scoredTotal">
                  Kijk de theorie over deze onderwerpen nog eens na voor je verdergaat.
                </template>
                <template v-else>
                  Je voorkennis zit goed. Je bent klaar voor de les.
                </template>
              </p>
            </div>
          </div>

          <button @click="close" class="btn btn-primary mt-8" style="min-height: 48px; padding: 0 40px;">
            Sluiten
          </button>
        </div>

      </Transition>

    </div>

    <!-- Voetbalk met de navigatieacties -->
    <footer class="fullscreen-foot" v-if="currentPart.type !== 'finish'">
      <span class="fullscreen-label mr-auto">
        {{ currentPart.type === 'mc' ? 'Meerkeuze' : currentPart.type === 'open' ? 'Reflectie' : currentPart.type === 'graph-point' ? 'Interactief' : 'Gevoel' }}
      </span>

      <button
        v-if="currentPart.type !== 'mood'"
        @click="nextStep"
        :disabled="!canProceed"
        class="btn btn-primary"
        style="min-height: 48px; padding: 0 32px;"
      >
        Volgende <PhArrowRight weight="bold" />
      </button>
      <button
        v-else
        @click="submit"
        :disabled="!canProceed"
        class="btn btn-primary"
        style="min-height: 48px; padding: 0 32px;"
      >
        Afronden <PhPaperPlaneRight weight="bold"/>
      </button>
    </footer>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
