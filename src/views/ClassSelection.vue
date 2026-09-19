<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { subjectBySlug } from '../data/subjects.js'
import { classesFor } from '../data/students.js'

const router = useRouter()
const route = useRoute()
const subject = computed(() => subjectBySlug(route.params.subject))
const yearId = computed(() => parseInt(route.params.id))
const availableClasses = computed(() => subject.value
  ? classesFor(subject.value.id, yearId.value).map(id => ({ id, name: id }))
  : [])
const yearLabels = { 1: '1ste', 2: '2de', 3: '3de', 4: '4de' }

function openClass(classId) {
  router.push('/' + route.params.subject + '/year/' + yearId.value + '/class/' + classId)
}

function goBack() {
  router.push('/' + route.params.subject)
}
</script>

<template>
  <main class="selection-page">
    <button type="button" class="back-link" @click="goBack">
      <PhArrowLeft weight="regular" aria-hidden="true" />
      Leerjaren
    </button>

    <header class="selection-intro selection-intro-compact">
      <div v-if="subject" class="context-mark" :class="subject.accentColor" aria-hidden="true">
        <component :is="subject.icon" weight="regular" />
      </div>
      <p class="eyebrow" :class="subject?.accentColor">{{ subject?.label }} / {{ yearLabels[yearId] || yearId + 'de' }} jaar</p>
      <h1>Kies je klas</h1>
      <p class="intro-copy">De klas bepaalt je startpunt voor het leerpad.</p>
    </header>

    <section class="selection-section" aria-labelledby="class-heading">
      <div class="section-heading">
        <h2 id="class-heading">Klassen</h2>
        <span class="section-meta">{{ availableClasses.length }} beschikbaar</span>
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
          <span class="index-copy"><strong>{{ subject?.label }} · {{ cls.name }}</strong><span>Open de lessen voor deze klas</span></span>
          <PhArrowRight weight="regular" class="index-arrow" aria-hidden="true" />
        </button>
      </div>

      <p v-else class="empty-state">Nog geen klassen voor dit jaar.</p>
    </section>
  </main>
</template>
