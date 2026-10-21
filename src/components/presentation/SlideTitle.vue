<script setup>
import SlideStatement from './shared/SlideStatement.vue'

defineProps({ slide: { type: Object, required: true } })
</script>

<template>
  <SlideStatement>
    <h2 class="text-slide-hero font-bold tracking-tight max-w-[1500px]" v-html="slide.title"></h2>
    <p v-if="slide.subtitle" class="text-slide-heading font-bold leading-snug mt-16 max-w-[1500px]" v-html="slide.subtitle"></p>
  </SlideStatement>
</template>
