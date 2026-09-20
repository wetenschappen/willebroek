<script setup>
import { ref, computed, onMounted, watch, nextTick, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhXCircle, PhArrowsLeftRight, PhArrowClockwise } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  title: {
    type: String,
    default: 'Drag & Drop Oefening'
  },
  instruction: {
    type: String,
    default: 'Sleep elk begrip naar de juiste definitie'
  },
  // Array of { term: string, definition: string }
  pairs: {
    type: Array,
    default: () => [
      { term: 'Kracht (F)', definition: 'Eenheid: Newton (N)' },
      { term: 'Massa (m)', definition: 'Eenheid: Kilogram (kg)' },
      { term: 'Versnelling (a)', definition: 'Eenheid: m/s²' },
      { term: 'Snelheid (v)', definition: 'Eenheid: m/s' }
    ]
  },
  fullscreen: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'complete'])

// STATE
const draggedItem = ref(null)
const matches = ref({}) // { definitionIndex: termIndex }
const feedback = ref({}) // { definitionIndex: 'correct' | 'incorrect' | null }
const isComplete = ref(false)
const attempts = ref(0)

// Shuffle terms for display (so they're not in order)
const shuffledTerms = ref([])

onMounted(() => {
  resetActivity()
})

function resetActivity() {
  // Create shuffled indices
  const indices = props.pairs.map((_, i) => i)
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]]
  }
  shuffledTerms.value = indices
  matches.value = {}
  feedback.value = {}
  isComplete.value = false
  attempts.value = 0
}

// Check if a term has been placed
function isTermPlaced(termIndex) {
  return Object.values(matches.value).includes(termIndex)
}

// Get which term is in a drop zone
function getTermInZone(defIndex) {
  return matches.value[defIndex] !== undefined ? matches.value[defIndex] : null
}

// DRAG HANDLERS
function onDragStart(termIndex, e) {
  draggedItem.value = termIndex
  e.dataTransfer.effectAllowed = 'move'
  e.dataTransfer.setData('text/plain', termIndex)
}

function onDragEnd() {
  draggedItem.value = null
}

function onDragOver(e) {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
}

function onDrop(defIndex, e) {
  e.preventDefault()
  let termIndex = draggedItem.value

  // Fallback to dataTransfer if draggedItem.value is somehow lost or we're dropping from an external context (unlikely, but safe)
  if (termIndex === null) {
      const data = e.dataTransfer.getData('text/plain')
      if (data !== '') termIndex = Number(data)
  }

  if (termIndex === null || termIndex === undefined) return

  // Ensure it's a number, because draggedItem or event data might hold it as string
  termIndex = Number(termIndex)

  // Remove from old position if exists
  Object.keys(matches.value).forEach(key => {
    if (matches.value[key] === termIndex) {
      delete matches.value[key]
      delete feedback.value[key]
    }
  })

  // Place in new position
  matches.value[defIndex] = termIndex

  // Check if correct
  const isCorrect = termIndex === defIndex
  feedback.value[defIndex] = isCorrect ? 'correct' : 'incorrect'

  attempts.value++

  // Check completion
  checkCompletion()

  draggedItem.value = null
}

function removeFromZone(defIndex) {
  delete matches.value[defIndex]
  delete feedback.value[defIndex]
}

function checkCompletion() {
  // Complete when all zones filled AND all correct
  const allFilled = Object.keys(matches.value).length === props.pairs.length
  const allCorrect = Object.values(feedback.value).every(f => f === 'correct')

  if (allFilled && allCorrect) {
    isComplete.value = true
    emit('complete')
  }
}

const correctCount = computed(() => {
  return Object.values(feedback.value).filter(f => f === 'correct').length
})

const progressPercent = computed(() => {
  return Math.round((correctCount.value / props.pairs.length) * 100)
})

function close() {
  emit('close')
}

// FULLSCREEN
watch(() => props.isOpen, (val) => {
    if (!val) {
        window.removeEventListener('keydown', handleKeydown)
    } else {
        window.addEventListener('keydown', handleKeydown)

    }
}, { immediate: true })


function handleKeydown(e) {
    if (e.key === 'Escape' && props.isOpen) {
        emit('close')
    }
}

onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown)
})

