<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { PhCheckCircle, PhX } from '@phosphor-icons/vue'
import CrossTrainer from './mendel/CrossTrainer.vue'
import CrossExplorer from './mendel/CrossExplorer.vue'
import { CHECKS, MISSIONS } from './mendel/missions.js'

const props = defineProps({ id: { type: String, required: true }, title: { type: String, default: 'Mendel: kruisingslab' }, storageKey: { type: String, default: 'bio6-m02-l01-mendel' } })
const emit = defineEmits(['close', 'complete'])
const shell = ref(null)
const mode = ref('train')
const activeMission = ref(MISSIONS[0].id)
const resetPending = ref(false)
const storageAvailable = ref(true)
const modes = [{ id: 'train', label: 'Stap voor stap oefenen' }, { id: 'explore', label: 'Vrij kruisingslab' }, { id: 'check', label: 'Begrip controleren' }]
const freshState = () => ({ stage: 0, gametes: [[], []], gametesCorrect: false, answers: {}, checked: {}, firstTry: {}, help: 0, phenotypeAnswer: '', genotypeAnswer: '', countsCorrect: false, choice: null, reasonFirst: null, done: false })
const states = reactive(Object.fromEntries(MISSIONS.map(m => [m.id, freshState()])))
const checks = reactive(Object.fromEntries(CHECKS.map(c => [c.id, { choice: null, first: null, done: false, attempted: false }])))
const mission = computed(() => MISSIONS.find(m => m.id === activeMission.value))
const completed = computed(() => MISSIONS.filter(m => states[m.id].done).length)
const core = MISSIONS.filter(m => m.core)
const coreCompleted = computed(() => core.filter(m => states[m.id].done).length)
const checksCompleted = computed(() => CHECKS.filter(c => checks[c.id].done).length)
const ready = computed(() => coreCompleted.value === core.length && checksCompleted.value === CHECKS.length)
const key = computed(() => `willebroek:mendel:v1:${props.storageKey}:${props.id}`)
let opener

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(key.value) || 'null')
    if (saved?.version !== 1) return
    for (const m of MISSIONS) {
      const s = saved.states?.[m.id]
      if (!s || !Number.isInteger(s.stage) || s.stage < 0 || s.stage > 3 || !Array.isArray(s.gametes) || s.gametes.length !== 2 || !s.gametes.every(a => Array.isArray(a) && a.every(g => typeof g === 'string'))) continue
      const base = freshState()
      for (const field of ['gametesCorrect', 'countsCorrect', 'done']) if (typeof s[field] === 'boolean') base[field] = s[field]
      for (const field of ['answers', 'checked', 'firstTry']) if (s[field] && typeof s[field] === 'object' && !Array.isArray(s[field])) base[field] = s[field]
      for (const field of ['phenotypeAnswer', 'genotypeAnswer']) if (typeof s[field] === 'number' || typeof s[field] === 'string') base[field] = s[field]
      if (Number.isInteger(s.choice) && s.choice >= 0 && s.choice < m.options.length) base.choice = s.choice
      if (typeof s.reasonFirst === 'boolean') base.reasonFirst = s.reasonFirst
      if (Number.isInteger(s.help) && s.help >= 0) base.help = s.help
      states[m.id] = { ...base, stage: s.stage, gametes: s.gametes }
    }
    for (const c of CHECKS) {
      const s = saved.checks?.[c.id]
      if (!s) continue
      if (Number.isInteger(s.choice) && s.choice >= 0 && s.choice < c.options.length) checks[c.id].choice = s.choice
      for (const field of ['first', 'done', 'attempted']) if (typeof s[field] === 'boolean') checks[c.id][field] = s[field]
    }
    if (MISSIONS.some(m => m.id === saved.activeMission)) activeMission.value = saved.activeMission
  } catch { storageAvailable.value = false }
}
restore()
watch([states, checks, activeMission], () => {
  try { localStorage.setItem(key.value, JSON.stringify({ version: 1, states, checks, activeMission: activeMission.value })) }
  catch { storageAvailable.value = false }
}, { deep: true })
function resetAll() {
  for (const m of MISSIONS) states[m.id] = freshState()
  for (const c of CHECKS) checks[c.id] = { choice: null, first: null, done: false, attempted: false }
  activeMission.value = MISSIONS[0].id
  mode.value = 'train'
  resetPending.value = false
}
function checkReason(c) {
  const s = checks[c.id]
  if (s.choice === null) return
  const correct = s.choice === c.correct
  if (s.first === null) s.first = correct
  s.attempted = true
  s.done = correct
}
function nextMission() {
  const index = MISSIONS.findIndex(m => m.id === activeMission.value)
  activeMission.value = MISSIONS[(index + 1) % MISSIONS.length].id
}
function tabKey(event, index) {
  const actions = { ArrowRight: (index + 1) % modes.length, ArrowLeft: (index + modes.length - 1) % modes.length, Home: 0, End: modes.length - 1 }
  if (!(event.key in actions)) return
  event.preventDefault()
  mode.value = modes[actions[event.key]].id
  nextTick(() => shell.value?.querySelector(`#mendel-tab-${mode.value}`)?.focus())
}
function handleKeydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); emit('close') }
  if (event.key !== 'Tab') return
  const controls = [...shell.value.querySelectorAll('button:not(:disabled), input:not(:disabled), select, [tabindex="0"]')].filter(e => e.getClientRects().length && e.tabIndex >= 0)
  const first = controls[0], last = controls.at(-1)
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
onMounted(() => { opener = document.activeElement; shell.value.querySelector('#mendel-tab-train')?.focus(); window.addEventListener('keydown', handleKeydown) })
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown); if (opener?.isConnected) opener.focus() })
</script>

