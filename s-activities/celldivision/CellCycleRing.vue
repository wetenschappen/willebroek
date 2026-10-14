<script setup>
import { computed } from 'vue'

const props = defineProps({ active: { type: String, default: 'g1' }, outsideCycle: Boolean })
const cx = 400
const cy = 225
function point(radius, angle) {
  const radians = angle * Math.PI / 180
  return [cx + radius * Math.cos(radians), cy + radius * Math.sin(radians)]
}
function sector(inner, outer, start, end) {
  const a = point(outer, start)
  const b = point(outer, end)
  const c = point(inner, end)
  const d = point(inner, start)
  const large = end - start > 180 ? 1 : 0
  return `M ${a} A ${outer} ${outer} 0 ${large} 1 ${b} L ${c} A ${inner} ${inner} 0 ${large} 0 ${d} Z`
}
const stages = [
  { key: 'g1', label: 'G₁-fase', start: -180, end: -72 },
  { key: 's', label: 'S-fase', start: 100, end: 180 },
  { key: 'g2', label: 'G₂-fase', start: -12, end: 100 }
]
// Counterclockwise, as in the book: G1 → S → G2 → P → M → A → T.
const mitosis = [
  { key: 'p', label: 'P', name: 'profase', start: -27, end: -12 },
  { key: 'm', label: 'M', name: 'metafase', start: -42, end: -27 },
  { key: 'a', label: 'A', name: 'anafase', start: -57, end: -42 },
  { key: 't', label: 'T', name: 'telofase', start: -72, end: -57 }
]
const activeMitosis = computed(() => props.active === 'division' || props.active === 'spindle')
function arrow(angle) {
  const tip = point(177, angle - 4)
  const outer = point(184, angle + 1)
  const inner = point(170, angle + 1)
  return `M ${tip} L ${outer} L ${inner} Z`
}
</script>

<template>
  <g aria-label="Celcyclus: interfase, gevolgd door celdeling">
    <path :d="sector(166, 190, -12, 288)" fill="var(--color-workbook-soft)" stroke="var(--color-workbook)" stroke-width="2" />
    <path :d="sector(166, 190, -72, -12)" fill="var(--color-presentation-soft)" stroke="var(--color-presentation)" stroke-width="2" />
    <g v-for="stage in stages" :key="stage.key">
      <path :d="sector(122, 165, stage.start, stage.end)" :fill="active === stage.key && !outsideCycle ? 'var(--color-workbook-soft)' : 'var(--color-panel)'" :stroke="active === stage.key && !outsideCycle ? 'var(--color-workbook)' : 'var(--color-line)'" :stroke-width="active === stage.key && !outsideCycle ? 3 : 2" />
      <text :x="point(144, (stage.start + stage.end) / 2)[0]" :y="point(144, (stage.start + stage.end) / 2)[1] + 6" text-anchor="middle" class="ring-label">{{ stage.label }}</text>
    </g>
    <g v-for="stage in mitosis" :key="stage.key">
      <path :d="sector(122, 165, stage.start, stage.end)" :fill="activeMitosis ? 'var(--color-presentation-soft)' : 'var(--color-panel)'" :stroke="activeMitosis ? 'var(--color-presentation)' : 'var(--color-line)'" stroke-width="2" />
      <text :x="point(144, (stage.start + stage.end) / 2)[0]" :y="point(144, (stage.start + stage.end) / 2)[1] + 5" text-anchor="middle" class="ring-letter">{{ stage.label }}</text>
    </g>
    <path v-for="angle in [-165, 155, 75]" :key="angle" :d="arrow(angle)" fill="var(--color-workbook)" />
    <path :d="arrow(-47)" fill="var(--color-presentation)" />
    <text x="400" y="440" text-anchor="middle" class="group-title">Interfase: G₁, S en G₂</text>

    <path d="M 540 118 L 601 73 H 626" fill="none" stroke="var(--color-presentation)" stroke-width="2" />
    <text x="640" y="77" class="group-title">Celdeling</text>
    <text x="640" y="108" class="detail">Mitose: PMAT</text>
    <text v-for="(stage, index) in mitosis" :key="stage.name" x="640" :y="133 + index * 24" class="detail">{{ stage.label }} · {{ stage.name }}</text>
    <text x="640" y="244" class="detail">Cytokinese:</text>
    <text x="640" y="266" class="detail">deling van het</text>
    <text x="640" y="288" class="detail">cytoplasma</text>
    <text x="640" y="340" class="caption">Sectoren tonen de volgorde,</text>
    <text x="640" y="359" class="caption">niet de exacte tijdsduur.</text>

    <path d="M 279 112 L 193 72 H 179" fill="none" stroke="var(--color-line)" stroke-width="2" stroke-dasharray="6 5" />
    <path d="M 177 72 L 192 66 L 192 78 Z" fill="var(--color-line)" />
    <rect x="32" y="44" width="145" height="54" rx="8" :fill="outsideCycle ? 'var(--color-digital-soft)' : 'var(--color-panel)'" :stroke="outsideCycle ? 'var(--color-digital)' : 'var(--color-line-strong)'" stroke-width="2" />
    <text x="104" y="68" text-anchor="middle" class="ring-label">G₀</text>
    <text x="104" y="87" text-anchor="middle" class="caption">buiten de celcyclus</text>
    <text x="32" y="123" class="caption">Mogelijke afslag vanuit G₁,</text>
    <text x="32" y="142" class="caption">geen vaste cyclusfase.</text>
  </g>
</template>

<style scoped>
.ring-label { fill: var(--color-ink); font-size: 18px; font-weight: 600; }
.ring-letter { fill: var(--color-ink); font-size: 16px; font-weight: 700; }
.group-title { fill: var(--color-ink); font-size: 18px; font-weight: 700; }
.detail { fill: var(--color-ink); font-size: 15px; font-weight: 500; }
.caption { fill: var(--color-ink-soft); font-size: 12px; }
</style>
