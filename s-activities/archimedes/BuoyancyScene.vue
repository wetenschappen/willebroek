<script setup>
import { computed, useId } from 'vue'
import { format } from '../../src/physics/archimedes.js'
const props = defineProps({ model: { type: Object, required: true }, layer: { type: String, default: 'volume' }, reveal: { type: Boolean, default: true }, gas: Boolean, fixedScale: Boolean })
const uid = useId().replaceAll(':', '')
const H = 140, X = 174, W = 132, surface = 180
const top = computed(() => props.gas ? 190 : props.model.fraction < 1 ? surface - H * (1 - props.model.fraction) : 200 + props.model.topDepth * 22)
const bottom = computed(() => top.value + H)
const point = computed(() => bottom.value - H * props.model.fraction / 2)
const scale = computed(() => props.fixedScale ? 5 : 108 / Math.max(props.model.FA, props.model.FG, 0.001))
const pressureScale = computed(() => 72 / Math.max(props.model.F1, props.model.F2, 0.001))
const cm3 = n => format(n * 1e6, 0)
</script>

<template>
  <figure class="arch-scene">
    <svg viewBox="0 0 660 470" role="img" :aria-labelledby="`${uid}-title ${uid}-desc`">
      <title :id="`${uid}-title`">{{ gas ? 'Krachten op een ballon in lucht' : layer === 'pressure' ? 'Drukkrachten op een volledig ondergedompelde kubus' : 'Ondergedompeld voorwerp en verplaatste vloeistof' }}</title>
      <desc :id="`${uid}-desc`">{{ gas ? 'Omringende lucht oefent archimedeskracht omhoog uit; het gewicht werkt omlaag.' : `Het ondergedompelde volume en het verplaatste vloeistofvolume zijn beide ${cm3(model.submergedVolume)} kubieke centimeter. De zijwaartse drukkrachten heffen elkaar op.` }}</desc>
      <defs>
        <marker :id="`${uid}-up`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--color-digital)" /></marker>
        <marker :id="`${uid}-down`" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M0 0L10 5L0 10Z" fill="var(--color-presentation)" /></marker>
        <clipPath :id="`${uid}-water`"><rect x="80" :y="surface" width="300" height="340" /></clipPath>
      </defs>
      <rect x="80" :y="gas ? 90 : surface" width="300" :height="gas ? 340 : 430 - surface" fill="var(--color-digital-soft)" />
      <path v-if="!gas" d="M80 38V430H380V38" fill="none" stroke="var(--color-ink)" stroke-width="3" />
      <line v-if="!gas" x1="80" :y1="surface" x2="380" :y2="surface" stroke="var(--color-digital)" stroke-width="3" />
      <text x="86" y="25">{{ gas ? 'Omringende lucht' : 'Vloeistof' }}</text>
      <template v-if="gas"><ellipse cx="240" cy="185" rx="70" ry="86" fill="var(--color-panel)" stroke="var(--color-ink)" stroke-width="3" /><path d="M202 257L216 288H264L278 257 M216 288V306H264V288" fill="none" stroke="var(--color-ink)" stroke-width="3" /></template>
      <template v-else>
        <rect :x="X" :y="top" :width="W" :height="H" fill="var(--color-panel)" stroke="var(--color-ink)" stroke-width="3" />
        <rect :x="X + 4" :y="top + 4" :width="W - 8" :height="H - 8" :clip-path="`url(#${uid}-water)`" fill="var(--color-workbook-soft)" />
        <text v-if="layer === 'pressure' || layer === 'volume'" :x="X + W / 2" :y="top + H / 2 + 6" text-anchor="middle">Voorwerp</text>
      </template>
      <template v-if="layer === 'pressure' && !gas">
        <g stroke="var(--color-ink)" stroke-width="2" fill="none"><path :d="`M110 ${surface}H124M117 ${surface}V${top}M110 ${top}H124`" /><path :d="`M328 ${top}H342M335 ${top}V${bottom}M328 ${bottom}H342`" /></g>
        <text x="105" :y="(surface + top) / 2 + 6" text-anchor="end">h₁</text><text x="347" :y="top + H / 2">z</text>
        <text x="100" :y="bottom + 28">h₂ = h₁ + z</text><text x="280" :y="bottom - 12">A</text>
        <line x1="240" :y1="top - model.F1 * pressureScale" x2="240" :y2="top - 3" stroke="var(--color-presentation)" stroke-width="4" :marker-end="`url(#${uid}-down)`" />
        <line x1="240" :y1="bottom + model.F2 * pressureScale" x2="240" :y2="bottom + 3" stroke="var(--color-digital)" stroke-width="4" :marker-end="`url(#${uid}-up)`" />
        <text x="252" :y="top - 18" fill="var(--color-presentation)">F₁ ↓</text><text x="252" :y="bottom + 32" fill="var(--color-digital)">F₂ ↑</text>
        <g stroke="var(--color-ink-soft)" stroke-width="2"><path :d="`M140 ${top + 48}h30m-8 -5l8 5l-8 5 M140 ${top + 92}h30m-8 -5l8 5l-8 5 M340 ${top + 48}h-30m8 -5l-8 5l8 5 M340 ${top + 92}h-30m8 -5l-8 5l8 5`" /></g>
        <text x="414" y="166">Onder ligt dieper:</text><text x="414" y="198">p₂ &gt; p₁</text><text x="414" y="242">Zelfde oppervlakte A:</text><text x="414" y="274">F₂ &gt; F₁</text><text v-if="reveal" x="414" y="330" font-weight="700">F<tspan baseline-shift="sub" font-size="14">A</tspan> = F₂ − F₁ ↑</text>
      </template>
      <template v-else-if="layer === 'volume' && !gas">
        <path d="M466 180V390H600V180" fill="none" stroke="var(--color-ink)" stroke-width="3" />
        <rect x="469" :y="387 - H * model.fraction" width="128" :height="H * model.fraction" fill="var(--color-digital-soft)" stroke="var(--color-digital)" stroke-width="2" />
        <text x="450" y="128">Verplaatste vloeistof</text><text x="532" y="422" text-anchor="middle">V<tspan baseline-shift="sub" font-size="14">vl</tspan> = {{ cm3(model.displacedVolume) }} cm³</text>
        <text x="84" y="454">V<tspan baseline-shift="sub" font-size="14">ond</tspan> = {{ cm3(model.submergedVolume) }} cm³</text><text x="450" y="454" font-weight="700">V<tspan baseline-shift="sub" font-size="14">vl</tspan> = V<tspan baseline-shift="sub" font-size="14">ond</tspan></text>
      </template>
      <template v-else>
        <g v-if="reveal">
          <circle cx="240" :cy="gas ? 220 : point" r="4" fill="var(--color-digital)" />
          <line x1="240" :y1="gas ? 220 : point" x2="240" :y2="(gas ? 220 : point) - model.FA * scale" stroke="var(--color-digital)" stroke-width="4" :marker-end="`url(#${uid}-up)`" />
          <line x1="240" :y1="gas ? 220 : top + H / 2" x2="240" :y2="(gas ? 220 : top + H / 2) + model.FG * scale" stroke="var(--color-presentation)" stroke-width="4" :marker-end="`url(#${uid}-down)`" />
          <text x="202" :y="(gas ? 220 : point) - model.FA * scale - 14" fill="var(--color-digital)">F<tspan baseline-shift="sub" font-size="14">A</tspan></text><text x="254" :y="(gas ? 220 : top + H / 2) + model.FG * scale + 18" fill="var(--color-presentation)">F<tspan baseline-shift="sub" font-size="14">G</tspan></text>
          <text x="410" y="176" fill="var(--color-digital)">F<tspan baseline-shift="sub" font-size="14">A</tspan> = {{ format(model.FA, gas ? 0 : 2) }} N ↑</text><text x="410" y="214" fill="var(--color-presentation)">F<tspan baseline-shift="sub" font-size="14">G</tspan> = {{ format(model.FG, gas ? 0 : 2) }} N ↓</text>
          <text x="410" y="272">{{ gas ? 'Verplaatst gas:' : 'Verplaatste vloeistof:' }}</text><text x="410" y="306">{{ gas ? format(model.displacedVolume, 0) + ' m³' : cm3(model.submergedVolume) + ' cm³' }}</text>
        </g>
        <text v-else x="412" y="200">Voorspel eerst.</text>
      </template>
    </svg>
    <figcaption>{{ layer === 'pressure' ? 'Schematische kubus. De zijwaartse drukkrachten heffen elkaar op; F₁ en F₂ hebben één gezamenlijke schaal.' : layer === 'volume' ? 'Groen = ondergedompeld deel; blauw = verplaatste vloeistof. Beide volumes hebben dezelfde doorsnede. De bak heeft een overloop: de waterspiegel blijft gelijk.' : 'Blauw = archimedeskracht omhoog. Rood = gewicht omlaag. Krachtpijlen gebruiken binnen deze figuur dezelfde N-schaal.' }}</figcaption>
  </figure>
</template>
