<script setup>
import { useRouter } from 'vue-router'
import { enabledSubjects, school } from '../data/subjects.js'
import { PhArrowRight } from '@phosphor-icons/vue'

const router = useRouter()
const availableSubjects = enabledSubjects()

function openSubject(subject) {
  router.push('/' + subject.slug)
}
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 relative z-10 font-sans">
    <div class="mb-12 text-center">
      <div class="w-16 h-16 mx-auto bg-slate-100/80 backdrop-blur-md rounded-xl border border-slate-200 shadow-sm flex items-center justify-center mb-6 transform hover:scale-105 transition-transform duration-500">
        <span class="text-[2rem]">📚</span>
      </div>
      <h1 class="text-[3rem] md:text-[4rem] font-bold text-slate-800 tracking-tight leading-tight mb-2">
        Digitaal Leerpad
      </h1>
      <p class="text-[1.2rem] md:text-[1.5rem] text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
        {{ school.tagline }}
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mx-auto">
      <div
        v-for="subject in availableSubjects"
        :key="subject.id"
        @click="openSubject(subject)"
        :class="[
          'group cursor-pointer bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 flex flex-col items-start hover:shadow-xl',
          subject.hoverBorder
        ]"
      >
        <div
          :class="[
            'w-16 h-16 rounded-xl flex items-center justify-center shadow-inner mb-6 transition-colors duration-300',
            subject.id === 'physics' ? 'bg-blue-50 group-hover:bg-blue-100' :
            subject.id === 'biology' ? 'bg-emerald-50 group-hover:bg-emerald-100' :
            subject.id === 'chemistry' ? 'bg-orange-50 group-hover:bg-orange-100' :
            subject.id === 'science' ? 'bg-teal-50 group-hover:bg-teal-100' :
            'bg-amber-50 group-hover:bg-amber-100'
          ]"
        >
          <component
            :is="subject.icon"
            weight="duotone"
            :class="['text-[2rem]', subject.accentColor]"
          />
        </div>

        <h3 :class="['text-[1.8rem] font-extrabold transition-colors mb-1', subject.accentColor]">
          {{ subject.label }}
        </h3>
        <p class="text-slate-500 text-sm leading-relaxed mb-6">
          {{ subject.description }}
        </p>

        <div :class="['flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-3', subject.accentColor]">
          Aan de slag
          <PhArrowRight weight="bold" />
        </div>
      </div>
    </div>

    <p v-if="availableSubjects.length === 0" class="text-slate-400 text-center py-12">
      Nog geen vakken beschikbaar. Zet er minstens één aan in <code class="font-mono text-sm">src/data/subjects.js</code>.
    </p>

    <p class="mt-16 text-slate-400 text-xs font-medium tracking-wide uppercase">
      {{ school.name }}
    </p>
  </div>
</template>
