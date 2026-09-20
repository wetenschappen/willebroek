<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { modulesFor } from '../data/modules'
import { subjectBySlug } from '../data/subjects.js'
import { yearForClass } from '../data/students.js'

const router = useRouter()
const route = useRoute()
const subject = computed(() => subjectBySlug(route.params.subject))
const classId = computed(() => route.params.classId)
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
    const match = m.id.match(/m(\d+)-l(\d+)/)
    const moduleNum = match ? match[1] : '00'
    const lessonNum = match ? parseInt(match[2]) : 1
    if (!groups[moduleNum]) {
      const topic = m.title.includes(':') ? m.title.split(':')[0].trim() : m.title
      groups[moduleNum] = { moduleNum, topic, lessons: [] }
    }
    groups[moduleNum].lessons.push({ ...m, lessonNum })
  })
  return Object.values(groups).sort((a, b) => parseInt(a.moduleNum) - parseInt(b.moduleNum))
})

function openLesson(lessonId) {
  router.push('/les/' + lessonId)
}

function goBack() {
  router.push('/')
}

/** Terug naar de klassenlijst van dit vak. */
function chooseClass() {
  if (subject.value) router.push('/' + subject.value.slug)
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
        <h1>{{ classId }}</h1>
        <p class="intro-copy">Kies een les om te starten.</p>
      </div>
    </header>

    <!-- Lege staat: zeg wat er aan de hand is en bied een uitweg.
         Een klas zonder lessen is geen fout van de leerling. -->
    <div v-if="groupedModules.length === 0" class="empty-state">
      <p><strong>Voor deze klas staan nog geen lessen klaar.</strong></p>
      <p>De lessen voor {{ classId }} worden later toegevoegd. Kies een andere klas of ga terug naar het vakkenoverzicht.</p>
      <div class="flex flex-wrap gap-3 mt-4">
        <button type="button" class="btn btn-primary" @click="chooseClass">Andere klas kiezen</button>
        <button type="button" class="btn btn-ghost" style="border: 2px solid var(--color-line-strong);" @click="goBack">Naar de vakken</button>
      </div>
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
            <span class="lesson-number">{{ String(lesson.lessonNum).padStart(2, '0') }}</span>
            <span class="lesson-copy">
              <span class="lesson-meta">M{{ group.moduleNum }} · Les {{ lesson.lessonNum }}</span>
              <strong>{{ lesson.title }}</strong>
            </span>
            <PhArrowRight weight="regular" class="lesson-arrow" aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  </main>
</template>
