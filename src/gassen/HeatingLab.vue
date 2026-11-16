<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { HEATING, TEMPERATURE_PRESETS, HEAT_GRAPH, heatingState, boundedTemperature, makeHeatingParticles, moveHeatingParticles, heatingGraphPoint, heatingLine } from './heating-model.js'
import { formatNumber } from './compression-model.js'

const temperature = ref(HEATING.initialK)
const state = computed(() => heatingState(temperature.value))
const dot = computed(() => heatingGraphPoint(temperature.value))
const particles = ref(makeHeatingParticles())
const moving = ref(false)
const error = ref('')
let frame = null, lastTime = null, preference
function stopFrames() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null; lastTime = null
}
function animate(time) {
  const dt = lastTime === null ? 0 : (time - lastTime) / 1000
  lastTime = time
  particles.value = moveHeatingParticles(particles.value, temperature.value, dt)
  frame = requestAnimationFrame(animate)
}
function syncAnimation() {
  stopFrames()
  if (moving.value && !document.hidden) frame = requestAnimationFrame(animate)
}
function setTemperature(value) {
  temperature.value = boundedTemperature(Number(value))
  particles.value = moveHeatingParticles(particles.value, temperature.value)
  error.value = ''
}
function commitTemperature(event) {
  const input = event.target, value = Number(input.value)
  if (!input.value.trim() || !Number.isInteger(value) || value < HEATING.minK || value > HEATING.maxK) {
    error.value = 'Kies een gehele temperatuur van 273 tot en met 600 K. De vorige stand blijft behouden.'
    input.value = String(temperature.value)
    return
  }
  setTemperature(value)
}
function reset() {
  setTemperature(HEATING.initialK)
  particles.value = makeHeatingParticles()
}
function motionChanged(event) { if (event.matches) moving.value = false }
watch(moving, syncAnimation)
onMounted(() => {
  preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  moving.value = !preference.matches
  preference.addEventListener('change', motionChanged)
  document.addEventListener('visibilitychange', syncAnimation)
})
onUnmounted(() => {
  stopFrames()
  preference?.removeEventListener('change', motionChanged)
  document.removeEventListener('visibilitychange', syncAnimation)
})
</script>

