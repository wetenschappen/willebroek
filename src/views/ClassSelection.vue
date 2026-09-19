<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhUsers } from '@phosphor-icons/vue'
import { subjectBySlug } from '../data/subjects.js'
import { classesFor } from '../data/students.js'

const router = useRouter()
const route = useRoute()

const subject = computed(() => subjectBySlug(route.params.subject))
const yearId = computed(() => parseInt(route.params.id))

// Welke klassen dit vak in dit jaar heeft — uit src/data/students.js
const availableClasses = computed(() => {
  if (!subject.value) return []
  return classesFor(subject.value.id, yearId.value).map(id => ({ id, name: id }))
})

const yearLabels = { 1: '1ste', 2: '2de', 3: '3de', 4: '4de' }

function openClass(classId) {
  router.push('/' + route.params.subject + '/year/' + yearId.value + '/class/' + classId)
}

function goBack() {
  router.push('/' + route.params.subject)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans">

    <div class="absolute top-8 left-8">
      <button
        @click="goBack"
        class="flex items-center text-slate-500 hover:text-slate-800 transition-colors font-semibold text-[1.2rem]"
      >
        <PhArrowLeft weight="bold" class="mr-2" />
        Leerjaren
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
        {{ yearLabels[yearId] || yearId + 'de' }} Jaar
      </h1>
      <p class="text-[1.2rem] md:text-[1.5rem] text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
        Kies je klas om verder te gaan.
      </p>
      <p v-if="subject" :class="['text-sm font-bold uppercase tracking-widest mt-3', subject.accentColor]">
        {{ subject.label }}
      </p>
    </div>

    <div v-if="availableClasses.length === 0" class="text-center py-12 max-w-lg">
      <p class="text-[1.5rem] text-slate-400 mb-3">Nog geen klassen voor dit jaar.</p>
      <p class="text-slate-400 text-sm">
        Voeg ze toe in <code class="font-mono">src/data/students.js</code>
        onder <code class="font-mono">classesBySubjectYear</code>.
      </p>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-4xl mx-auto">
      <div
        v-for="cls in availableClasses"
        :key="cls.id"
        @click="openClass(cls.id)"
        :class="[
          'group cursor-pointer bg-white border border-slate-200 p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center text-center',
          subject ? subject.hoverBorder : 'hover:border-slate-400/50'
        ]"
      >
        <div class="w-12 h-12 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mb-3 group-hover:bg-slate-200 transition-colors">
          <PhUsers weight="fill" class="text-2xl" />
        </div>
        <h3 class="text-[1.8rem] font-extrabold text-brand-dark">{{ cls.name }}</h3>
      </div>
    </div>
  </div>
</template>
