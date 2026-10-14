<script setup>
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { PhActivity, PhCheckCircle, PhX } from '@phosphor-icons/vue'
import CycleSimulation from './celldivision/CycleSimulation.vue'
import MitosisSimulation from './celldivision/MitosisSimulation.vue'
import MeiosisSimulation from './celldivision/MeiosisSimulation.vue'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, default: 'Celdeling' }
})
const emit = defineEmits(['close', 'complete'])

const activeTab = ref('cycle')
const visited = reactive({ cycle: false, mitosis: false, meiosis: false })
const tabs = [
  { id: 'cycle', number: '01', label: 'Celcyclus', short: 'G₁ · S · G₂ · M' },
  { id: 'mitosis', number: '02', label: 'Mitose', short: '2 identieke cellen' },
  { id: 'meiosis', number: '03', label: 'Meiose', short: '4 haploïde cellen' }
]
const completedCount = computed(() => Object.values(visited).filter(Boolean).length)
const progressWidth = computed(() => `${Math.round(completedCount.value / tabs.length * 100)}%`)
const allVisited = computed(() => completedCount.value === tabs.length)

let opener = null

function selectTab(index) {
  const tab = tabs[(index + tabs.length) % tabs.length]
  activeTab.value = tab.id
  document.getElementById(`tab-${tab.id}`)?.focus()
}
function handleTabKeydown(event, index) {
  const actions = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }
  if (event.key in actions) { event.preventDefault(); selectTab(actions[event.key]) }
}

function markVisited(id) { visited[id] = true }
function finishLab() { if (allVisited.value) emit('complete') }
function handleKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault()
    emit('close')
  } else if (event.key === 'Tab') {
    const controls = [...document.querySelectorAll('.cell-division-shell button:not(:disabled)')]
      .filter(element => element.tabIndex >= 0 && element.getClientRects().length)
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first?.focus()
    }
  }
}

onMounted(() => {
  // LessonContent owns scroll locking for all activity overlays.
  opener = document.activeElement
  window.addEventListener('keydown', handleKeydown)
  document.getElementById('tab-cycle')?.focus()
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  if (opener?.isConnected) opener.focus()
})
</script>

<template>
  <Teleport to="body">
  <div class="modal-fullscreen cell-division-shell" role="dialog" aria-modal="true" aria-labelledby="division-lab-title">
    <header class="fullscreen-bar fullscreen-bar-digital cell-division-header">
      <div class="cell-division-icon" aria-hidden="true"><PhActivity weight="fill" /></div>
      <div class="cell-division-heading">
        <h2 id="division-lab-title" class="fullscreen-title">{{ props.title }}</h2>
        <p class="fullscreen-label">Celcyclus, mitose en meiose</p>
      </div>
      <div class="cell-division-header-progress" aria-label="Voortgang van het labo">
        <strong>{{ completedCount }}/3</strong><span>simulaties<br>doorlopen</span>
      </div>
      <button type="button" @click="emit('close')" class="btn-close ml-auto" aria-label="Simulaties sluiten">
        <PhX class="text-2xl" />
      </button>
    </header>

    <div class="fullscreen-progress" role="progressbar" :aria-valuenow="completedCount" aria-valuemin="0" aria-valuemax="3" aria-label="Doorlopen simulaties">
      <span :style="{ width: progressWidth }"></span>
    </div>

    <nav class="cell-division-tabs" aria-label="Kies een simulatie" role="tablist">
      <button
        v-for="(tab, index) in tabs"
        :key="tab.id"
        type="button"
        role="tab"
        :id="`tab-${tab.id}`"
        :aria-selected="activeTab === tab.id"
        :tabindex="activeTab === tab.id ? 0 : -1"
        @keydown="handleTabKeydown($event, index)"
        :aria-controls="`panel-${tab.id}`"
        class="cell-division-tab"
        :class="{ 'cell-division-tab-active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <span class="cell-division-tab-number">{{ tab.number }}</span>
        <span class="cell-division-tab-copy"><strong>{{ tab.label }}</strong><small>{{ tab.short }}</small></span>
        <PhCheckCircle v-if="visited[tab.id]" class="cell-division-tab-check" weight="fill" aria-label="Doorlopen" />
      </button>
    </nav>

    <main class="cell-division-content">
      <section id="panel-cycle" role="tabpanel" aria-labelledby="tab-cycle" v-show="activeTab === 'cycle'">
        <CycleSimulation @complete="markVisited('cycle')" />
      </section>
      <section id="panel-mitosis" role="tabpanel" aria-labelledby="tab-mitosis" v-show="activeTab === 'mitosis'">
        <MitosisSimulation @complete="markVisited('mitosis')" />
      </section>
      <section id="panel-meiosis" role="tabpanel" aria-labelledby="tab-meiosis" v-show="activeTab === 'meiosis'">
        <MeiosisSimulation @complete="markVisited('meiosis')" />
      </section>
    </main>

    <footer class="fullscreen-foot cell-division-footer">
      <p class="cell-division-footer-note" aria-live="polite">
        <template v-if="allVisited"><PhCheckCircle weight="fill" /> Alle drie de simulaties zijn doorlopen.</template>
        <template v-else>{{ completedCount }} van 3 simulaties doorlopen.</template>
      </p>
      <span class="cell-division-screen-hint">F11 verbergt de browserbalk</span>
      <button type="button" class="btn btn-primary" :disabled="!allVisited" @click="finishLab">
        Labo afronden <PhCheckCircle weight="bold" />
      </button>
    </footer>
  </div>
  </Teleport>
