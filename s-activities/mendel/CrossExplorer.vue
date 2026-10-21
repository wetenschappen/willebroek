<script setup>
import { computed, ref, watch } from 'vue'
import { MODELS, cross, genotypeOptions, distribution, drawOffspring, percent } from '../../src/biology/mendel.js'
import PunnettTable from './PunnettTable.vue'
import TraitSymbol from './TraitSymbol.vue'

const modelId = ref('mono')
const parentA = ref('Gg')
const parentB = ref('Gg')
const revealed = ref(0)
const sample = ref([])
const target = ref('Groen')
const prediction = ref('')
const model = computed(() => MODELS[modelId.value])
const options = computed(() => genotypeOptions(modelId.value))
const result = computed(() => cross(modelId.value, parentA.value, parentB.value))
const stats = computed(() => distribution(result.value.cells))
const possiblePhenotypes = computed(() => [...new Set(options.value.map(g => model.value.phenotype(g)))])
const chance = computed(() => result.value.cells.filter(c => c.phenotype === target.value).length / result.value.cells.length)
const survivors = computed(() => distribution(result.value.cells.filter(c => c.viable)))
const defaults = { mono: ['Gg', 'Gg'], di: ['GgRr', 'GgRr'], intermediate: ['RW', 'RW'], codominant: ['RW', 'RW'], abo: ['Ao', 'Bo'], lethal: ['GW', 'GW'] }
watch(modelId, id => {
  ;[parentA.value, parentB.value] = defaults[id]
  target.value = possiblePhenotypes.value.at(-1)
  reset()
}, { flush: 'sync' })
watch([parentA, parentB], reset)
watch(target, () => { prediction.value = '' })
function reset() { revealed.value = 0; sample.value = []; prediction.value = '' }
function draw(count) { sample.value.push(...drawOffspring(result.value.cells, Math.min(count, 10000 - sample.value.length))) }
function observed(label) { return sample.value.filter(c => c.phenotype === label).length }
function usePreset(a, b) { parentA.value = a; parentB.value = b; reset() }
</script>

