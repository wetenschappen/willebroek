<script setup>
import { computed, ref } from 'vue'
import { MODELS, cross, distribution, normalizeGenotype, percent } from '../../src/biology/mendel.js'
import PunnettTable from './PunnettTable.vue'

// State belongs to the shell so switching missions or closing the lab keeps work.
const props = defineProps({ mission: { type: Object, required: true }, state: { type: Object, required: true } })
const emit = defineEmits(['complete', 'reset'])
const model = computed(() => MODELS[props.mission.model])
const result = computed(() => cross(props.mission.model, ...props.mission.parents))
const notice = ref('')
const errors = ref({})
const countError = ref(false)
const stages = ['Gameten vormen', 'Zygoten combineren', 'Kansen afleiden', 'Verklaren']
const candidates = computed(() => {
  const valid = model.value.loci.reduce((items, alleles) => items.flatMap(p => alleles.map(a => p + a)), [''])
  return [...new Set([...valid, ...props.mission.parents, ...(props.mission.model === 'di' ? ['Gg', 'Rr'] : [])])]
})
const phenotypeCount = computed(() => result.value.cells.filter(c => c.phenotype === props.mission.target).length)
const genotypeCount = computed(() => result.value.cells.filter(c => c.genotype === props.mission.genotypeTarget).length)
const phenotypes = computed(() => distribution(result.value.cells))
const genotypes = computed(() => distribution(result.value.cells, 'genotype'))
const allCellsCorrect = computed(() => result.value.cells.every(c => props.state.checked[c.id]))

function toggleGamete(parent, value) {
  if (props.state.gametesCorrect) return
  const selection = props.state.gametes[parent]
  const index = selection.indexOf(value)
  if (index < 0) selection.push(value)
  else selection.splice(index, 1)
  notice.value = ''
}
function checkGametes() {
  const expected = [result.value.rows, result.value.columns]
  const correct = expected.every((list, i) => list.length === props.state.gametes[i].length && list.every(g => props.state.gametes[i].includes(g)))
  if (correct) {
    props.state.gametesCorrect = true
    notice.value = 'Juist. Elke gameet bevat één allel per gen. Alle getoonde gametentypes zijn hier even waarschijnlijk.'
  } else {
    notice.value = model.value.loci.length === 2
      ? 'Nog niet. Neem één allel uit het G/g-paar én één uit het R/r-paar. Maak alle combinaties die deze ouder kan vormen; Gg is geen gameet voor deze twee genen.'
      : 'Nog niet. Een gameet krijgt één van de twee allelen van de ouder, niet beide. Noteer elk mogelijk type slechts één keer.'
  }
}
function answer(id, value) { props.state.answers[id] = value; delete errors.value[id] }
function checkCells() {
  errors.value = {}
  for (const cell of result.value.cells) {
    if (props.state.checked[cell.id]) continue
    const correct = normalizeGenotype(props.state.answers[cell.id] || '', props.mission.model) === cell.genotype
    if (props.state.firstTry[cell.id] === undefined) props.state.firstTry[cell.id] = correct
    if (correct) { props.state.checked[cell.id] = true; props.state.answers[cell.id] = cell.genotype }
    else errors.value[cell.id] = true
  }
  notice.value = allCellsCorrect.value
    ? 'Alle vakken kloppen. Elk vak stelt één even waarschijnlijke combinatie van gameten voor, niet één verplicht kind.'
    : 'De juiste vakken staan vast. Verbeter de andere: één allel van elke ouder per gen. Schrijf bij twee genen eerst het G/g-paar, dan het R/r-paar.'
}
function workedCell() {
  const cell = result.value.cells.find(c => !props.state.checked[c.id])
  if (!cell) return
  const parts = model.value.loci.map((_, i) => `${cell.a[i]} + ${cell.b[i]} → ${cell.genotype.slice(i * 2, i * 2 + 2)}`)
  props.state.answers[cell.id] = cell.genotype
  props.state.checked[cell.id] = true
  if (props.state.firstTry[cell.id] === undefined) props.state.firstTry[cell.id] = false
  props.state.help++
  delete errors.value[cell.id]
  notice.value = `Voorgedaan: gameet ${cell.a} + gameet ${cell.b}. ${parts.join('; ')}. Genotype: ${cell.genotype}. Werk nu zelf verder.`
}
function checkCounts() {
  const a = props.state.phenotypeAnswer
  const b = props.state.genotypeAnswer
  const correct = a !== '' && b !== '' && Number(a) === phenotypeCount.value && Number(b) === genotypeCount.value
  countError.value = !correct
  props.state.countsCorrect = correct
  notice.value = correct
    ? `Juist. Deel elk aantal door ${result.value.cells.length} om de kans te berekenen. Genotype en fenotype zijn niet hetzelfde.`
    : 'Tel opnieuw: bij het fenotype tel je alle genotypes die dit kenmerk tonen. Bij het genotype tel je alleen de exact gevraagde allelencombinatie. Nul is ook mogelijk.'
}
function checkReason() {
  if (props.state.choice === null) { notice.value = 'Kies eerst een antwoord.'; return }
  if (props.state.reasonFirst === null) props.state.reasonFirst = props.state.choice === props.mission.correct
  if (props.state.choice === props.mission.correct) {
    props.state.done = true
    notice.value = 'Juist. Leg de redenering nu in je eigen woorden uit.'
    emit('complete')
  } else {
    notice.value = `Nog niet. ${props.mission.hint || model.value.rule} Vergelijk de antwoordopties opnieuw.`
  }
}
function next() { props.state.stage++; notice.value = '' }
</script>

