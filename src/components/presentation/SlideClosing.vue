<script setup>
const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- Afsluitende slide: bewust gewoon. Geen confetti, geen sterren, geen
       donkere achtergrond - de klas leest hier alleen dat de les klaar is. -->
  <div class="bg-paper w-full h-full flex flex-col items-center justify-center p-16">
    <div class="w-full max-w-4xl flex flex-col items-center text-center">

      <span class="slide-kicker mb-8">Einde van de les</span>

      <h2 class="text-slide-title font-bold text-slate-900 leading-tight mb-4 tracking-tight" v-html="slide.title"></h2>
      <p v-if="slide.subtitle || slide.message" class="text-slide-heading text-slate-700 leading-relaxed max-w-3xl" v-html="slide.subtitle || slide.message"></p>

      <!-- Gegevens in een gewoon paneel, met zichtbare rand -->
      <div v-if="slide.stats && slide.stats.length" class="grid grid-cols-2 gap-4 w-full max-w-2xl mt-12">
        <div v-for="(stat, index) in slide.stats" :key="index"
             class="slide-panel slide-panel-strong p-6 text-left">
          <div class="text-slide-heading font-bold text-slate-900 leading-none mb-1">{{ stat.value }}</div>
          <div class="slide-meta">{{ stat.label }}</div>
        </div>
      </div>

      <div v-if="slide.nextStep" class="slide-panel slide-panel-strong p-6 max-w-2xl w-full mt-6 text-left">
        <div class="slide-meta mb-1">Volgende stap</div>
        <div class="text-slide-body text-slate-800 leading-relaxed" v-html="slide.nextStep"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). */
</style>
