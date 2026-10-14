<script setup>
import { computed, ref } from 'vue'
import { PhArrowLeft, PhArrowRight, PhCheckCircle } from '@phosphor-icons/vue'
import ChromosomeGlyph from './ChromosomeGlyph.vue'
import CentriolePair from './CentriolePair.vue'
import DivisionLegend from './DivisionLegend.vue'
import { metaphaseRotation, anaphaseRotation } from './spindleGeometry.js'

const emit = defineEmits(['complete'])
const phase = ref(0)
const plantCell = ref(false)
const completed = ref(false)

const maternal = '#b4232f'
const paternal = '#075985'
const chromosomeSet = [
  { id: 'M1', pair: 1, origin: 'maternaal', color: maternal, length: 84 },
  { id: 'P1', pair: 1, origin: 'paternaal', color: paternal, length: 84 },
  { id: 'M2', pair: 2, origin: 'maternaal', color: maternal, length: 60 },
  { id: 'P2', pair: 2, origin: 'paternaal', color: paternal, length: 60 }
]

const phases = [
  { label: 'Einde van de interfase', title: 'DNA is al gekopieerd', description: 'De cel staat aan het einde van de interfase (G₂). Het DNA is in de S-fase verdubbeld: er zijn 4 chromosomen, elk opgebouwd uit 2 zusterchromatiden.' },
  { label: 'Profase', title: 'Chromosomen worden zichtbaar', description: 'Het chromatine condenseert tot delingschromosomen. De kernmembraan verdwijnt en de spoelfiguur wordt opgebouwd uit microtubuli. In diercellen bewegen de twee centriolenparen naar de tegenovergestelde polen; plantencellen hebben geen centriolen.' },
  { label: 'Metafase', title: 'Opstelling aan het evenaarsvlak', description: 'De 4 delingschromosomen liggen afzonderlijk en in willekeurige volgorde op het evenaarsvlak. Trekdraden hechten aan de centromeren; steundraden helpen de spoelfiguur vorm te geven. Chromosomen zijn in deze fase goed zichtbaar.' },
  { label: 'Anafase', title: 'Zusterchromatiden scheiden', description: 'De verbinding tussen de zusterchromatiden wordt verbroken ter hoogte van het centromeer. De trekdraden verkorten en trekken de zusterchromatiden uit elkaar. Elke pool krijgt één kopie van elk chromosoom.' },
  { label: 'Telofase', title: 'Twee kernen en twee cellen', description: 'De spoelfiguur verdwijnt; microtubuli kunnen opnieuw gebruikt worden. Rond elke set ontstaat een kernmembraan en het DNA decondenseert. Tijdens de cytokinese worden het cytoplasma en de celorganellen verdeeld: diercellen snoeren in; plantencellen bouwen een celplaat op. Cytokinese kan overlappen met de mitose en is geen vijfde mitosefase.' },
  { label: 'Resultaat', title: 'Twee identieke dochtercellen', description: 'Er ontstaan 2 diploïde dochtercellen. Elke cel heeft 2n = 4 chromosomen en hetzelfde erfelijk materiaal als de moedercel.' }
]
const current = computed(() => phases[phase.value])
const pmat = ['P', 'M', 'A', 'T']
const phaseGroups = [
  { title: 'Interfase', indices: [0], kind: 'interphase' },
  { title: 'Celdeling: mitose (PMAT)', indices: [1, 2, 3, 4], kind: 'division' },
  { title: 'Na de celdeling', indices: [5], kind: 'result' }
]
const phaseContext = computed(() => {
  if (phase.value === 0) return 'Interfase: einde van G₂, vóór de mitose'
  if (phase.value === 5) return 'Resultaat na mitose en cytokinese'
  return `Mitose: ${phases[phase.value].label.toLowerCase()} (${pmat[phase.value - 1]})`
})
const counterText = computed(() => {
  if (phase.value <= 2) return '4 chromosomen · 8 chromatiden'
  if (phase.value === 3) return '8 dochterchromosomen in de cel · 4 per pool'
  return '4 chromosomen in elke dochtercel'
})

