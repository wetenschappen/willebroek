<script setup>
import { computed, ref } from 'vue'
import { PhArrowLeft, PhArrowRight, PhCheckCircle, PhWarningCircle } from '@phosphor-icons/vue'
import CentriolePair from './CentriolePair.vue'
import ChromosomeGlyph from './ChromosomeGlyph.vue'

const emit = defineEmits(['complete'])

const step = ref(0)
const cellType = ref('zenuwcel')
const dnaDamage = ref(false)
const completed = ref(false)

const phases = [
  { key: 'g1', label: 'G₁-fase', title: 'Groei en voorbereiding', description: 'De cel groeit: het cytoplasma, de celorganellen en de celstofwisseling nemen toe. De cel maakt onder meer eiwitten en nucleotiden aan. Bij zoogdiercellen duurt een celcyclus gemiddeld 12–24 uur; dat verschilt per celtype.' },
  { key: 'g1-check', label: 'Controlepunt', title: 'Beslist de cel om te delen?', description: 'In G₁ controleert de cel of verdere deling nodig en mogelijk is. Een cel die niet verder deelt, kan de celcyclus verlaten en in G₀ terechtkomen.' },
  { key: 's', label: 'S-fase', title: 'DNA-replicatie', description: 'In de S-fase wordt het DNA gekopieerd. Het aantal chromosomen blijft 2n, maar elk chromosoom bestaat na replicatie uit twee zusterchromatiden.' },
  { key: 'g2', label: 'G₂-fase', title: 'Laatste voorbereiding', description: 'De cel controleert en herstelt het DNA. Ze maakt onder meer histonen en membraanmateriaal aan; het centriolenpaar is verdubbeld.' },
  { key: 'g2-check', label: 'Controlepunt', title: 'Is het DNA veilig om te verdelen?', description: 'Bij beperkte schade proberen herstelproteïnen het DNA te herstellen. Bij onherstelbare schade kan apoptose voorkomen dat een beschadigde cel zich verder deelt.' },
  { key: 'm', label: 'M-fase', title: 'Mitose en cytokinese', description: 'De cel verdeelt de gekopieerde chromosomen en splitst daarna haar cytoplasma. De details van de mitose zie je in de tweede simulatie.' },
  { key: 'result', label: 'Resultaat', title: 'Twee dochtercellen', description: 'Na de cytokinese zijn er twee genetisch identieke diploïde dochtercellen. Beide kunnen opnieuw groeien en eventueel een celcyclus doorlopen.' },
  { key: 'g0', label: 'G₀-fase', title: 'De celcyclus verlaten', description: 'In G₀ voert de cel haar gespecialiseerde functie uit en deelt ze niet. Zenuwcellen blijven meestal definitief in G₀; sommige witte bloedcellen kunnen later terugkeren.' },
  { key: 'repair', label: 'DNA-controle', title: 'Herstelpoging', description: 'Herstelproteïnen proberen de DNA-schade te herstellen. Als dat lukt, kan de cel de celdeling hervatten; als dat niet lukt, volgt normaal apoptose.' },
  { key: 'apoptosis', label: 'Apoptose', title: 'Geprogrammeerde celdood', description: 'Bij onherstelbare DNA-schade sterft de cel gecontroleerd af. Dat verkleint de kans dat een beschadigde cel ongecontroleerd gaat delen.' },
  { key: 'cancer', label: 'Als controle faalt', title: 'Ongeremde celdeling kan een tumor vormen', description: 'Als schade niet wordt hersteld én de controle van de celcyclus faalt, kan een afwijkende cel ongecontroleerd blijven delen. Zo kan een tumor ontstaan.' },
  { key: 'spindle-check', label: 'Controle spoelfiguur', title: 'Zijn de chromosomen correct verbonden?', description: 'Tijdens de delingsfase wordt de spoelfiguur gecontroleerd. Pas wanneer elk chromosoom correct met de spoeldraden is verbonden, kunnen de zusterchromatiden worden verdeeld.' }
]

const current = computed(() => phases[step.value])
const isG0 = computed(() => step.value === 7)
const isApoptosis = computed(() => step.value === 9)
const isCancer = computed(() => step.value === 10)
const dnaReplicated = computed(() => [2, 3, 4, 5, 8, 10, 11].includes(step.value))
const showCentrioles = computed(() => [3, 4, 8].includes(step.value))
const isDecision = computed(() => step.value === 1 || step.value === 4 || step.value === 8 || step.value === 11)

