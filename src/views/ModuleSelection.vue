<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { modulesFor } from '../data/modules'
import { subjectBySlug } from '../data/subjects.js'
import { yearForClass, classLabel } from '../data/students.js'

const router = useRouter()
const route = useRoute()
const subject = computed(() => subjectBySlug(route.params.subject))
const classId = computed(() => route.params.classId)
const classDisplay = computed(() => classLabel(classId.value))
const filteredModules = computed(() => {
  if (!subject.value) return []
  if (route.params.id) return modulesFor(subject.value.id, parseInt(route.params.id, 10))
  const year = yearForClass(classId.value)
  if (year === null) return []
  return modulesFor(subject.value.id, year)
})

const groupedModules = computed(() => {
  const groups = {}
  filteredModules.value.forEach(m => {
    const match = m.id.match(/m(\d+)/)
    const moduleNum = match ? match[1] : (m.module ? String(m.module).padStart(2, '0') : '01')
    if (!groups[moduleNum]) {
      const topic = m.topic || (m.title.includes(':') ? m.title.split(':')[0].trim() : m.title)
      groups[moduleNum] = { moduleNum, topic, lessons: [] }
    }
    groups[moduleNum].lessons.push(m)
  })
  return Object.values(groups).sort((a, b) => parseInt(a.moduleNum) - parseInt(b.moduleNum))
})

function openLesson(lessonId) {
  router.push('/les/' + lessonId)
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <main class="content-page">
    <button type="button" class="back-link" @click="goBack">
      <PhArrowLeft weight="regular" aria-hidden="true" />
      Klassen
    </button>

    <header class="content-header">
      <div class="context-mark" :class="subject?.accentColor" aria-hidden="true">
        <component v-if="subject" :is="subject.icon" weight="regular" />
      </div>
      <div>
        <p class="eyebrow" :class="subject?.accentColor">{{ subject?.label }} / Klas</p>
        <h1>{{ classDisplay }}</h1>
        <p class="intro-copy">Kies een les om te starten.</p>
      </div>
    </header>

    <!-- Lege staat: zeg wat er aan de hand is zonder een tweede navigatiekeuze.
         De zichtbare knop Klassen bovenaan is de terugweg. -->
    <div v-if="groupedModules.length === 0" class="empty-state">
      <p><strong>Voor deze klas staan nog geen lessen klaar.</strong></p>
      <p>De lessen voor {{ classDisplay }} worden later toegevoegd. Gebruik de knop Klassen hierboven om terug te keren naar de selectie.</p>
    </div>

    <div v-else class="module-index">
      <section v-for="group in groupedModules" :key="group.moduleNum" class="module-section">
        <header class="module-heading">
          <span class="module-number">M{{ group.moduleNum }}</span>
          <h2>{{ group.topic }}</h2>
          <span class="section-meta">{{ group.lessons.length }} {{ group.lessons.length === 1 ? 'les' : 'lessen' }}</span>
        </header>

        <div class="lesson-list">
          <button
            v-for="lesson in group.lessons"
            :key="lesson.id"
            type="button"
            class="lesson-row"
            @click="openLesson(lesson.id)"
          >
            <span class="lesson-copy flex items-center gap-3">
              <span v-if="lesson.date" class="badge badge-neutral font-mono font-bold">{{ lesson.date }}</span>
              <strong v-html="lesson.title"></strong>
            </span>
            <PhArrowRight weight="regular" class="lesson-arrow" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