<template>
  <Teleport to="body">
    <div ref="shell" class="modal-fullscreen mendel-lab" role="dialog" aria-modal="true" aria-labelledby="mendel-title" @keydown.stop="handleKeydown">
      <header class="fullscreen-bar fullscreen-bar-digital">
        <div><h2 id="mendel-title" class="fullscreen-title">{{ title }}</h2><p>Van allelen naar gameten, nakomelingen en kansen</p></div>
        <button class="btn-close ml-auto" aria-label="Kruisingslab sluiten" @click="emit('close')"><PhX class="text-2xl" /></button>
      </header>
      <div class="fullscreen-progress" role="progressbar" aria-label="Kernroute en begripsvragen" :aria-valuenow="coreCompleted + checksCompleted" :aria-valuemax="core.length + CHECKS.length" aria-valuemin="0"><span :style="{ width: `${(coreCompleted + checksCompleted) / (core.length + CHECKS.length) * 100}%` }"></span></div>
      <nav class="mendel-tabs" role="tablist" aria-label="Werkwijze">
        <button v-for="(tab, index) in modes" :key="tab.id" :id="`mendel-tab-${tab.id}`" role="tab" :aria-selected="mode === tab.id" :aria-controls="`mendel-panel-${tab.id}`" :tabindex="mode === tab.id ? 0 : -1" class="btn btn-ghost" @keydown="tabKey($event, index)" @click="mode = tab.id">{{ tab.label }}</button>
      </nav>
      <main class="fullscreen-body mendel-body">
        <p v-if="!storageAvailable" class="mendel-feedback" role="status">Je browser kan je werk niet bewaren. Het blijft beschikbaar zolang dit venster openstaat.</p>
        <section v-if="mode === 'train'" id="mendel-panel-train" role="tabpanel" aria-labelledby="mendel-tab-train" class="mendel-training-layout">
          <aside class="mendel-missions">
            <h3>Oefenroute</h3><p>Begin met de 3 kernopdrachten. De andere opdrachten helpen bij het boek.</p>
            <nav aria-label="Kies een kruisingsopdracht"><button v-for="(m, i) in MISSIONS" :key="m.id" :aria-current="activeMission === m.id ? 'step' : undefined" @click="activeMission = m.id"><span>{{ String(i + 1).padStart(2, '0') }} · {{ m.label }}</span><small>{{ states[m.id].done ? 'Afgerond' : m.core ? 'Kernopdracht' : 'Boekhulp' }}</small><PhCheckCircle v-if="states[m.id].done" aria-hidden="true" /></button></nav>
            <p>{{ completed }}/{{ MISSIONS.length }} opdrachten afgerond. Voortgang wordt op dit toestel bewaard.</p>
          </aside>
          <div>
            <CrossTrainer :key="activeMission" :mission="mission" :state="states[activeMission]" @reset="states[activeMission] = freshState()" />
            <div v-if="states[activeMission].done" class="mendel-actions"><button class="btn btn-primary" @click="nextMission">Volgende opdracht →</button><button class="btn btn-ghost" @click="mode = 'explore'">Onderzoek zelf een kruising</button></div>
          </div>
        </section>
        <section v-show="mode === 'explore'" id="mendel-panel-explore" role="tabpanel" aria-labelledby="mendel-tab-explore"><CrossExplorer /></section>
        <section v-if="mode === 'check'" id="mendel-panel-check" role="tabpanel" aria-labelledby="mendel-tab-check" class="mendel-workbench">
          <header class="mendel-task-heading"><h3>Kun je het ook verklaren?</h3><p>Los de vier begripsvragen op. Een juist antwoord staat vast; je eerste poging wordt apart bijgehouden.</p></header>
          <article v-for="c in CHECKS" :key="c.id" class="mendel-check">
            <h4>{{ c.title }}</h4>
            <figure v-if="c.pedigree" class="mendel-pedigree">
              <svg viewBox="0 0 440 210" role="img" aria-labelledby="pedigree-title"><title id="pedigree-title">Twee ouders zonder aandoening hebben een kind met aandoening en een kind zonder aandoening.</title><g fill="var(--color-panel)" stroke="var(--color-ink)" stroke-width="3"><rect x="110" y="16" width="40" height="40" /><circle cx="290" cy="36" r="20" /><path d="M150 36H270 M220 36V96 M132 96H308 M132 96V130 M308 96V130" fill="none" /><rect x="112" y="130" width="40" height="40" fill="var(--color-ink)" /><circle cx="308" cy="150" r="20" /></g><g fill="var(--color-ink)" font-size="16" text-anchor="middle"><text x="130" y="198">aandoening</text><text x="308" y="198">geen aandoening</text><text x="130" y="80">I-1</text><text x="290" y="80">I-2</text></g></svg>
              <figcaption>Vierkant = mannelijk · cirkel = vrouwelijk · gevuld = aandoening. Vereenvoudigd autosomaal recessief model, geen analyse van je eigen familie.</figcaption>
            </figure>
            <fieldset class="mendel-question"><legend>{{ c.question }}</legend><label v-for="(option, i) in c.options" :key="option" :class="{ 'mendel-selected': checks[c.id].choice === i }"><input type="radio" :name="`check-${c.id}`" :value="i" v-model="checks[c.id].choice" :disabled="checks[c.id].done" />{{ option }}</label></fieldset>
            <button v-if="!checks[c.id].done" class="btn btn-primary" :disabled="checks[c.id].choice === null" @click="checkReason(c)">Controleer antwoord</button>
            <p v-if="checks[c.id].attempted" class="mendel-feedback" :class="{ 'mendel-feedback-correct': checks[c.id].done }" role="status"><strong>{{ checks[c.id].done ? 'Juist.' : 'Nog niet.' }}</strong> {{ c.explanation }}</p>
          </article>
          <p v-if="checksCompleted === CHECKS.length" class="mendel-feedback mendel-feedback-correct">Begripsvragen afgerond. Bij je eerste poging waren {{ CHECKS.filter(c => checks[c.id].first).length }} van de {{ CHECKS.length }} antwoorden juist.</p>
        </section>
      </main>
      <footer class="fullscreen-foot mendel-footer">
        <div><strong>{{ coreCompleted }}/{{ core.length }} kernopdrachten · {{ checksCompleted }}/{{ CHECKS.length }} begripsvragen</strong><p>Boekhulp: de overige opdrachten zijn vrij te kiezen.</p></div>
        <button v-if="!resetPending" class="btn btn-ghost" @click="resetPending = true">Voortgang wissen</button>
        <template v-else><span>Alle labovoortgang wissen?</span><button class="btn btn-ghost" @click="resetPending = false">Annuleren</button><button class="btn btn-ghost" @click="resetAll">Ja, wissen</button></template>
        <button class="btn btn-primary" :disabled="!ready" @click="emit('complete')">Kernroute afronden</button>
      </footer>
    </div>
  </Teleport>
</template>

<style src="./mendel/mendel.css"></style>
