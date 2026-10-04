<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { PhX, PhChatTeardropDots } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  questions: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: 'Vastzetting'
  }
})

const emit = defineEmits(['close', 'complete'])

const selectedIndex = ref(null)
const revealedIndices = ref(new Set())

function handleKeydown(e) {
  if (!props.isOpen) return

  // Escape sluit net als de X rechtsboven.
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }

  // 'S' for Solution/Secret reveal - Toggles visibility
  if (e.key.toLowerCase() === 's' && selectedIndex.value !== null) {
    if (revealedIndices.value.has(selectedIndex.value)) {
      revealedIndices.value.delete(selectedIndex.value)
    } else {
      revealedIndices.value.add(selectedIndex.value)
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function close() {
  selectedIndex.value = null
  revealedIndices.value.clear()
  emit('close')
}
</script>

<template>
  <!-- Fullscreen-activiteitenshell: licht, blauw anker (digitale begripscheck). -->
  <div v-if="isOpen" class="modal-fullscreen">

    <header class="fullscreen-bar fullscreen-bar-digital">
      <div class="p-2 rounded-control shrink-0" style="background: var(--color-digital-soft); color: var(--color-digital);">
        <PhChatTeardropDots weight="fill" class="text-xl" />
      </div>
      <div class="min-w-0">
        <h2 class="fullscreen-title">{{ title }}</h2>
        <p class="fullscreen-label">Klassikale begripscheck</p>
      </div>
      <button type="button" @click="close" class="btn-close ml-auto" aria-label="Sluiten">
        <PhX class="text-2xl" />
      </button>
    </header>

    <div class="fullscreen-body">
      <div class="spotcheck-list">
        <div v-for="(q, idx) in questions" :key="idx"
             @click="selectedIndex = idx"
             class="spotcheck-row"
             :class="selectedIndex === idx ? 'spotcheck-row-selected' : ''">

          <span class="spotcheck-number" :class="selectedIndex === idx ? 'spotcheck-number-selected' : ''">{{ idx + 1 }}</span>

          <div class="min-w-0 flex-1">
            <p class="spotcheck-question" v-html="q.question"></p>

            <Transition name="fade">
              <div v-if="revealedIndices.has(idx)" class="spotcheck-answer">
                <span class="activity-meta">Antwoord</span>
                <span v-html="q.answer"></span>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>

    <footer class="fullscreen-foot">
      <button
        @click="$emit('complete'); close()"
        class="btn btn-primary" style="min-height: 48px;"
      >
        Sessie afronden
      </button>
    </footer>
  </div>
</template>

<style scoped>
.spotcheck-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 880px;
  margin: 0 auto;
}

.spotcheck-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 18px 20px;
  color: var(--color-ink);
  background: var(--color-panel);
  border: 2px solid var(--color-line-strong);
  border-radius: var(--radius-card);
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.spotcheck-row:hover,
.spotcheck-row-selected {
  border-color: var(--color-digital);
  background: var(--color-digital-soft);
}

.spotcheck-number {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  color: var(--color-ink-soft);
  background: var(--color-panel-muted);
  border-radius: var(--radius-control);
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
}

.spotcheck-number-selected {
  color: #ffffff;
  background: var(--color-digital);
}

.spotcheck-question {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.4;
}

.spotcheck-answer {
  display: block;
  margin-top: 10px;
  padding: 10px 14px;
  color: var(--color-ink);
  background: var(--color-panel);
  border-left: 4px solid var(--color-digital);
  border-radius: 0 var(--radius-control) var(--radius-control) 0;
  font-weight: 600;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