const visibleChromosomes = computed(() => {
  const result = []
  // Leave enough space for the full length of the horizontal chromosomes.
  const xs = [265, 355, 445, 535]
  chromosomeSet.forEach((chrom, i) => {
    if (phase.value === 0 || phase.value === 1) {
      result.push({ ...chrom, x: [365, 435, 360, 438][i], y: [208, 211, 286, 281][i], rotation: [-18, 15, 15, -12][i], shape: phase.value === 0 ? 'chromatin' : 'double', label: `${chrom.origin} chromosoom ${chrom.pair}` })
      if (phase.value === 0) result.push({ ...chrom, id: `${chrom.id}-copy`, x: [372, 442, 367, 445][i], y: [213, 216, 291, 286][i], rotation: [-18, 15, 15, -12][i], shape: 'chromatin', label: `Kopie van ${chrom.origin} chromosoom ${chrom.pair}` })
    } else if (phase.value === 2) {
      result.push({ ...chrom, x: xs[i], y: 245, rotation: metaphaseRotation('vertical'), shape: 'double', label: `${chrom.origin} chromosoom ${chrom.pair} op het evenaarsvlak` })
    } else if (phase.value === 3) {
      for (const pole of [0, 1]) result.push({ ...chrom, id: `${chrom.id}-${pole}`, x: xs[i], y: pole === 0 ? 164 : 326, rotation: anaphaseRotation('vertical', pole), shape: 'single', label: `Dochterchromosoom naar pool ${pole + 1}: ${chrom.origin} ${chrom.pair}` })
    } else {
      for (const pole of [0, 1]) result.push({ ...chrom, id: `${chrom.id}-${pole}`, x: [376, 422, 376, 422][i], y: (pole === 0 ? 146 : 334) + (i < 2 ? -16 : 17), length: i < 2 ? 48 : 36, rotation: [-12, 12, 10, -10][i], shape: 'chromatin', label: `${chrom.origin} chromosoom ${chrom.pair} in dochterkern ${pole + 1}` })
    }
  })
  return result
})

// Every pull fibre ends on a visible centromere, not on the spindle axis.
const spindleLines = computed(() => {
  if (phase.value < 1 || phase.value > 3) return []
  return visibleChromosomes.value.flatMap(chrom => {
    if (phase.value === 3) return [{ id: chrom.id, x1: 400, y1: chrom.y < 245 ? 98 : 392, x2: chrom.x, y2: chrom.y }]
    return [98, 392].map(y => ({ id: `${chrom.id}-${y}`, x1: 400, y1: y, x2: chrom.x, y2: chrom.y }))
  })
})

function next() {
  if (phase.value < phases.length - 1) phase.value += 1
  else {
    completed.value = true
    emit('complete')
  }
}
function previous() { if (phase.value > 0) phase.value -= 1 }
function finish() {
  completed.value = true
  emit('complete')
}
</script>

