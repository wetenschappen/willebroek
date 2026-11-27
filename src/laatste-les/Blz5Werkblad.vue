<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import MathText from '../guided/MathText.vue'

const TOTAL_STEPS = 5
const step = ref(0)
const panel = ref('brug') // 'brug' | 'check' | 'sporen' | ''
const sheetRef = ref(null)

const mainEq = String.raw`\(\underbrace{\dfrac{p_1 V_1}{T_1}}_{\text{vóór}}=\underbrace{\dfrac{p_2 V_2}{T_2}}_{\text{na}}\)`
const boyleCancel = String.raw`\(\dfrac{p_1 V_1}{\cancel{T_1}}=\dfrac{p_2 V_2}{\cancel{T_2}}\)`
const boyleRes = String.raw`\(p_1 V_1 = p_2 V_2\)`
const baseEq = String.raw`\(\dfrac{p_1 V_1}{T_1}=\dfrac{p_2 V_2}{T_2}\)`
const glCancel = String.raw`\(\dfrac{p_1 \textcolor{#237a4b}{\cancel{V_1}}}{T_1}=\dfrac{p_2 \textcolor{#237a4b}{\cancel{V_2}}}{T_2}\)`
const glRes = String.raw`\(\dfrac{p_1}{T_1}=\dfrac{p_2}{T_2}\)`
const chCancel = String.raw`\(\dfrac{\textcolor{#237a4b}{\cancel{p_1}} V_1}{T_1}=\dfrac{\textcolor{#237a4b}{\cancel{p_2}} V_2}{T_2}\)`
const chRes = String.raw`\(\dfrac{V_1}{T_1}=\dfrac{V_2}{T_2}\)`
const charlesProof = String.raw`\(\dfrac{\cancel{166,2}\times 15}{300}=\dfrac{\cancel{166,2}\times 30}{600}\qquad\Longrightarrow\qquad\dfrac{15}{300}=\dfrac{30}{600}.\)`
const brugBoyle = String.raw`\(p \cdot V\)`
const brugGl = String.raw`\(\dfrac{p}{T}\)`
const brugCh = String.raw`\(\dfrac{V}{T}\)`
const brugEen = String.raw`\(\dfrac{p \cdot V}{T}\)`
const bandRes = String.raw`\(p_1/T_1 = p_2/T_2\)`

function togglePanel(name) { panel.value = panel.value === name ? '' : name }
function stepNext() { if (step.value < TOTAL_STEPS) step.value += 1 }
function stepPrev() { if (step.value > 0) step.value -= 1 }
function jumpTo(n) { step.value = step.value === n ? n - 1 : n }
function resetSteps() { step.value = 0 }
function showAll() { step.value = TOTAL_STEPS }

function onKeydown(e) {
  if (document.querySelector('dialog[open]')) return
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if (e.key === 'ArrowRight') { e.preventDefault(); stepNext() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); stepPrev() }
}

