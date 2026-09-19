<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { modulesFor } from '../data/modules'
import { subjectBySlug } from '../data/subjects.js'

const router = useRouter()
const route = useRoute()
const subject = computed(() => subjectBySlug(route.params.subject))
const classId = computed(() => route.params.classId)
const filteredModules = computed(() => {
  if (!subject.value) return []
  if (route.params.id) return modulesFor(subject.value.id, parseInt(route.params.id, 10))
  const yearByClass = { '3D': 3, '4D': 4, '5D': 5, '6D': 6, '6D-A': 6 }
  return modulesFor(subject.value.id, yearByClass[classId.value])
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

    <div v-if="groupedModules.length === 0" class="empty-state">Nog geen modules beschikbaar.</div>

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
