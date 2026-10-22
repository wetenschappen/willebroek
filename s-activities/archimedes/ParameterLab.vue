<script setup>
import { computed, ref } from 'vue'
import { heldBody, format } from '../../src/physics/archimedes.js'
import { EXPERIMENTS, PREDICTIONS } from './tasks.js'
import { renderNotation } from './notation.js'
import BuoyancyScene from './BuoyancyScene.vue'
import ChoiceQuestion from './ChoiceQuestion.vue'
const props = defineProps({ states: { type: Object, required: true }, navigation: { type: Object, required: true } })
const experiment = computed(() => EXPERIMENTS.find(e => e.id === props.navigation.experiment))
const state = computed(() => props.states[experiment.value.id])
const notice = ref('')
function makeModel(value) { const e = experiment.value; return heldBody({ [e.field]: e.field === 'fraction' ? value / 100 : value }) }
const model = computed(() => makeModel(state.value.value))
const readings = computed(() => [{ label: 'A', value: experiment.value.a, measured: state.value.measuredA, model: makeModel(experiment.value.a) }, { label: 'B', value: experiment.value.b, measured: state.value.measuredB, model: makeModel(experiment.value.b) }])
const both = computed(() => state.value.measuredA && state.value.measuredB)
function selectExperiment(e) { props.navigation.experiment = e.id; notice.value = '' }
function measure() {
  const e = experiment.value, s = state.value
  if (Math.abs(s.value - e.a) < 1e-6) { s.measuredA = true; notice.value = 'Meting A vastgelegd.' }
  else if (Math.abs(s.value - e.b) < 1e-6) { s.measuredB = true; notice.value = 'Meting B vastgelegd.' }
  else notice.value = `Onderzoek gerust tussenwaarden. Zet voor de vergelijking eerst op A (${format(e.a, e.decimals)}) of B (${format(e.b, e.decimals)}).`
}
</script>
<template>
  <div class="arch-workbench">
    <header class="arch-heading"><h3>Physics Lab: één variabele tegelijk</h3><p>Voorspel eerst, meet A en B, verklaar daarna. Het blok wordt vastgehouden; het is nog niet vrijgelaten.</p></header>
    <nav class="arch-subnav" aria-label="Kies een parameteronderzoek"><button v-for="(e, i) in EXPERIMENTS" :key="e.id" class="btn btn-ghost" :aria-current="experiment.id === e.id ? 'step' : undefined" @click="selectExperiment(e)">{{ i + 1 }} · {{ e.label }}{{ states[e.id].done ? ' · klaar' : '' }}</button></nav>
    <label class="arch-mobile-picker" for="arch-experiment">Onderzoek<select id="arch-experiment" v-model="navigation.experiment" @change="notice = ''"><option v-for="(e, i) in EXPERIMENTS" :key="e.id" :value="e.id">{{ i + 1 }} · {{ e.label }}{{ states[e.id].done ? ' · klaar' : '' }}</option></select></label>
    <h4>{{ experiment.label }}</h4>
    <div class="arch-two-columns">
      <div class="arch-visual-column">
        <BuoyancyScene :model="model" :layer="experiment.id === 'depth' ? 'pressure' : experiment.id === 'volume' ? 'volume' : 'balance'" :reveal="state.locked" fixed-scale />
        <p class="arch-model-note">Gelijk gehouden: <span v-html="renderNotation(experiment.id === 'density' ? 'g, V_ond, diepte en het voorwerp.' : experiment.id === 'volume' ? 'de vloeistof, g en het hele voorwerp. Alleen het ondergedompelde deel verandert.' : experiment.id === 'gravity' ? 'vloeistofdichtheid, ondergedompeld volume, diepte en massa.' : experiment.id === 'depth' ? 'vloeistof, g en volledig ondergedompeld volume van een star blok.' : 'vloeistof, g, diepte en volledig ondergedompeld volume.')"></span></p>
        <p v-if="state.locked" class="arch-live-reading">Actueel: <strong>F<sub>A</sub> = {{ format(model.FA, 3) }} N</strong> · F<sub>G</sub> = {{ format(model.FG, 3) }} N</p>
        <p v-if="state.locked">{{ Math.abs(model.holdingForce) < 1e-8 ? 'Bij deze instelling is geen extra vasthoudkracht nodig.' : `Vasthouden vraagt daarnaast ${format(Math.abs(model.holdingForce), 3)} N ${model.holdingForce > 0 ? 'omhoog' : 'omlaag'}. Die extra kracht is niet getekend.` }}</p>
      </div>
      <section :key="experiment.id">
        <fieldset class="arch-question"><legend v-html="renderNotation(experiment.prompt)"></legend><label v-for="(option, i) in PREDICTIONS" :key="option" :class="{ 'arch-selected': state.prediction === i }"><input type="radio" :name="`predict-${experiment.id}`" :value="i" v-model="state.prediction" :disabled="state.locked" /><span v-html="renderNotation(option)"></span></label></fieldset>
        <button v-if="!state.locked" class="btn btn-primary" :disabled="state.prediction === null" @click="state.locked = true">Voorspelling vastleggen</button>
        <div v-if="state.locked" class="arch-control-panel">
          <label :for="`range-${experiment.id}`"><strong><span v-html="renderNotation(experiment.symbol)"></span> = {{ format(state.value, experiment.decimals) }} {{ experiment.unit }}</strong></label>
          <input :id="`range-${experiment.id}`" type="range" :min="experiment.min" :max="experiment.max" :step="experiment.step" v-model.number="state.value" :aria-valuetext="`${format(state.value, experiment.decimals)} ${experiment.unit}`" />
          <div class="arch-actions"><button class="btn btn-ghost" @click="state.value = experiment.a">Zet op A: {{ format(experiment.a, experiment.decimals) }}</button><button class="btn btn-ghost" @click="state.value = experiment.b">Zet op B: {{ format(experiment.b, experiment.decimals) }}</button><button class="btn btn-primary" @click="measure">Meting vastleggen</button></div>
          <p role="status">{{ notice || 'Leg beide metingen vast. Je mag tussendoor de schuifregelaar onderzoeken.' }}</p>
        </div>
      </section>
    </div>
    <div v-if="state.locked" class="arch-table-scroll"><table class="arch-measurements"><caption>Vergelijk je metingen · alle andere instellingen blijven gelijk</caption><thead><tr><th scope="col">Meting</th><th scope="col"><span v-html="renderNotation(experiment.symbol)"></span> ({{ experiment.unit }})</th><th scope="col">V<sub>vl</sub> (cm³)</th><th scope="col">p₁ (Pa)</th><th scope="col">p₂ (Pa)</th><th scope="col">F<sub>A</sub> (N)</th><th scope="col">F<sub>G</sub> (N)</th></tr></thead><tbody><tr v-for="reading in readings" :key="reading.label"><th scope="row">{{ reading.label }} · {{ reading.measured ? 'gemeten' : 'nog meten' }}</th><template v-if="reading.measured"><td>{{ format(reading.value, experiment.decimals) }}</td><td>{{ format(reading.model.submergedVolume * 1e6, 0) }}</td><td>{{ format(reading.model.p1, 1) }}</td><td>{{ format(reading.model.p2, 1) }}</td><td>{{ format(reading.model.FA, 3) }}</td><td>{{ format(reading.model.FG, 3) }}</td></template><td v-else colspan="6">Stel de waarde in en leg de meting vast.</td></tr></tbody></table></div>
    <div v-if="both" class="arch-experiment-check">
      <p class="arch-feedback" :class="{ 'arch-correct': state.prediction === experiment.prediction }"><strong>{{ state.prediction === experiment.prediction ? 'Je voorspelling klopte.' : 'Je metingen corrigeren je voorspelling.' }}</strong> {{ PREDICTIONS[experiment.prediction] }} Je oorspronkelijke voorspelling blijft bewaard.</p>
      <ChoiceQuestion :question="experiment" :state="state" :name="`reason-${experiment.id}`" />
      <button v-if="state.done && EXPERIMENTS.findIndex(e => e.id === experiment.id) < EXPERIMENTS.length - 1" class="btn btn-primary" @click="selectExperiment(EXPERIMENTS[EXPERIMENTS.findIndex(e => e.id === experiment.id) + 1])">Volgend onderzoek</button>
    </div>
  </div>
</template>
