<template>
  <!-- Afsprakenslide. Wordt automatisch als eerste slide getoond: dit is het
       scherm dat de les opent, dus het moet het rustigst en het duidelijkst zijn.
       Licht, met de rode ankerbalk van het presentatietype. -->
  <div class="w-full h-full flex flex-col bg-paper">
    <!-- De herkenbare disciplinekop blijft behouden, maar zonder badge/pill.
         Context en titel staan op één compacte regel; zo blijft de kop leesbaar
         zonder het inhoudsgebied onnodig naar beneden te duwen. -->
    <header class="px-16 py-5 shrink-0" style="background: var(--color-panel); border-bottom: 3px solid var(--color-presentation);">
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-3 shrink-0">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b4232f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <span class="slide-kicker">Afspraken</span>
        </div>
        <h1 class="text-slide-title font-bold text-slate-900 leading-tight tracking-tight" v-html="slide.title"></h1>
      </div>
      <p v-if="slide.subtitle" class="text-slide-body text-slate-700 mt-2 ml-[46px]" v-html="slide.subtitle"></p>
    </header>

    <div class="flex-1 px-16 py-8 flex flex-col justify-between overflow-y-auto">
      <div class="grid grid-cols-4 gap-6 my-auto">
        <div
          v-for="(rule, index) in slide.rules"
          :key="index"
          class="flex flex-col items-start text-left py-8 px-6 slide-panel slide-panel-strong"
        >
          <!-- Nummer: functioneel, geen decoratie -->
          <span class="slide-meta mb-4">{{ String(index + 1).padStart(2, '0') }}</span>

          <component v-if="rule.icon" :is="getIcon(rule.icon)" weight="bold" class="text-slide-heading mb-4"
                     :style="{ color: rule.highlight ? 'var(--color-presentation)' : 'var(--color-ink-soft)' }" />

          <div class="text-slide-heading text-slate-800" v-html="rule.text"></div>
        </div>
      </div>

      <div v-if="slide.note || slide.cursusLink" class="slide-panel p-6 flex items-start gap-4 mt-auto">
        <div class="shrink-0 w-11 h-11 rounded-control flex items-center justify-center" style="background: var(--color-panel-muted); color: var(--color-ink-soft);">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="text-slide-body text-slate-800">
          <span v-if="slide.note" v-html="slide.note"></span>
          <span v-else>
            Deze les en het studiemateriaal kan je online raadplegen op:
            <strong class="font-mono select-all ml-2 px-2 py-1 rounded-control" style="background: var(--color-panel-muted);">{{ cleanUrl(slide.cursusLink) }}</strong>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const props = defineProps({
  slide: {
    type: Object,
    required: true
  }
});

const iconMap = inject('iconMap', {});

function getIcon(iconName) {
  return iconMap[iconName] || iconMap['info'];
}

function cleanUrl(url) {
    if (!url) return ''
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}
</script>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). */
</style>
