<script setup>
const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- Grote uitspraak: licht, met de rode ankerbalk. -->
  <div class="bg-paper w-full h-full flex flex-col items-center justify-center p-20">
    <div class="max-w-5xl z-10 text-center flex flex-col items-center">
      <div class="w-20 h-2 mb-8 slide-anchor"></div>
      <h2 v-if="slide.title" class="text-slide-title font-bold text-slate-900 leading-tight tracking-tight mb-6" v-html="slide.title"></h2>
      <div class="text-slide-heading text-slate-700 leading-relaxed" v-html="slide.content || slide.text || slide.subtitle"></div>
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). */
</style>
