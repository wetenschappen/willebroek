<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { MODEL, PRESETS, GRAPH, gasState, boundedVolume, pistonX, volumeFromX, formatNumber, makeParticles, moveParticles, graphPoint, curvePath } from './compression-model.js'

const props = defineProps({ initialVolume: { type: Number, default: 60 } })
const volume = ref(boundedVolume(props.initialVolume))
const state = computed(() => gasState(volume.value))
const piston = computed(() => pistonX(volume.value))
const dot = computed(() => graphPoint(volume.value))
const curve = curvePath()
const particles = ref(makeParticles(volume.value))
const moving = ref(false)
const svg = ref(null)
let frame = null, lastTime = null, dragging = null, motionPreference

function stopFrames() {
  if (frame !== null) cancelAnimationFrame(frame)
  frame = null; lastTime = null
}
function animate(time) {
  const dt = lastTime === null ? 0 : (time - lastTime) / 1000
  lastTime = time
  particles.value = moveParticles(particles.value, volume.value, dt)
  frame = requestAnimationFrame(animate)
}
function syncAnimation() {
  stopFrames()
  if (moving.value && !document.hidden) frame = requestAnimationFrame(animate)
}
function setVolume(value) {
  volume.value = boundedVolume(Number(value))
  particles.value = moveParticles(particles.value, volume.value)
}
function reset() {
  setVolume(props.initialVolume)
  particles.value = makeParticles(volume.value)
}
function dragMove(event) {
  if (dragging !== event.pointerId) return
  const matrix = svg.value?.getScreenCTM()
  if (!matrix) return
  const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse())
  setVolume(volumeFromX(point.x))
}
function dragStart(event) {
  if (event.button !== 0) return
  dragging = event.pointerId
  svg.value.setPointerCapture(event.pointerId)
  event.preventDefault()
}
function dragEnd() { dragging = null }
function pistonKey(event) {
  const values = { ArrowLeft: volume.value - 1, ArrowDown: volume.value - 1, ArrowRight: volume.value + 1, ArrowUp: volume.value + 1, Home: MODEL.minVolumeMl, End: MODEL.maxVolumeMl }
  if (!(event.key in values)) return
  event.preventDefault(); setVolume(values[event.key])
}
function motionChanged(event) { if (event.matches) moving.value = false }
watch(moving, syncAnimation)
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  moving.value = !motionPreference.matches
  motionPreference.addEventListener('change', motionChanged)
  document.addEventListener('visibilitychange', syncAnimation)
})
onUnmounted(() => {
  stopFrames(); dragging = null
  motionPreference?.removeEventListener('change', motionChanged)
  document.removeEventListener('visibilitychange', syncAnimation)
})
</script>

