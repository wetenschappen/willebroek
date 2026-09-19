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
  <main class="selection-page">
    <header class="selection-intro selection-intro-home">
      <p class="eyebrow">{{ school.name }} / Leerpad</p>
      <h1>Digitaal leerpad</h1>
      <p class="intro-copy">{{ school.tagline }}</p>
    </header>

    <section class="subject-list" aria-labelledby="subject-heading">
      <div class="section-heading">
        <h2 id="subject-heading">Vakken</h2>
        <span class="section-meta">{{ availableSubjects.length }} beschikbaar</span>
      </div>

      <div class="subject-rows">
        <button
          v-for="subject in availableSubjects"
          :key="subject.id"
          type="button"
          class="subject-row"
          :class="subject.id === 'physics' ? 'subject-row-physics' : 'subject-row-biology'"
          @click="openSubject(subject)"
        >
          <span class="subject-row-icon" aria-hidden="true">
            <component :is="subject.icon" weight="regular" />
          </span>
          <span class="subject-row-copy">
            <strong>{{ subject.label }}</strong>
            <span>{{ subject.description }}</span>
          </span>
          <PhArrowRight weight="regular" class="subject-row-arrow" aria-hidden="true" />
        </button>
      </div>
    </section>

    <p v-if="availableSubjects.length === 0" class="empty-state">
      Nog geen vakken beschikbaar.
    </p>

    <footer class="selection-footer">Secundair onderwijs · Fysica en biologie</footer>
  </main>
</template>
