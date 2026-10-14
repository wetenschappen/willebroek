<script setup>
import { computed, ref } from 'vue'
import { PhArrowLeft, PhArrowRight, PhCheckCircle, PhDiceFive, PhArrowsClockwise } from '@phosphor-icons/vue'
import ChromosomeGlyph from './ChromosomeGlyph.vue'
import CentriolePair from './CentriolePair.vue'
import DivisionLegend from './DivisionLegend.vue'

const emit = defineEmits(['complete'])
const phase = ref(0)
const crossingOver = ref(true)
const orientations = ref([true, false])
const fertilized = ref(false)
const completed = ref(false)

const maternal = '#b4232f'
const paternal = '#075985'
const phases = [
  { label: 'Start', title: 'Start na DNA-replicatie', description: 'De meiose start na DNA-replicatie. De moedercel is diploïd (2n = 4) en heeft 4 chromosomen, elk met 2 zusterchromatiden. Het DNA ligt nog als losse chromatinevezels in de kern.' },
  { label: 'Profase I', title: 'Homologe chromosomen paren', description: 'Homologe chromosomen liggen naast elkaar: samen vormen ze een tetrade met 4 chromatiden. Niet-zusterchromatiden kunnen DNA-segmenten uitwisselen; dat heet crossing-over.' },
  { label: 'Metafase I', title: 'Willekeurige schikking: mixing', description: 'De homologe paren liggen op het evenaarsvlak. De maternale en paternale chromosomen richten zich toevallig naar de polen. Die willekeurige verdeling heet mixing.' },
  { label: 'Anafase I', title: 'Homologe chromosomen scheiden', description: 'De homologe chromosomen gaan naar tegenovergestelde polen (disjunctie). De zusterchromatiden blijven bij elkaar: elk chromosoom is nog dubbel.' },
  { label: 'Telofase I', title: 'Twee haploïde cellen', description: 'Na de eerste deling ontstaan 2 haploïde cellen. Elke cel heeft n = 2 chromosomen, maar elk chromosoom bestaat nog uit 2 chromatiden.' },
  { label: 'Profase II', title: 'De spoelfiguur bouwt opnieuw op', description: 'In beide dochtercellen condenseert het erfelijk materiaal en wordt opnieuw een spoelfiguur opgebouwd. Er vindt tussen meiose I en II geen nieuwe DNA-replicatie plaats.' },
  { label: 'Metafase II', title: 'Chromosomen op het evenaarsvlak', description: 'In beide cellen liggen de chromosomen afzonderlijk op het evenaarsvlak. Trekdraden hechten aan de centromeren.' },
  { label: 'Anafase II', title: 'Zusterchromatiden scheiden', description: 'In beide cellen wordt de verbinding tussen de zusterchromatiden verbroken ter hoogte van het centromeer. De zusterchromatiden worden naar tegenovergestelde polen getrokken.' },
  { label: 'Telofase II', title: 'Vier haploïde dochtercellen', description: 'In telofase II verdwijnt de spoelfiguur, ontstaan kernmembranen en decondenseert het DNA. Na cytokinese zijn er 4 haploïde dochtercellen. Crossing-over en mixing zorgen voor genetische variatie. Zonder crossing-over kunnen twee dochtercellen uit dezelfde meiose genetisch gelijk zijn.' }
]
const current = computed(() => phases[phase.value])
const counterText = computed(() => {
  if (phase.value <= 3) return '1 cel · 2n = 4 · 8 chromatiden'
  if (phase.value <= 6) return '2 cellen · n = 2 per cel · chromosomen nog dubbel'
  if (phase.value === 7) return '2 cellen delen tegelijk · chromatiden scheiden'
  return fertilized.value ? 'Zygote · 2n = 4 · DNA nog niet gerepliceerd' : '4 dochtercellen · n = 2 per cel'
})

