<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { PhArrowLeft } from '@phosphor-icons/vue'
import { subjectBySlug } from '../data/subjects.js'

const router = useRouter()
const route = useRoute()

const subject = computed(() => subjectBySlug(route.params.subject))

function goBack() {
  router.push('/')
}
</script>

<template>
  <main class="selection-page">
    <button type="button" class="back-link" @click="goBack">
      <PhArrowLeft weight="regular" aria-hidden="true" />
      Klassen
    </button>

    <header class="selection-intro">
      <div v-if="subject" class="context-mark" :class="subject.accentColor" aria-hidden="true">
        <component :is="subject.icon" weight="regular" />
      </div>
      <p class="eyebrow" :class="subject?.accentColor">{{ subject?.label }}</p>
      <h1>Kies je klas</h1>
    </header>
  </main>
</template>
