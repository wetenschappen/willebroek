<script setup>
import { useRouter } from 'vue-router'
import { enabledSubjects } from '../data/subjects.js'
import { classesForSubject, classLabel } from '../data/students.js'
import { PhArrowRight } from '@phosphor-icons/vue'

const router = useRouter()
const availableSubjects = enabledSubjects()

function openClass(subject, classId) {
  router.push('/' + subject.slug + '/class/' + classId)
}
</script>

<template>
  <main class="selection-page">
    <header class="selection-intro selection-intro-home">
      <h1>Kies je vak en klas</h1>
      <p class="intro-copy">Kies een vak en daarna je klas om naar het leerpad te gaan.</p>
    </header>

    <section class="subject-list" aria-labelledby="subject-heading">
      <h2 id="subject-heading" class="sr-only">Vakken en klassen</h2>

      <div
        v-for="subject in availableSubjects"
        :key="subject.id"
        class="subject-choice"
        :class="`subject-choice-${subject.id}`"
      >
        <div class="subject-choice-heading">
          <span class="subject-row-icon" aria-hidden="true">
            <component :is="subject.icon" weight="regular" />
          </span>
          <h2>{{ subject.label }}</h2>
        </div>

        <div class="subject-classes">
          <button
            v-for="classId in classesForSubject(subject.id)"
            :key="classId"
            type="button"
            class="class-choice"
            @click="openClass(subject, classId)"
          >
            <span>{{ classLabel(classId) }}</span>
            <PhArrowRight weight="regular" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>

    <p v-if="availableSubjects.length === 0" class="empty-state">
      Nog geen klassen beschikbaar.
    </p>
  </main>
</template>
