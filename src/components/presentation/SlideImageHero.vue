<script setup>
import { inject } from 'vue'
const resolveImageUrl = inject('resolveImageUrl')

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
      <img :src="resolveImageUrl(slide.image)" :alt="slide.alt || ''" class="w-full h-full object-cover" />
      <!-- Simple translucent dark overlay (no gradient) -->
      <div class="absolute inset-0 slide-photo-scrim"></div>
      
      <!-- Content Area -->
      <div class="absolute bottom-12 left-12 right-12 flex justify-center z-10">
        <div class="content-box max-w-4xl w-full bg-white border border-slide-line p-8 rounded-xl shadow-md">
          <h2 class="text-slide-heading font-bold text-slide-red leading-tight mb-3" v-html="slide.title"></h2>
          <div v-if="slide.subtitle" class="text-slide-body text-slide-ink leading-relaxed mb-4" v-html="slide.subtitle"></div>
          <div v-if="slide.formula" class="text-slide-heading text-slide-red bg-slide-red-soft border border-slide-red rounded-lg p-5 text-center font-bold font-mono" v-html="slide.formula"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
