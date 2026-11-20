<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { enterBrowserFullscreen, exitBrowserFullscreen } from '../composables/useBrowserFullscreen.js'
import {
  GAS_MODES, QUANTITIES, REFERENCE, PISTON, PLOT, controlValue, idealState,
  particleCount, pistonY, plotCurve, plotPoint, speedScale, volumeFromY,
} from './gas-simulation-model.js'

const mode = ref('boyle')
const control = ref(REFERENCE.volumeL)
const pumpFlow = ref('')
let pumpTimer = null
const config = computed(() => GAS_MODES[mode.value])
const state = computed(() => idealState(mode.value, control.value))
const inputQuantity = computed(() => QUANTITIES[config.value.input])
const outputQuantity = computed(() => QUANTITIES[config.value.output])
const top = computed(() => pistonY(state.value.volumeL))
const point = computed(() => plotPoint(mode.value, state.value))
const curve = computed(() => plotCurve(mode.value).map(p => `${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(' '))
const xTicks = computed(() => config.value.xTicks.map(value => ({ value, x: PLOT.left + (value - config.value.min) / (config.value.max - config.value.min) * (PLOT.right - PLOT.left) })))
const yTicks = computed(() => config.value.yTicks.map(value => ({ value, y: PLOT.bottom - value / config.value.yTicks.at(-1) * (PLOT.bottom - PLOT.top) })))
const formatters = [0, 1, 2].map(digits => new Intl.NumberFormat('nl-BE', { minimumFractionDigits: digits, maximumFractionDigits: digits, useGrouping: false }))
const fmt = (value, digits = 0) => formatters[digits].format(value)
function clearPumpFlow() {
  if (pumpTimer !== null) clearTimeout(pumpTimer)
  pumpTimer = null
  pumpFlow.value = ''
}
function chooseMode(key) {
  if (mode.value === key) return
  clearPumpFlow()
  control.value = REFERENCE[GAS_MODES[key].input]
  mode.value = key
}
function setControl(raw) {
  const next = controlValue(mode.value, raw)
  if (mode.value === 'avogadro' && next !== control.value) {
    clearPumpFlow()
    pumpFlow.value = next > control.value ? 'in' : 'out'
    // Kort signaal bij een toestandsverandering; geen continue stroming simuleren.
    pumpTimer = setTimeout(clearPumpFlow, 900)
  }
  control.value = next
}
function reset() {
  clearPumpFlow()
  control.value = REFERENCE[config.value.input]
}

const fullscreen = ref(false)
const fullscreenUnavailable = ref(false)
function syncFullscreen() { fullscreen.value = Boolean(document.fullscreenElement) }
async function toggleFullscreen() {
  fullscreenUnavailable.value = false
  if (fullscreen.value) await exitBrowserFullscreen()
  else {
    await enterBrowserFullscreen()
    fullscreenUnavailable.value = !document.fullscreenElement
  }
}

const cylinder = ref(null)
let drag
function svgY(event) {
  const transform = cylinder.value?.getScreenCTM()
  return transform ? new DOMPoint(event.clientX, event.clientY).matrixTransform(transform.inverse()).y : null
}
function startDrag(event) {
  const y = svgY(event)
  if (mode.value !== 'boyle' || event.button !== 0 || drag || y === null) return
  drag = { id: event.pointerId, offset: y - top.value }
  cylinder.value.setPointerCapture(event.pointerId)
}
function dragPiston(event) {
  if (mode.value !== 'boyle' || drag?.id !== event.pointerId) return
  const y = svgY(event)
  if (y !== null) setControl(volumeFromY(y - drag.offset))
}
function endDrag(event) { if (drag?.id === event.pointerId) drag = null }

const paused = ref(false)
const particles = ref([])
let media, frame = null, last = null
const { left, right, floor, radius } = PISTON
const center = (left + right) / 2
const cylinderLabel = computed(() => {
  const label = 'Schematische doorsnede van een gascilinder met zuiger en gasdeeltjes.'
  if (mode.value === 'gayLussac') return label + ' De zuiger is vergrendeld.'
  if (mode.value === 'avogadro') return label + ' Een gaspomp voegt gas toe of voert gas af.'
  return label
})
function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (i * 137.5 + 25) * Math.PI / 180
    const fraction = k => k - Math.floor(k)
    return {
      id: i,
      x: left + radius + fraction((i + 1) * 0.618) * (right - left - 2 * radius),
      y: top.value + radius + fraction((i + 1) * 0.754) * (floor - top.value - 2 * radius),
      vx: (38 + (i % 5) * 8) * Math.cos(angle), vy: (38 + (i % 5) * 8) * Math.sin(angle),
    }
  })
}
function move(dt) {
  const lowest = top.value + radius
  const distance = dt * speedScale(state.value.temperatureK)
  for (const p of particles.value) {
    p.x += p.vx * distance
    p.y += p.vy * distance
    if (p.x < left + radius) { p.x = left + radius; p.vx = Math.abs(p.vx) }
    if (p.x > right - radius) { p.x = right - radius; p.vx = -Math.abs(p.vx) }
    if (p.y < lowest) { p.y = lowest; p.vy = Math.abs(p.vy) }
    if (p.y > floor - radius) { p.y = floor - radius; p.vy = -Math.abs(p.vy) }
  }
}
function animate(now) {
  move(last === null ? 0 : Math.min((now - last) / 1000, 0.045))
  last = now
  frame = requestAnimationFrame(animate)
}
function syncAnimation() {
  if (paused.value || document.hidden) {
    if (frame !== null) cancelAnimationFrame(frame)
    frame = last = null
  } else if (frame === null) frame = requestAnimationFrame(animate)
}
function syncMotionPreference() { paused.value = media.matches }
watch(() => particleCount(state.value.moles), count => { particles.value = makeParticles(count) }, { immediate: true })
watch(top, () => move(0))
watch(paused, syncAnimation)
onMounted(() => {
  document.addEventListener('fullscreenchange', syncFullscreen)
  document.addEventListener('visibilitychange', syncAnimation)
  media = window.matchMedia('(prefers-reduced-motion: reduce)')
  media.addEventListener('change', syncMotionPreference)
  syncMotionPreference()
  syncFullscreen()
  syncAnimation()
})
onUnmounted(() => {
  clearPumpFlow()
  document.removeEventListener('fullscreenchange', syncFullscreen)
  document.removeEventListener('visibilitychange', syncAnimation)
  media?.removeEventListener('change', syncMotionPreference)
  if (frame !== null) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="gas-demo modal-fullscreen">
    <header class="fullscreen-bar fullscreen-bar-digital gas-header">
      <div class="gas-heading">
        <h1 class="fullscreen-title">Gaswetten</h1>
        <span class="gas-equation">pV = nRT</span>
      </div>
      <nav class="gas-modes" aria-label="Gasrelatie kiezen">
        <button v-for="(item, key) in GAS_MODES" :key="key" type="button" :aria-pressed="key === mode" @click="chooseMode(key)">{{ item.name }}</button>
      </nav>
      <button class="btn btn-primary gas-fullscreen" type="button" @click="toggleFullscreen">
        {{ fullscreen ? 'Volledig scherm verlaten' : 'Volledig scherm' }}
      </button>
      <p v-if="fullscreenUnavailable" class="gas-fallback" role="status">Gebruik F11 of het browsermenu voor volledig scherm.</p>
    </header>

    <main class="gas-workspace">
      <section class="gas-stage" aria-label="Cilinder en bediening">
        <svg ref="cylinder" class="gas-cylinder" viewBox="0 0 390 332" role="img" :aria-label="cylinderLabel"
          @pointermove="dragPiston" @pointerup="endDrag" @pointercancel="endDrag" @lostpointercapture="endDrag">
          <rect :x="left" :y="top" :width="right - left" :height="floor - top" class="gas-fill" />
          <path :d="`M${left} 46V${floor}H${right}V46`" class="gas-walls" />
          <circle v-for="p in particles" :key="p.id" :cx="p.x" :cy="p.y" :r="radius" class="gas-particle" />
          <g v-if="mode === 'avogadro'" class="gas-pump" :data-flow="pumpFlow || 'idle'">
            <path d="M45 272h5q8 0 8 8v3q0 8 8 8h36" class="gas-tube" />
            <path d="M45 272h5q8 0 8 8v3q0 8 8 8h36" class="gas-tube-bore" />
            <rect x="5" y="252" width="42" height="33" rx="5" class="gas-pump-body" />
            <path d="M14 262v13m6-13v13m6-13v13" class="gas-pump-vents" />
            <circle cx="36" cy="268.5" r="4" class="gas-pump-light" />
            <text x="26" y="300" text-anchor="middle" class="gas-diagram-label">Pomp</text>
            <path v-if="pumpFlow" :d="pumpFlow === 'in' ? 'M72 291h34m-8-6 8 6-8 6' : 'M106 291H72m8-6-8 6 8 6'" class="gas-flow-arrow" />
          </g>
          <g class="gas-piston" :class="{ draggable: mode === 'boyle' }" :transform="`translate(0 ${top})`" @pointerdown="startDrag">
            <rect :x="left + 1" y="-12" :width="right - left - 2" height="12" rx="2" class="gas-piston-head" />
            <g v-if="mode === 'gayLussac'" class="gas-lock" :transform="`translate(${center} 0)`">
              <path d="M-10-34v-10a10 10 0 0 1 20 0v10" class="gas-lock-shackle" />
              <rect x="-16" y="-37" width="32" height="25" rx="4" class="gas-lock-body" />
              <path d="M0-28v8" class="gas-lock-keyhole" />
              <text x="24" y="-22" class="gas-diagram-label">Vast</text>
            </g>
            <rect v-else :x="center - 13" y="-32" width="26" height="28" rx="4" class="gas-handle" />
          </g>
        </svg>
        <div class="gas-control">
          <label for="gas-parameter">{{ inputQuantity.name }} {{ inputQuantity.symbol }} instellen</label>
          <input id="gas-parameter" type="range" :min="config.min" :max="config.max" :step="config.step" :value="control"
            :aria-valuetext="`${fmt(control, inputQuantity.inputDigits)} ${inputQuantity.unit}`" @input="setControl($event.target.valueAsNumber)">
          <div class="gas-actions">
            <p>{{ mode === 'boyle' ? 'Schuif of sleep de zuiger.' : mode === 'gayLussac' ? 'De zuiger staat vast.' : mode === 'avogadro' ? 'Schuif: gas erbij of eruit.' : 'De zuiger kan vrij bewegen.' }}</p>
            <button type="button" class="gas-small-button" @click="reset">Herstel beginstand</button>
            <button type="button" class="gas-small-button" @click="paused = !paused">{{ paused ? 'Animatie starten' : 'Animatie pauzeren' }}</button>
          </div>
        </div>
      </section>

      <section class="gas-data" aria-label="Toestand en grafiek">
        <dl class="gas-readings">
          <div v-for="(quantity, key) in QUANTITIES" :key="key">
            <dt :title="quantity.name">{{ quantity.symbol }} <span>{{ quantity.name }}</span></dt>
            <dd :data-quantity="key">{{ fmt(state[key], quantity.digits) }} <span>{{ quantity.unit }}</span></dd>
          </div>
        </dl>
        <p class="gas-summary"><strong>{{ config.relation }}</strong><span>{{ config.fixed }}.</span></p>
        <svg class="gas-chart" viewBox="0 0 560 308" role="img" :aria-label="`${outputQuantity.name} tegen ${inputQuantity.name.toLowerCase()}. ${config.relation}.`">
          <g v-for="tick in yTicks" :key="tick.value">
            <line :x1="PLOT.left" :x2="PLOT.right" :y1="tick.y" :y2="tick.y" class="gas-gridline" />
            <text :x="PLOT.left - 10" :y="tick.y + 5" text-anchor="end">{{ fmt(tick.value) }}</text>
          </g>
          <g v-for="tick in xTicks" :key="tick.value">
            <line :x1="tick.x" :x2="tick.x" :y1="PLOT.top" :y2="PLOT.bottom" class="gas-gridline" />
            <text :x="tick.x" :y="PLOT.bottom + 22" text-anchor="middle">{{ fmt(tick.value, mode === 'avogadro' ? 1 : 0) }}</text>
          </g>
          <path :d="`M${PLOT.left} ${PLOT.top}V${PLOT.bottom}H${PLOT.right}`" class="gas-axes" />
          <text x="19" y="133" text-anchor="middle" transform="rotate(-90 19 133)">{{ outputQuantity.symbol }} ({{ outputQuantity.unit }})</text>
          <text x="296" y="298" text-anchor="middle">{{ inputQuantity.symbol }} ({{ inputQuantity.unit }})</text>
          <polyline :points="curve" class="gas-curve" />
          <circle :cx="point.x" :cy="point.y" r="7" class="gas-point" />
        </svg>
        <p class="gas-note">Ideaal-gasmodel: de druk wordt berekend. De getekende deeltjes zijn schematisch.</p>
      </section>
    </main>
  </div>
</template>

<style scoped>
.gas-demo { height: 100dvh; overflow: auto; }
.gas-header { min-height: 0; padding: .35rem clamp(.65rem, 2vw, 1.5rem); gap: .35rem 1rem; flex-wrap: wrap; }
.gas-heading, .gas-modes { display: flex; align-items: center; gap: .65rem; }
.gas-heading h1 { font-size: 1.15rem; margin: 0; }
.gas-equation { color: var(--color-ink-soft); font-weight: 600; white-space: nowrap; }
.gas-modes { margin-inline: auto; gap: .25rem; flex-wrap: wrap; }
.gas-modes button, .gas-small-button {
  min-height: 2.35rem;
  padding: .3rem .75rem;
  border: 2px solid transparent;
  border-radius: var(--radius-control);
  color: var(--color-ink);
  font-weight: 600;
}
.gas-modes button[aria-pressed='true'] { background: var(--color-digital-soft); color: var(--color-digital); border-color: var(--color-digital); }
.gas-fullscreen { min-height: 2.35rem; padding: .3rem .65rem; }
.gas-fallback { flex-basis: 100%; }
.gas-workspace { flex: 1; display: grid; grid-template-columns: minmax(0, .92fr) minmax(0, 1.08fr); min-height: 0; }
.gas-stage, .gas-data { display: flex; flex-direction: column; min-width: 0; min-height: 0; padding: clamp(.65rem, 2vw, 1.4rem); }
.gas-stage { background: var(--color-panel); border-right: 2px solid var(--color-line); }
.gas-cylinder { width: 100%; min-height: 190px; flex: 1 1 0; }
.gas-fill { fill: var(--color-digital-soft); }
.gas-walls { stroke: var(--color-ink); stroke-width: 4; stroke-linejoin: round; fill: none; }
.gas-diagram-label { fill: var(--color-ink); font-size: 11px; font-weight: 700; }
.gas-lock-shackle { fill: none; stroke: var(--color-ink); stroke-width: 4; }
.gas-lock-body { fill: var(--color-digital); stroke: var(--color-ink); stroke-width: 2; }
.gas-lock-keyhole { stroke: var(--color-panel); stroke-width: 4; stroke-linecap: round; }
.gas-tube, .gas-tube-bore, .gas-flow-arrow { fill: none; stroke-linecap: round; stroke-linejoin: round; }
.gas-tube { stroke: var(--color-ink); stroke-width: 8; }
.gas-tube-bore { stroke: var(--color-panel-muted); stroke-width: 4; }
.gas-pump-body { fill: var(--color-panel-muted); stroke: var(--color-ink); stroke-width: 2; }
.gas-pump-vents { fill: none; stroke: var(--color-ink); stroke-width: 2; stroke-linecap: round; }
.gas-pump-light { fill: var(--color-line-strong); }
.gas-pump:not([data-flow='idle']) .gas-pump-light { fill: var(--color-digital); }
.gas-flow-arrow { stroke: var(--color-digital); stroke-width: 3; }
.gas-piston.draggable { cursor: ns-resize; touch-action: none; }
.gas-piston-head { fill: var(--color-ink); }
.gas-handle { fill: var(--color-line-strong); stroke: var(--color-ink); stroke-width: 2; }
.gas-particle { fill: var(--color-digital); }
.gas-control { width: min(100%, 34rem); margin-inline: auto; }
.gas-control label { display: block; text-align: center; font-weight: 700; }
.gas-control input { display: block; width: 100%; margin: .4rem 0; height: 2rem; accent-color: var(--color-digital); }
.gas-actions { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .25rem .6rem; font-size: .88rem; }
.gas-small-button { border-color: var(--color-line-strong); background: var(--color-panel); padding-inline: .5rem; }
.gas-readings { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .45rem; }
.gas-readings > div { text-align: center; padding: .42rem .2rem; border: 2px solid var(--color-line); background: var(--color-panel); border-radius: var(--radius-control); }
.gas-readings dt { font-weight: 700; font-size: .84rem; }
.gas-readings dt span { font-weight: 500; }
.gas-readings dd { margin: .2rem 0 0; font-weight: 700; font-size: clamp(1rem, 1.9vw, 1.65rem); font-variant-numeric: tabular-nums; }
.gas-readings dd span { font-size: .68em; white-space: nowrap; }
.gas-summary { display: flex; align-items: baseline; justify-content: space-between; gap: .3rem 1rem; flex-wrap: wrap; margin: .6rem 0 .2rem; }
.gas-summary strong { color: var(--color-digital); font-size: 1.05rem; }
.gas-chart { width: 100%; flex: 1 1 0; min-height: 170px; }
.gas-chart text { fill: var(--color-ink); font-size: 15px; font-weight: 600; }
.gas-gridline { stroke: var(--color-line-strong); stroke-dasharray: 4 4; opacity: .55; }
.gas-axes { stroke: var(--color-ink); stroke-width: 2; fill: none; }
.gas-curve { stroke: var(--color-digital); stroke-width: 3.5; fill: none; }
.gas-point { fill: var(--color-digital); stroke: var(--color-panel); stroke-width: 2; }
.gas-note { font-size: .88rem; color: var(--color-ink-soft); margin-top: .2rem; }
@media (max-width: 850px) {
  .gas-modes { order: 1; flex-basis: 100%; justify-content: center; }
  .gas-fullscreen { margin-inline-start: auto; }
  .gas-workspace { grid-template-columns: 1fr; min-height: auto; }
  .gas-stage { border-right: 0; border-bottom: 2px solid var(--color-line); }
  .gas-cylinder { flex: initial; height: clamp(190px, 34vh, 340px); }
  .gas-chart { flex: initial; height: auto; }
}
@media (max-width: 440px) {
  .gas-modes button { padding-inline: .42rem; }
  .gas-readings { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
</style>
