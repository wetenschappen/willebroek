<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { subjectBySlug } from '../data/subjects.js'
import { classesForSubject, classLabel, classesFor } from '../data/students.js'

const router = useRouter()
const route = useRoute()
const subject = computed(() => subjectBySlug(route.params.subject))
const yearId = computed(() => parseInt(route.params.id))
const availableClasses = computed(() => subject.value
  ? (route.params.id ? classesFor(subject.value.id, yearId.value) : classesForSubject(subject.value.id)).map(id => ({ id, name: classLabel(id) }))
  : [])
const yearLabels = { 1: '1ste', 2: '2de', 3: '3de', 4: '4de' }

function openClass(classId) {
  const path = route.params.id
    ? '/' + route.params.subject + '/year/' + yearId.value + '/class/' + classId
    : '/' + route.params.subject + '/class/' + classId
  router.push(path)
}

function goBack() {
  router.push('/' + route.params.subject)
}
</script>

<template>
  <main class="selection-page">
    <button type="button" class="back-link" @click="goBack">
      <PhArrowLeft weight="regular" aria-hidden="true" />
      Vakken
    </button>

    <header class="selection-intro selection-intro-compact">
      <div v-if="subject" class="context-mark" :class="subject.accentColor" aria-hidden="true">
        <component :is="subject.icon" weight="regular" />
      </div>
      <p class="eyebrow" :class="subject?.accentColor">{{ subject?.label }}</p>
      <h1>Kies je klas</h1>
    </header>

    <section class="selection-section" aria-labelledby="class-heading">
      <div class="section-heading">
        <h2 id="class-heading">Klassen</h2>
      </div>

      <div v-if="availableClasses.length" class="class-list">
        <button
          v-for="cls in availableClasses"
          :key="cls.id"
          type="button"
          class="index-row class-row"
          @click="openClass(cls.id)"
        >
          <span class="index-number">{{ cls.name }}</span>
          <span class="index-copy"><strong>{{ cls.name }}</strong></span>
          <PhArrowRight weight="regular" class="index-arrow" aria-hidden="true" />
        </button>
      </div>

      <p v-else class="empty-state">Nog geen klassen voor dit vak.</p>
    </section>
  </main>
</template>