function next() {
  if (step.value === 1) step.value = 2
  else if (step.value === 4) step.value = dnaDamage.value ? 8 : 5
  else if (step.value === 8) step.value = 9
  else if (step.value === 5) step.value = 11
  else if (step.value < 6) step.value += 1
  else if (step.value === 6) {
    completed.value = true
    emit('complete')
  }
}

function previous() {
  if (step.value === 11) step.value = 5
  else if (step.value === 6) step.value = 11
  else if (step.value === 7) step.value = 1
  else if (step.value === 9 || step.value === 10) step.value = 8
  else if (step.value === 8) step.value = 4
  else if (step.value > 0) step.value -= 1
}

function chooseG0() {
  step.value = 7
  cellType.value = 'zenuwcel'
}

function returnFromG0() {
  if (cellType.value === 'witte bloedcel') step.value = 0
  else step.value = 1
}

function markComplete() {
  completed.value = true
  emit('complete')
}

const phaseCircle = (key) => {
  if (key === 'g1') return [400, 62]
  if (key === 's') return [567, 225]
  if (key === 'g2') return [400, 388]
  return [233, 225]
}

function isActiveRing(key) {
  if (step.value === 7) return false
  const activeKey = phases[step.value]?.key
  if (key === 'g1') return activeKey === 'g1' || activeKey === 'g1-check'
  if (key === 's') return activeKey === 's'
  if (key === 'g2') return activeKey === 'g2' || activeKey === 'g2-check' || activeKey === 'repair' || activeKey === 'apoptosis' || activeKey === 'cancer'
  return activeKey === 'm' || activeKey === 'result' || activeKey === 'spindle-check'
}
</script>

