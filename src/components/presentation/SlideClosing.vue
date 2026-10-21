<script setup>
import SlideStatement from './shared/SlideStatement.vue'

defineProps({ slide: { type: Object, required: true } })
</script>

<template>
  <SlideStatement>
    <h2 class="text-slide-title font-bold leading-tight tracking-tight max-w-[1500px]" v-html="slide.title || 'Einde van de les'"></h2>
    <p v-if="slide.subtitle || slide.message" class="text-slide-heading font-semibold leading-relaxed mt-10 max-w-[1500px]" v-html="slide.subtitle || slide.message"></p>

    <!-- Optional context remains plain text, never a grid of statistic cards. -->
    <dl v-if="slide.stats?.length" class="flex flex-wrap justify-center gap-x-12 gap-y-4 mt-12 text-slide-body font-semibold">
      <div v-for="(stat, index) in slide.stats" :key="index" class="flex gap-4">
        <dt>{{ stat.label }}:</dt>
        <dd>{{ stat.value }}</dd>
      </div>
    </dl>
    <p v-if="slide.nextStep" class="text-slide-body font-semibold leading-relaxed max-w-[1500px] mt-10">
      Volgende stap: <span v-html="slide.nextStep"></span>
    </p>
  </SlideStatement>
</template>