<template>
  <article class="mendel-workbench">
    <header class="mendel-task-heading">
      <p class="fullscreen-label">{{ mission.core ? 'KERNOPDRACHT' : 'VERDIEPING / BOEKHULP' }}</p>
      <h3>{{ mission.label }}</h3><p v-if="state.stage === 0">{{ mission.task }}</p>
    </header>
    <div v-if="state.stage === 0" class="mendel-model-note"><strong>{{ model.label }}</strong><p>{{ model.legend }}</p><p>{{ model.rule }}</p></div>
    <details v-else class="mendel-model-details"><summary>Model en allelenlegenda · {{ mission.parents.join(' × ') }}</summary><p>{{ model.legend }}</p><p>{{ model.rule }}</p></details>
    <ol class="mendel-stages" aria-label="Stappenplan">
      <li v-for="(label, i) in stages" :key="label" :aria-current="state.stage === i ? 'step' : undefined">
        <span>{{ i + 1 }}</span>{{ label }}<strong v-if="state.stage > i"> · klaar</strong>
      </li>
    </ol>
    <h4>{{ state.stage + 1 }}. {{ stages[state.stage] }}</h4>

    <template v-if="state.stage === 0">
      <p>Selecteer voor <strong>elke ouder alle mogelijke gametentypes</strong>. De twee vakjes per gen stellen de allelen op de twee homologe chromosomen voor.</p>
      <div class="mendel-parents">
        <fieldset v-for="(parent, p) in mission.parents" :key="p" class="mendel-parent">
          <legend>Ouder {{ p + 1 }} · <span class="mendel-genotype">{{ parent }}</span> · {{ model.phenotype(parent) }}</legend>
          <div class="mendel-chromosomes" aria-label="Allelen op homologe chromosomen">
            <div v-for="(_, locus) in model.loci" :key="locus" class="mendel-locus">
              <small>Gen {{ locus + 1 }}</small><span>{{ parent[locus * 2] }}</span><span>{{ parent[locus * 2 + 1] }}</span>
            </div><span class="mendel-meiosis-label">meiose → één allel per gen</span>
          </div>
          <div class="mendel-gamete-options">
            <label v-for="g in candidates" :key="g" :class="{ 'mendel-selected': state.gametes[p].includes(g) }">
              <input type="checkbox" :checked="state.gametes[p].includes(g)" :disabled="state.gametesCorrect" @change="toggleGamete(p, g)" /><span>{{ g }}</span>
            </label>
          </div>
        </fieldset>
      </div>
      <button v-if="!state.gametesCorrect" class="btn btn-primary" @click="checkGametes">Controleer gameten</button>
      <button v-else class="btn btn-primary" @click="next">Naar het kruisingsvierkant →</button>
    </template>

    <template v-else-if="state.stage === 1">
      <p>Vul de genotypes in. Combineer één gameet van elke ouder. Hoofdletters en kleine letters hebben betekenis; <strong>Gg en gG zijn hetzelfde genotype</strong>.</p>
      <PunnettTable :result="result" :model="mission.model" editable :answers="state.answers" :checked="state.checked" :errors="errors" @answer="answer" />
      <div class="mendel-actions">
        <button v-if="!allCellsCorrect" class="btn btn-primary" @click="checkCells">Controleer vierkant</button>
        <button v-else class="btn btn-primary" @click="next">Naar de kansen →</button>
        <button v-if="!allCellsCorrect" class="btn btn-ghost" @click="workedCell">Werk één vak voor</button>
      </div>
    </template>

    <template v-else-if="state.stage === 2">
      <PunnettTable :result="result" :model="mission.model" />
      <p>Alle <strong>{{ result.cells.length }} vakken</strong> zijn even waarschijnlijk. Tel eerst, bereken daarna de kans.</p>
      <div class="mendel-count-questions">
        <label>Hoeveel vakken geven het fenotype <strong>{{ mission.target }}</strong>?
          <span><input type="number" min="0" :max="result.cells.length" step="1" v-model="state.phenotypeAnswer" :readonly="state.countsCorrect" :aria-invalid="countError" /> / {{ result.cells.length }}</span>
        </label>
        <label>Hoeveel vakken hebben precies genotype <strong class="mendel-genotype">{{ mission.genotypeTarget }}</strong>?
          <span><input type="number" min="0" :max="result.cells.length" step="1" v-model="state.genotypeAnswer" :readonly="state.countsCorrect" :aria-invalid="countError" /> / {{ result.cells.length }}</span>
        </label>
      </div>
      <button v-if="!state.countsCorrect" class="btn btn-primary" @click="checkCounts">Controleer kansen</button>
      <template v-else>
        <p class="mendel-feedback mendel-feedback-correct">{{ mission.target }}: {{ phenotypeCount }}/{{ result.cells.length }} = {{ percent(phenotypeCount / result.cells.length) }}. Genotype {{ mission.genotypeTarget }}: {{ genotypeCount }}/{{ result.cells.length }} = {{ percent(genotypeCount / result.cells.length) }}.</p>
        <button class="btn btn-primary" @click="next">Verklaar het resultaat →</button>
      </template>
    </template>

    <template v-else>
      <fieldset class="mendel-question">
        <legend>{{ mission.question }}</legend>
        <label v-for="(option, index) in mission.options" :key="option" :class="{ 'mendel-selected': state.choice === index }">
          <input type="radio" :name="`reason-${mission.id}`" :value="index" v-model="state.choice" :disabled="state.done" />{{ option }}
        </label>
      </fieldset>
      <button v-if="!state.done" class="btn btn-primary" @click="checkReason">Controleer verklaring</button>
      <template v-else>
        <p class="mendel-feedback mendel-feedback-correct"><strong>Opdracht afgerond.</strong> {{ mission.explanation }}</p>
        <div class="mendel-distributions">
          <section><h4>Genotypes</h4><ul><li v-for="row in genotypes" :key="row.label"><strong>{{ row.label }}</strong><span>{{ row.count }}/{{ row.total }} · {{ percent(row.probability) }}</span></li></ul></section>
          <section><h4>Fenotypes</h4><ul><li v-for="row in phenotypes" :key="row.label"><strong>{{ row.label }}</strong><span>{{ row.count }}/{{ row.total }} · {{ percent(row.probability) }}</span></li></ul></section>
        </div>
        <p>Hulp gebruikt bij {{ state.help }} vak{{ state.help === 1 ? '' : 'ken' }}. Je kunt deze opdracht altijd opnieuw oefenen.</p>
        <button class="btn btn-ghost" @click="emit('reset')">Deze opdracht opnieuw maken</button>
      </template>
    </template>
    <p v-if="notice" class="mendel-feedback" role="status">{{ notice }}</p>
  </article>
</template>
