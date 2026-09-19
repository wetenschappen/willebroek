<script setup>
/**
 * Schematische objecten voor het krachtenlab.
 *
 * Vervangt de emoji die hier eerder stonden: emoji zien er per platform
 * anders uit en zijn op een beamer slecht te lezen. Deze vormen zijn
 * eenvoudige silhouetten in één kleur, zodat het een fysicaschema blijft.
 *
 * Elke vorm is getekend in een eigen 0..100-vak. `bottom` is de y waarop de
 * vorm rust in dat vak; daarmee zetten we hem precies op de grondlijn.
 */
const props = defineProps({
  shape: { type: String, required: true },
  /** Breedte in het physics-coördinatenstelsel (de doos is 60). */
  size: { type: Number, default: 70 },
  color: { type: String, default: 'var(--color-ink-soft)' }
})

const SHAPES = {
  auto: {
    bottom: 74,
    markup: `
      <path d="M6 62 L6 44 Q6 38 13 38 L25 38 L35 22 Q37 19 41 19 L63 19 Q67 19 70 23 L79 38 L89 38 Q94 38 94 44 L94 62 Z"/>
      <circle cx="27" cy="62" r="12"/>
      <circle cx="73" cy="62" r="12"/>`
  },
  mens: {
    bottom: 93,
    markup: `
      <circle cx="50" cy="15" r="12"/>
      <path d="M38 32 Q50 28 62 32 L65 66 L35 66 Z"/>
      <path d="M37 34 L26 58 Q24 63 29 64 L34 65 L42 44 Z"/>
      <path d="M63 34 L74 58 Q76 63 71 64 L66 65 L58 44 Z"/>
      <path d="M36 65 L34 93 L45 93 L48 65 Z"/>
      <path d="M64 65 L66 93 L55 93 L52 65 Z"/>`
  },
  hond: {
    bottom: 90,
    markup: `
      <rect x="6" y="30" width="8" height="26" rx="4" transform="rotate(-30 10 43)"/>
      <rect x="20" y="56" width="11" height="34" rx="5"/>
      <rect x="62" y="56" width="11" height="34" rx="5"/>
      <path d="M14 44 Q14 33 26 33 L70 33 Q82 33 84 45 L84 56 Q84 62 77 62 L21 62 Q14 62 14 56 Z"/>
      <rect x="34" y="56" width="11" height="34" rx="5"/>
      <rect x="48" y="56" width="11" height="34" rx="5"/>
      <path d="M74 40 Q80 26 88 22 L96 34 Q88 42 82 52 Z"/>
      <ellipse cx="86" cy="24" rx="13" ry="11"/>
      <ellipse cx="97" cy="30" rx="7" ry="6"/>
      <path d="M76 18 L72 4 L86 12 Z"/>`
  },
  appel: {
    bottom: 88,
    markup: `
      <path d="M52 33 C58 30 68 32 72 41 C77 52 76 68 69 78 C65 84 58 88 53 88 C51 88 51 86 50 86 C49 86 49 88 47 88 C42 88 35 84 31 78 C24 68 23 52 28 41 C32 32 42 30 48 33 C49 34 51 34 52 33 Z"/>
      <rect x="48.5" y="10" width="4" height="22" rx="2" transform="rotate(-6 50.5 21)"/>
      <ellipse cx="67" cy="15" rx="13" ry="7" transform="rotate(-22 67 15)"/>`
  }
}

const shape = SHAPES[props.shape] || SHAPES.auto
</script>

<template>
  <g
    :transform="`translate(${-50 * (size / 100)}, ${-shape.bottom * (size / 100)}) scale(${size / 100})`"
    :fill="color"
    stroke="none"
  >
    <g v-html="shape.markup" />
  </g>
</template>
