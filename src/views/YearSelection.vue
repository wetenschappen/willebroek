<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhUsers } from '@phosphor-icons/vue'
import { subjectBySlug } from '../data/subjects.js'
import { yearsFor } from '../data/modules.js'

const router = useRouter()
const route = useRoute()

// Het vak uit de URL (#/fysica/year/...) — de router bewaakt dat dit bestaat.
const subject = computed(() => subjectBySlug(route.params.subject))
const subjectSlug = computed(() => route.params.subject)

// Alleen leerjaren waarvoor dit vak effectief lessen heeft.
const availableYears = computed(() => {
  if (!subject.value) return []
  return yearsFor(subject.value.id)
})

const yearLabels = { 1: '1ste', 2: '2de', 3: '3de', 4: '4de' }

function openYear(year) {
  router.push('/' + subjectSlug.value + '/year/' + year + '/class')
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans">

    <!-- Back to subject picker -->
    <div class="absolute top-8 left-8">
      <button
        @click="goBack"
        class="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-semibold text-[1.2rem]"
      >
        <PhArrowLeft weight="bold" class="mr-2" />
        Vakken
      </button>
    </div>

    <div class="mb-12 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-500">
        <component
          v-if="subject"
          :is="subject.icon"
          weight="duotone"
          :class="['text-[2.5rem]', subject.accentColor]"
        />
      </div>
      <h1 class="text-[3rem] md:text-[4rem] font-bold text-slate-800 tracking-tight leading-tight mb-2">
        {{ subject ? subject.title : 'Digitaal Leerpad' }}
      </h1>
      <p class="text-[1.2rem] md:text-[1.5rem] text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
        Kies je leerjaar om aan de slag te gaan.
      </p>
    </div>

    <!-- Empty state: subject exists but has no lessons yet -->
    <div v-if="availableYears.length === 0" class="text-center py-12 max-w-lg">
      <p class="text-[1.5rem] text-slate-400 mb-3">Nog geen lessen voor dit vak.</p>
      <p class="text-slate-400 text-sm">
        Voeg een les toe aan <code class="font-mono">src/data/modules.js</code>
        en registreer ze hierboven.
      </p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
      <div
        v-for="year in availableYears"
        :key="year"
        @click="openYear(year)"
        :class="[
          'group cursor-pointer bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 flex flex-col items-center text-center hover:shadow-xl',
          subject ? subject.hoverBorder : ''
        ]"
      >
        <div class="w-16 h-16 bg-slate-100 rounded-xl flex items-center justify-center shadow-inner mb-6 group-hover:bg-slate-200 transition-colors duration-300">
          <span class="text-[2.5rem] font-black text-slate-500 group-hover:text-slate-700 transition-colors">{{ year }}</span>
        </div>
        <h3 :class="['text-[1.8rem] font-extrabold transition-colors', subject ? subject.accentColor : 'text-slate-900']">
          {{ yearLabels[year] || year + 'de' }} Jaar
        </h3>
      </div>
    </div>
  </div>
</template>