<template>
  <div class="fullscreen-body mitosis-body">
    <section class="mitosis-canvas" aria-label="Mitose-simulatie">
      <svg viewBox="0 0 800 490" role="img" aria-labelledby="mitosis-title mitosis-desc">
        <title id="mitosis-title">{{ current.label }} bij mitose, 2n = 4</title>
        <desc id="mitosis-desc">Vier chromosomen worden verdeeld over twee genetisch identieke dochtercellen. Doorlopende draden verbinden de centromeren met de celpolen. De stippellijnen stellen steundraden voor.</desc>
        <rect width="800" height="490" rx="8" fill="var(--color-panel)" />
        <DivisionLegend :spindle="phase >= 1 && phase <= 3" />

        <!-- A membrane and, in a plant cell, a separate rigid cell wall. -->
        <template v-if="plantCell">
          <rect x="185" y="61" width="430" height="378" rx="24" fill="var(--color-workbook-soft)" stroke="var(--color-workbook)" stroke-width="5" />
          <rect x="194" y="70" width="412" height="360" rx="17" fill="var(--color-panel-muted)" stroke="var(--color-line)" stroke-width="2" />
          <line v-if="phase === 5" x1="190" y1="245" x2="610" y2="245" stroke="var(--color-workbook)" stroke-width="6" />
        </template>
        <template v-else-if="phase < 4">
          <ellipse cx="400" cy="245" rx="220" ry="187" fill="var(--color-digital-soft)" stroke="var(--color-digital)" stroke-width="3" />
        </template>
        <path v-else-if="phase === 4" d="M 400 58 C 550 58 625 123 590 204 C 581 225 552 233 550 245 C 552 257 581 265 590 286 C 625 367 550 432 400 432 C 250 432 175 367 210 286 C 219 265 248 257 250 245 C 248 233 219 225 210 204 C 175 123 250 58 400 58 Z" fill="var(--color-digital-soft)" stroke="var(--color-digital)" stroke-width="3" />
        <g v-else fill="var(--color-digital-soft)" stroke="var(--color-digital)" stroke-width="3">
          <ellipse cx="400" cy="149" rx="155" ry="89" />
          <ellipse cx="400" cy="341" rx="155" ry="89" />
        </g>

        <circle v-if="phase <= 1" cx="400" cy="245" r="101" :fill="phase === 0 ? 'var(--color-panel)' : 'none'" stroke="var(--color-line)" stroke-width="2.5" :stroke-dasharray="phase === 1 ? '10 8' : undefined" />
        <g v-if="phase >= 4" fill="var(--color-panel)" stroke="var(--color-line)" stroke-width="2.5">
          <ellipse cx="400" cy="149" rx="69" ry="54" />
          <ellipse cx="400" cy="341" rx="69" ry="54" />
        </g>

        <g v-if="phase >= 1 && phase <= 3" fill="none">
          <path v-for="offset in [-155, -120, 120, 155]" :key="offset" :d="`M 400 98 Q ${400 + offset} 180 ${400 + offset * 0.6} 258`" class="spindle-support" />
          <path v-for="offset in [-155, -120, 120, 155]" :key="`bottom-${offset}`" :d="`M 400 392 Q ${400 + offset} 310 ${400 + offset * 0.6} 232`" class="spindle-support" />
          <path v-for="line in spindleLines" :key="line.id" :d="`M ${line.x1} ${line.y1} Q ${line.x2} ${(line.y1 + line.y2) / 2} ${line.x2} ${line.y2}`" class="spindle-pull" />
        </g>
        <g v-if="!plantCell">
          <CentriolePair v-if="phase === 0" :x="507" :y="142" />
          <CentriolePair v-if="phase === 0" :x="530" :y="159" :rotation="30" />
          <CentriolePair v-if="phase >= 1 && phase <= 3" :x="400" :y="98" aster />
          <CentriolePair v-if="phase >= 1 && phase <= 3" :x="400" :y="392" :rotation="180" aster />
        </g>

        <line v-if="phase === 2" x1="216" y1="245" x2="584" y2="245" stroke="var(--color-ink-soft)" stroke-width="2" stroke-dasharray="6 6" />
        <g v-for="chromosome in visibleChromosomes" :key="chromosome.id">
          <ChromosomeGlyph :x="chromosome.x" :y="chromosome.y" :length="chromosome.length" :color="chromosome.color" :shape="chromosome.shape" :rotation="chromosome.rotation" :label="chromosome.label" />
        </g>

        <!-- Leader lines are kept outside the cell and away from chromosomes. -->
        <g class="diagram-labels" fill="none" stroke="var(--color-line)" stroke-width="1.5">
          <template v-if="phase === 0">
            <template v-if="!plantCell"><path d="M 645 150 H 563 L 536 159" /><text x="649" y="145">twee</text><text x="649" y="164">centriolenparen</text></template>
            <path d="M 150 187 H 276 L 306 209" /><text x="28" y="181">kernmembraan</text>
            <path d="M 150 307 H 300 L 358 286" /><text x="28" y="302">chromatine</text>
          </template>
          <template v-if="phase === 1">
            <path d="M 645 105 H 439" /><text x="649" y="100">{{ plantCell ? 'celpool' : 'centriolenpaar' }}</text>
            <path d="M 150 304 H 300 L 350 286" /><text x="28" y="291">delings-</text><text x="28" y="310">chromosoom</text>
          </template>
          <template v-if="phase === 2">
            <path d="M 645 245 H 584" /><text x="649" y="240">evenaarsvlak</text>
            <path d="M 150 274 H 262 L 355 245" /><text x="28" y="269">centromeer</text>
            <path d="M 150 124 H 350 L 400 98" /><text x="28" y="119">celpool</text>
          </template>
          <template v-if="phase === 3">
            <path d="M 645 164 H 555 L 511 164" /><text x="649" y="152">dochter-</text><text x="649" y="171">chromosomen</text>
          </template>
          <template v-if="phase === 4">
            <path :d="plantCell ? 'M 645 245 H 475' : 'M 645 245 H 550'" /><text x="649" y="232">{{ plantCell ? 'celplaat uit' : 'insnoering van' }}</text><text x="649" y="251">{{ plantCell ? 'Golgi-blaasjes' : 'het celmembraan' }}</text>
            <path d="M 150 341 H 331" /><text x="28" y="328">nieuwe</text><text x="28" y="347">kernmembraan</text>
          </template>
        </g>
        <g v-if="phase === 4 && plantCell">
          <line x1="330" y1="245" x2="470" y2="245" stroke="var(--color-workbook)" stroke-width="5" />
          <circle v-for="x in [280, 304, 496, 520]" :key="x" :cx="x" cy="245" r="6" fill="var(--color-workbook-soft)" stroke="var(--color-workbook)" stroke-width="2" />
        </g>
        <text v-if="phase === 5" x="645" y="155" class="svg-note">2n = 4</text>
        <text v-if="phase === 5" x="645" y="347" class="svg-note">2n = 4</text>
        <text x="400" y="475" text-anchor="middle" class="svg-note">{{ phase === 5 ? 'Twee genetisch identieke diploïde dochtercellen' : 'Schematisch model met twee homologe chromosomenparen' }}</text>
      </svg>

      <div class="mitosis-readouts" aria-live="polite">
        <span><strong>Moedercel:</strong> 2n = 4</span>
        <span><strong>Nu:</strong> {{ counterText }}</span>
        <span><strong>Celtype:</strong> {{ plantCell ? 'plantcel' : 'diercel' }}</span>
      </div>
    </section>

    <aside class="mitosis-panel">
      <div class="mitosis-panel-topline">
        <span class="mitosis-step-number"><PhCheckCircle v-if="phase === 5" weight="bold" /><template v-else>{{ phase === 0 ? 'G₂' : pmat[phase - 1] }}</template></span>
        <span class="mitosis-phase-label">{{ phaseContext }}</span>
      </div>
      <h3 class="mitosis-step-title">{{ current.title }}</h3>
      <p class="mitosis-step-text">{{ current.description }}</p>

      <div class="mitosis-key-fact">
        <strong>{{ phase === 0 ? 'Voorbereiding, nog geen mitose:' : 'Onthoud:' }}</strong>
        <span v-if="phase === 0">De interfase bestaat uit G₁, S en G₂. Ze hoort bij de celcyclus, maar niet bij de vier mitosefasen PMAT.</span>
        <span v-else-if="phase < 3">Homologe chromosomen paren niet tijdens de mitose. Elk chromosoom wordt afzonderlijk verdeeld.</span>
        <span v-else-if="phase === 3">Na de scheiding telt elke voormalige zusterchromatide als een zelfstandig dochterchromosoom.</span>
        <span v-else>De dochtercellen zijn genetisch identiek en blijven diploïd (2n).</span>
      </div>

      <div class="mitosis-cell-toggle" role="group" aria-label="Kies het celtype">
        <span class="toggle-label">Celtype:</span>
        <button type="button" class="btn mitosis-toggle" :class="!plantCell ? 'mitosis-toggle-active' : ''" :aria-pressed="!plantCell" @click="plantCell = false">Diercel</button>
        <button type="button" class="btn mitosis-toggle" :class="plantCell ? 'mitosis-toggle-active' : ''" :aria-pressed="plantCell" @click="plantCell = true">Plantcel</button>
      </div>
      <p class="mitosis-small-note">{{ plantCell ? 'Golgi-blaasjes versmelten tot een celplaat. Cellulose verstevigt die tot een nieuwe celwand. Plantencellen hebben geen centriolen.' : 'De diercel snoert in; centriolen helpen de spoelfiguur organiseren.' }}</p>

      <div class="mitosis-phase-groups" aria-label="Interfase, vier mitosefasen en resultaat">
        <section v-for="group in phaseGroups" :key="group.kind" class="mitosis-phase-group" :class="`mitosis-phase-group-${group.kind}`">
          <h4>{{ group.title }}</h4>
          <ol class="mitosis-track" :class="{ 'mitosis-track-single': group.indices.length === 1 }">
            <li v-for="index in group.indices" :key="phases[index].label" :class="{ 'mitosis-track-active': index === phase, 'mitosis-track-done': index < phase }" :aria-current="index === phase ? 'step' : undefined">
              <span><PhCheckCircle v-if="index < phase || index === 5" weight="bold" /><template v-else>{{ index === 0 ? 'G₂' : pmat[index - 1] }}</template></span>{{ phases[index].label }}
            </li>
          </ol>
          <p v-if="group.kind === 'division'" class="mitosis-cytokinesis-note">Cytokinese deelt het cytoplasma en kan tijdens de mitose beginnen.</p>
        </section>
      </div>

      <div class="mitosis-actions">
        <button type="button" class="btn mitosis-secondary" @click="previous" :disabled="phase === 0" aria-label="Vorige mitosefase"><PhArrowLeft weight="bold" /> Vorige</button>
        <button type="button" class="btn btn-primary" @click="phase === phases.length - 1 ? finish() : next()">
          {{ phase === phases.length - 1 ? (completed ? 'Afgerond' : 'Simulatie afronden') : 'Volgende fase' }}
          <PhCheckCircle v-if="phase === phases.length - 1 && completed" weight="fill" /><PhArrowRight v-else weight="bold" />
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.mitosis-body { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; align-items: start; }
.mitosis-canvas { min-width: 0; padding: 12px; background: var(--color-panel); border: 2px solid var(--color-line-strong); border-radius: var(--radius-card); }
.mitosis-canvas svg { display: block; width: 100%; height: auto; }
.diagram-labels text { fill: var(--color-ink); stroke: none; font-size: 14px; font-weight: 500; }
.svg-note { fill: var(--color-ink); font-size: 14px; font-weight: 700; }
.spindle-pull { stroke: #34474e; stroke-width: 2.5;  }
.spindle-support { stroke: #52636a; stroke-width: 2; stroke-dasharray: 7 6;  }
.mitosis-readouts { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.mitosis-readouts span { flex: 1; min-width: 160px; padding: 10px 12px; color: var(--color-ink); background: var(--color-panel-muted); border: 1px solid var(--color-line-strong); border-radius: var(--radius-control); font-size: 0.9rem; }
.mitosis-panel { display: flex; flex-direction: column; min-width: 0; }
.mitosis-panel-topline { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.mitosis-step-number { display: grid; width: 44px; height: 44px; place-items: center; color: var(--color-digital); background: var(--color-digital-soft); border: 2px solid var(--color-digital); border-radius: var(--radius-control); font-family: 'IBM Plex Mono', monospace; font-weight: 700; }
.mitosis-phase-label { color: var(--color-digital); font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; font-weight: 700; letter-spacing: 0; text-transform: none; }
.mitosis-step-title { margin: 0 0 8px; color: var(--color-ink); font-size: 1.5rem; line-height: 1.2; }
.mitosis-step-text { margin: 0; color: var(--color-ink-soft); font-size: 1.05rem; line-height: 1.55; }
.mitosis-key-fact { display: grid; gap: 4px; margin-top: 15px; padding: 12px; color: var(--color-ink); background: var(--color-digital-soft); border: 2px solid var(--color-digital); border-radius: var(--radius-control); line-height: 1.45; }
.mitosis-cell-toggle { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 16px; }
.toggle-label { color: var(--color-ink); font-weight: 700; }
.mitosis-toggle, .mitosis-secondary { color: var(--color-ink); background: var(--color-panel); border: 2px solid var(--color-line-strong); }
.mitosis-toggle-active { color: var(--color-digital); background: var(--color-digital-soft); border-color: var(--color-digital); }
.mitosis-small-note { margin: 8px 0 0; color: var(--color-ink-soft); font-size: 0.92rem; line-height: 1.45; }
.mitosis-track { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 8px 0 0; padding: 0; list-style: none; }
.mitosis-track li { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 5px 8px; color: var(--color-ink-soft); background: var(--color-panel); border: 1px solid var(--color-line-strong); border-radius: var(--radius-control); font-size: 0.82rem; font-weight: 600; }
.mitosis-track li span { display: grid; width: 22px; height: 22px; flex: none; place-items: center; color: var(--color-ink); background: var(--color-panel-muted); border-radius: 50%; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; }
.mitosis-track li.mitosis-track-active { color: var(--color-ink); background: var(--color-digital-soft); border: 2px solid var(--color-digital); }
.mitosis-track li.mitosis-track-active span { color: #ffffff; background: var(--color-digital); }
.mitosis-track li.mitosis-track-done span { color: #ffffff; background: var(--color-workbook); }
.mitosis-phase-groups { display: grid; gap: 12px; margin-top: 20px; }
.mitosis-phase-group { padding-left: 12px; border-left: 4px solid var(--color-workbook); }
.mitosis-phase-group-division { border-left-color: var(--color-presentation); }
.mitosis-phase-group-result { border-left-color: var(--color-line); }
.mitosis-phase-group h4 { margin: 0; color: var(--color-ink); font-size: 0.95rem; font-weight: 700; }
.mitosis-track-single { grid-template-columns: 1fr; }
.mitosis-cytokinesis-note { margin: 8px 0 0; color: var(--color-ink-soft); font-size: 0.9rem; line-height: 1.4; }
.mitosis-actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 18px; }
.mitosis-actions .btn { min-height: 44px; }
.mitosis-actions .btn:disabled { opacity: 0.5; cursor: not-allowed; }
@media (min-width: 1024px) { .mitosis-body { grid-template-columns: minmax(0, 3fr) minmax(320px, 2fr); gap: 28px; } }
@media (max-width: 520px) { .mitosis-track { grid-template-columns: 1fr; } .mitosis-actions { flex-direction: column; } }
</style>