watch(step, async (n) => {
  if (!n) return
  await nextTick()
  const el = sheetRef.value?.querySelector(`[data-step="${n}"]`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="blz5-wrap">
    <div class="blz5-bar">
      <div class="blz5-tabs" role="group" aria-label="Lesmomenten bij bladzijde 5">
        <button class="btn" :class="panel === 'brug' ? 'btn-primary' : 'btn-ghost'" type="button" :aria-pressed="panel === 'brug'" @click="togglePanel('brug')">
          1. Van 3 regels naar 1
        </button>
        <button class="btn" :class="panel === 'check' ? 'btn-primary' : 'btn-ghost'" type="button" :aria-pressed="panel === 'check'" @click="togglePanel('check')">
          2. Klascheck
        </button>
        <button class="btn" :class="panel === 'sporen' ? 'btn-primary' : 'btn-ghost'" type="button" :aria-pressed="panel === 'sporen'" @click="togglePanel('sporen')">
          3. Sporen
        </button>
      </div>
      <div class="blz5-stepper" aria-label="Invulstappen bladzijde 5">
        <button class="btn btn-ghost" type="button" :disabled="step === 0" @click="stepPrev">← Vorige</button>
        <span class="blz5-count" aria-live="polite">Stap {{ step }} / {{ TOTAL_STEPS }}</span>
        <button class="btn btn-ghost" type="button" :disabled="step === TOTAL_STEPS" @click="stepNext">Volgende →</button>
        <button v-if="step > 0" class="btn btn-ghost" type="button" @click="resetSteps">Wis</button>
        <button v-else class="btn btn-ghost" type="button" @click="showAll">Alles</button>
      </div>
      <span class="blz5-hint">Pijltjestoetsen ← / → strepen door en vullen blz. 5 stap voor stap in</span>
    </div>

    <!-- Paneel 1: Vlotte 3-in-1 overgang vanaf blz. 4 -->
    <section v-if="panel === 'brug'" class="panel-box" aria-label="Overgang van drie regels naar één vergelijking">
      <div class="brug-grid">
        <div class="brug-items">
          <div class="brug-chip">
            <span class="brug-name">Boyle <em>(T gelijk)</em></span>
            <MathText class="brug-math" :text="brugBoyle" />
          </div>
          <div class="brug-chip">
            <span class="brug-name">Gay-Lussac <em>(V gelijk)</em></span>
            <MathText class="brug-math" :text="brugGl" />
          </div>
          <div class="brug-chip">
            <span class="brug-name">Charles <em>(p gelijk)</em></span>
            <MathText class="brug-math" :text="brugCh" />
          </div>
        </div>
        <span class="brug-arrow" aria-hidden="true">→</span>
        <div class="brug-result">
          <MathText class="brug-math-big" :text="brugEen" />
          <p><strong>Geen vierde formule:</strong> <em>p</em> en <em>V</em> staan telkens <strong>boven</strong>, <em>T</em> staat telkens <strong>onder</strong>. Ze zitten alle drie in één vergelijking.</p>
        </div>
      </div>
    </section>

    <!-- Paneel 2: 30-seconden vingercheck (één vraag, nul afleiding) -->
    <section v-else-if="panel === 'check'" class="panel-box check-panel" aria-label="Klascheck Gay-Lussac">
      <div class="check-q">
        <strong>Gay-Lussac (vaste zuiger)</strong>
        <p>Welke letter streep je door? Steek op mijn teken je vingers op.</p>
      </div>
      <div class="fingers" aria-label="Antwoordopties vingerstemming">
        <div class="finger-opt"><span>1 vinger</span><strong><em>p</em></strong><small>druk</small></div>
        <div class="finger-opt"><span>2 vingers</span><strong><em>V</em></strong><small>volume</small></div>
        <div class="finger-opt"><span>3 vingers</span><strong><em>T</em></strong><small>temp.</small></div>
      </div>
    </section>

    <!-- Paneel 3: Drie rustige sporen zonder hulpkaarten -->
    <section v-else-if="panel === 'sporen'" class="panel-box sporen-panel" aria-label="Drie werksporen">
      <div class="track">
        <h3>Samen starten</h3>
        <span class="track-meta">3 min vooraan</span>
        <p>Eén rij samen, daarna zelf.</p>
      </div>
      <div class="track">
        <h3>Zelfstandig verder</h3>
        <span class="track-meta">blz. 5 → blz. 6</span>
        <p>Vast? Brein · Bundel · Buur · Leerkracht.</p>
      </div>
      <div class="track track-plus">
        <h3>Klaar met blz. 6?</h3>
        <span class="track-meta">Verdieping</span>
        <p>Haal vooraan de werkbon Controleer de einddruk.</p>
      </div>
    </section>

    <!-- Exacte bordkopie van Bundel 6 · blz. 5 -->
    <article ref="sheetRef" class="sheet" aria-label="Werkblad bladzijde 5: drie gasproeven, één vergelijking">
      <h2 class="sheet-h2"><span>5</span> Drie gasproeven, één vergelijking</h2>

      <p class="sheet-p">
        Bij elke proef vergeleek je hetzelfde gas op twee momenten. Er kwam geen gas bij en er ontsnapte niets. Waar
        herken je jouw drie regels in deze vergelijking?
      </p>

      <div class="eq-banner">
        <div class="eq-left"><MathText :text="mainEq" /></div>
        <div class="eq-right">
          <strong>Lees elke kant op dezelfde manier:</strong><br />
          absolute druk maal volume, gedeeld door de temperatuur in kelvin.
        </div>
      </div>

      <h3 class="fase-h3"><span>1</span> Streep door wat gelijk blijft</h3>
      <p class="sheet-p">
        Bij Boyle is het al voorgedaan. Streep in de andere twee rijen de gelijke factor links én rechts door. Schrijf
        de regel die overblijft in de laatste kolom.
      </p>

      <div class="table-scroll"><table class="sheet-table">
        <thead>
          <tr>
            <th>Proef</th>
            <th>Gelijk</th>
            <th>Streep door</th>
            <th>Wat blijft over?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Samendrukken</td>
            <td class="c-mid"><em>T</em></td>
            <td class="c-math"><MathText :text="boyleCancel" /></td>
            <td class="c-math"><MathText :text="boyleRes" /></td>
          </tr>
          <tr>
            <td>Opwarmen, vaste zuiger</td>
            <td class="c-mid"><em>V</em></td>
            <td
              class="c-math fill-cell"
              :class="{ filled: step >= 1, current: step === 1 }"
              data-step="1"
              @click="jumpTo(1)"
            >
              <MathText :text="step >= 1 ? glCancel : baseEq" />
            </td>
            <td
              class="c-math fill-cell"
              :class="{ filled: step >= 2, current: step === 2 }"
              data-step="2"
              @click="jumpTo(2)"
            >
              <span v-if="step >= 2" class="ans"><MathText :text="glRes" /></span>
              <span v-else class="cell-dots">…………………</span>
            </td>
          </tr>
          <tr>
            <td>Opwarmen, vrije zuiger</td>
            <td class="c-mid"><em>p</em></td>
            <td
              class="c-math fill-cell"
              :class="{ filled: step >= 3, current: step === 3 }"
              data-step="3"
              @click="jumpTo(3)"
            >
              <MathText :text="step >= 3 ? chCancel : baseEq" />
            </td>
            <td
              class="c-math fill-cell"
              :class="{ filled: step >= 4, current: step === 4 }"
              data-step="4"
              @click="jumpTo(4)"
            >
              <span v-if="step >= 4" class="ans"><MathText :text="chRes" /></span>
              <span v-else class="cell-dots">…………………</span>
            </td>
          </tr>
        </tbody>
      </table></div>

      <h3 class="fase-h3"><span>2</span> Waarom mag de druk weg bij Charles?</h3>
      <p class="sheet-p">Kijk naar blz. 4. De druk bleef 166,2 kPa. Deel beide kanten door diezelfde druk:</p>
      <div class="proof-line"><MathText :text="charlesProof" /></div>
      <p class="sheet-p">Zo vind je jouw regel terug: bij gelijke druk blijft <em>V</em>/<em>T</em> gelijk.</p>

      <h3 class="fase-h3"><span>3</span> Probeer het zelf</h3>
      <p class="sheet-p">
        Een afgesloten autoband warmt op tijdens het rijden. Neem aan dat het volume gelijk blijft. Welke grootheid
        streep je door? Welke regel blijft over?
      </p>
      <div
        class="fill-line"
        :class="{ filled: step >= 5, current: step === 5 }"
        data-step="5"
        role="button"
        tabindex="0"
        @click="jumpTo(5)"
        @keydown.enter.prevent="jumpTo(5)"
      >
        <span v-if="step >= 5" class="ans">
          Het volume <em>V</em>. Er blijft <MathText :text="bandRes" /> over: de druk stijgt.
        </span>
        <template v-else>
          <span class="dots" aria-hidden="true"></span>
          <span class="dots" aria-hidden="true"></span>
        </template>
      </div>

      <p class="sheet-p next-cue">
        <strong>Naar blz. 6</strong> &ensp; Veranderen <em>p</em>, <em>V</em> én <em>T</em>? Dan streep je niets door.
      </p>

      <footer class="sheet-foot">
        <span>Bundel 6 · Gasproeven</span>
        <span>5</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.blz5-wrap { display: grid; gap: 16px; min-width: 0 }
.blz5-wrap > * { min-width: 0 }
.table-scroll { max-width: 100%; overflow-x: auto }
.blz5-bar {
  position: sticky; top: var(--ll-toolbar-height, 0px); z-index: 5;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px;
  padding: 12px 16px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-workbook);
}
.blz5-tabs, .blz5-stepper { display: flex; flex-wrap: wrap; align-items: center; gap: 8px }
.blz5-count {
  min-width: 6.2em; text-align: center;
  font-size: max(15px, .72em); font-weight: 600; font-variant-numeric: tabular-nums;
  color: var(--color-workbook);
}
.blz5-hint { font-size: max(14px, .65em); color: var(--color-ink-soft); flex-basis: 100% }
.blz5-bar .btn { border-radius: 0; min-height: 40px; padding: 6px 12px; font-size: 16px; box-shadow: none }
.blz5-bar .btn-ghost { background: var(--color-panel); color: var(--color-ink); border: 1px solid var(--color-line) }
.blz5-bar .btn:disabled { opacity: .45; cursor: not-allowed }

.panel-box {
  max-width: 960px; width: 100%; margin: 0 auto;
  padding: 16px 20px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-workbook);
}
.brug-grid { display: grid; grid-template-columns: minmax(0, 1.35fr) auto minmax(0, 1.15fr); gap: 16px; align-items: center }
.brug-items { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px }
.brug-chip {
  display: grid; gap: 6px; place-items: center; padding: 10px 8px;
  background: var(--color-paper); border: 1px solid color-mix(in srgb, var(--color-line) 38%, transparent);
  text-align: center;
}
.brug-name { font-size: max(13px, .62em); font-weight: 600; color: var(--color-ink-soft); line-height: 1.25 }
.brug-name em { font-style: normal; display: block; font-weight: 500 }
.brug-math { font-size: 1.05em; color: var(--color-ink) }
.brug-arrow { font-size: 1.4em; font-weight: 600; color: var(--color-workbook) }
.brug-result { display: flex; align-items: center; gap: 16px; padding: 10px 14px; background: var(--color-workbook-soft); border: 1px solid color-mix(in srgb, var(--color-workbook) 35%, transparent) }
.brug-math-big { font-size: 1.28em; flex-shrink: 0; color: var(--color-ink) }
.brug-result p { margin: 0; font-size: clamp(15px, .95vw, 17px); line-height: 1.4; color: var(--color-ink) }

.check-panel {
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px 24px;
}
.check-q { display: grid; gap: 4px }
.check-q strong { font-size: clamp(17px, 1.1vw, 20px); font-weight: 650; color: var(--color-ink) }
.check-q p { margin: 0; font-size: clamp(15px, 1vw, 18px); color: var(--color-ink-soft) }
.fingers { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px }
.finger-opt {
  display: grid; gap: 2px; place-items: center; min-width: 96px; padding: 10px 14px;
  background: var(--color-paper); border: 1px solid color-mix(in srgb, var(--color-line) 38%, transparent);
  text-align: center;
}
.finger-opt span { font-size: 13px; font-weight: 600; color: var(--color-ink-soft) }
.finger-opt strong { font-size: 1.35em; line-height: 1.15; color: var(--color-ink) }
.finger-opt small { font-size: 13px; color: var(--color-ink-soft) }

.sporen-panel {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0;
  padding: 18px 8px;
}
.track {
  display: grid; align-content: start; gap: 4px; padding: 2px 20px;
}
.track + .track { border-left: 1px solid color-mix(in srgb, var(--color-line) 42%, transparent) }
.track h3 { margin: 0; font-size: clamp(17px, 1.1vw, 20px); font-weight: 650; line-height: 1.25; color: var(--color-ink) }
.track-meta { font-size: max(14px, .72em); font-weight: 600; color: var(--color-workbook) }
.track-plus .track-meta { color: var(--color-digital) }
.track p { margin: 6px 0 0; font-size: clamp(15px, .98vw, 17px); line-height: 1.4; color: var(--color-ink-soft) }

.sheet {
  max-width: 960px; width: 100%; margin: 0 auto;
  padding: clamp(22px, 3vw, 40px) clamp(20px, 3.6vw, 48px) 22px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 65%, transparent);
  color: var(--color-ink);
  font-size: clamp(16px, 1.05vw, 19px); line-height: 1.5;
}
.sheet-h2 { display: flex; align-items: baseline; gap: 14px; margin: 0 0 14px; font-size: 1.22em; font-weight: 700; color: var(--color-ink) }
.sheet-p { margin: 10px 0 }
.fase-h3 { display: flex; align-items: baseline; gap: 12px; margin: 22px 0 8px; font-size: 1.05em; font-weight: 700; color: var(--color-ink) }
.fase-h3 span { color: var(--color-workbook); font-weight: 700 }