<template>
  <section class="heating-lab" aria-label="Gasmodel in een star, afgesloten vat">
    <dl class="heat-readouts">
      <div><dt>Temperatuur</dt><dd><output data-testid="temperature">{{ temperature }}</output> K <span class="heat-celsius">({{ state.celsius }} °C)</span></dd></div>
      <div><dt>Absolute druk</dt><dd><output data-testid="heat-pressure">{{ formatNumber(state.pressureBar) }}</output> bar</dd></div>
      <div><dt>Volume vast</dt><dd>60 mL</dd></div>
    </dl>
    <p class="heat-fixed">Hoeveelheid gas vast · afgesloten vat · geen toevoer of lek</p>
    <div class="heat-workbench">
      <div>
        <svg class="heat-vessel" viewBox="30 45 390 160" role="img" aria-label="Star vat: dezelfde gasruimte en twaalf representatieve deeltjes; bij hogere temperatuur gemiddeld snellere beweging">
          <rect class="heat-gas" x="60" y="65" width="322.5" height="120" />
          <circle v-for="p in particles" :key="p.id" class="heat-particle" :cx="p.x" :cy="p.y" :r="p.r" />
          <rect class="heat-wall" x="60" y="65" width="322.5" height="120" />
        </svg>
        <label class="heat-label" for="gas-temperature">Temperatuur instellen (K)</label>
        <input id="gas-temperature" class="heat-range" type="range" :min="HEATING.minK" :max="HEATING.maxK" step="1" :value="temperature" @input="setTemperature($event.target.value)" />
        <div class="heat-presets" role="group" aria-label="Exacte temperatuurstanden">
          <button v-for="preset in TEMPERATURE_PRESETS" :key="preset" class="btn" :class="temperature === preset ? 'btn-primary' : 'btn-ghost'" :aria-pressed="temperature === preset" @click="setTemperature(preset)">{{ preset }} K</button>
        </div>
        <label class="heat-exact" for="gas-temperature-exact">Exacte temperatuur (K)
          <input id="gas-temperature-exact" type="number" :min="HEATING.minK" :max="HEATING.maxK" step="1" :value="temperature" :aria-invalid="Boolean(error)" :aria-describedby="error ? 'heat-entry-help heat-entry-error' : 'heat-entry-help'" @change="commitTemperature" @keydown.enter.prevent="commitTemperature" />
        </label>
        <p id="heat-entry-help" class="heat-note">Typ en druk Enter, of verlaat het veld. Alleen de temperatuur verandert; het vat blijft even groot.</p>
        <p v-if="error" id="heat-entry-error" class="heat-error" role="status">{{ error }}</p>
        <div class="heat-tools">
          <button class="btn btn-ghost" @click="reset">Beginstand herstellen</button>
          <button class="btn btn-ghost" :aria-pressed="moving" @click="moving = !moving">{{ moving ? 'Animatie pauzeren' : 'Deeltjes laten bewegen' }}</button>
        </div>
      </div>
      <div class="heat-plot">
        <h2 class="heat-graph-title">Dezelfde toestand in het p,T-diagram</h2>
        <svg class="heat-graph" viewBox="0 0 360 270" role="img" :aria-label="`Modelgrafiek: bij ${temperature} K is de absolute druk ${formatNumber(state.pressureBar)} bar. Volume en hoeveelheid gas blijven gelijk.`">
          <path class="heat-axis" d="M48,32 V208 H338" />
          <g v-for="tick in [0, 150, 300, 450, 600]" :key="`t-${tick}`">
            <line class="heat-axis" :x1="HEAT_GRAPH.left + tick / HEAT_GRAPH.maxK * (HEAT_GRAPH.right - HEAT_GRAPH.left)" y1="208" :x2="HEAT_GRAPH.left + tick / HEAT_GRAPH.maxK * (HEAT_GRAPH.right - HEAT_GRAPH.left)" y2="216" />
            <text class="heat-svg-text" :x="HEAT_GRAPH.left + tick / HEAT_GRAPH.maxK * (HEAT_GRAPH.right - HEAT_GRAPH.left)" y="239" text-anchor="middle">{{ tick }}</text>
          </g>
          <g v-for="tick in [0, 1, 2]" :key="`p-${tick}`">
            <line class="heat-axis" x1="40" :y1="HEAT_GRAPH.bottom - tick / HEAT_GRAPH.maxBar * (HEAT_GRAPH.bottom - HEAT_GRAPH.top)" x2="48" :y2="HEAT_GRAPH.bottom - tick / HEAT_GRAPH.maxBar * (HEAT_GRAPH.bottom - HEAT_GRAPH.top)" />
            <text class="heat-svg-text" x="32" :y="HEAT_GRAPH.bottom - tick / HEAT_GRAPH.maxBar * (HEAT_GRAPH.bottom - HEAT_GRAPH.top) + 6" text-anchor="end">{{ tick }}</text>
          </g>
          <text class="heat-svg-text" x="48" y="22">p (bar, absoluut)</text>
          <text class="heat-svg-text" x="328" y="265" text-anchor="end">T (K)</text>
          <path class="heat-extension" :d="heatingLine(0, HEATING.minK)" />
          <path class="heat-line" :d="heatingLine(HEATING.minK, HEATING.maxK)" />
          <path class="heat-guide" :d="`M48,${dot.y} H${dot.x} V208`" />
          <circle class="heat-current" data-testid="heat-graph-dot" :cx="dot.x" :cy="dot.y" r="6" />
        </svg>
        <p class="heat-note">De stip is de huidige toestand. Stippellijn: verlenging van het ideale model, geen proef bij 0 K.</p>
      </div>
    </div>
    <p class="heat-note">Model: de druk wordt uit de ideale gaswet berekend, niet uit getelde botsingen. De beweging is schematisch; hogere temperatuur betekent gemiddeld snellere deeltjes.</p>
    <details class="heat-details">
      <summary>Stippen en hervatten</summary>
      <p class="heat-note">De twaalf stippen zijn representatief en blijven even groot en even talrijk. Bij terugkeren of herladen start dit model opnieuw op 300 K. Je leerpadvoortgang blijft bewaard als opslag beschikbaar is; je onderzoeksnotities staan op papier. Dit is geen echte verwarmingsproef met een drukvat.</p>
    </details>
  </section>
