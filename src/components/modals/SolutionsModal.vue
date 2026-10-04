<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { PhX, PhCheckCircle, PhFilePdf, PhLockKey, PhWarning, PhArrowRight } from '@phosphor-icons/vue'

const props = defineProps({
  isOpen: Boolean,
  config: Object,
  workbook: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close'])

const inputCode = ref('')
const errorIndex = ref(null)
const unlockedIndices = ref(new Set())
const activeUnlockIndex = ref(null)

const solutionLinks = computed(() => {
  const configuredSolutions = props.config?.oplossingen
  if (Array.isArray(configuredSolutions)) {
    return configuredSolutions
  }
  if (configuredSolutions && typeof configuredSolutions === 'object' && configuredSolutions.url) {
    return [{
      label: configuredSolutions.title || 'Bekijk PDF Oplossingen',
      url: configuredSolutions.url,
      password: configuredSolutions.code ?? configuredSolutions.password
    }]
  }
  if (props.config?.oplossingenLink) {
    return [{
      label: 'Bekijk PDF Oplossingen',
      url: props.config.oplossingenLink,
      password: props.config.groenAntwoord
    }]
  }
  return []
})

function tryUnlock(index) {
  const link = solutionLinks.value[index]
  // Als er geen wachtwoord is of als het al ontgrendeld is, open direct
  if (!link.password || unlockedIndices.value.has(index)) {
    window.open(link.url, '_blank')
    return
  }

  // Toon wachtwoord veld voor dit item
  activeUnlockIndex.value = index
  inputCode.value = ''
  errorIndex.value = null
}

function checkCode(index) {
  const link = solutionLinks.value[index]
  if (inputCode.value.trim().toLowerCase() === link.password.toLowerCase()) {
    unlockedIndices.value.add(index)
    activeUnlockIndex.value = null
    inputCode.value = ''
    errorIndex.value = null
    window.open(link.url, '_blank')
  } else {
    errorIndex.value = index
  }
}

function cancelUnlock() {
    activeUnlockIndex.value = null
    inputCode.value = ''
    errorIndex.value = null
}

function close() {
    emit('close')
    activeUnlockIndex.value = null
    inputCode.value = ''
}

// Escape sluit net als de X. Staat er nog een wachtwoordveld open, dan sluit
// Escape eerst dat veld en blijft het venster staan.
function handleKeydown(e) {
    if (e.key !== 'Escape' || !props.isOpen) return
    e.preventDefault()
    if (activeUnlockIndex.value !== null) {
        cancelUnlock()
        return
    }
    close()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <!-- Fullscreen-activiteitenshell: licht, groen anker (boek / bundel). -->
  <div v-if="isOpen" class="modal-fullscreen">

    <header class="fullscreen-bar fullscreen-bar-paper">
      <div class="p-2 rounded-control shrink-0" style="background: var(--color-workbook-soft); color: var(--color-workbook);">
        <PhCheckCircle weight="fill" class="text-xl" />
      </div>
      <div class="min-w-0">
        <h2 class="fullscreen-title">Correctiesleutels</h2>
        <p class="fullscreen-label">{{ workbook.title || 'Werkboek' }}</p>
      </div>
      <button type="button" @click="close" class="btn-close ml-auto" aria-label="Sluiten">
        <PhX class="text-2xl" />
      </button>
    </header>

    <div class="fullscreen-body">
      <div class="solutions-sheet">

        <div v-if="solutionLinks.length > 0" class="space-y-4">
          <div v-for="(link, idx) in solutionLinks" :key="idx">

            <!-- ITEM CARD -->
            <div
              class="solutions-item"
              :class="{
                'solutions-item-unlocked': unlockedIndices.has(idx),
                'solutions-item-active': activeUnlockIndex === idx
              }"
            >
              <span class="solutions-item-icon">
                <PhCheckCircle v-if="unlockedIndices.has(idx)" weight="fill" />
                <PhFilePdf v-else weight="bold" />
              </span>
              <div class="min-w-0 flex-1">
                <h3 class="solutions-item-title">{{ link.label }}</h3>
                <p class="activity-meta">
                  {{ unlockedIndices.has(idx) ? 'Ontgrendeld' : (link.password ? 'Beveiligd met code' : 'Vrij toegankelijk') }}
                </p>
              </div>

              <button
                type="button"
                @click="tryUnlock(idx)"
                class="btn"
                :style="unlockedIndices.has(idx)
                  ? { background: 'var(--color-workbook)', color: '#ffffff' }
                  : { background: 'var(--color-ink)', color: '#ffffff' }"
              >
                {{ unlockedIndices.has(idx) ? 'Openen' : 'Inzien' }}
              </button>
            </div>

            <!-- PASSWORD PROMPT INLINE -->
            <transition name="fade">
              <div v-if="activeUnlockIndex === idx" class="solutions-code">
                <div class="flex items-center justify-between mb-3">
                  <span class="activity-meta">
                    <PhLockKey weight="fill" /> Code voor deze sleutel
                  </span>
                  <button type="button" @click="cancelUnlock" class="btn-close" aria-label="Codeveld sluiten">
                    <PhX weight="bold" />
                  </button>
                </div>

                <div class="relative">
                  <input
                    type="password"
                    v-model="inputCode"
                    @keydown.enter="checkCode(idx)"
                    class="solutions-code-input"
                    placeholder="Wachtwoord..."
                    autofocus
                  >
                  <button
                    type="button"
                    @click="checkCode(idx)"
                    class="solutions-code-submit"
                    aria-label="Code controleren"
                  >
                    <PhArrowRight weight="bold" />
                  </button>
                </div>

                <p v-if="errorIndex === idx" class="solutions-code-error">
                  <PhWarning weight="bold" /> Wachtwoord onjuist. Probeer het opnieuw.
                </p>
              </div>
            </transition>
          </div>
        </div>

        <!-- NO LINKS STATE -->
        <div v-else class="solutions-empty">
          <div class="solutions-empty-icon"><PhWarning weight="fill" /></div>
          <h3 class="solutions-item-title">Niet beschikbaar</h3>
          <p class="solutions-empty-text">Er zijn momenteel geen PDF-correctiesleutels geüpload voor deze les.</p>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.solutions-sheet {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.solutions-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  background: var(--color-panel);
  border: 2px solid var(--color-line-strong);
  border-radius: var(--radius-card);
}

.solutions-item-unlocked,
.solutions-item-active {
  border-color: var(--color-workbook);
  background: var(--color-workbook-soft);
}

.solutions-item-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  color: var(--color-workbook);
  background: var(--color-workbook-soft);
  border-radius: var(--radius-control);
  font-size: 1.25rem;
}

.solutions-item-title {
  margin: 0;
  color: var(--color-ink);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.3;
}

.solutions-code {
  margin-top: 12px;
  padding: 16px;
  background: var(--color-panel);
  border: 2px solid var(--color-line-strong);
  border-radius: var(--radius-card);
}

.solutions-code-input {
  width: 100%;
  padding: 10px 52px 10px 14px;
  color: var(--color-ink);
  background: var(--color-panel);
  border: 2px solid var(--color-line-strong);
  border-radius: var(--radius-control);
  font-size: 0.9375rem;
  outline: none;
}

.solutions-code-input:focus-visible {
  border-color: var(--color-digital);
  outline: 3px solid var(--color-action);
  outline-offset: 2px;
}

.solutions-code-submit {
  position: absolute;
  top: 4px;
  right: 4px;
  bottom: 4px;
  display: grid;
  width: 44px;
  place-items: center;
  color: #ffffff;
  background: var(--color-ink);
  border: 0;
  border-radius: var(--radius-control);
  cursor: pointer;
}

.solutions-code-error {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 10px 0 0;
  color: var(--color-presentation);
  font-size: 0.8125rem;
  font-weight: 700;
}

.solutions-empty {
  padding: 40px 24px;
  background: var(--color-panel);
  border: 2px solid var(--color-line-strong);
  border-radius: var(--radius-card);
  text-align: center;
}

.solutions-empty-icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin: 0 auto 16px;
  color: var(--color-ink-soft);
  background: var(--color-panel-muted);
  border-radius: var(--radius-control);
  font-size: 1.75rem;
}

.solutions-empty-text {
  margin: 8px 0 0;
  color: var(--color-ink-soft);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
