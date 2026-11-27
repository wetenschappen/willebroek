<script setup>
// Sobere schematische cilindertekeningen bij het exitticket (C1).
defineProps({ kind: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 340 154" class="sketch-svg" aria-hidden="true" focusable="false">
    <!-- Vraag 1: Vaste zuiger vs. vrije zuiger bij opwarming -->
    <template v-if="kind === 'zuiger'">
      <!-- Links: Vaste zuiger (borgpennen) -->
      <rect x="38" y="60" width="76" height="62" fill="var(--color-digital-soft)" />
      <path d="M38 26 V122 H114 V26" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="39.5" y="55" width="73" height="6" fill="currentColor" />
      <rect x="73" y="36" width="6" height="19" fill="currentColor" />
      <rect x="62" y="33" width="28" height="4" fill="currentColor" />
      <rect x="31" y="49" width="14" height="5" fill="var(--color-digital)" />
      <rect x="107" y="49" width="14" height="5" fill="var(--color-digital)" />
      <text x="76" y="142" text-anchor="middle" class="sk-lbl">1 · Vast</text>

      <text x="170" y="78" text-anchor="middle" class="sk-sub">vs.</text>

      <!-- Rechts: Vrije zuiger met gelijke belasting -->
      <rect x="226" y="46" width="76" height="76" fill="var(--color-digital-soft)" />
      <path d="M226 26 V122 H302 V26" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="227.5" y="41" width="73" height="6" fill="currentColor" />
      <rect x="252" y="29" width="24" height="12" fill="var(--color-panel-muted)" stroke="currentColor" stroke-width="1.8" />
      <path d="M264 96 V72 M258 78 L264 71 L270 78" fill="none" stroke="var(--color-digital)" stroke-width="2.2" />
      <text x="264" y="142" text-anchor="middle" class="sk-lbl">2 · Vrij</text>
    </template>

    <!-- Vraag 2: Volume en temperatuur allebei x 1,2 -->
    <template v-else-if="kind === 'factor'">
      <rect x="38" y="64" width="76" height="58" fill="var(--color-digital-soft)" />
      <path d="M38 26 V122 H114 V26" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="39.5" y="59" width="73" height="6" fill="currentColor" />
      <text x="76" y="98" text-anchor="middle" class="sk-lbl">p₁, V₁, T₁</text>
      <text x="76" y="142" text-anchor="middle" class="sk-sub">afgesloten gas</text>

      <text x="170" y="62" text-anchor="middle" class="sk-act">V × 1,2</text>
      <path d="M138 76 H198 M192 70 L200 76 L192 82" fill="none" stroke="var(--color-ink-soft)" stroke-width="2" />
      <text x="170" y="96" text-anchor="middle" class="sk-act">T × 1,2</text>

      <rect x="226" y="52" width="76" height="70" fill="var(--color-digital-soft)" />
      <path d="M226 26 V122 H302 V26" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="227.5" y="47" width="73" height="6" fill="currentColor" />
      <text x="264" y="92" text-anchor="middle" class="sk-q">p₂ = ?</text>
      <text x="264" y="142" text-anchor="middle" class="sk-sub">zelfde gas</text>
    </template>

    <!-- Vraag 3: ventiel open, gas ontsnapt -->
    <template v-else>
      <rect x="74" y="44" width="96" height="78" fill="var(--color-digital-soft)" />
      <path d="M74 26 V122 H170 V92 M170 72 V26" fill="none" stroke="currentColor" stroke-width="2.5" />
      <!-- Open ventielpijp rechts -->
      <path d="M170 72 H198 M170 92 H198" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="75.5" y="39" width="93" height="6" fill="currentColor" />
      <!-- Gasdeeltjes binnen -->
      <circle cx="96" cy="64" r="3.4" fill="currentColor" />
      <circle cx="124" cy="58" r="3.4" fill="currentColor" />
      <circle cx="144" cy="78" r="3.4" fill="currentColor" />
      <circle cx="104" cy="96" r="3.4" fill="currentColor" />
      <circle cx="132" cy="104" r="3.4" fill="currentColor" />
      <!-- Ontsnappende deeltjes en pijl -->
      <path d="M182 82 H234 M228 76 L236 82 L228 88" fill="none" stroke="var(--color-digital)" stroke-width="2.2" />
      <circle cx="250" cy="70" r="3.4" fill="var(--color-digital)" />
      <circle cx="268" cy="84" r="3.4" fill="var(--color-digital)" />
      <circle cx="254" cy="96" r="3.4" fill="var(--color-digital)" />
      <text x="258" y="118" text-anchor="middle" class="sk-q">gas ontsnapt</text>
      <text x="122" y="142" text-anchor="middle" class="sk-lbl">ventiel open</text>
    </template>
  </svg>
</template>

<style scoped>
.sketch-svg { width: 100%; max-width: 340px; height: auto; display: block; color: var(--color-ink) }
.sk-lbl { font: 600 12.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-ink); font-variant-numeric: tabular-nums }
.sk-act { font: 600 12.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-ink) }
.sk-sub { font: 500 11.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-ink-soft) }
.sk-q { font: 700 13.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-digital) }
</style>
