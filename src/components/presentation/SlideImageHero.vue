<script setup>
const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="slide-image-hero w-full h-full relative overflow-hidden select-none">
    <div class="hero-image-container w-full h-full relative">
      <img :src="slide.image" :alt="slide.alt || ''" class="w-full h-full object-cover" />
      <!-- Simple translucent dark overlay (no gradient) -->
      <div class="absolute inset-0 slide-photo-scrim"></div>
      
      <!-- Content Area -->
      <div class="absolute bottom-12 left-12 right-12 flex justify-center z-10">
        <div class="content-box max-w-4xl w-full bg-white border border-slate-200 p-8 rounded-xl shadow-md">
          <h2 class="text-slide-heading font-bold text-slate-900 leading-tight mb-3" v-html="slide.title"></h2>
          <div v-if="slide.subtitle" class="text-slide-body text-slate-500 leading-relaxed mb-4" v-html="slide.subtitle"></div>
          <div v-if="slide.formula" class="text-slide-heading text-presentation bg-presentation-soft border border-presentation rounded-lg p-5 text-center font-bold font-mono" v-html="slide.formula"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