</template>

<style scoped>
.cell-division-shell { color: var(--color-ink); height: 100dvh; }
.cell-division-shell :deep(svg) { font-family: 'IBM Plex Sans', sans-serif; }
.cell-division-screen-hint { margin-left: auto; color: var(--color-ink-soft); font-size: 0.875rem; }
.cell-division-header { gap: 16px; }
.cell-division-icon { display: grid; width: 44px; height: 44px; flex: none; place-items: center; color: var(--color-digital); background: var(--color-digital-soft); border-radius: var(--radius-control); font-size: 1.45rem; }
.cell-division-heading { min-width: 0; }
.cell-division-heading .fullscreen-label { margin-top: 3px; font-family: 'IBM Plex Sans', sans-serif; letter-spacing: 0; text-transform: none; font-weight: 400; }
.cell-division-header-progress { display: flex; align-items: center; gap: 8px; margin-left: auto; padding: 8px 12px; color: var(--color-digital); background: var(--color-digital-soft); border: 1px solid var(--color-digital); border-radius: var(--radius-control); }
.cell-division-header-progress strong { font-family: 'IBM Plex Mono', monospace; font-size: 1.15rem; }
.cell-division-header-progress span { color: var(--color-ink); font-size: 0.74rem; font-weight: 700; line-height: 1.1; }
.cell-division-tabs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; flex: none; padding: 10px 24px; background: var(--color-panel); border-bottom: 2px solid var(--color-line-strong); }
.cell-division-tab { display: flex; align-items: center; gap: 10px; min-height: 56px; padding: 8px 12px; color: var(--color-ink); text-align: left; background: var(--color-panel); border: 2px solid var(--color-line-strong); border-radius: var(--radius-control); cursor: pointer; }
.cell-division-tab:hover { background: var(--color-panel-muted); }
.cell-division-tab-active { background: var(--color-digital-soft); border-color: var(--color-digital); }
.cell-division-tab-number { display: grid; width: 34px; height: 34px; flex: none; place-items: center; color: var(--color-digital); background: var(--color-panel); border: 1px solid var(--color-digital); border-radius: 50%; font-family: 'IBM Plex Mono', monospace; font-size: 0.75rem; font-weight: 700; }
.cell-division-tab-copy { display: grid; gap: 1px; }
.cell-division-tab-copy strong { font-size: 0.95rem; }
.cell-division-tab-copy small { color: var(--color-ink-soft); font-size: 0.74rem; font-weight: 600; }
.cell-division-tab-check { margin-left: auto; color: var(--color-workbook); font-size: 1.3rem; }
.cell-division-content { display: flex; flex: 1; min-height: 0; overflow: hidden; background: var(--color-paper); }
.cell-division-content > section { display: flex; flex: 1; min-width: 0; min-height: 0; }
.cell-division-content > section[style*="display: none"] { display: none !important; }
.cell-division-content :deep(.fullscreen-body) { width: 100%; padding: 24px 32px; }
@media (min-width: 1024px) { .cell-division-content :deep([class$="-canvas"]) { position: sticky; top: 0; } }
@media (max-width: 760px) { .cell-division-content :deep(.fullscreen-body) { padding: 16px; } .cell-division-screen-hint { display: none; } }
.cell-division-footer { justify-content: space-between; gap: 16px; }
.cell-division-footer-note { display: flex; align-items: center; gap: 8px; margin: 0; color: var(--color-ink-soft); font-weight: 600; }
.cell-division-footer-note svg { flex: none; color: var(--color-workbook); font-size: 1.25rem; }
.cell-division-footer .btn:disabled { opacity: 0.5; cursor: not-allowed; }
@media (max-width: 760px) {
  .cell-division-header { gap: 10px; padding-right: 16px; padding-left: 16px; }
  .cell-division-header-progress { display: none; }
  .cell-division-tabs { padding-right: 12px; padding-left: 12px; }
  .cell-division-tab { justify-content: center; padding: 8px; }
  .cell-division-tab-copy small { display: none; }
  .cell-division-tab-check { display: none; }
  .cell-division-footer { align-items: flex-start; flex-direction: column; justify-content: center; padding-top: 12px; padding-bottom: 12px; }
}
@media (max-width: 440px) {
  .cell-division-icon { display: none; }
  .cell-division-heading .fullscreen-title { font-size: 1rem; }
  .cell-division-heading .fullscreen-label { font-size: 0.65rem; }
  .cell-division-tab-copy strong { font-size: 0.8rem; }
  .cell-division-tab-number { width: 28px; height: 28px; }
}
</style>