function homologOrigin(pairIndex, cellIndex) {
  const maternalOnLeft = orientations.value[pairIndex]
  const isMaternal = cellIndex === 0 ? maternalOnLeft : !maternalOnLeft
  return isMaternal ? 'M' : 'P'
}

const singleCellChromosomes = computed(() => {
  const result = []
  if (phase.value === 0) {
    const pos = [
      { id: 'M1', x: 395, y: 196, length: 78, origin: 'M', pair: 1, rotation: -12 },
      { id: 'P1', x: 505, y: 196, length: 78, origin: 'P', pair: 1, rotation: 12 },
      { id: 'M2', x: 395, y: 305, length: 58, origin: 'M', pair: 2, rotation: 12 },
      { id: 'P2', x: 505, y: 305, length: 58, origin: 'P', pair: 2, rotation: -12 }
    ]
    pos.forEach(chrom => result.push({ ...chrom, color: chrom.origin === 'M' ? maternal : paternal, shape: 'chromatin', label: `${chrom.origin === 'M' ? 'maternaal' : 'paternaal'} chromosoom ${chrom.pair}` }))
  } else if (phase.value === 1) {
    const pos = [
      { id: 'M1', x: 424, y: 195, length: 78, origin: 'M', pair: 1, rotation: 0, accentSide: 'right' },
      { id: 'P1', x: 476, y: 195, length: 78, origin: 'P', pair: 1, rotation: 0, accentSide: 'left' },
      { id: 'M2', x: 416, y: 304, length: 58, origin: 'M', pair: 2, rotation: 8 },
      { id: 'P2', x: 484, y: 304, length: 58, origin: 'P', pair: 2, rotation: -8 }
    ]
    pos.forEach(chrom => result.push({ ...chrom, color: chrom.origin === 'M' ? maternal : paternal, accentColor: crossingOver.value && chrom.pair === 1 ? (chrom.origin === 'M' ? paternal : maternal) : '', shape: 'double', label: `${chrom.origin === 'M' ? 'maternaal' : 'paternaal'} chromosoom ${chrom.pair}${crossingOver.value && chrom.pair === 1 ? ', met crossing-over' : ''}` }))
  } else if (phase.value === 2) {
    for (let pair = 0; pair < 2; pair += 1) {
      const maternalLeft = orientations.value[pair]
      const y = pair === 0 ? 192 : 304
      const first = maternalLeft ? 'M' : 'P'
      const second = maternalLeft ? 'P' : 'M'
      result.push({ id: `p${pair}-left`, x: 420, y, length: pair === 0 ? 78 : 58, rotation: 90, origin: first, pair: pair + 1, color: first === 'M' ? maternal : paternal, shape: 'double', accentColor: crossingOver.value && pair === 0 ? (first === 'M' ? paternal : maternal) : '', accentSide: first === 'M' ? 'right' : 'left', label: `${first === 'M' ? 'maternaal' : 'paternaal'} chromosoom ${pair + 1}, links van het evenaarsvlak` })
      result.push({ id: `p${pair}-right`, x: 480, y, length: pair === 0 ? 78 : 58, rotation: 90, origin: second, pair: pair + 1, color: second === 'M' ? maternal : paternal, shape: 'double', accentColor: crossingOver.value && pair === 0 ? (second === 'M' ? paternal : maternal) : '', accentSide: second === 'M' ? 'right' : 'left', label: `${second === 'M' ? 'maternaal' : 'paternaal'} chromosoom ${pair + 1}, rechts van het evenaarsvlak` })
    }
  } else if (phase.value === 3) {
    for (let pair = 0; pair < 2; pair += 1) {
      for (let cell = 0; cell < 2; cell += 1) {
        const origin = homologOrigin(pair, cell)
        result.push({ id: `a1-p${pair}-${cell}`, x: cell === 0 ? 258 : 642, y: pair === 0 ? 198 : 306, length: pair === 0 ? 78 : 58, rotation: 0, origin, pair: pair + 1, color: origin === 'M' ? maternal : paternal, shape: 'double', accentColor: crossingOver.value && pair === 0 ? (origin === 'M' ? paternal : maternal) : '', accentSide: origin === 'M' ? 'right' : 'left', label: `${origin === 'M' ? 'maternaal' : 'paternaal'} dubbel chromosoom ${pair + 1}, tijdens disjunctie` })
      }
    }
  }
  return result
})

