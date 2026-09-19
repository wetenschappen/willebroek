<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PhBooks } from '@phosphor-icons/vue'
import { subjectBySlug, subjectById } from './data/subjects.js'
import { modules } from './data/modules.js'

const route = useRoute()

// Het actieve vak bepaalt het watermerk en de achtergrond.
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

const watermarkIcon = computed(() => activeSubject.value?.watermarkIcon || PhBooks)
const watermarkColor = computed(() => activeSubject.value?.watermarkColor || 'text-slate-300')

const backgroundStyle = computed(() => {
  const bg = activeSubject.value?.background || { color: '#f8fafc', dot: '#cbd5e1' }
  return {
    backgroundColor: bg.color,
    backgroundImage: `radial-gradient(${bg.dot} 1.5px, transparent 1.5px)`,
    backgroundSize: '32px 32px'
  }
})
</script>

<template>
  <div class="min-h-screen relative overflow-x-hidden text-[10px]" :style="backgroundStyle">
    <!-- Vak-watermerk -->
    <div class="fixed top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none transform -rotate-12 select-none z-0">
        <component :is="watermarkIcon" weight="fill" :size="800" :class="watermarkColor" />
    </div>

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
