<script setup>
import { normalizeGenotype } from '../../src/biology/mendel.js'
import TraitSymbol from './TraitSymbol.vue'
const props = defineProps({
  result: { type: Object, required: true }, model: { type: String, required: true },
  editable: Boolean, answers: { type: Object, default: () => ({}) },
  checked: { type: Object, default: () => ({}) }, errors: { type: Object, default: () => ({}) },
  showPhenotypes: Boolean
})
const emit = defineEmits(['answer'])
function update(cell, value) { emit('answer', cell.id, value) }
function cellAt(r, c) { return props.result.cells[r * props.result.columns.length + c] }
</script>

<template>
  <div class="mendel-table-scroll">
    <table class="mendel-punnett">
      <caption>Kruisingsvierkant · gameten van ouder 1 links, ouder 2 bovenaan</caption>
      <thead><tr><th scope="col">1 ↓ / 2 →</th><th v-for="g in result.columns" :key="g" scope="col">{{ g }}</th></tr></thead>
      <tbody>
        <tr v-for="(a, r) in result.rows" :key="a">
          <th scope="row">{{ a }}</th>
          <td v-for="(b, c) in result.columns" :key="b" :class="{ 'mendel-cell-correct': editable && checked[cellAt(r, c).id] }">
            <template v-if="editable">
              <label :for="`cross-cell-${r}-${c}`" class="sr-only">Gameet {{ a }} met {{ b }}: genotype nakomeling</label>
              <input :id="`cross-cell-${r}-${c}`" type="text" autocomplete="off" autocapitalize="off" spellcheck="false"
                :value="answers[cellAt(r, c).id] || ''" :readonly="!!checked[cellAt(r, c).id]"
                :aria-invalid="!!errors[cellAt(r, c).id]" :aria-describedby="errors[cellAt(r, c).id] ? `cell-error-${r}-${c}` : undefined"
                @input="update(cellAt(r, c), $event.target.value)"
                @blur="normalizeGenotype(answers[cellAt(r,c).id] || '', model) && update(cellAt(r,c), normalizeGenotype(answers[cellAt(r,c).id], model))" />
              <span v-if="checked[cellAt(r, c).id]" class="mendel-cell-status">Juist</span>
              <span v-if="errors[cellAt(r, c).id]" :id="`cell-error-${r}-${c}`" class="mendel-cell-error">Combineer {{ a }} + {{ b }} per gen.</span>
            </template>
            <template v-else>
              <strong>{{ cellAt(r, c).genotype }}</strong>
              <template v-if="showPhenotypes"><TraitSymbol :model="model" :genotype="cellAt(r, c).genotype" :label="cellAt(r, c).phenotype" /><small>{{ cellAt(r, c).phenotype }}</small></template>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