const daughterCellChromosomes = computed(() => {
  const result = []
  if (phase.value === 4 || phase.value === 5 || phase.value === 6) {
    for (let cell = 0; cell < 2; cell += 1) {
      for (let pair = 0; pair < 2; pair += 1) {
        const origin = homologOrigin(pair, cell)
        const cx = cell === 0 ? 240 : 660
        const x = phase.value === 4 ? cx + (pair === 0 ? -27 : 27) : phase.value === 5 ? cx + (pair === 0 ? -25 : 25) : cx
        const y = phase.value === 4 ? 245 : (pair === 0 ? 224 : 286)
        const rotation = phase.value === 4 ? (pair === 0 ? -8 : 8) : phase.value === 5 ? (pair === 0 ? -16 : 16) : 90
        result.push({ id: `meiosis2-${cell}-${pair}`, x, y, length: pair === 0 ? 68 : 50, rotation, origin, pair: pair + 1, color: origin === 'M' ? maternal : paternal, shape: 'double', accentColor: crossingOver.value && pair === 0 ? (origin === 'M' ? paternal : maternal) : '', accentSide: origin === 'M' ? 'right' : 'left', label: `${origin === 'M' ? 'maternaal' : 'paternaal'} chromosoom ${pair + 1} in cel ${cell + 1}` })
      }
    }
  } else if (phase.value === 7) {
    for (let cell = 0; cell < 2; cell += 1) {
      const cx = cell === 0 ? 240 : 660
      for (let pair = 0; pair < 2; pair += 1) {
        const origin = homologOrigin(pair, cell)
        for (let pole = 0; pole < 2; pole += 1) {
          const isRecombinant = crossingOver.value && pair === 0 && pole === 1
          result.push({
            id: `a2-${cell}-${pair}-${pole}`,
            x: cx + (pole === 0 ? -63 : 63),
            y: pair === 0 ? 220 : 290,
            length: pair === 0 ? 68 : 50,
            rotation: pole === 0 ? 180 : 0,
            origin,
            pair: pair + 1,
            color: origin === 'M' ? maternal : paternal,
            accentColor: isRecombinant ? (origin === 'M' ? paternal : maternal) : '',
            accentSide: pole === 0 ? 'right' : 'left',
            shape: 'single',
            label: `${origin === 'M' ? 'maternaal' : 'paternaal'} chromatide ${pair + 1} in meiose II`
          })
        }
      }
    }
  }
  return result
})

const gametes = computed(() => {
  const result = []
  for (let cell = 0; cell < 2; cell += 1) {
    for (let chromatid = 0; chromatid < 2; chromatid += 1) {
      const p1Origin = homologOrigin(0, cell)
      const p2Origin = homologOrigin(1, cell)
      result.push({
        id: `gameet-${cell}-${chromatid}`,
        cx: 140 + (cell * 2 + chromatid) * 205,
        cy: 260,
        pair1: {
          origin: p1Origin,
          color: p1Origin === 'M' ? maternal : paternal,
          accentColor: crossingOver.value && chromatid === 1 ? (p1Origin === 'M' ? paternal : maternal) : ''
        },
        pair2: {
          origin: p2Origin,
          color: p2Origin === 'M' ? maternal : paternal,
          accentColor: ''
        }
      })
    }
  }
  return result
})

