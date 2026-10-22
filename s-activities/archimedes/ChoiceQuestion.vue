<script setup>
import { renderNotation } from './notation.js'
const props = defineProps({ question: { type: Object, required: true }, state: { type: Object, required: true }, name: { type: String, required: true } })
const emit = defineEmits(['correct'])
function check() {
  const s = props.state
  if (s.choice === null || s.done) return
  const correct = s.choice === props.question.correct
  if (s.first === null) s.first = correct
  s.attempted = true
  s.done = correct
  if (correct) emit('correct')
}
</script>
<template>
  <div class="arch-question-block">
    <fieldset class="arch-question"><legend v-html="renderNotation(question.question)"></legend>
      <label v-for="(option, i) in question.options" :key="option" :class="{ 'arch-selected': state.choice === i }"><input type="radio" :name="name" :value="i" v-model="state.choice" :disabled="state.done" /><span v-html="renderNotation(option)"></span></label>
    </fieldset>
    <button v-if="!state.done" class="btn btn-primary" :disabled="state.choice === null" @click="check">Controleer antwoord</button>
    <p v-if="state.attempted" class="arch-feedback" :class="{ 'arch-correct': state.done }" role="status"><strong>{{ state.done ? 'Juist.' : 'Nog niet.' }}</strong> <span v-html="renderNotation(question.explanation)"></span></p>
  </div>
</template>