<template>
  <div class="fullscreen-body cycle-body">
    <section class="cycle-canvas" aria-label="Interactief schema van de celcyclus">
      <svg viewBox="0 0 800 450" role="img" aria-labelledby="cycle-svg-title cycle-svg-desc">
        <title id="cycle-svg-title">Celcyclus met de fasen G1, S, G2 en M</title>
        <desc id="cycle-svg-desc">Een schematische cel toont groei, DNA-replicatie, controle en celdeling. G0 en apoptose zijn mogelijke uitkomsten.</desc>
        <rect x="0" y="0" width="800" height="450" rx="14" fill="var(--color-paper)" />

        <text x="400" y="28" text-anchor="middle" class="svg-heading">Interfase: G₁, S en G₂</text>
        <path d="M 432 58 C 500 62 548 107 562 169" fill="none" stroke="#52636a" stroke-width="5" />
        <path d="M 565 179 L 556 160 L 576 164 Z" fill="#52636a" />
        <path d="M 568 270 C 552 336 503 372 430 389" fill="none" stroke="#52636a" stroke-width="5" />
        <path d="M 420 389 L 440 379 L 440 399 Z" fill="#52636a" />
        <path d="M 370 389 C 297 373 249 336 232 270" fill="none" stroke="#52636a" stroke-width="5" />
        <path d="M 231 258 L 222 279 L 242 275 Z" fill="#52636a" />
        <path d="M 232 179 C 249 110 298 69 369 59" fill="none" stroke="#52636a" stroke-width="5" />
        <path d="M 380 58 L 360 49 L 360 69 Z" fill="#52636a" />

        <g v-for="phase in [{ key: 'g1', label: 'G₁', sub: 'groei' }, { key: 's', label: 'S', sub: 'DNA-replicatie' }, { key: 'g2', label: 'G₂', sub: 'groei en controle' }, { key: 'm', label: 'M', sub: 'deling' }]" :key="phase.key">
          <rect
            :x="phaseCircle(phase.key)[0] - (phase.key === 's' ? 80 : 76)"
            :y="phaseCircle(phase.key)[1] - 27"
            :width="phase.key === 's' ? 160 : 152"
            height="54"
            rx="12"
            :fill="isActiveRing(phase.key) ? 'var(--color-digital-soft)' : 'var(--color-panel)'"
            :stroke="isActiveRing(phase.key) ? 'var(--color-digital)' : 'var(--color-line-strong)'"
            stroke-width="3"
          />
          <text :x="phaseCircle(phase.key)[0]" :y="phaseCircle(phase.key)[1] - 3" text-anchor="middle" class="ring-phase">{{ phase.label }}</text>
          <text :x="phaseCircle(phase.key)[0]" :y="phaseCircle(phase.key)[1] + 17" text-anchor="middle" class="ring-sub">{{ phase.sub }}</text>
        </g>

        <path d="M 323 62 H 185" fill="none" stroke="var(--color-line)" stroke-width="3" stroke-dasharray="7 5" />
        <path d="M 177 62 L 193 55 L 193 69 Z" fill="var(--color-line)" />
        <rect x="40" y="37" width="136" height="54" rx="8" :fill="isG0 ? 'var(--color-digital-soft)' : 'var(--color-panel)'" :stroke="isG0 ? 'var(--color-digital)' : 'var(--color-line-strong)'" stroke-width="2" />
        <text x="108" y="60" text-anchor="middle" class="ring-phase">G₀</text>
        <text x="108" y="79" text-anchor="middle" class="ring-sub">buiten de celcyclus</text>

        <!-- Cell rendering changes with the selected phase. -->
        <g v-if="!isApoptosis && !isCancer && step !== 6 && step !== 5 && step !== 11" class="cell-visual">
          <ellipse cx="400" cy="225" :rx="step === 0 ? 67 : 78" :ry="step === 0 ? 55 : 66" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <circle cx="400" cy="225" r="34" fill="#ffffff" stroke="#52636a" stroke-width="3" />
          <g stroke="#b4232f" stroke-width="4" fill="none" stroke-linecap="round">
            <path d="M 382 220 C 390 202 404 247 419 216" />
            <path v-if="dnaReplicated" d="M 382 228 C 390 210 404 255 419 224" />
          </g>
          <CentriolePair :x="350" :y="205" />
          <CentriolePair v-if="showCentrioles" :x="447" :y="245" :rotation="35" />
          <g v-if="step === 7 && cellType === 'zenuwcel'" stroke="#075985" stroke-width="5" fill="none" stroke-linecap="round">
            <path d="M 445 263 C 461 280 471 293 480 310 M 350 185 L 325 160 M 337 174 L 320 179 M 337 174 L 337 154" />
            <path d="M 461 281 L 477 276 M 471 295 L 459 308" />
          </g>
          <g v-if="step === 7 && cellType === 'witte bloedcel'" fill="#ffffff" stroke="#075985" stroke-width="3">
            <circle cx="380" cy="205" r="5" /><circle cx="415" cy="238" r="5" /><circle cx="420" cy="205" r="4" />
          </g>
          <text x="400" y="322" text-anchor="middle" class="cell-label">{{ step === 7 ? cellType : 'cel' }}</text>
        </g>

        <g v-else-if="step === 5 || step === 11" aria-label="Mitose met controle van de spoelfiguur">
          <ellipse cx="400" cy="225" rx="78" ry="76" fill="var(--color-digital-soft)" stroke="var(--color-digital)" stroke-width="3" />
          <g v-for="x in [370, 390, 410, 430]" :key="x">
            <path :d="`M 400 163 L ${x} 225 L 400 287`" fill="none" stroke="var(--color-line)" stroke-width="1.5" />
            <ChromosomeGlyph :x="x" :y="225" :length="27" color="#b4232f" />
          </g>
          <CentriolePair :x="400" :y="163" />
          <CentriolePair :x="400" :y="287" :rotation="180" />
          <text x="400" y="322" text-anchor="middle" class="cell-label">controle van de spoelfiguur</text>
        </g>

        <g v-else-if="step === 6" aria-label="Twee dochtercellen">
          <circle cx="354" cy="225" r="40" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <circle cx="446" cy="225" r="40" fill="#e3f1f5" stroke="#075985" stroke-width="4" />
          <circle cx="354" cy="225" r="17" fill="#ffffff" stroke="#52636a" stroke-width="2" />
          <circle cx="446" cy="225" r="17" fill="#ffffff" stroke="#52636a" stroke-width="2" />
          <path d="M 344 223 C 349 211 355 235 362 219 M 436 223 C 441 211 447 235 454 219" fill="none" stroke="#b4232f" stroke-width="3" />
          <text x="400" y="300" text-anchor="middle" class="cell-label">2 genetisch identieke dochtercellen</text>
        </g>

        <g v-else-if="isApoptosis" aria-label="Cel ondergaat apoptose">
          <circle cx="400" cy="225" r="48" fill="#fde8e9" stroke="#b4232f" stroke-width="4" stroke-dasharray="8 6" />
          <circle cx="360" cy="176" r="9" fill="#fde8e9" stroke="#b4232f" stroke-width="3" />
          <circle cx="447" cy="186" r="7" fill="#fde8e9" stroke="#b4232f" stroke-width="3" />
          <circle cx="374" cy="281" r="6" fill="#fde8e9" stroke="#b4232f" stroke-width="3" />
          <path d="M 385 218 C 392 203 402 238 414 215" fill="none" stroke="#b4232f" stroke-width="4" />
          <text x="400" y="308" text-anchor="middle" class="cell-label">gecontroleerde celdood</text>
        </g>
        <g v-else-if="isCancer" aria-label="Ongeremde celdeling vormt een tumor">
          <circle cx="400" cy="218" r="48" fill="#fde8e9" stroke="#b4232f" stroke-width="4" />
          <circle cx="358" cy="186" r="34" fill="#fde8e9" stroke="#b4232f" stroke-width="4" />
          <circle cx="438" cy="180" r="36" fill="#fde8e9" stroke="#b4232f" stroke-width="4" />
          <circle cx="365" cy="252" r="36" fill="#fde8e9" stroke="#b4232f" stroke-width="4" />
          <circle cx="439" cy="254" r="38" fill="#fde8e9" stroke="#b4232f" stroke-width="4" />
          <g fill="#b4232f">
            <circle cx="400" cy="218" r="9" /><circle cx="358" cy="186" r="9" />
            <circle cx="438" cy="180" r="9" /><circle cx="365" cy="252" r="9" />
            <circle cx="439" cy="254" r="9" />
          </g>
          <text x="400" y="314" text-anchor="middle" class="cell-label">tumor: ongecontroleerde delingen</text>
        </g>

        <g v-if="!isCancer" class="diagram-legend">
          <rect x="585" y="403" width="195" height="34" rx="8" fill="var(--color-panel)" stroke="var(--color-line-strong)" stroke-width="2" />
          <circle cx="603" cy="420" r="6" fill="#b4232f" />
          <text x="616" y="425" class="legend-label">DNA</text>
          <CentriolePair :x="670" :y="420" />
          <text x="694" y="425" class="legend-label">centriolen</text>
        </g>
      </svg>

      <div class="cycle-readouts" aria-live="polite">
        <span><strong>Chromosomen:</strong> {{ isCancer ? 'aantal kan afwijken' : isApoptosis ? 'worden afgebroken' : step === 6 ? '2n per dochtercel' : '2n vóór de deling' }}</span>
        <span><strong>DNA:</strong> {{ isCancer ? 'beschadigd' : isApoptosis ? 'wordt afgebroken' : step === 6 ? 'beginhoeveelheid per dochtercel' : dnaReplicated ? 'verdubbeld na S-fase' : 'beginhoeveelheid' }}</span>
      </div>
    </section>

    <aside class="cycle-panel">
      <div class="cycle-panel-topline">
        <span class="cycle-step-number">{{ step === 7 ? 'G₀' : step === 8 ? 'G₂' : step === 9 ? '!' : step === 10 ? '!' : step === 11 ? 'M' : String(step + 1).padStart(2, '0') }}</span>
        <span class="cycle-progress-label">{{ current.label }}</span>
      </div>
      <h3 class="cycle-step-title">{{ current.title }}</h3>
      <p class="cycle-step-text">{{ current.description }}</p>

      <div v-if="step === 11" class="cycle-choice-box">
        <p class="cycle-choice-prompt">Controle van de spoelfiguur:</p>
        <button type="button" class="btn btn-primary" @click="step = 6">Correct verbonden: verdelen en splitsen</button>
        <p class="cycle-small-note">Bij een foutieve verbinding wordt de deling stilgelegd tot die is hersteld.</p>
      </div>

      <div v-if="step === 1" class="cycle-choice-box">
        <p class="cycle-choice-prompt">Wat gebeurt er met deze cel?</p>
        <button type="button" class="btn btn-primary" @click="step = 2">De cel deelt verder → S-fase</button>
        <button type="button" class="btn cycle-secondary" @click="chooseG0">De cel gaat naar G₀</button>
      </div>

      <div v-if="step === 4" class="cycle-choice-box">
        <p class="cycle-choice-prompt">Kies een controlescenario:</p>
        <button type="button" class="btn btn-primary" @click="dnaDamage = false; step = 5">DNA in orde → doorgaan naar mitose</button>
        <button type="button" class="btn cycle-secondary" @click="dnaDamage = true; step = 8">DNA-schade → controle en herstel</button>
      </div>

      <div v-if="step === 7" class="cycle-choice-box">
        <p class="cycle-choice-prompt">Vergelijk twee cellen in G₀:</p>
        <div class="cycle-toggle-row">
          <button type="button" class="btn cycle-toggle" :class="cellType === 'zenuwcel' ? 'cycle-toggle-active' : ''" @click="cellType = 'zenuwcel'">Zenuwcel</button>
          <button type="button" class="btn cycle-toggle" :class="cellType === 'witte bloedcel' ? 'cycle-toggle-active' : ''" @click="cellType = 'witte bloedcel'">Witte bloedcel</button>
        </div>
        <p class="cycle-small-note">{{ cellType === 'zenuwcel' ? 'Meestal definitief in G₀: een zenuwcel deelt niet opnieuw.' : 'Tijdelijk in G₀: wanneer nodig kan een witte bloedcel de cyclus weer opnemen.' }}</p>
        <button type="button" class="btn cycle-secondary" @click="returnFromG0">{{ cellType === 'witte bloedcel' ? 'Keer terug naar G₁' : 'Terug naar het controlepunt' }}</button>
      </div>

      <div v-if="step === 8" class="cycle-choice-box">
        <p class="cycle-choice-prompt">Wat gebeurt er met de beschadigde cel?</p>
        <button type="button" class="btn btn-primary" @click="step = 5">Herstel lukt → celdeling kan doorgaan</button>
        <button type="button" class="btn cycle-danger" @click="step = 9">Schade te groot → apoptose</button>
        <button type="button" class="btn cycle-secondary" @click="step = 10">Controle faalt → ongeremde deling</button>
      </div>

      <div v-if="step === 9" class="cycle-callout" role="note">
        <PhWarningCircle weight="fill" />
        <span>Apoptose is een beschermingsmechanisme; het is niet hetzelfde als mitose of een gewone celdeling.</span>
      </div>
      <div v-if="step === 10" class="cycle-callout cycle-cancer-note" role="note">
        <PhWarningCircle weight="fill" />
        <span>DNA-schade (bijvoorbeeld door uv-straling, alcohol of teer) of een erfelijke afwijking kan de controle verstoren. Kankercellen kunnen omliggend weefsel verdringen, hun specialisatie verliezen, veel zuurstof en voedingsstoffen verbruiken en uitzaaien via bloed of lymfe.</span>
      </div>

      <ol class="cycle-track" aria-label="Celcyclusfasen">
        <li v-for="(phase, index) in phases.slice(0, 7)" :key="phase.key" :class="{ 'cycle-track-active': index === step, 'cycle-track-done': index < step && step < 7 }">
          <span><PhCheckCircle v-if="index === 6" weight="bold" /><template v-else>{{ index < 5 ? index + 1 : 'M' }}</template></span>{{ phase.label }}
        </li>
      </ol>

      <div class="cycle-actions">
        <button type="button" class="btn cycle-secondary" @click="previous" :disabled="step === 0" aria-label="Vorige fase">
          <PhArrowLeft weight="bold" /> Vorige
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click="step === 6 ? markComplete() : next()"
          :disabled="isDecision || isG0 || isApoptosis || isCancer"
        >
          {{ step === 6 ? (completed ? 'Afgerond' : 'Simulatie afronden') : 'Volgende' }}
          <PhCheckCircle v-if="step === 6 && completed" weight="fill" />
          <PhArrowRight v-else weight="bold" />
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.cycle-body { display: grid; grid-template-columns: minmax(0, 1fr); gap: 24px; align-items: start; }
.cycle-canvas { min-width: 0; padding: 12px; background: var(--color-panel); border: 2px solid var(--color-line-strong); border-radius: var(--radius-card); }
.cycle-canvas svg { display: block; width: 100%; height: auto; }
.svg-heading { fill: var(--color-ink); font-size: 18px; font-weight: 700; letter-spacing: 0; }
.ring-phase { fill: var(--color-ink); font-size: 20px; font-weight: 700; }
.ring-sub { fill: var(--color-ink-soft); font-size: 12px; font-weight: 600; }
.cell-label { fill: var(--color-ink); font-size: 14px; font-weight: 700; }
.legend-label { fill: var(--color-ink); font-size: 12px; font-weight: 700; }
.cycle-readouts { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
.cycle-readouts span { flex: 1; min-width: 180px; padding: 10px 12px; color: var(--color-ink); background: var(--color-panel-muted); border: 1px solid var(--color-line-strong); border-radius: var(--radius-control); font-size: 0.9rem; }
.cycle-panel { display: flex; flex-direction: column; min-width: 0; }
.cycle-panel-topline { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.cycle-step-number { display: grid; width: 44px; height: 44px; place-items: center; color: var(--color-digital); background: var(--color-digital-soft); border: 2px solid var(--color-digital); border-radius: var(--radius-control); font-family: 'IBM Plex Mono', monospace; font-weight: 700; }
.cycle-progress-label { color: var(--color-digital); font-family: 'IBM Plex Mono', monospace; font-weight: 700; font-size: 0.8rem; letter-spacing: 0; text-transform: none; }
.cycle-step-title { margin: 0 0 8px; color: var(--color-ink); font-size: 1.5rem; line-height: 1.2; }
.cycle-step-text { margin: 0; color: var(--color-ink-soft); font-size: 1.05rem; line-height: 1.55; }
.cycle-choice-box { display: grid; gap: 8px; margin-top: 16px; padding: 14px; background: var(--color-panel); border: 2px solid var(--color-line-strong); border-radius: var(--radius-card); }
.cycle-choice-prompt { margin: 0 0 4px; color: var(--color-ink); font-weight: 700; }
.cycle-secondary, .cycle-toggle { color: var(--color-ink); background: var(--color-panel); border: 2px solid var(--color-line-strong); }
.cycle-danger { color: #7f1d1d; background: #fde8e9; border: 2px solid #b4232f; }
.cycle-toggle-row { display: flex; flex-wrap: wrap; gap: 8px; }
.cycle-toggle-active { color: var(--color-digital); background: var(--color-digital-soft); border-color: var(--color-digital); }
.cycle-small-note { margin: 0; color: var(--color-ink-soft); font-size: 0.93rem; line-height: 1.45; }
.cycle-callout { display: flex; gap: 10px; align-items: flex-start; margin-top: 14px; padding: 12px; color: #7f1d1d; background: #fde8e9; border: 2px solid #b4232f; border-radius: var(--radius-control); line-height: 1.45; }
.cycle-cancer-note { font-size: 0.9rem; }
.cycle-callout svg { flex: none; font-size: 1.35rem; }
.cycle-track { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; margin: 20px 0 0; padding: 0; list-style: none; }
.cycle-track li { display: flex; gap: 8px; align-items: center; min-height: 36px; padding: 5px 8px; color: var(--color-ink-soft); background: var(--color-panel); border: 1px solid var(--color-line-strong); border-radius: var(--radius-control); font-size: 0.84rem; font-weight: 600; }
.cycle-track li span { display: grid; width: 22px; height: 22px; flex: none; place-items: center; color: var(--color-ink); background: var(--color-panel-muted); border-radius: 50%; font-family: 'IBM Plex Mono', monospace; font-size: 0.7rem; }
.cycle-track li.cycle-track-active { color: var(--color-ink); background: var(--color-digital-soft); border: 2px solid var(--color-digital); }
.cycle-track li.cycle-track-active span { color: #ffffff; background: var(--color-digital); }
.cycle-track li.cycle-track-done span { color: #ffffff; background: var(--color-workbook); }
.cycle-actions { display: flex; justify-content: space-between; gap: 10px; margin-top: 18px; }
.cycle-actions .btn { min-height: 44px; }
.cycle-actions .btn:disabled { opacity: 0.5; cursor: not-allowed; }
@media (min-width: 1024px) { .cycle-body { grid-template-columns: minmax(0, 3fr) minmax(320px, 2fr); gap: 28px; } }
@media (max-width: 520px) { .cycle-track { grid-template-columns: 1fr; } .cycle-actions { flex-direction: column; } }
</style>
