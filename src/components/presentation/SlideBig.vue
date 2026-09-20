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
      <div class="w-20 h-2 mb-8" style="background: var(--color-presentation);"></div>
      <h2 class="text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6" v-html="slide.title"></h2>
      <p class="text-3xl text-slate-700 leading-relaxed" v-html="slide.subtitle"></p>
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). */
</style>
