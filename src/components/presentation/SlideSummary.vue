<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <!-- Samenvatting als cursuspagina: echte opsommingstekens en één besluitlijn,
       geen rij genummerde kaartjes. -->
  <MathSlideWrapper :title="slide.title || 'Samenvatting'">
    <ul class="slide-list text-slide-body text-slide-ink leading-relaxed mt-2">
      <li v-for="(item, index) in slide.items" :key="index" v-html="item"></li>
      <li v-if="slide.keyTakeaway" class="slide-arrow">
        <strong>Besluit:</strong> <span v-html="slide.keyTakeaway"></span>
      </li>
    </ul>
  </MathSlideWrapper>
</template>
