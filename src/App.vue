<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { subjectBySlug, subjectById } from './data/subjects.js'
import { modules } from './data/modules.js'

const route = useRoute()

// Het actieve vak bepaalt alleen de rustige achtergrondtint.
// - Routes met een vak-slug  → dat vak
// - /les/:id                 → het vak van die les (via de module-registry)
// - overige                  → neutraal thema
const activeSubject = computed(() => {
  const slug = route.params.subject
  if (slug) return subjectBySlug(slug)

  const lessonId = route.params.id
  if (lessonId) {
    const mod = modules.find(m => m.id === lessonId)
    if (mod) return subjectById(mod.subject)
  }

  return null
})

const backgroundStyle = computed(() => ({
  backgroundColor: activeSubject.value?.background?.color || '#f5f7f6'
}))
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden text-base" :style="backgroundStyle">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
