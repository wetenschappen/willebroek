<script setup>
// Schematische cilindertekeningen bij de drie open voorkennisvragen (A1).
defineProps({ kind: { type: String, required: true } })
</script>

<template>
  <svg viewBox="0 0 340 154" class="sketch-svg" aria-hidden="true" focusable="false">
    <!-- Wet van Boyle: samendrukken bij constante T (15 L -> 7,5 L) -->
    <template v-if="kind === 'boyle'">
      <!-- Links: Vóór (hoog volume) -->
      <rect x="38" y="46" width="76" height="76" fill="var(--color-digital-soft)" />
      <path d="M38 28 V122 H114 V28" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="39.5" y="41" width="73" height="6" fill="currentColor" />
      <rect x="73" y="20" width="6" height="21" fill="currentColor" />
      <rect x="62" y="17" width="28" height="4" fill="currentColor" />
      <text x="76" y="142" text-anchor="middle" class="sk-lbl">15 L · 300 K</text>

      <!-- Pijl -->
      <text x="170" y="64" text-anchor="middle" class="sk-act">indrukken</text>
      <path d="M138 76 H198 M192 70 L200 76 L192 82" fill="none" stroke="var(--color-ink-soft)" stroke-width="2" />
      <text x="170" y="96" text-anchor="middle" class="sk-sub">T blijft gelijk</text>

      <!-- Rechts: Na (half volume) -->
      <rect x="226" y="84" width="76" height="38" fill="var(--color-digital-soft)" />
      <path d="M226 28 V122 H302 V28" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="227.5" y="79" width="73" height="6" fill="currentColor" />
      <rect x="261" y="58" width="6" height="21" fill="currentColor" />
      <rect x="250" y="55" width="28" height="4" fill="currentColor" />
      <!-- Neerwaartse duwpijl -->
      <path d="M264 31 V48 M258 43 L264 50 L270 43" fill="none" stroke="var(--color-digital)" stroke-width="2.2" />
      <text x="264" y="109" text-anchor="middle" class="sk-q">p = ?</text>
      <text x="264" y="142" text-anchor="middle" class="sk-lbl">7,5 L · 300 K</text>
    </template>

    <!-- Wet van Gay-Lussac: opwarmen met vaste zuiger (300 K -> 600 K) -->
    <template v-else-if="kind === 'gaylussac'">
      <!-- Links: Vóór (vaste zuiger met borgpennen) -->
      <rect x="38" y="62" width="76" height="60" fill="var(--color-digital-soft)" />
      <path d="M38 28 V122 H114 V28" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="39.5" y="57" width="73" height="6" fill="currentColor" />
      <rect x="73" y="36" width="6" height="21" fill="currentColor" />
      <rect x="62" y="33" width="28" height="4" fill="currentColor" />
      <!-- Borgpennen op de wand (zuiger zit vast) -->
      <rect x="31" y="51" width="14" height="5" fill="var(--color-digital)" />
      <rect x="107" y="51" width="14" height="5" fill="var(--color-digital)" />
      <text x="76" y="142" text-anchor="middle" class="sk-lbl">15 L · 300 K</text>

      <!-- Pijl -->
      <text x="170" y="64" text-anchor="middle" class="sk-act">opwarmen</text>
      <path d="M138 76 H198 M192 70 L200 76 L192 82" fill="none" stroke="var(--color-ink-soft)" stroke-width="2" />
      <text x="170" y="96" text-anchor="middle" class="sk-sub">zuiger vast</text>

      <!-- Rechts: Na (zelfde volume, 600 K) -->
      <rect x="226" y="62" width="76" height="60" fill="var(--color-digital-soft)" />
      <path d="M226 28 V122 H302 V28" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="227.5" y="57" width="73" height="6" fill="currentColor" />
      <rect x="261" y="36" width="6" height="21" fill="currentColor" />
      <rect x="250" y="33" width="28" height="4" fill="currentColor" />
      <!-- Borgpennen -->
      <rect x="219" y="51" width="14" height="5" fill="var(--color-digital)" />
      <rect x="295" y="51" width="14" height="5" fill="var(--color-digital)" />
      <text x="264" y="98" text-anchor="middle" class="sk-q">p = ?</text>
      <text x="264" y="142" text-anchor="middle" class="sk-lbl">15 L · 600 K</text>
    </template>

    <!-- Wet van Charles: opwarmen met vrije zuiger (300 K -> 600 K) -->
    <template v-else>
      <!-- Links: Vóór (vrije zuiger met gelijke belasting) -->
      <rect x="38" y="76" width="76" height="46" fill="var(--color-digital-soft)" />
      <path d="M38 22 V122 H114 V22" fill="none" stroke="currentColor" stroke-width="2.5" />
      <rect x="39.5" y="71" width="73" height="6" fill="currentColor" />
      <rect x="64" y="59" width="24" height="12" fill="var(--color-panel-muted)" stroke="currentColor" stroke-width="1.8" />
      <text x="76" y="142" text-anchor="middle" class="sk-lbl">15 L · 300 K</text>

      <!-- Pijl -->
      <text x="170" y="64" text-anchor="middle" class="sk-act">opwarmen</text>
      <path d="M138 76 H198 M192 70 L200 76 L192 82" fill="none" stroke="var(--color-ink-soft)" stroke-width="2" />
      <text x="170" y="96" text-anchor="middle" class="sk-sub">vrije zuiger</text>

      <!-- Rechts: Na (zuiger vrij, bewegingsrichting + volume gevraagd) -->
      <rect x="226" y="76" width="76" height="46" fill="var(--color-digital-soft)" opacity=".55" />
      <path d="M226 22 V122 H302 V22" fill="none" stroke="currentColor" stroke-width="2.5" />
      <line x1="227.5" y1="74" x2="300.5" y2="74" stroke="currentColor" stroke-width="2.5" stroke-dasharray="5 4" />
      <!-- Tweerichtingspijl bij vrije zuiger -->
      <path d="M264 36 V64 M258 42 L264 35 L270 42 M258 58 L264 65 L270 58" fill="none" stroke="var(--color-digital)" stroke-width="2.2" />
      <text x="264" y="97" text-anchor="middle" class="sk-q">V = ?</text>
      <text x="264" y="114" text-anchor="middle" class="sk-q">p = ?</text>
      <text x="264" y="142" text-anchor="middle" class="sk-lbl">600 K · zelfde last</text>
    </template>
  </svg>
</template>

<style scoped>
.sketch-svg { width: 100%; max-width: 340px; height: auto; display: block; color: var(--color-ink) }
.sk-lbl { font: 600 12.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-ink); font-variant-numeric: tabular-nums }
.sk-act { font: 600 12.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-ink) }
.sk-sub { font: 500 11.5px/1 'IBM Plex Sans', sans-serif; fill: var(--color-ink-soft) }
.sk-q { font: 700 14px/1 'IBM Plex Sans', sans-serif; fill: var(--color-digital) }
</style>