<template>
  <section class="compression-lab" aria-label="Zuigermodel bij constante temperatuur">
    <dl class="lab-readouts">
      <div><dt>Volume</dt><dd><output data-testid="volume">{{ volume }}</output> mL</dd></div>
      <div><dt>Absolute druk</dt><dd><output data-testid="pressure">{{ formatNumber(state.pressureBar) }}</output> bar</dd></div>
      <div><dt>Temperatuur vast</dt><dd>300 K</dd></div>
    </dl>
    <p class="lab-fixed">Hoeveelheid gas vast · afgesloten spuit · geen toevoer of lek</p>
    <div class="lab-workbench">
      <div class="lab-controls">
        <svg ref="svg" class="lab-cylinder" viewBox="0 0 640 225" role="group" aria-label="Schematische afgesloten spuit met beweegbare zuiger"
          @pointermove="dragMove" @pointerup="dragEnd" @pointercancel="dragEnd" @lostpointercapture="dragEnd">
          <path class="lab-gas" :d="`M60,65 H${piston} V185 H60 Z`" />
          <path class="lab-wall" d="M60,65 H490 M60,185 H490 M60,65 V104 H35 V146 H60 V185 M35,101 V149" />
          <circle v-for="p in particles" :key="p.id" class="lab-particle" :cx="p.x" :cy="p.y" :r="p.r" />
          <g class="lab-piston" tabindex="0" role="slider" aria-label="Volume via de zuiger" aria-orientation="horizontal"
            :aria-valuemin="MODEL.minVolumeMl" :aria-valuemax="MODEL.maxVolumeMl" :aria-valuenow="volume" :aria-valuetext="`${volume} mL`"
            @pointerdown="dragStart" @keydown="pistonKey">
            <rect :x="piston - 18" y="55" width="36" height="140" fill="transparent" />
            <path class="lab-wall" :d="`M${piston},125 H590 M590,94 V156`" />
            <rect class="lab-piston-face" :x="piston - 5" y="62" width="10" height="126" />
          </g>
          <text class="lab-svg-text" x="35" y="216" text-anchor="middle">dicht</text>
        </svg>
        <label class="lab-range-label" for="gas-volume">Volume instellen: <strong>{{ volume }} mL</strong></label>
        <input id="gas-volume" class="lab-range" type="range" :min="MODEL.minVolumeMl" :max="MODEL.maxVolumeMl" step="1" :value="volume" @input="setVolume($event.target.value)" />
        <div class="lab-presets" role="group" aria-label="Exacte volumestanden">
          <button v-for="preset in PRESETS" :key="preset" class="btn" :class="volume === preset ? 'btn-primary' : 'btn-ghost'" :aria-pressed="volume === preset" @click="setVolume(preset)">{{ preset }} mL</button>
        </div>
        <p class="lab-control-hint">Sleep de zuiger, gebruik de schuifbalk of kies een exacte stand. Met de pijltjestoetsen verander je telkens 1 mL.</p>
        <div class="lab-tools">
          <button class="btn btn-ghost" @click="reset">Beginstand herstellen</button>
          <button class="btn btn-ghost" :aria-pressed="moving" @click="moving = !moving">{{ moving ? 'Animatie pauzeren' : 'Deeltjes laten bewegen' }}</button>
        </div>
      </div>
      <div class="lab-plot">
        <h2 class="lab-graph-title">Dezelfde toestand in het p,V-diagram</h2>
        <svg class="lab-graph" viewBox="0 0 360 270" role="img" :aria-label="`Modelgrafiek: bij ${volume} mL is de absolute druk ${formatNumber(state.pressureBar)} bar. De kromme hoort bij dezelfde temperatuur en hoeveelheid gas.`">
          <path class="lab-axis" d="M48,32 V208 H338" />
          <g v-for="tick in [20, 40, 60, 80]" :key="`v-${tick}`">
            <line class="lab-tick" :x1="GRAPH.left + tick / GRAPH.maxVolume * (GRAPH.right - GRAPH.left)" y1="208" :x2="GRAPH.left + tick / GRAPH.maxVolume * (GRAPH.right - GRAPH.left)" y2="216" />
            <text class="lab-svg-text" :x="GRAPH.left + tick / GRAPH.maxVolume * (GRAPH.right - GRAPH.left)" y="239" text-anchor="middle">{{ tick }}</text>
          </g>
          <g v-for="tick in [0, 1, 2, 3]" :key="`p-${tick}`">
            <line class="lab-tick" x1="40" :y1="GRAPH.bottom - tick / GRAPH.maxPressure * (GRAPH.bottom - GRAPH.top)" x2="48" :y2="GRAPH.bottom - tick / GRAPH.maxPressure * (GRAPH.bottom - GRAPH.top)" />
            <text class="lab-svg-text" x="32" :y="GRAPH.bottom - tick / GRAPH.maxPressure * (GRAPH.bottom - GRAPH.top) + 6" text-anchor="end">{{ tick }}</text>
          </g>
          <text class="lab-svg-text" x="48" y="22">p (bar, absoluut)</text>
          <text class="lab-svg-text" x="328" y="265" text-anchor="end">V (mL)</text>
          <path class="lab-curve" :d="curve" />
          <path class="lab-guide" :d="`M48,${dot.y} H${dot.x} V208`" />
          <circle class="lab-current" data-testid="graph-dot" :cx="dot.x" :cy="dot.y" r="6" />
        </svg>
        <p class="lab-model-note">De kromme toont modelwaarden; de stip is de huidige toestand.</p>
      </div>
    </div>
    <p class="lab-model-note">Model: de druk wordt uit de ideale gaswet berekend, niet uit getelde botsingen. De beweging is schematisch.</p>
    <details class="lab-details">
      <summary>Stippen en hervatten</summary>
      <p class="lab-model-note">De twaalf stippen in de spuit zijn representatief: ze verdwijnen of krimpen niet. Bij terugkeren of herladen start dit model opnieuw bij {{ initialVolume }} mL. Je leerpadvoortgang blijft bewaard als opslag beschikbaar is; je onderzoeksnotities staan op papier.</p>
    </details>
  </section>
