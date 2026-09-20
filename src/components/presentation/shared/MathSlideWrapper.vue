<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  badge: { type: String, default: '' },
  padding: { type: String, default: 'px-16 pb-6' }
})

const iconMap = inject('iconMap', {})

const resolvedIcon = computed(() => {
  const b = (props.badge || '').toUpperCase()
  let iconName = 'info'
  
  if (b.includes('THEORIE') || b.includes('DEFINITIE')) {
    iconName = 'definition'
  } else if (b.includes('OEFENING') || b.includes('QUIZ')) {
    iconName = 'exercise'
  } else if (b.includes('VOORBEELD') || b.includes('UITWERKING') || b.includes('OPLOSSEN')) {
    iconName = 'worked-example'
  } else if (b.includes('FORMULE') || b.includes('REGEL')) {
    iconName = 'formula'
  } else if (b.includes('GRAFIEK')) {
    iconName = 'graph'
  } else if (b.includes('STAPPENPLAN')) {
    iconName = 'steps'
  } else if (b.includes('WAARDETABEL')) {
    iconName = 'value-table'
  } else if (b.includes('EIGENSCHAPPEN')) {
    iconName = 'properties'
  } else if (b.includes('SAMENVATTING')) {
    iconName = 'check'
  } else if (b.includes('TOEPASSING')) {
    iconName = 'globe'
  } else if (b.includes('VOORKENNIS') || b.includes('DENKVRAAG')) {
    iconName = 'lightbulb'
  } else if (b.includes('BEWIJS') || b.includes('STELLING')) {
    iconName = 'triangle'
  }
  
  return iconMap[iconName] || iconMap['info']
})
</script>

<template>
  <!-- Slidebasis: licht werkblad met de kleurankerbalk van het presentatietype.
       Zie docs/DESIGN-SYSTEM.md sectie 15: slides volgen dezelfde taal als de
       ABC-tijdlijn. Rood = presentatie. -->
  <div class="w-full h-full flex flex-col items-center justify-center p-20 bg-paper relative">
    <div class="w-full max-w-7xl flex flex-col h-full">
      <!-- Kop: ankerbalk + titel + label -->
      <div v-if="title" class="flex items-center gap-6 mb-12 shrink-0">
          <div class="h-20 w-2 shrink-0" style="background: var(--color-presentation);"></div>
          <h3 class="text-6xl font-bold text-slate-900 tracking-tight" v-html="title"></h3>

          <!-- Label: kleur vergezeld van tekst, nooit kleur alleen -->
          <div v-if="badge" class="ml-auto flex items-center gap-3 px-5 py-3 rounded-control shrink-0" style="background: var(--color-presentation-soft); border: 2px solid var(--color-presentation);">
             <component :is="resolvedIcon" weight="fill" class="text-2xl" style="color: var(--color-presentation);" />
             <span class="font-mono text-base font-semibold uppercase tracking-[0.08em]" style="color: var(--color-presentation);">{{ badge }}</span>
          </div>
      </div>
      
      <!-- Inhoud -->
      <div class="flex-1 w-full exercise-scroll overflow-y-auto relative z-10" :class="padding">
        <slot />
        <div class="h-20 w-full shrink-0"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Lettertype komt uit het systeem (IBM Plex). Geen eigen font-family meer. */
</style>
