<script setup>
import { computed, nextTick, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { PhX } from '@phosphor-icons/vue'
import { heldBody, releasedBody, format } from '../src/physics/archimedes.js'
import { processMathText } from '../src/composables/useMathEngine.js'
import { DERIVATION, EXPERIMENTS, VOLUME_CHECKS, BALANCE_CASES } from './archimedes/tasks.js'
import ChoiceQuestion from './archimedes/ChoiceQuestion.vue'
import BuoyancyScene from './archimedes/BuoyancyScene.vue'
import DerivationBuilder from './archimedes/DerivationBuilder.vue'
import ParameterLab from './archimedes/ParameterLab.vue'
import { renderNotation } from './archimedes/notation.js'

const props = defineProps({ id: { type: String, required: true }, title: { type: String, default: 'Archimedes: afleiding en Physics Lab' }, phase: { type: String, default: 'investigate' }, storageKey: { type: String, default: 'fys4-t1-archimedes' } })
const emit = defineEmits(['close', 'complete'])
const shell = ref(null), mode = ref(props.phase === 'apply' ? 'balance' : 'volume')
const resetPending = ref(false), storageAvailable = ref(true)
const tabs = [{ id: 'volume', label: 'Welke volumes?' }, { id: 'derive', label: 'Afleidingbouwer' }, { id: 'lab', label: 'Physics Lab' }, { id: 'balance', label: 'Drijven en gassen' }]
const answer = () => ({ choice: null, first: null, attempted: false, done: false })
const fresh = () => ({
  volume: Object.fromEntries(VOLUME_CHECKS.map(q => [q.id, answer()])),
  derivation: DERIVATION.map(answer),
  experiments: Object.fromEntries(EXPERIMENTS.map(e => [e.id, { ...answer(), prediction: null, locked: false, measuredA: false, measuredB: false, value: e.a }])),
  balances: Object.fromEntries(BALANCE_CASES.map(c => [c.id, { relation: answer(), behavior: answer() }])),
  navigation: { derivation: 0, experiment: 'density', balance: 'sink' }
})
const state = reactive(fresh())
const fraction = ref(0.5), topDepth = ref(0.2)
const volumeModel = computed(() => heldBody({ fraction: fraction.value, topDepth: topDepth.value }))
const activeCase = computed(() => BALANCE_CASES.find(c => c.id === state.navigation.balance))
const balanceModel = computed(() => activeCase.value.settled ? releasedBody(activeCase.value.options) : heldBody(activeCase.value.options))
const relationQuestion = computed(() => ({ question: 'Welke vergelijking geldt voor F_A en F_G?', options: ['F_A < F_G', 'F_A = F_G', 'F_A > F_G'], correct: ['<', '=', '>'].indexOf(activeCase.value.relation), explanation: activeCase.value.explanation }))
const behaviorQuestion = computed(() => ({ question: 'Welke toestand hoort bij deze situatie?', options: ['Het voorwerp zinkt.', 'Het voorwerp zweeft.', 'Het voorwerp stijgt.', 'Het voorwerp drijft aan het oppervlak.'], correct: ['zinkt', 'zweeft', 'stijgt', 'drijft'].indexOf(activeCase.value.behavior), explanation: activeCase.value.explanation }))
const investigateDone = computed(() => Object.values(state.volume).filter(s => s.done).length + state.derivation.filter(s => s.done).length + Object.values(state.experiments).filter(s => s.done).length)
const investigateMax = VOLUME_CHECKS.length + DERIVATION.length + EXPERIMENTS.length
const balanceDone = computed(() => Object.values(state.balances).filter(s => s.relation.done && s.behavior.done).length)
const count = computed(() => props.phase === 'apply' ? balanceDone.value : investigateDone.value)
const maximum = computed(() => props.phase === 'apply' ? BALANCE_CASES.length : investigateMax)
const ready = computed(() => count.value === maximum.value)
const key = `willebroek:archimedes:v1:${props.storageKey}`
let opener
// Restore only known fields and types. Unknown/corrupt stored objects cannot
// inject task text or replace the scientific model.
function restoreFields(target, saved) {
  if (!saved || typeof saved !== 'object') return
  for (const k of Object.keys(target)) {
    if (target[k] && typeof target[k] === 'object') restoreFields(target[k], saved[k])
    else if (target[k] === null) {
      if (k === 'first' && typeof saved[k] === 'boolean') target[k] = saved[k]
      else if (['choice', 'prediction'].includes(k) && Number.isInteger(saved[k]) && saved[k] >= 0 && saved[k] < 5) target[k] = saved[k]
    } else if (typeof target[k] === typeof saved[k]) target[k] = saved[k]
  }
}
try {
  const saved = JSON.parse(localStorage.getItem(key) || 'null')
  if (saved?.version === 1) restoreFields(state, saved.state)
} catch { storageAvailable.value = false }
state.navigation.derivation = Number.isInteger(state.navigation.derivation) ? Math.max(0, Math.min(DERIVATION.length - 1, state.navigation.derivation)) : 0
if (!EXPERIMENTS.some(e => e.id === state.navigation.experiment)) state.navigation.experiment = 'density'
if (!BALANCE_CASES.some(c => c.id === state.navigation.balance)) state.navigation.balance = 'sink'
for (const e of EXPERIMENTS) if (!Number.isFinite(state.experiments[e.id].value) || state.experiments[e.id].value < e.min || state.experiments[e.id].value > e.max) state.experiments[e.id].value = e.a
watch(state, () => { try { localStorage.setItem(key, JSON.stringify({ version: 1, state })) } catch { storageAvailable.value = false } }, { deep: true })
function resetAll() { Object.assign(state, fresh()); mode.value = props.phase === 'apply' ? 'balance' : 'volume'; fraction.value = 0.5; topDepth.value = 0.2; resetPending.value = false }
function tabKey(event, index) {
  const target = { ArrowRight: (index + 1) % tabs.length, ArrowLeft: (index + tabs.length - 1) % tabs.length, Home: 0, End: tabs.length - 1 }[event.key]
  if (target === undefined) return
  event.preventDefault(); mode.value = tabs[target].id
  nextTick(() => shell.value.querySelector(`#arch-tab-${mode.value}`)?.focus())
}
function handleKeydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); emit('close'); return }
  if (event.key !== 'Tab') return
  const controls = [...shell.value.querySelectorAll('button:not(:disabled), input:not(:disabled), select, summary, [tabindex="0"]')].filter(e => e.getClientRects().length && e.tabIndex >= 0)
  const first = controls[0], last = controls.at(-1)
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
}
onMounted(() => { opener = document.activeElement; shell.value.querySelector(`#arch-tab-${mode.value}`)?.focus(); window.addEventListener('keydown', handleKeydown) })
onUnmounted(() => { window.removeEventListener('keydown', handleKeydown); if (opener?.isConnected) opener.focus() })
</script>