</template>

<style scoped>
.heating-lab { margin: 24px 0; padding: 24px; border: 2px solid var(--color-line-strong); border-top: 6px solid var(--color-digital); border-radius: var(--radius-card); background: var(--color-panel); }
.heat-readouts { display: flex; flex-wrap: wrap; gap: 16px 32px; margin: 0; }
.heat-readouts div { flex: 1 1 160px; }
.heat-readouts dt { font-size: 1rem; font-weight: 600; color: var(--color-ink-soft); }
.heat-readouts dd { margin: 0; font-size: 1.5rem; font-weight: 600; font-variant-numeric: tabular-nums; }
.heat-celsius { display: block; font-size: 1.125rem; }
.heating-lab .heat-fixed { margin: 16px 0 0; font-size: 1rem; font-weight: 600; }
.heat-workbench { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 24px; margin-top: 16px; }
.heat-vessel, .heat-graph { display: block; width: 100%; height: auto; }
.heat-gas { fill: var(--color-digital-soft); }
.heat-wall { fill: none; stroke: var(--color-ink); stroke-width: 4; }
.heat-axis { fill: none; stroke: var(--color-ink); stroke-width: 2; }
.heat-particle { fill: var(--color-ink); }
.heat-svg-text { fill: var(--color-ink); font-size: 18px; }
.heat-label, .heat-exact { display: block; margin-top: 16px; font-size: 1.125rem; }
.heat-range { width: 100%; height: 40px; margin: 8px 0; accent-color: var(--color-digital); }
.heat-presets { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px; }
.heat-tools { display: flex; flex-wrap: wrap; gap: 8px; }
.heat-presets .btn, .heat-tools .btn { min-height: 48px; border: 2px solid var(--color-line); }
.heat-presets .btn { padding: 8px; white-space: nowrap; }
.heat-exact { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 1rem; }
.heat-exact input { display: block; width: 96px; max-width: 100%; min-height: 48px; padding: 8px 12px; border: 2px solid var(--color-line); border-radius: var(--radius-control); background: var(--color-panel); color: var(--color-ink); }
.heating-lab .heat-note { margin: 16px 0; font-size: 1rem; line-height: 1.5; color: var(--color-ink-soft); }
.heating-lab .heat-error { margin: 16px 0; padding: 12px; border: 2px solid var(--color-presentation); font-size: 1rem; }
.heating-lab .heat-graph-title { margin: 24px 0 8px; font-size: 1.25rem; }
.heat-line { fill: none; stroke: var(--color-digital); stroke-width: 3; }
.heat-extension, .heat-guide { fill: none; stroke: var(--color-line); stroke-width: 2; stroke-dasharray: 5 5; }
.heat-current { fill: var(--color-panel); stroke: var(--color-ink); stroke-width: 3; }
.heat-details { font-size: 1rem; }
.heat-details summary { cursor: pointer; font-weight: 600; }
@media (max-width: 640px) {
  .heating-lab { padding: 16px; }
  .heat-workbench { grid-template-columns: minmax(0, 1fr); }
  .heat-readouts { gap: 12px; }
  .heat-readouts div { flex-basis: 120px; }
}
</style>
