<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'theory' },
  title: { type: String, default: '' }
})

const themeColors = computed(() => {
  switch (props.variant) {
    case 'formula':
    case 'exercise':
      return { border: 'border-presentation bg-presentation-soft' }
    case 'theory':
    case 'example':
    default:
      return { border: 'border-slate-200 bg-white' }
  }
})
</script>

<template>
  <div class="border rounded-xl p-8 mb-6 shadow-sm" :class="themeColors.border">
    <!-- Clean Header Inside Panel -->
    <div v-if="title" class="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
      <h3 class="text-slide-heading font-bold text-slate-800" v-html="title"></h3>
    </div>

    <!-- Panel Content -->
    <div class="text-slide-body text-slate-700 leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). */
</style>