<template>
  <Teleport to="body">
    <div ref="shell" class="modal-fullscreen arch-lab" role="dialog" aria-modal="true" aria-labelledby="arch-title" @keydown.stop="handleKeydown">
      <header class="fullscreen-bar fullscreen-bar-digital"><div><h2 id="arch-title" class="fullscreen-title">{{ title }}</h2><p>{{ phase === 'apply' ? 'Uur 2: krachtenbalansen in vloeistoffen en gassen' : 'Uur 1: volumes begrijpen, afleiden en onderzoeken' }}</p></div><button class="btn-close ml-auto" aria-label="Archimedeslab sluiten" @click="emit('close')"><PhX class="text-2xl" /></button></header>
      <div class="fullscreen-progress" role="progressbar" aria-label="Voortgang van dit lesuur" :aria-valuenow="count" :aria-valuemax="maximum" aria-valuemin="0"><span :style="{ width: `${100 * count / maximum}%` }"></span></div>
      <nav class="arch-tabs" role="tablist" aria-label="Kies een onderdeel"><button v-for="(tab, i) in tabs" :key="tab.id" :id="`arch-tab-${tab.id}`" class="btn btn-ghost" role="tab" :aria-selected="mode === tab.id" :aria-controls="`arch-panel-${tab.id}`" :tabindex="mode === tab.id ? 0 : -1" @click="mode = tab.id" @keydown="tabKey($event, i)">{{ tab.label }}</button></nav>
      <main class="fullscreen-body arch-body">
        <p v-if="!storageAvailable" class="arch-feedback" role="status">Je browser kon de voortgang niet laden of bewaren. Werk blijft beschikbaar zolang dit venster openstaat.</p>
        <section v-if="mode === 'volume'" id="arch-panel-volume" role="tabpanel" aria-labelledby="arch-tab-volume" class="arch-workbench">
          <header class="arch-heading"><h3>Dezelfde ruimte, twee beschrijvingen</h3><p v-html="renderNotation('V_vl is de verplaatste vloeistof, niet de totale inhoud van de bak. V_ond is het ondergedompelde deel van het voorwerp.')"></p></header>
          <div class="arch-two-columns"><BuoyancyScene :model="volumeModel" /><div>
            <p class="arch-formula" v-html="processMathText('\\(V_{\\mathrm{vl}}=V_{\\mathrm{ond}}\\)')"></p>
            <div class="arch-actions"><button class="btn btn-ghost" @click="fraction = 0.5; topDepth = 0.2">Half ondergedompeld</button><button class="btn btn-ghost" @click="fraction = 1; topDepth = 0.2">Volledig ondergedompeld</button><button class="btn btn-ghost" @click="fraction = 1; topDepth = 1">Volledig, maar dieper</button></div>
            <dl class="arch-readings"><div><dt>Totaal voorwerpvolume V<sub>vw</sub></dt><dd>1 000 cm³</dd></div><div><dt>Ondergedompeld volume V<sub>ond</sub></dt><dd>{{ format(volumeModel.submergedVolume * 1e6, 0) }} cm³</dd></div><div><dt>Verplaatste vloeistof V<sub>vl</sub></dt><dd>{{ format(volumeModel.displacedVolume * 1e6, 0) }} cm³</dd></div></dl>
            <p>Alleen bij volledige onderdompeling zijn alle drie de volumes gelijk. De massa’s hoeven niet gelijk te zijn.</p>
          </div></div>
          <ChoiceQuestion v-for="q in VOLUME_CHECKS" :key="q.id" :question="q" :state="state.volume[q.id]" :name="`volume-${q.id}`" />
          <button class="btn btn-primary" @click="mode = 'derive'">Naar de afleidingbouwer</button>
        </section>
        <section v-if="mode === 'derive'" id="arch-panel-derive" role="tabpanel" aria-labelledby="arch-tab-derive"><DerivationBuilder :states="state.derivation" :navigation="state.navigation" /><button class="btn btn-ghost" @click="mode = 'lab'">Naar het Physics Lab</button></section>
        <section v-if="mode === 'lab'" id="arch-panel-lab" role="tabpanel" aria-labelledby="arch-tab-lab"><ParameterLab :states="state.experiments" :navigation="state.navigation" /></section>
        <section v-if="mode === 'balance'" id="arch-panel-balance" role="tabpanel" aria-labelledby="arch-tab-balance" class="arch-workbench">
          <header class="arch-heading"><h3>Van kracht naar gedrag</h3><p>Maak onderscheid tussen het ogenblik van loslaten en het uiteindelijke drijvende evenwicht. We verwaarlozen luchtweerstand en de opwaartse kracht van lucht bij de vloeistofgevallen.</p></header>
          <nav class="arch-subnav" aria-label="Kies een krachtenbalans"><button v-for="(c, i) in BALANCE_CASES" :key="c.id" class="btn btn-ghost" :aria-current="activeCase.id === c.id ? 'step' : undefined" @click="state.navigation.balance = c.id">{{ i + 1 }} · {{ c.gas ? 'Ballon' : c.id === 'float' ? 'Drijven' : c.id === 'rise' ? 'Stijgen' : c.id === 'neutral' ? 'Zweven' : 'Zinken' }}{{ state.balances[c.id].relation.done && state.balances[c.id].behavior.done ? ' · klaar' : '' }}</button></nav>
          <label class="arch-mobile-picker" for="arch-balance">Situatie<select id="arch-balance" v-model="state.navigation.balance"><option v-for="(c, i) in BALANCE_CASES" :key="c.id" :value="c.id">{{ i + 1 }} · {{ c.label }}{{ state.balances[c.id].relation.done && state.balances[c.id].behavior.done ? ' · klaar' : '' }}</option></select></label>
          <h4>{{ activeCase.label }}</h4><p>{{ activeCase.description }}</p>
          <div class="arch-two-columns"><BuoyancyScene :model="balanceModel" layer="balance" :gas="activeCase.gas" /><div :key="activeCase.id"><ChoiceQuestion :question="relationQuestion" :state="state.balances[activeCase.id].relation" :name="`relation-${activeCase.id}`" /><ChoiceQuestion v-if="state.balances[activeCase.id].relation.done" :question="behaviorQuestion" :state="state.balances[activeCase.id].behavior" :name="`behavior-${activeCase.id}`" /></div></div>
          <p class="arch-model-note" v-html="renderNotation('Drijven is evenwicht: F_A = F_G. In F_A gebruik je het ondergedompelde volume; voor F_G de massa van het hele voorwerp. We voeren geen aparte drijfformule in.')"></p>
        </section>
      </main>
      <footer class="fullscreen-foot arch-footer"><div><strong>{{ count }}/{{ maximum }} onderdelen van dit lesuur afgerond</strong><p>Beide lessen delen dezelfde lokaal bewaarde labovoortgang.</p></div><button v-if="!resetPending" class="btn btn-ghost" @click="resetPending = true">Voortgang wissen</button><template v-else><span>Alle labovoortgang wissen?</span><button class="btn btn-ghost" @click="resetPending = false">Annuleren</button><button class="btn btn-ghost" @click="resetAll">Ja, wissen</button></template><button class="btn btn-primary" :disabled="!ready" @click="emit('complete')">{{ phase === 'apply' ? 'Krachtenbalansen afronden' : 'Onderzoek afronden' }}</button></footer>
    </div>
  </Teleport>
</template>

<style src="./archimedes/archimedes.css"></style>
