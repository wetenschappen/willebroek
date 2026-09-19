<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhCaretRight } from '@phosphor-icons/vue'
import { modulesFor, yearsFor } from '../data/modules'
import { subjectBySlug } from '../data/subjects.js'

const router = useRouter()
const route = useRoute()

const subject = computed(() => subjectBySlug(route.params.subject))
const classId = computed(() => route.params.classId)

// Lessen van dit vak in dit leerjaar.
// De klas (classId) bepaalt nog niet welke lessen zichtbaar zijn — alle klassen
// van eenzelfde jaar volgen hetzelfde leerplan. Zodra dat verschilt, filter je
// hier extra op basis van `lesson.grade` of een classes-veld op de module.
const filteredModules = computed(() => {
  if (!subject.value) return []
  return modulesFor(subject.value.id, parseInt(route.params.id))
})

// Lessen groeperen per modulenummer. ID-formaat:
//   fys3-m01-l02-stroomkringen  →  module "01", les 2
const groupedModules = computed(() => {
  const groups = {}

  filteredModules.value.forEach(m => {
    const match = m.id.match(/m(\d+)-l(\d+)/)
    const moduleNum = match ? match[1] : '00'
    const lessonNum = match ? parseInt(match[2]) : 1

    if (!groups[moduleNum]) {
      // Onderwerp = alles vóór de eerste ":" in de titel, of de volledige titel
      const topic = m.title.includes(':') ? m.title.split(':')[0].trim() : m.title
      groups[moduleNum] = {
        moduleNum,
        topic,
        lessons: [],
        icon:  m.icon,
        color: m.color,
        bg:    m.bg
      }
    }

    groups[moduleNum].lessons.push({ ...m, lessonNum })
  })

  return Object.values(groups).sort((a, b) => parseInt(a.moduleNum) - parseInt(b.moduleNum))
})

function openLesson(lessonId) {
  router.push('/les/' + lessonId)
}

function goBack() {
  router.push('/' + route.params.subject + '/year/' + route.params.id + '/class')
}
</script>

<template>
  <div class="min-h-screen relative z-10 font-sans">
    <div class="max-w-2xl mx-auto px-6 pt-10 pb-24">

      <!-- Back -->
      <button
        @click="goBack"
        class="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors font-semibold text-sm mb-10"
      >
        <PhArrowLeft weight="bold" />
        Klassen
      </button>

      <!-- Page header -->
      <div class="mb-10 flex items-center gap-5">
        <div class="w-14 h-14 shrink-0 bg-slate-100 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
          <component
            v-if="subject"
            :is="subject.icon"
            weight="duotone"
            :class="['text-[2rem]', subject.accentColor]"
          />
        </div>
        <div>
          <h1 class="text-3xl font-extrabold text-slate-800 leading-tight">
            {{ subject ? subject.label : '' }} {{ classId }}
          </h1>
          <p class="text-slate-400 text-sm mt-0.5">Kies een les om te starten</p>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="groupedModules.length === 0" class="text-center py-16 text-slate-400">
        Nog geen modules beschikbaar.
      </div>

      <!-- Module groups -->
      <div v-else class="space-y-8">
        <section v-for="group in groupedModules" :key="group.moduleNum">

          <!-- Module header -->
          <div class="flex items-center gap-3 mb-3">
            <div
              class="w-7 h-7 rounded-lg shrink-0 flex items-center justify-center"
              :class="group.bg"
            >
              <component :is="group.icon" weight="fill" class="text-base" :class="group.color" />
            </div>

            <span class="text-[0.6rem] font-black tracking-[0.18em] uppercase text-slate-400 shrink-0">
              Module {{ group.moduleNum }}
            </span>
            <span class="text-sm font-bold text-slate-700 truncate">{{ group.topic }}</span>

            <div class="flex-1 h-px bg-slate-200 min-w-4"></div>

            <span class="text-[0.6rem] font-bold tracking-widest uppercase text-slate-400 shrink-0">
              {{ group.lessons.length }}
              {{ group.lessons.length === 1 ? 'les' : 'lessen' }}
            </span>
          </div>

          <!-- Lesson rows -->
          <div class="rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-sm">
            <div
              v-for="lesson in group.lessons"
              :key="lesson.id"
              @click="openLesson(lesson.id)"
              :class="[
                'group flex items-center gap-4 bg-white px-5 py-3.5 cursor-pointer transition-colors duration-150',
                subject ? subject.hoverBg : 'hover:bg-slate-50'
              ]"
            >
              <!-- Lesson number pill -->
              <div
                class="shrink-0 w-9 h-9 rounded-lg flex flex-col items-center justify-center"
                :class="group.bg"
              >
                <span class="text-[0.45rem] font-black uppercase tracking-widest leading-none opacity-70" :class="group.color">les</span>
                <span class="text-sm font-black leading-tight" :class="group.color">{{ lesson.lessonNum }}</span>
              </div>

              <!-- Lesson info -->
              <div class="flex-1 min-w-0">
                <div class="text-[0.6rem] font-bold tracking-widest uppercase text-slate-400 mb-0.5 leading-none">
                  M{{ group.moduleNum }} · Les {{ lesson.lessonNum }}
                </div>
                <div class="text-slate-800 font-semibold text-sm leading-snug truncate group-hover:text-slate-900">
                  {{ lesson.title }}
                </div>
              </div>

              <!-- Arrow -->
              <PhCaretRight
                :class="[
                  'shrink-0 text-slate-300 text-lg transition-all duration-150 group-hover:translate-x-0.5',
                  subject ? subject.hoverText : ''
                ]"
              />
            </div>
          </div>

        </section>
      </div>

    </div>
  </div>
</template>