</template>

<style scoped>
.compression-lab { margin: 24px 0; padding: 24px; border: 2px solid var(--color-line-strong); border-top: 6px solid var(--color-digital); border-radius: var(--radius-card); background: var(--color-panel); }
.lab-readouts { display: flex; flex-wrap: wrap; gap: 16px 32px; margin: 0; }
.lab-readouts div { flex: 1 1 160px; }
.lab-readouts dt { font-size: 1rem; font-weight: 600; color: var(--color-ink-soft); }
.lab-readouts dd { margin: 0; font-size: 1.5rem; font-weight: 600; color: var(--color-ink); font-variant-numeric: tabular-nums; }
.compression-lab .lab-fixed { margin: 16px 0 0; font-size: 1rem; font-weight: 600; }
.lab-workbench { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 24px; margin-top: 16px; }
.lab-cylinder, .lab-graph { display: block; width: 100%; height: auto; overflow: visible; }
.lab-gas { fill: var(--color-digital-soft); }
.lab-wall, .lab-axis, .lab-tick { fill: none; stroke: var(--color-ink); stroke-width: 2; }
.lab-particle { fill: var(--color-ink); }
.lab-piston { cursor: ew-resize; touch-action: none; }
.lab-piston:focus-visible { outline: 3px solid var(--color-digital); }
.lab-piston-face { fill: var(--color-digital); stroke: var(--color-ink); stroke-width: 2; }
.lab-svg-text { fill: var(--color-ink); font-size: 18px; }
.lab-range-label { display: block; margin-top: 16px; font-size: 1.125rem; }
.lab-range { width: 100%; height: 40px; margin: 8px 0; accent-color: var(--color-digital); }
.lab-presets { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 8px; }
.lab-tools { display: flex; flex-wrap: wrap; gap: 8px; }
.lab-presets .btn, .lab-tools .btn { min-height: 48px; border: 2px solid var(--color-line); }
.lab-presets .btn { padding: 8px; white-space: nowrap; }
.lab-details { font-size: 1rem; }
.lab-details summary { cursor: pointer; font-weight: 600; }
.compression-lab .lab-control-hint, .compression-lab .lab-model-note { margin: 16px 0; font-size: 1rem; line-height: 1.5; color: var(--color-ink-soft); }
.compression-lab .lab-graph-title { margin: 24px 0 8px; font-size: 1.25rem; }
.lab-graph { max-width: 520px; margin: 0 auto; }
.lab-curve { fill: none; stroke: var(--color-digital); stroke-width: 3; }
.lab-guide { fill: none; stroke: var(--color-line); stroke-width: 2; stroke-dasharray: 5 5; }
.lab-current { fill: var(--color-panel); stroke: var(--color-ink); stroke-width: 3; }
@media (max-width: 640px) {
  .compression-lab { padding: 16px; }
  .lab-workbench { grid-template-columns: minmax(0, 1fr); }
  .lab-presets { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lab-readouts { gap: 12px; }
  .lab-readouts div { flex-basis: 120px; }
}
</style>
