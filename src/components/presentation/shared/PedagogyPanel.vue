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
      return { border: 'border-slide-red bg-slide-red-soft' }
    case 'theory':
    case 'example':
    default:
      return { border: 'border-slide-line bg-white' }
  }
})
</script>

<template>
  <div class="border rounded-xl p-8 mb-6 shadow-sm" :class="themeColors.border">
    <!-- Clean Header Inside Panel -->
    <div v-if="title" class="flex items-center gap-3 border-b border-slide-line pb-4 mb-6">
      <h3 class="text-slide-heading font-bold text-slide-ink" v-html="title"></h3>
    </div>

    <!-- Panel Content -->
    <div class="text-slide-body text-slide-ink leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). */
</style>