.eq-banner {
  display: grid; grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr); gap: 18px; align-items: center;
  margin: 14px 0 18px; padding: 14px 20px;
  background: var(--color-panel-muted); border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
}
.eq-left { display: flex; justify-content: center; font-size: 1.22em }
.eq-right { font-size: .95em; line-height: 1.45 }

.sheet-table { width: 100%; border-collapse: collapse; margin: 12px 0 16px }
.sheet-table th {
  padding: 9px 12px; background: var(--color-panel-muted);
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  font-weight: 700; text-align: left;
}
.sheet-table th:not(:first-child) { text-align: center }
.sheet-table td {
  padding: 12px; border-bottom: 1px solid color-mix(in srgb, var(--color-line) 42%, transparent);
  vertical-align: middle;
}
.c-mid { text-align: center }
.c-math { text-align: center; font-size: 1.08em }

.proof-line { display: flex; justify-content: center; max-width: 100%; margin: 10px 0 12px; padding: 6px 0; font-size: 1.08em; overflow-x: auto; overflow-y: hidden }

[data-step] { scroll-margin-top: calc(120px + var(--ll-toolbar-height, 0px)) }
.fill-cell { cursor: pointer; min-width: 8em; transition: background-color 140ms ease }
.fill-line {
  min-height: 3.4em; padding: 8px 12px; margin: 6px 0 14px;
  display: flex; flex-direction: column; justify-content: center; gap: 16px;
  cursor: pointer; border: 1px solid transparent; transition: background-color 140ms ease;
}
.dots { display: block; width: 100%; height: 1em; border-bottom: 2px dotted color-mix(in srgb, var(--color-line) 75%, transparent) }
.cell-dots { color: color-mix(in srgb, var(--color-line) 70%, transparent); letter-spacing: .06em }
.ans { color: var(--color-workbook); font-weight: 700 }
.filled { background: color-mix(in srgb, var(--color-workbook-soft) 55%, var(--color-panel)) }
.current {
  background: var(--color-workbook-soft);
  outline: 2px solid var(--color-workbook);
  outline-offset: -2px;
}

.next-cue { margin-top: 20px }
.sheet-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 22px; padding-top: 10px;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 35%, transparent);
  font-size: .85em; color: var(--color-ink-soft);
}

@media (max-width: 820px) {
  .brug-grid, .sporen-panel, .eq-banner { grid-template-columns: 1fr }
  .track { padding: 12px 12px }
  .track + .track { border-left: 0; border-top: 1px solid color-mix(in srgb, var(--color-line) 42%, transparent) }
  .brug-arrow { justify-self: center; transform: rotate(90deg) }
}
@media (max-width: 640px) {
  .blz5-bar { position: static }
  .brug-items { grid-template-columns: 1fr }
  .sheet-table th, .sheet-table td { padding: 8px 6px; font-size: 15px }
}
</style>