// This is a separate example with gametes from two parents, not fusion
// between products of the same meiosis. No DNA replication at fertilization.
const zygoteChromosomes = computed(() => [
  { id: 'mother-1', x: 396, y: 213, length: 70, color: maternal, shape: 'single', rotation: 0, label: 'Chromosoom 1 van de moeder' },
  { id: 'father-1', x: 502, y: 213, length: 70, color: paternal, shape: 'single', rotation: 0, label: 'Chromosoom 1 van de vader' },
  { id: 'mother-2', x: 396, y: 305, length: 50, color: maternal, shape: 'single', rotation: 0, label: 'Chromosoom 2 van de moeder' },
  { id: 'father-2', x: 502, y: 305, length: 50, color: paternal, shape: 'single', rotation: 0, label: 'Chromosoom 2 van de vader' }
])

function next() {
  if (phase.value < phases.length - 1) {
    phase.value += 1
    fertilized.value = false
  } else {
    completed.value = true
    emit('complete')
  }
}
function previous() {
  if (fertilized.value) { fertilized.value = false; return }
  if (phase.value > 0) phase.value -= 1
}
function randomize() {
  orientations.value = [Math.random() < 0.5, Math.random() < 0.5]
  phase.value = 2
  fertilized.value = false
  completed.value = false
}
function resetMeiosis() {
  orientations.value = [Math.random() < 0.5, Math.random() < 0.5]
  crossingOver.value = true
  phase.value = 0
  fertilized.value = false
  completed.value = false
}
function finish() {
  completed.value = true
  emit('complete')
}
</script>

