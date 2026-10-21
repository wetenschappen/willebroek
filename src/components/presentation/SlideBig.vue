<script setup>
import SlideStatement from './shared/SlideStatement.vue'

defineProps({ slide: { type: Object, required: true } })
</script>

<template>
  <SlideStatement>
    <h2 v-if="slide.title" class="text-slide-title font-bold leading-tight tracking-tight max-w-[1500px]" v-html="slide.title"></h2>
    <div class="text-slide-heading font-semibold leading-relaxed mt-12 max-w-[1500px]" v-html="slide.content || slide.text || slide.subtitle"></div>
  </SlideStatement>
</template>
