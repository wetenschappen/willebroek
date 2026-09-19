<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'
import { subjectBySlug } from '../data/subjects.js'
import { yearsFor } from '../data/modules.js'

const router = useRouter()
const route = useRoute()

const subject = computed(() => subjectBySlug(route.params.subject))
const subjectSlug = computed(() => route.params.subject)
const availableYears = computed(() => subject.value ? yearsFor(subject.value.id) : [])
const yearLabels = { 1: '1ste', 2: '2de', 3: '3de', 4: '4de' }

function openYear(year) {
  router.push('/' + subjectSlug.value + '/year/' + year + '/class')
}

function goBack() {
  router.push('/')
}
</script>

<template>
  <main class="selection-page">
    <button type="button" class="back-link" @click="goBack">
      <PhArrowLeft weight="regular" aria-hidden="true" />
      Vakken
    </button>

    <header class="selection-intro">
      <div v-if="subject" class="context-mark" :class="subject.accentColor" aria-hidden="true">
        <component :is="subject.icon" weight="regular" />
      </div>
      <p class="eyebrow" :class="subject?.accentColor">{{ subject?.label }} / Leerpad</p>
      <h1>{{ subject?.title || 'Digitaal leerpad' }}</h1>
      <p class="intro-copy">Kies je leerjaar om aan de slag te gaan.</p>
    </header>

    <section class="selection-section" aria-labelledby="year-heading">
      <div class="section-heading">
        <h2 id="year-heading">Leerjaren</h2>
        <span class="section-meta">{{ availableYears.length }} beschikbaar</span>
      </div>

      <div v-if="availableYears.length" class="year-list">
        <button
          v-for="year in availableYears"
          :key="year"
          type="button"
          class="index-row"
          @click="openYear(year)"
        >
          <span class="index-number">0{{ year }}</span>
          <span class="index-copy">
            <strong>{{ yearLabels[year] || year + 'de' }} jaar</strong>
            <span>Bekijk de klassen en lessen</span>
          </span>
          <PhArrowRight weight="regular" class="index-arrow" aria-hidden="true" />
        </button>
      </div>

      <p v-else class="empty-state">Nog geen lessen voor dit vak.</p>
    </section>
  </main>
</template>
