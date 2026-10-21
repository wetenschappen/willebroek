<script setup>
import MathSlideWrapper from './shared/MathSlideWrapper.vue'

defineProps({ slide: { type: Object, required: true } })

function cleanUrl(url) {
  return (url || '').replace(/^https?:\/\//, '').replace(/\/$/, '')
}
</script>

<template>
  <!-- Opening agreements are a normal content slide, not four giant boxes. -->
  <MathSlideWrapper :title="slide.title || 'Afspraken'">
    <p v-if="slide.subtitle" class="text-slide-body text-slide-ink mb-10" v-html="slide.subtitle"></p>
    <ul class="slide-list text-slide-heading text-slide-ink leading-relaxed">
      <li v-for="(rule, index) in slide.rules" :key="index" v-html="rule.text"></li>
    </ul>
    <p v-if="slide.note" class="text-slide-body text-slide-ink mt-10" v-html="slide.note"></p>
    <p v-else-if="slide.cursusLink" class="text-slide-body text-slide-ink mt-10">
      Lesmateriaal: <strong class="select-all">{{ cleanUrl(slide.cursusLink) }}</strong>
    </p>
  </MathSlideWrapper>
</template>
