<script setup>
defineProps({
  title: { type: String, default: '' },
  padding: { type: String, default: '' },
  solution: { type: Boolean, default: false }
})
</script>

<template>
  <!-- Content-slide exception: red headline, navy reading text, white canvas.
       No anchor bar, logo, institution label, page number or footer. -->
  <div class="slide-page w-full h-full flex flex-col relative" :class="{ 'slide-page-solution': solution }">
    <header v-if="title" class="slide-header-compact shrink-0">
      <h3 class="text-slide-title font-bold text-slide-red tracking-tight" v-html="title"></h3>
    </header>
    <div class="slide-copy flex-1 w-full exercise-scroll overflow-y-auto relative min-h-0" :class="padding">
      <slot />
    </div>
  </div>
</template>