onMounted(() => {
    resetActivity()
})
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-0">
    <div class="absolute inset-0" style="background: rgb(23 37 43 / 0.72);" @click="close"></div>
    <div class="relative bg-white overflow-hidden flex flex-col w-screen h-screen rounded-none" @click.stop>

      <!-- Kopbalk: dit is een digitale activiteit, dus blauw anker -->
      <div class="fullscreen-bar fullscreen-bar-digital">
        <div class="flex items-center gap-3 min-w-0">
          <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
            <PhArrowsLeftRight weight="bold" class="text-xl"/>
          </div>
          <div class="min-w-0">
            <h2 class="fullscreen-title">{{ title }}</h2>
            <p class="fullscreen-label">Begrippen koppelen</p>
          </div>
        </div>
        <span class="ml-2 shrink-0 badge badge-digital">Digitaal</span>
        <button @click="close" class="btn-close ml-auto" aria-label="Sluiten">
          <PhX class="text-2xl" />
        </button>
      </div>

      <!-- Voortgangsbalk -->
      <div class="fullscreen-progress">
        <span :style="{ width: progressPercent + '%' }"></span>
      </div>

      <!-- Body -->
      <div class="flex flex-col flex-1 overflow-hidden">

        <!-- Completion State -->
        <div v-if="isComplete" class="flex flex-col items-center justify-center flex-1 gap-4 px-8">
          <div class="w-16 h-16 rounded-control flex items-center justify-center" style="background: var(--color-workbook-soft); color: var(--color-workbook);">
            <PhCheckCircle weight="fill" class="text-3xl"/>
          </div>
          <h4 class="text-2xl font-bold text-slate-900">Klaar</h4>
          <p class="text-slate-600">Alle {{ pairs.length }} begrippen correct gekoppeld in {{ attempts }} {{ attempts === 1 ? 'poging' : 'pogingen' }}</p>
          <div class="flex gap-3 mt-2">
            <button @click="resetActivity" class="btn btn-ghost" style="border: 2px solid var(--color-line-strong);">
              <PhArrowClockwise weight="bold"/> Opnieuw
            </button>
            <button @click="close" class="btn btn-primary">
              Sluiten
            </button>
          </div>
        </div>

        <template v-else>

          <!-- ① CHIP BANK — draggable terms as compact pills -->
          <div class="shrink-0 px-6 pt-5 pb-4 border-b border-slate-200">
            <p class="text-[0.6875rem] font-black uppercase tracking-widest text-slate-600 mb-3">Begrippen — sleep naar de juiste definitie</p>
            <div class="flex flex-wrap gap-2">
              <div
                v-for="termIndex in shuffledTerms"
                :key="'chip-' + termIndex"
                :draggable="!isTermPlaced(termIndex)"
                @dragstart="onDragStart(termIndex, $event)"
                @dragend="onDragEnd"
                class="px-3 py-2 rounded-control border-2 text-sm font-semibold select-none"
                :style="isTermPlaced(termIndex)
                  ? { background: '#edf2f1', borderColor: '#d5dfde', color: '#52636a' }
                  : { background: '#ffffff', borderColor: 'var(--color-digital)', color: '#17252b', cursor: 'grab' }"
                :class="draggedItem === termIndex ? 'opacity-40' : ''"
              >
                <span v-html="pairs[termIndex].term"></span>
              </div>
            </div>
          </div>

          <!-- ② DEFINITION ROWS — one horizontal bar per definition -->
          <div class="flex-1 overflow-y-auto px-6 py-4 space-y-2">
            <div
              v-for="(pair, defIndex) in pairs"
              :key="'def-' + defIndex"
              @dragover="onDragOver"
              @drop="onDrop(defIndex, $event)"
              class="flex items-center gap-4 rounded-card border-2 px-4 py-3"
              :style="feedback[defIndex] === 'correct'
                ? { background: 'var(--color-workbook-soft)', borderColor: 'var(--color-workbook)' }
                : feedback[defIndex] === 'incorrect'
                  ? { background: 'var(--color-presentation-soft)', borderColor: 'var(--color-presentation)' }
                  : { background: '#ffffff', borderColor: 'var(--color-line-strong)' }"
            >
              <!-- Row index -->
              <span class="shrink-0 w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center" style="background: var(--color-panel-muted); color: var(--color-ink-soft);">
                {{ defIndex + 1 }}
              </span>

              <!-- Definition text -->
              <p class="flex-1 text-sm text-slate-800 leading-snug m-0" v-html="pair.definition"></p>

              <!-- Drop zone / placed chip -->
              <div class="shrink-0 min-w-[140px] flex items-center justify-end">
                <!-- Placed term -->
                <div v-if="getTermInZone(defIndex) !== null" class="flex items-center gap-1.5">
                  <PhCheckCircle v-if="feedback[defIndex] === 'correct'"  weight="fill" class="text-lg shrink-0" style="color: var(--color-workbook);"/>
                  <PhXCircle    v-else-if="feedback[defIndex] === 'incorrect'" weight="fill" class="text-lg shrink-0" style="color: var(--color-presentation);"/>
                  <span
                    class="px-2.5 py-1 rounded-control text-sm font-semibold"
                    :style="feedback[defIndex] === 'correct'
                      ? { background: 'var(--color-workbook)', color: '#ffffff' }
                      : feedback[defIndex] === 'incorrect'
                        ? { background: 'var(--color-presentation)', color: '#ffffff' }
                        : { background: 'var(--color-digital-soft)', color: 'var(--color-digital)' }"
                    v-html="pairs[getTermInZone(defIndex)].term"
                  ></span>
                  <button v-if="feedback[defIndex] !== 'correct'"
                    @click="removeFromZone(defIndex)"
                    class="btn-close"
                    title="Verwijder"
                  ><PhX class="text-sm"/></button>
                </div>
                <!-- Empty drop hint -->
                <div v-else class="px-3 py-2 rounded-control border-2 border-dashed text-sm" style="border-color: var(--color-line); color: var(--color-ink-soft);">
                  nog niet ingevuld
                </div>
              </div>
            </div>
          </div>

          <!-- Voetbalk -->
          <footer class="fullscreen-foot">
            <span class="fullscreen-label mr-auto">
              {{ correctCount }}/{{ pairs.length }} correct · {{ attempts }} {{ attempts === 1 ? 'poging' : 'pogingen' }}
            </span>
            <button @click="resetActivity" class="btn btn-ghost" style="border: 2px solid var(--color-line-strong);">
              <PhArrowClockwise /> Opnieuw
            </button>
          </footer>

        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Geen pulse- of bounce-animatie: de actieve toestand is statisch. */
</style>
