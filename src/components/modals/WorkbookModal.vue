<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { PhBookOpen, PhX } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  workbook: {
    type: Object,
    default: () => ({})
  },
  cardExercises: {
    type: [String, Array],
    default: ''
  }
})

const emit = defineEmits(['close', 'complete', 'open-solutions'])
const completedExercises = ref(new Set())

function completeAndClose() {
  emit('complete')
  emit('close')
}

function close() {
  emit('close')
}

// Escape sluit net als de X. De leerling verliest daarbij geen voortgang: het
// afvinken van oefeningen blijft in de lijst staan.
function handleKeydown(e) {
  if (e.key !== 'Escape' || !props.isOpen) return
  e.preventDefault()
  close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))

function parseExercise(entry, index) {
  const exercise = typeof entry === 'string' ? { text: entry } : (entry || {})
  let number = exercise.number ?? exercise.nr ?? exercise.id ?? index + 1
  let title = exercise.title ?? exercise.text ?? ''
  let page = exercise.page ?? ''
  const text = String(title).trim()

  let match = text.match(/^(?:Opdracht|Oefening|Oef\.?|Aan de slag)\s+([A-Z0-9.-]+)\s*\(p\.?\s*(\d+(?:\s*[-–]\s*\d+)?)\)\s*:\s*(.+)$/i)
  if (match) {
    number = match[1]
    page ||= match[2]
    title = match[3].trim()
  } else {
    match = text.match(/^(?:Opdracht|Oefening|Oef\.?|Aan de slag)\s+([A-Z0-9.-]+)\s*[:–-]\s*(.+?)\s*\(p\.?\s*(\d+(?:\s*[-–]\s*\d+)?)\)$/i)
    if (match) {
      number = match[1]
      title = match[2].trim()
      page ||= match[3]
    } else {
      match = text.match(/^(.+?)\s*\(p\.?\s*(\d+(?:\s*[-–]\s*\d+)?)\)$/i)
      if (match) {
        title = match[1].trim()
        page ||= match[2]
      }
    }
  }

  return {
    key: String(exercise.id ?? `${number}-${index}`),
    number: String(number),
    title: String(title).trim(),
    page: String(page).trim().replace(/^p\.?\s*/i, '')
  }
}

const parsedExercises = computed(() => {
  const cardExercises = props.cardExercises
  const raw = Array.isArray(cardExercises)
    ? (cardExercises.length ? cardExercises : props.workbook?.exercises)
    : (cardExercises || props.workbook?.exercises)
  if (!raw) return []
  const entries = Array.isArray(raw) ? raw : String(raw).split('\n').filter(line => line.trim())
  return entries.map(parseExercise)
})

function setExerciseDone(key, done) {
  const next = new Set(completedExercises.value)
  if (done) next.add(key)
  else next.delete(key)
  completedExercises.value = next
}
</script>

<template>
  <!-- Fullscreen-activiteitenshell: licht, groen anker (boek / bundel). -->
  <div
    v-if="isOpen"
    class="modal-fullscreen"
    role="dialog"
    aria-modal="true"
    aria-labelledby="workbook-modal-title"
  >

    <header class="fullscreen-bar fullscreen-bar-paper">
      <div class="p-2 rounded-control shrink-0" style="background: var(--color-workbook-soft); color: var(--color-workbook);">
        <PhBookOpen weight="fill" class="text-xl" aria-hidden="true" />
      </div>
      <div class="min-w-0">
        <h2 id="workbook-modal-title" class="fullscreen-title">{{ workbook.title || 'Werkboek en bundel' }}</h2>
        <p class="fullscreen-label">{{ workbook.subtitle || 'Boek / bundel' }}</p>
      </div>
      <button type="button" @click="close" class="btn-close ml-auto" aria-label="Sluiten">
        <PhX class="text-2xl" aria-hidden="true" />
      </button>
    </header>

    <div class="fullscreen-body">
      <div class="workbook-sheet">
        <div v-if="parsedExercises.length" class="workbook-table-wrap">
          <table class="workbook-exercise-table">
            <thead>
              <tr>
                <th scope="col" class="workbook-number-cell">Nr.</th>
                <th scope="col">Oefening</th>
                <th scope="col" class="workbook-page-cell">Pagina</th>
                <th scope="col" class="workbook-done-cell">Klaar</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="exercise in parsedExercises" :key="exercise.key">
                <td class="workbook-number-cell">{{ exercise.number }}</td>
                <td class="workbook-exercise-title" v-html="exercise.title"></td>
                <td class="workbook-page-cell">{{ exercise.page || '—' }}</td>
                <td class="workbook-done-cell">
                  <input
                    type="checkbox"
                    :checked="completedExercises.has(exercise.key)"
                    :aria-label="`Oefening ${exercise.number} als klaar markeren`"
                    @change="setExerciseDone(exercise.key, $event.target.checked)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p v-else class="workbook-empty">Er zijn nog geen oefeningen toegevoegd.</p>
      </div>
    </div>

    <footer class="fullscreen-foot workbook-modal-footer">
      <button type="button" @click="completeAndClose" class="btn btn-primary workbook-complete-button">
        Klaar met de opdrachten
      </button>
      <button type="button" @click="emit('open-solutions')" class="workbook-solutions-link">
        Correctiesleutel raadplegen (beveiligd met code)
      </button>
    </footer>
  </div>
</template>
