<script setup>
import { computed } from 'vue'
import { heldBody } from '../../src/physics/archimedes.js'
import { processMathText } from '../../src/composables/useMathEngine.js'
import { DERIVATION } from './tasks.js'
import ChoiceQuestion from './ChoiceQuestion.vue'
import BuoyancyScene from './BuoyancyScene.vue'
const props = defineProps({ states: { type: Array, required: true }, navigation: { type: Object, required: true } })
const step = computed(() => DERIVATION[props.navigation.derivation])
const model = heldBody()
const allDone = computed(() => props.states.every(s => s.done))
</script>
<template>
  <div class="arch-workbench">
    <header class="arch-heading"><h3>Afleidingbouwer</h3><p>WACO p. 51. Eén denkstap tegelijk; een juist antwoord staat vast.</p></header>
    <div class="arch-two-columns">
      <div class="arch-visual-column"><BuoyancyScene :model="model" :layer="step.scene" :reveal="navigation.derivation > 0 || states[0].done" /><p class="arch-model-note">Volledig ondergedompelde kubus: boven op h₁, onder op h₂. De ribbe is z en elk vlak heeft oppervlakte A. We bekijken eerst alleen de krachten van de vloeistof.</p></div>
      <section>
        <p class="arch-eyebrow">Denkstap {{ navigation.derivation + 1 }} van {{ DERIVATION.length }} {{ states[navigation.derivation].done ? '· afgerond' : '' }}</p><h4>{{ step.title }}</h4>
        <ChoiceQuestion :key="navigation.derivation" :question="step" :state="states[navigation.derivation]" :name="`derive-${navigation.derivation}`" />
        <div v-if="states[navigation.derivation].done" class="arch-formula" v-html="processMathText(`\\( ${step.formula} \\)`)"></div>
        <div class="arch-actions"><button class="btn btn-ghost" :disabled="navigation.derivation === 0" @click="navigation.derivation--">Vorige denkstap</button><button v-if="navigation.derivation < DERIVATION.length - 1" class="btn btn-primary" :disabled="!states[navigation.derivation].done" @click="navigation.derivation++">Volgende denkstap</button></div>
      </section>
    </div>
    <details class="arch-details"><summary>De afleiding tot nu toe</summary><p v-for="(s, i) in DERIVATION.slice(0, navigation.derivation + 1).filter((_, i) => states[i].done)" :key="i" v-html="processMathText(`\\( ${s.formula} \\)`)"></p><p v-if="!states.some(s => s.done)">Je eerste juiste denkstap verschijnt hier.</p></details>
    <p v-if="allDone" class="arch-feedback arch-correct">Afleiding afgerond. Onderzoek nu in het Physics Lab welke factoren de archimedeskracht veranderen.</p>
  </div>
</template>
