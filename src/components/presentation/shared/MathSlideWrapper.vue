<script setup>

defineProps({
  title: { type: String, default: '' },
  padding: { type: String, default: 'px-16 pb-6' }
})
</script>

<template>
  <!-- Slidebasis: licht werkblad met een compacte presentatiekop.
       Categorie-badges zijn bewust weggelaten: ze herhalen meestal de titel,
       voegen geen taakgerichte informatie toe en nemen kostbare headroom in.

       Alle maten zijn canvas-px (1920x1080), niet scherm-px: de klas moet het
       vanachter de ruimte kunnen lezen. -->
  <div class="w-full h-full flex flex-col bg-paper relative">
    <div class="w-full h-full flex flex-col px-20 pt-8 pb-8">
      <!-- Kop: één korte ankerbalk en één titel, zonder tweede labelrij. -->
      <div v-if="title" class="slide-header-compact shrink-0">
          <div class="w-3 h-16 shrink-0 slide-anchor"></div>
          <h3 class="text-slide-title font-bold text-slate-900 tracking-tight" v-html="title"></h3>
      </div>

      <!-- Inhoud -->
      <div class="flex-1 w-full exercise-scroll overflow-y-auto relative z-10" :class="padding">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). Geen eigen font-family meer. */
</style>