<template>
  <div class="fullscreen-body meiosis-body">
    <section class="meiosis-canvas" aria-label="Meiose-simulatie">
      <svg viewBox="0 0 900 520" role="img" aria-labelledby="meiosis-title meiosis-desc">
        <title id="meiosis-title">Meiose in een cel met 2n = 4</title>
        <desc id="meiosis-desc">Homologe chromosomen paren, crossing-over en mixing zorgen voor genetische variatie in haploïde dochtercellen. De tweede meiotische deling wordt in beide cellen tegelijk getoond.</desc>
        <rect width="900" height="520" rx="14" fill="var(--color-panel)" />

        <g v-if="phase <= 3">
          <ellipse cx="450" cy="260" rx="350" ry="204" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <circle v-if="phase === 0" cx="450" cy="260" r="125" fill="#ffffff" stroke="#52636a" stroke-width="3" />
          <circle v-if="phase === 1" cx="450" cy="260" r="125" fill="none" stroke="#52636a" stroke-width="3" stroke-dasharray="9 8" />
          <g v-if="phase === 1 && crossingOver" aria-label="Chiasma tussen niet-zusterchromatiden">
            <path d="M 433 207 C 443 212 457 218 466 230" fill="none" stroke="#b4232f" stroke-width="5" stroke-linecap="round" />
            <path d="M 467 207 C 457 212 443 218 434 230" fill="none" stroke="#075985" stroke-width="5" stroke-linecap="round" />
            <path d="M 535 165 H 500 L 450 217" fill="none" stroke="var(--color-line)" stroke-width="1.5" />
            <text x="540" y="169" class="svg-note">chiasma</text>
          </g>
          <g v-if="phase === 2">
            <line x1="450" y1="128" x2="450" y2="392" stroke="#34474e" stroke-width="3" stroke-dasharray="8 7" />
            <text x="463" y="140" class="svg-note">evenaarsvlak</text>
          </g>
          <g v-if="phase === 1 || phase === 2" fill="none">
            <path d="M 130 260 Q 390 100 520 249 M 770 260 Q 510 100 380 249 M 130 260 Q 390 410 520 271 M 770 260 Q 510 410 380 271" class="meiosis-spindle-support" />
            <path v-for="chromosome in singleCellChromosomes" :key="`pull-${chromosome.id}`" :d="`M ${chromosome.x < 450 ? 130 : 770} 260 Q ${chromosome.x} 260 ${chromosome.x} ${chromosome.y}`" class="meiosis-spindle-pull" />
          </g>
          <CentriolePair v-if="phase >= 1 && phase <= 3" :x="130" :y="260" aster />
          <CentriolePair v-if="phase >= 1 && phase <= 3" :x="770" :y="260" :rotation="180" aster />
          <g v-if="phase === 3">
            <g v-for="y in [198, 306]" :key="`disjunction-${y}`">
              <line x1="130" y1="260" x2="258" :y2="y" class="meiosis-spindle-pull" />
              <line x1="770" y1="260" x2="642" :y2="y" class="meiosis-spindle-pull" />
            </g>
          </g>
          <g v-if="phase === 3" class="pole-labels">
            <text x="170" y="105" class="svg-note">pool 1</text>
            <text x="690" y="105" class="svg-note">pool 2</text>
          </g>
        </g>

        <!-- After meiosis I, show both daughter cells; meiosis II happens simultaneously. -->
        <g v-if="phase >= 4 && !fertilized && phase <= 7">
          <ellipse cx="240" cy="260" rx="165" ry="190" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <ellipse cx="660" cy="260" rx="165" ry="190" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <circle v-if="phase === 4" cx="240" cy="260" r="78" fill="#ffffff" stroke="#52636a" stroke-width="3" />
          <circle v-if="phase === 4" cx="660" cy="260" r="78" fill="#ffffff" stroke="#52636a" stroke-width="3" />
          <circle v-if="phase === 5" cx="240" cy="260" r="78" fill="none" stroke="#52636a" stroke-width="3" stroke-dasharray="8 7" />
          <circle v-if="phase === 5" cx="660" cy="260" r="78" fill="none" stroke="#52636a" stroke-width="3" stroke-dasharray="8 7" />
          <line v-if="phase === 6" x1="240" y1="180" x2="240" y2="340" stroke="#34474e" stroke-width="2.5" stroke-dasharray="7 6" />
          <line v-if="phase === 6" x1="660" y1="180" x2="660" y2="340" stroke="#34474e" stroke-width="2.5" stroke-dasharray="7 6" />
          <g v-if="phase >= 5" fill="none">
            <g v-for="cx in [240, 660]" :key="cx">
              <path :d="`M ${cx - 140} 260 Q ${cx} 145 ${cx + 25} 252 M ${cx + 140} 260 Q ${cx} 145 ${cx - 25} 252 M ${cx - 140} 260 Q ${cx} 375 ${cx + 25} 268 M ${cx + 140} 260 Q ${cx} 375 ${cx - 25} 268`" class="meiosis-spindle-support" />
              <CentriolePair :x="cx - 140" :y="260" aster />
              <CentriolePair :x="cx + 140" :y="260" :rotation="180" aster />
            </g>
            <path v-for="chromosome in daughterCellChromosomes" :key="`pull-${chromosome.id}`" :d="`M ${chromosome.x < 450 ? (chromosome.x < 240 ? 100 : 380) : (chromosome.x < 660 ? 520 : 800)} 260 L ${chromosome.x} ${chromosome.y}`" class="meiosis-spindle-pull" />
            <template v-if="phase <= 6">
              <path v-for="chromosome in daughterCellChromosomes" :key="`opposite-${chromosome.id}`" :d="`M ${chromosome.x < 450 ? (chromosome.x < 240 ? 380 : 100) : (chromosome.x < 660 ? 800 : 520)} 260 L ${chromosome.x} ${chromosome.y}`" class="meiosis-spindle-pull" />
            </template>
            <text x="240" y="92" text-anchor="middle" class="svg-note">cel 1</text>
            <text x="660" y="92" text-anchor="middle" class="svg-note">cel 2</text>
          </g>
          <text v-if="phase === 4" x="240" y="468" text-anchor="middle" class="svg-note">haploïd · n = 2</text>
          <text v-if="phase === 4" x="660" y="468" text-anchor="middle" class="svg-note">haploïd · n = 2</text>
        </g>

        <g v-if="phase === 8 && !fertilized">
          <g v-for="gamete in gametes" :key="gamete.id">
            <circle :cx="gamete.cx" :cy="gamete.cy" r="83" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
            <circle :cx="gamete.cx" :cy="gamete.cy" r="47" fill="#ffffff" stroke="#52636a" stroke-width="2.5" />
            <text :x="gamete.cx" :y="gamete.cy - 105" text-anchor="middle" class="gamete-title">dochtercel {{ gametes.indexOf(gamete) + 1 }}</text>
            <g :transform="`translate(${gamete.cx - 22} ${gamete.cy})`">
              <ChromosomeGlyph :x="0" :y="-8" :length="34" :color="gamete.pair1.color" :accent-color="gamete.pair1.accentColor" :accent-side="gamete.pair1.origin === 'M' ? 'right' : 'left'" shape="chromatin" :label="`Chromosoom 1: ${gamete.pair1.origin === 'M' ? 'maternaal' : 'paternaal'}`" />
            </g>
            <g :transform="`translate(${gamete.cx + 22} ${gamete.cy})`">
              <ChromosomeGlyph :x="0" :y="-8" :length="25" :color="gamete.pair2.color" shape="chromatin" :label="`Chromosoom 2: ${gamete.pair2.origin === 'M' ? 'maternaal' : 'paternaal'}`" />
            </g>
            <text :x="gamete.cx" :y="gamete.cy + 110" text-anchor="middle" class="gamete-count">n = 2</text>
          </g>
          <text x="450" y="499" text-anchor="middle" class="svg-note">Elke dochtercel heeft één chromosoom van elk homoloog paar.</text>
        </g>

        <g v-if="phase === 8 && fertilized">
          <circle cx="450" cy="260" r="177" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <circle cx="450" cy="260" r="125" fill="#ffffff" stroke="#52636a" stroke-width="3" />
          <g v-for="chromosome in zygoteChromosomes" :key="chromosome.id">
            <ChromosomeGlyph :x="chromosome.x" :y="chromosome.y" :length="chromosome.length" :color="chromosome.color" :accent-color="chromosome.accentColor" :accent-side="chromosome.accentSide" :shape="chromosome.shape" :rotation="chromosome.rotation" :label="chromosome.label" />
          </g>
          <text x="450" y="466" text-anchor="middle" class="svg-note">Zaadcel (n) + eicel (n) → zygote (2n = 4)</text>
        </g>

        <g v-for="chromosome in singleCellChromosomes" :key="chromosome.id">
          <ChromosomeGlyph v-if="phase === 0" :x="chromosome.x + 7" :y="chromosome.y + 5" :length="chromosome.length" :color="chromosome.color" shape="chromatin" :rotation="chromosome.rotation" :label="`Kopie van ${chromosome.label}`" />
          <ChromosomeGlyph :x="chromosome.x" :y="chromosome.y" :length="chromosome.length" :color="chromosome.color" :accent-color="chromosome.accentColor" :accent-side="chromosome.accentSide" :shape="chromosome.shape" :rotation="chromosome.rotation" :label="chromosome.label" />
        </g>
        <g v-for="chromosome in daughterCellChromosomes" :key="chromosome.id">
          <ChromosomeGlyph :x="chromosome.x" :y="chromosome.y" :length="chromosome.length" :color="chromosome.color" :accent-color="chromosome.accentColor" :accent-side="chromosome.accentSide" :shape="chromosome.shape" :rotation="chromosome.rotation" :label="chromosome.label" />
        </g>

        <DivisionLegend :spindle="phase >= 1 && phase <= 7" :fertilized="fertilized" />
        <text v-if="phase === 0" x="450" y="495" text-anchor="middle" class="svg-note">Interfase: DNA gekopieerd, nog geen gecondenseerde chromosomen</text>
        <text v-if="phase === 4" x="450" y="502" text-anchor="middle" class="svg-note">Geen DNA-replicatie tussen de twee delingen</text>

      </svg>

      <div class="meiosis-readouts" aria-live="polite">
        <span><strong>Celstatus:</strong> {{ counterText }}</span>
        <span v-if="!fertilized"><strong>Crossing-over:</strong> {{ crossingOver ? 'met uitwisseling' : 'zonder uitwisseling' }}</span>
        <span v-else><strong>Bevruchting:</strong> gameten van twee ouders</span>
      </div>
    </section>

    <aside class="meiosis-panel">
      <div class="meiosis-panel-topline">
        <span class="meiosis-step-number">{{ String(phase + 1).padStart(2, '0') }}</span>
        <span class="meiosis-phase-label">Fase {{ phase + 1 }} van {{ phases.length }}</span>
      </div>
      <h3 class="meiosis-step-title">{{ fertilized ? 'Bevruchting herstelt 2n' : current.title }}</h3>
      <p class="meiosis-step-text">
        <template v-if="fertilized">Afzonderlijk voorbeeld: een zaadcel van de vader en een eicel van de moeder versmelten. Hun haploïde kernen vormen een diploïde zygote. Elk chromosoom bestaat nog uit één chromatide; DNA-replicatie volgt pas later.</template>
        <template v-else>{{ current.description }}</template>
      </p>

      <div v-if="phase === 1" class="meiosis-interaction">
        <p><strong>Crossing-over:</strong> de kleursegmenten tonen uitwisseling tussen niet-zusterchromatiden.</p>
        <button type="button" class="btn meiosis-secondary" :aria-pressed="crossingOver" @click="crossingOver = !crossingOver">{{ crossingOver ? 'Verberg crossing-over' : 'Toon crossing-over' }}</button>
      </div>
      <div v-if="phase === 2" class="meiosis-interaction">
        <p><strong>Probeer mixing:</strong> de richting van elk homoloog paar is toevallig.</p>
        <button type="button" class="btn btn-primary" @click="randomize"><PhDiceFive weight="fill" /> Werp nieuwe schikking</button>
      </div>
      <div v-if="phase === 3" class="meiosis-callout"><strong>Disjunctie:</strong> homologe chromosomen scheiden; de twee zusterchromatiden blijven samen.</div>
      <div v-if="phase === 5 || phase === 6" class="meiosis-callout"><strong>Kijk naar beide cellen:</strong> meiose II verloopt gelijktijdig in de twee dochtercellen.</div>
      <div v-if="phase === 8 && !fertilized" class="meiosis-interaction">
        <p><strong>Mogelijke combinaties door mixing:</strong> bij 2 paren zijn er 2² = 4 mogelijke combinaties. Bij de mens zijn dat 2²³ ≈ 8,4 miljoen (zonder crossing-over mee te tellen).</p>
        <button type="button" class="btn meiosis-secondary" @click="fertilized = true">Bekijk bevruchting: n + n = 2n</button>
        <button type="button" class="btn meiosis-secondary" @click="resetMeiosis"><PhArrowsClockwise weight="bold" /> Nieuwe meiose simuleren</button>
      </div>
      <div v-if="fertilized" class="meiosis-callout"><strong>Zygote:</strong> 2n is hersteld na versmelting van twee gameten.</div>

      <ol class="meiosis-track" aria-label="Fasen van de meiose">
        <li v-for="(item, index) in phases" :key="item.label" :class="{ 'meiosis-track-active': index === phase, 'meiosis-track-done': index < phase }">
          <span><PhCheckCircle v-if="index < phase" weight="bold" aria-label="Doorlopen" /><template v-else>{{ index + 1 }}</template></span>{{ item.label }}
        </li>
      </ol>

      <div class="meiosis-actions">
        <button type="button" class="btn meiosis-secondary" @click="previous" :disabled="phase === 0 && !fertilized" aria-label="Vorige meiosefase"><PhArrowLeft weight="bold" /> Vorige</button>
        <button type="button" class="btn btn-primary" @click="phase === phases.length - 1 ? finish() : next()">
          {{ phase === phases.length - 1 ? (completed ? 'Afgerond' : 'Simulatie afronden') : 'Volgende fase' }}
          <PhCheckCircle v-if="phase === phases.length - 1 && completed" weight="fill" /><PhArrowRight v-else weight="bold" />
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.meiosis-body { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; align-items: start; }
.meiosis-canvas { min-width: 0; padding: 12px; background: var(--color-panel); border: 2px solid var(--color-line-strong); border-radius: var(--radius-card); }
.meiosis-canvas svg { display: block; width: 100%; height: auto; }
.svg-note { fill: var(--color-ink); font-size: 14px; font-weight: 700; }
.gamete-title { fill: var(--color-ink); font-size: 13px; font-weight: 700; }
.gamete-count { fill: var(--color-ink); font-size: 14px; font-weight: 700; }
.meiosis-spindle-pull { stroke: #34474e; stroke-width: 2.5;  }
.meiosis-spindle-support { stroke: #52636a; stroke-width: 2; stroke-dasharray: 7 6;  }
.meiosis-readouts { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.meiosis-readouts span { flex: 1; min-width: 180px; padding: 10px 12px; color: var(--color-ink); background: var(--color-panel-muted); border: 1px solid var(--color-line-strong); border-radius: var(--radius-control); font-size: 0.9rem; }
.meiosis-panel { display: flex; flex-direction: column; min-width: 0; }
.meiosis-panel-topline { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.meiosis-step-number { display: grid; width: 44px; height: 44px; place-items: center; color: var(--color-digital); background: var(--color-digital-soft); border: 2px solid var(--color-digital); border-radius: var(--radius-control); font-family: 'IBM Plex Mono', monospace; font-weight: 700; }
.meiosis-phase-label { color: var(--color-digital); font-family: 'IBM Plex Mono', monospace; font-size: 0.8rem; font-weight: 700; letter-spacing: 0; text-transform: none; }
.meiosis-step-title { margin: 0 0 8px; color: var(--color-ink); font-size: 1.5rem; line-height: 1.2; }
.meiosis-step-text { margin: 0; color: var(--color-ink-soft); font-size: 1.05rem; line-height: 1.55; }
.meiosis-interaction { display: grid; gap: 8px; margin-top: 14px; padding: 12px; color: var(--color-ink); background: var(--color-panel); border: 2px solid var(--color-line-strong); border-radius: var(--radius-control); line-height: 1.45; }
.meiosis-interaction p { margin: 0; }
.meiosis-secondary { color: var(--color-ink); background: var(--color-panel); border: 2px solid var(--color-line-strong); }
.meiosis-callout { margin-top: 14px; padding: 12px; color: var(--color-ink); background: var(--color-digital-soft); border: 2px solid var(--color-digital); border-radius: var(--radius-control); line-height: 1.45; }
.meiosis-track { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; margin: 18px 0 0; padding: 0; list-style: none; }
.meiosis-track li { display: flex; align-items: center; gap: 8px; min-height: 36px; padding: 5px 8px; color: var(--color-ink-soft); background: var(--color-panel); border: 1px solid var(--color-line-strong); border-radius: var(--radius-control); font-size: 0.82rem; font-weight: 600; }
.meiosis-track li span { display: grid; width: 22px; height: 22px; flex: none; place-items: center; color: var(--color-ink); background: var(--color-panel-muted); border-radius: 50%; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; }
.meiosis-track li.meiosis-track-active { color: var(--color-ink); background: var(--color-digital-soft); border: 2px solid var(--color-digital); }
.meiosis-track li.meiosis-track-active span { color: #ffffff; background: var(--color-digital); }
.meiosis-track li.meiosis-track-done span { color: #ffffff; background: var(--color-workbook); }
.meiosis-actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 18px; }
.meiosis-actions .btn { min-height: 44px; }
.meiosis-actions .btn:disabled { opacity: 0.5; cursor: not-allowed; }
@media (min-width: 1100px) { .meiosis-body { grid-template-columns: minmax(0, 3fr) minmax(340px, 2fr); gap: 28px; } }
@media (max-width: 520px) { .meiosis-track { grid-template-columns: 1fr; } .meiosis-actions { flex-direction: column; } }
</style>