<template>
  <article class="mendel-workbench">
    <header class="mendel-task-heading"><p class="fullscreen-label">DEMONSTREREN / ZELF ONDERZOEKEN</p><h3>Vrij kruisingslab</h3><p>Verander de ouders, voorspel het resultaat en test je redenering. De uitwerking verschijnt pas als je ze opvraagt.</p></header>
    <div class="mendel-explorer-controls">
      <label>Overervingsmodel<select v-model="modelId"><option v-for="(m, key) in MODELS" :key="key" :value="key">{{ m.label }}</option></select></label>
      <label>Ouder 1<select v-model="parentA"><option v-for="g in options" :key="g">{{ g }}</option></select><span>{{ model.phenotype(parentA) }}</span></label>
      <label>Ouder 2<select v-model="parentB"><option v-for="g in options" :key="g">{{ g }}</option></select><span>{{ model.phenotype(parentB) }}</span></label>
    </div>
    <div class="mendel-model-note"><strong>{{ model.legend }}</strong><p>{{ model.rule }}</p></div>
    <div v-if="modelId === 'mono'" class="mendel-actions"><button class="btn btn-ghost" @click="usePreset('GG', 'gg')">P: GG × gg</button><button class="btn btn-ghost" @click="usePreset('Gg', 'Gg')">F₁ × F₁</button><button class="btn btn-ghost" @click="usePreset('Gg', 'gg')">Testkruising</button></div>
    <div v-if="modelId === 'di'" class="mendel-actions"><button class="btn btn-ghost" @click="usePreset('GGRR', 'ggrr')">P: raszuiver</button><button class="btn btn-ghost" @click="usePreset('GgRr', 'GgRr')">F₁ × F₁</button><button class="btn btn-ghost" @click="usePreset('GgRr', 'ggrr')">Testkruising</button></div>
    <fieldset class="mendel-prediction"><legend>Voorspel vóór je onthult</legend>
      <label>Fenotype<select v-model="target"><option v-for="p in possiblePhenotypes" :key="p">{{ p }}</option></select></label>
      <label>Mijn voorspelde kans (%)<input type="number" min="0" max="100" step="any" v-model="prediction" /></label>
    </fieldset>
    <div class="mendel-actions">
      <button v-if="revealed === 0" class="btn btn-primary" @click="revealed = 1">1. Toon gameten</button>
      <button v-if="revealed === 1" class="btn btn-primary" @click="revealed = 2">2. Bouw kruisingsvierkant</button>
      <button v-if="revealed === 2" class="btn btn-primary" @click="revealed = 3">3. Analyseer kansen</button>
      <button class="btn btn-ghost" @click="reset">Verberg uitwerking</button>
    </div>
    <section v-if="revealed >= 1" class="mendel-reveal">
      <h4>1. Meiose → gameten</h4>
      <div class="mendel-parents"><p><strong>Ouder 1: {{ parentA }}</strong><br /><span class="mendel-genotype">{{ result.rows.join(' · ') }}</span><br />Elk type: {{ percent(1 / result.rows.length) }}</p><p><strong>Ouder 2: {{ parentB }}</strong><br /><span class="mendel-genotype">{{ result.columns.join(' · ') }}</span><br />Elk type: {{ percent(1 / result.columns.length) }}</p></div>
      <p>Eén allel per gen in elke gameet. Verschillende gameten kunnen hetzelfde type hebben: daarom tonen we elk <strong>type</strong> maar één keer.</p>
    </section>
    <section v-if="revealed >= 2" class="mendel-reveal"><h4>2. Bevruchting → mogelijke zygoten</h4><PunnettTable :result="result" :model="modelId" :show-phenotypes="revealed >= 3" /></section>
    <section v-if="revealed >= 3" class="mendel-reveal">
      <h4>3. Van vakken naar kansen</h4>
      <p class="mendel-feedback" role="status"><strong>{{ target }}: {{ percent(chance) }}.</strong><template v-if="prediction !== ''"> Je voorspelde {{ prediction }}%. {{ Math.abs(Number(prediction) - chance * 100) < 0.02 ? 'Je voorspelling klopt.' : 'Vergelijk je voorspelling met de vakken in het vierkant.' }}</template></p>
      <div class="mendel-distributions">
        <section><h4>Genotypes</h4><ul><li v-for="row in distribution(result.cells, 'genotype')" :key="row.label"><strong>{{ row.label }}</strong><span>{{ row.count }}/{{ row.total }} · {{ percent(row.probability) }}</span></li></ul></section>
        <section><h4>Fenotypes</h4><ul><li v-for="row in stats" :key="row.label"><strong>{{ row.label }}</strong><span>{{ row.count }}/{{ row.total }} · {{ percent(row.probability) }}</span></li></ul></section>
      </div>
      <section v-if="modelId === 'lethal'" class="mendel-model-note"><h4>Andere noemer: alleen overlevenden</h4><p v-for="row in survivors" :key="row.label">{{ row.label }}: {{ row.count }}/{{ row.total }} = {{ percent(row.probability) }}</p><p>Vergelijk dit met de kansen onder <strong>alle zygoten</strong> hierboven.</p></section>
      <h4>Test het toeval</h4><p>Elke trekking kiest opnieuw, onafhankelijk, één mogelijk vak. De theoretische kans verandert niet na een geboorte.</p>
      <div class="mendel-actions"><button v-for="n in [1, 20, 1000]" :key="n" class="btn btn-primary" :disabled="sample.length >= 10000" @click="draw(n)">+ {{ n }} nakomeling{{ n === 1 ? '' : 'en' }}</button><button class="btn btn-ghost" @click="sample = []">Steekproef wissen</button></div>
      <p role="status"><strong>{{ sample.length }} getrokken nakomelingen</strong> · maximum 10 000. Een kleine steekproef hoeft niet precies de verwachte verhouding te geven.</p>
      <figure v-if="sample.length && ['mono', 'di', 'intermediate', 'codominant'].includes(modelId)" class="mendel-sample">
        <figcaption>De laatste {{ Math.min(sample.length, 24) }} nakomelingen · {{ model.legend }}</figcaption>
        <ul><li v-for="(child, i) in sample.slice(-24)" :key="i"><TraitSymbol :model="modelId" :genotype="child.genotype" :label="child.phenotype" /><strong>{{ child.genotype }}</strong><small>{{ child.phenotype }}</small></li></ul>
      </figure>
      <div v-if="sample.length" class="mendel-table-scroll"><table class="mendel-observations"><caption>Verwachte kans en waargenomen frequentie</caption><thead><tr><th>Fenotype</th><th>Theorie</th><th>Aantal</th><th>Waargenomen</th></tr></thead><tbody><tr v-for="row in stats" :key="row.label"><th scope="row">{{ row.label }}</th><td>{{ percent(row.probability) }}</td><td>{{ observed(row.label) }}/{{ sample.length }}</td><td><span class="mendel-frequency"><span :style="{ width: percent(observed(row.label) / sample.length) }"></span></span>{{ percent(observed(row.label) / sample.length) }}</td></tr></tbody></table></div>
    </section>
  </article>
</template>
