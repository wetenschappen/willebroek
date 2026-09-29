<script setup>
import { shallowRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import LessonContent from './LessonContent.vue'
import { PhSpinner } from '@phosphor-icons/vue'

const route = useRoute()
const lessonData = shallowRef(null)
const error = shallowRef(null)

// Expliciete glob op alleen de lessen in src/lessons/. Vite bouwt hieruit een
// map van bestandsnaam naar loader. Drie redenen voor deze vorm:
//   1. `../lessons/${id}.js` als template literal levert een gammapatroon op
//      dat Vite maar gedeeltelijk invult; een nieuw lesbestand ontbrak daardoor
//      stilzwijgend in de map en de les gaf "Fout".
//   2. `*.js` raakt _archive/ niet, dus gearchiveerde lessen blijven buiten.
//   3. Een onbekend id levert nu een leesbare melding op in plaats van een
//      ongehandelde importfout.
const LESSON_MODULES = import.meta.glob('../lessons/*.js')

watch(() => route.params.id, async (id) => {
  if (id) {
    lessonData.value = null
    error.value = null
    const load = LESSON_MODULES[`../lessons/${id}.js`]
    if (!load) {
      error.value = `Onbekende les: ${id}`
      return
    }
    try {
      const module = await load()
      lessonData.value = module.default
    } catch(e) {
      console.error(e)
      error.value = "Kon de les niet laden."
    }
  }
}, { immediate: true })
</script>

<template>
  <LessonContent v-if="lessonData" :lessonData="lessonData" :key="route.params.id" />
  
  <!-- Fout- en laadstatus: egaal paneel met zichtbare rand.
       Geen blur en geen doorschijnendheid - op een beamer zijn vaste vlakken
       voorspelbaarder. Rood blijft gereserveerd voor het presentatietype,
       dus de status leest via het woord 'Fout', niet via een kleur. -->
  <div v-else-if="error" class="min-h-screen flex items-center justify-center relative z-10 px-6">
    <div class="bg-white p-8 text-center max-w-lg w-full rounded-card" style="border: 2px solid var(--color-line-strong); box-shadow: var(--shadow-rest);">
      <h2 class="text-2xl font-bold text-slate-800 mb-2">Fout</h2>
      <p class="text-slate-600">{{ error }}</p>
    </div>
  </div>
  
  <div v-else class="min-h-screen flex items-center justify-center relative z-10 px-6">
    <div class="bg-white p-6 flex flex-col items-center rounded-card" style="border: 2px solid var(--color-line-strong); box-shadow: var(--shadow-rest);">
      <PhSpinner class="animate-spin text-slate-600 text-4xl mb-4" />
      <span class="text-slate-600 font-medium">Les wordt geladen...</span>
    </div>
  </div>
</template>

