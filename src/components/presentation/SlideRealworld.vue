<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <MathSlideWrapper :title="slide.title || 'Toepassing in de praktijk'">
    <!-- Praktijktoepassing als lopende tekst met vetgedrukte aanlopen,
         zoals in een cursus - geen drie kaartjes naast elkaar. -->
    <div class="pb-2 max-w-[1500px]">
      <p v-if="slide.context" class="text-slide-body text-slide-ink leading-relaxed" v-html="slide.context"></p>

      <ul class="slide-list text-slide-body text-slide-ink leading-relaxed mt-8">
        <li v-if="slide.example">
          <strong>Voorbeeld:</strong> <span v-html="slide.example"></span>
        </li>
        <li v-if="slide.consequence" class="slide-arrow">
          <strong>Gevolg:</strong> <span v-html="slide.consequence"></span>
        </li>
        <li v-if="slide.takeaway" class="slide-arrow">
          <strong>Leerpunt:</strong> <span v-html="slide.takeaway"></span>
        </li>
      </ul>
    </div>
  </MathSlideWrapper>
</template>
