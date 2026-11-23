<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const TOTAL_STEPS = 10
const step = ref(0)
const sheetRef = ref(null)
const simHref = 'https://wetenschappen.github.io/willebroek/gassen/simulatie/'

const particles = [
  [.15, .18, 25], [.39, .20, 145], [.68, .16, -24], [.85, .27, 75],
  [.19, .50, -65], [.48, .46, 177], [.72, .49, 45], [.87, .62, -38],
  [.15, .77, 98], [.37, .80, -22], [.59, .72, 220], [.79, .84, 115],
]

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
  <div class="blz4-wrap">
    <div class="blz4-bar">
      <a class="btn btn-primary blz4-sim" :href="simHref" target="_blank" rel="noopener">
        Open zuigersimulatie (Charles) ↗
      </a>
      <div class="blz4-stepper" aria-label="Invulstappen bladzijde 4">
        <button class="btn btn-ghost" type="button" :disabled="step === 0" @click="stepPrev">← Vorige</button>
        <span class="blz4-count" aria-live="polite">Stap {{ step }} / {{ TOTAL_STEPS }}</span>
        <button class="btn btn-ghost" type="button" :disabled="step === TOTAL_STEPS" @click="stepNext">Volgende →</button>
        <button v-if="step > 0" class="btn btn-ghost" type="button" @click="resetSteps">Wis</button>
        <button v-else class="btn btn-ghost" type="button" @click="showAll">Alles</button>
      </div>
      <span class="blz4-hint">Pijltjestoetsen ← / → vullen blz. 4 stap voor stap in</span>
    </div>

    <article ref="sheetRef" class="sheet" aria-label="Werkblad bladzijde 4 — Opwarmen met een vrije zuiger: Charles">
      <h2 class="sheet-h2"><span>4</span> Opwarmen met een vrije zuiger: Charles</h2>

      <p class="sheet-p">
        <strong>Zelfde beginstand, ander toestel.</strong> Er kan nog steeds geen gas ontsnappen. De zuiger beweegt
        zonder wrijving. De luchtdruk erboven en de belasting op de zuiger blijven gelijk. Daardoor heeft het gas in
        elke evenwichtsstand dezelfde druk: 166,2 kPa.
      </p>

      <p class="sheet-p">
        <strong>A. Voorspel alleen.</strong> Van 300 K naar 600 K: welke kant zal de zuiger op gaan? Wat betekent dat
        voor het gasvolume?
      </p>
      <div
        class="fill-line"
        :class="{ filled: step >= 1, current: step === 1 }"
        data-step="1"
        role="button"
        tabindex="0"
        @click="jumpTo(1)"
        @keydown.enter.prevent="jumpTo(1)"
      >
        <span v-if="step >= 1" class="ans">De zuiger gaat omhoog; het gasvolume neemt toe.</span>
        <span v-else class="dots" aria-hidden="true"></span>
      </div>

      <figure class="sheet-fig" aria-label="Schets: cilinder met vrije zuiger bij 300 K (15 L) opgewarmd tot 600 K">
        <svg viewBox="0 0 430 148" class="warm-svg" aria-hidden="true" focusable="false">
          <!-- Links: Begin 300 K -->
          <text x="82" y="16" text-anchor="middle" class="ws-title">Begin: 300 K</text>
          <rect x="24" y="80" width="116" height="46" fill="#edf4f8" />
          <path d="M24 24 V126 H140 V24" fill="none" stroke="#17252b" stroke-width="2.2" />
          <rect x="25.5" y="75" width="113" height="5" fill="#4b5563" />
          <rect x="80" y="59" width="4" height="16" fill="#17252b" />
          <g v-for="([u, v, a], i) in particles" :key="'l' + i" :transform="`translate(${30 + 104 * u} ${122 - 38 * v}) rotate(${a})`">
            <line x1="-8" y1="1.6" x2="-3.5" y2="1.6" stroke="#17252b" stroke-width="1.1" />
            <line x1="-8" y1="-1.6" x2="-3.5" y2="-1.6" stroke="#17252b" stroke-width="1.1" />
            <circle cx="0" cy="0" r="2.3" fill="#17252b" />
          </g>
          <text x="82" y="143" text-anchor="middle" class="ws-cap">15 L</text>

          <!-- Pijl midden -->
          <text x="200" y="70" text-anchor="middle" class="ws-cap">warmer</text>
          <path d="M168 78 H230 M224 73 L231 78 L224 83" fill="none" stroke="#17252b" stroke-width="1.8" />

          <!-- Rechts: Eind 600 K -->
          <text x="318" y="16" text-anchor="middle" class="ws-title">Eind: 600 K</text>
          <rect x="260" y="34" width="116" height="92" fill="#edf4f8" />
          <path d="M260 24 V126 H376 V24" fill="none" stroke="#17252b" stroke-width="2.2" />
          <rect x="261.5" y="29" width="113" height="5" fill="#4b5563" />
          <rect x="316" y="18" width="4" height="11" fill="#17252b" />
          <g v-for="([u, v, a], i) in particles" :key="'r' + i" :transform="`translate(${266 + 104 * u} ${121 - 82 * v}) rotate(${a})`">
            <line x1="-11" y1="1.6" x2="-3.5" y2="1.6" stroke="#17252b" stroke-width="1.1" />
            <line x1="-11" y1="-1.6" x2="-3.5" y2="-1.6" stroke="#17252b" stroke-width="1.1" />
            <circle cx="0" cy="0" r="2.3" fill="#17252b" />
          </g>
          <text x="318" y="143" text-anchor="middle" class="ws-cap">Lees het eindvolume af op het bord.</text>
        </svg>
      </figure>

      <p class="sheet-p">
        <strong>B. Vergelijk.</strong> Noteer de volumes en bepaal de factor. Deel daarna elk volume door zijn
        temperatuur in kelvin.
      </p>

      <table class="sheet-table sheet-table-compact">
        <thead>
          <tr>
            <th>Stand</th>
            <th><em>T</em> (K)</th>
            <th><em>V</em> (L)</th>
            <th><em>V</em> : <em>T</em> (L/K)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Begin</td>
            <td>300</td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 2, current: step === 2 }"
              data-step="2"
              @click="jumpTo(2)"
            >
              <span v-if="step >= 2" class="ans">15,0</span>
              <span v-else class="cell-dots">…………</span>
            </td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 5, current: step === 5 }"
              data-step="5"
              @click="jumpTo(5)"
            >
              <span v-if="step >= 5" class="ans">0,050</span>
              <span v-else class="cell-dots">…………</span>
            </td>
          </tr>
          <tr>
            <td>Eind</td>
            <td>600</td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 3, current: step === 3 }"
              data-step="3"
              @click="jumpTo(3)"
            >
              <span v-if="step >= 3" class="ans">30,0</span>
              <span v-else class="cell-dots">…………</span>
            </td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 6, current: step === 6 }"
              data-step="6"
              @click="jumpTo(6)"
            >
              <span v-if="step >= 6" class="ans">0,050</span>
              <span v-else class="cell-dots">…………</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="sheet-p">
        Het volume wordt
        <span
          class="fill-inline"
          :class="{ filled: step >= 4, current: step === 4 }"
          data-step="4"
          role="button"
          tabindex="0"
          @click="jumpTo(4)"
          @keydown.enter.prevent="jumpTo(4)"
        >
          <span v-if="step >= 4" class="ans">twee</span>
          <span v-else class="cell-dots">…………</span>
        </span>
        keer zo groot.
      </p>

      <div class="formula-box">
        <div class="formula-head">Eerst in woorden, dan in symbolen</div>
        <div class="formula-body">
          Bij <strong>constante druk</strong> en evenveel gas: verdubbelt de temperatuur in kelvin, dan verdubbelt het
          volume. Het gas krijgt meer ruimte terwijl het warmer wordt.<br />
          Delen geeft in beide standen hetzelfde getal: <em>V</em>/<em>T</em> blijft gelijk.
        </div>
      </div>

      <p class="sheet-p">
        <strong>C. Drie situaties naast elkaar.</strong> Er is telkens evenveel gas. Vul de laatste kolom in zonder
        terug te bladeren: kies uit <em>pV</em>, <em>p</em>/<em>T</em> en <em>V</em>/<em>T</em>.
      </p>

      <table class="sheet-table">
        <thead>
          <tr>
            <th>Wat doe je?</th>
            <th>Wat blijft gelijk?</th>
            <th>Welk product of quotiënt blijft gelijk?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Samendrukken</td>
            <td>temperatuur <em>T</em></td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 7, current: step === 7 }"
              data-step="7"
              @click="jumpTo(7)"
            >
              <span v-if="step >= 7" class="ans"><em>pV</em></span>
              <span v-else class="cell-dots">……………</span>
            </td>
          </tr>
          <tr>
            <td>Opwarmen, vaste zuiger</td>
            <td>volume <em>V</em></td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 8, current: step === 8 }"
              data-step="8"
              @click="jumpTo(8)"
            >
              <span v-if="step >= 8" class="ans"><em>p</em>/<em>T</em></span>
              <span v-else class="cell-dots">……………</span>
            </td>
          </tr>
          <tr>
            <td>Opwarmen, vrije zuiger</td>
            <td>druk <em>p</em></td>
            <td
              class="fill-cell"
              :class="{ filled: step >= 9, current: step === 9 }"
              data-step="9"
              @click="jumpTo(9)"
            >
              <span v-if="step >= 9" class="ans"><em>V</em>/<em>T</em></span>
              <span v-else class="cell-dots">……………</span>
            </td>
          </tr>
        </tbody>
      </table>

      <p class="sheet-p">
        <strong>Slotvraag – alleen.</strong> “Als een gas warmer wordt, stijgt de druk altijd.” Klopt dat? Gebruik de
        twee zuigers om je antwoord te verklaren.
      </p>
      <div
        class="fill-line fill-line-multi"
        :class="{ filled: step >= 10, current: step === 10 }"
        data-step="10"
        role="button"
        tabindex="0"
        @click="jumpTo(10)"
        @keydown.enter.prevent="jumpTo(10)"
      >
        <span v-if="step >= 10" class="ans">
          Nee. Bij de vaste zuiger stijgt de druk. Bij de vrije zuiger in deze opstelling stijgt het volume en blijft de
          druk gelijk. In beide gevallen is de hoeveelheid gas gelijk.
        </span>
        <template v-else>
          <span class="dots" aria-hidden="true"></span>
          <span class="dots" aria-hidden="true"></span>
        </template>
      </div>

      <footer class="sheet-foot">
        <span>Bundel 6 · Gasproeven</span>
        <span>4</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.blz4-wrap { display: grid; gap: 16px }
.blz4-bar {
  position: sticky; top: 0; z-index: 5;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px;
  padding: 12px 16px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-workbook);
}
.blz4-sim { text-decoration: none; white-space: nowrap }
.blz4-stepper { display: flex; flex-wrap: wrap; align-items: center; gap: 8px }
.blz4-count {
  min-width: 6.8em; text-align: center;
  font-size: max(15px, .72em); font-weight: 600; font-variant-numeric: tabular-nums;
  color: var(--color-workbook);
}
.blz4-hint { font-size: max(14px, .65em); color: var(--color-ink-soft); flex-basis: 100% }
.blz4-bar .btn { border-radius: 0; min-height: 40px; padding: 6px 12px; font-size: 16px; box-shadow: none }
.blz4-bar .btn-ghost { background: var(--color-panel); color: var(--color-ink); border: 1px solid var(--color-line) }
.blz4-bar .btn:disabled { opacity: .45; cursor: not-allowed }

.sheet {
  max-width: 960px; width: 100%; margin: 0 auto;
  padding: clamp(22px, 3vw, 40px) clamp(20px, 3.6vw, 48px) 22px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 65%, transparent);
  color: var(--color-ink);
  font-size: clamp(16px, 1.05vw, 19px); line-height: 1.5;
}
.sheet-h2 { display: flex; align-items: baseline; gap: 14px; margin: 0 0 14px; font-size: 1.22em; font-weight: 700; color: var(--color-ink) }
.sheet-p { margin: 12px 0 8px }
.sheet-p strong { font-weight: 700; color: var(--color-ink) }

.sheet-fig { margin: 14px 0 16px; display: grid; place-items: center }
.warm-svg { width: 100%; max-width: 460px; height: auto; display: block }
.ws-title { font: 700 12px/1 'IBM Plex Sans', sans-serif; fill: #17252b }
.ws-cap { font: 500 11.5px/1 'IBM Plex Sans', sans-serif; fill: #17252b }

.sheet-table { width: 100%; border-collapse: collapse; margin: 10px 0 14px; font-variant-numeric: tabular-nums }
.sheet-table-compact { max-width: 560px; margin-inline: auto }
.sheet-table th, .sheet-table td { border: 1px solid var(--color-line); padding: 8px 12px; text-align: left }
.sheet-table th { font-weight: 600; background: var(--color-paper); text-align: center }
.sheet-table-compact td:not(:first-child) { text-align: center }
.sheet-table td:last-child { text-align: center }

[data-step] { scroll-margin-top: 120px }
.fill-line {
  min-height: 2.1em; padding: 6px 10px; margin: 4px 0 10px;
  display: flex; flex-direction: column; justify-content: center; gap: 14px;
  cursor: pointer; border: 1px solid transparent; transition: background-color 140ms ease, border-color 140ms ease;
}
.fill-line-multi { min-height: 3.4em }
.dots { display: block; width: 100%; height: 1em; border-bottom: 2px dotted color-mix(in srgb, var(--color-line) 75%, transparent) }
.fill-cell { cursor: pointer; min-width: 6.5em; transition: background-color 140ms ease }
.fill-inline {
  display: inline-block; min-width: 5.5em; padding: 1px 8px; margin: 0 3px; text-align: center;
  cursor: pointer; border: 1px solid transparent; vertical-align: baseline;
}
.cell-dots { color: color-mix(in srgb, var(--color-line) 70%, transparent); letter-spacing: .06em }
.ans { color: var(--color-workbook); font-weight: 700 }
.filled { background: color-mix(in srgb, var(--color-workbook-soft) 55%, var(--color-panel)) }
.current {
  background: var(--color-workbook-soft);
  outline: 2px solid var(--color-workbook);
  outline-offset: -2px;
}

.formula-box { margin: 14px 0 16px; border: 1px solid var(--color-workbook) }
.formula-head { padding: 6px 12px; background: var(--color-workbook); color: var(--color-panel); font-weight: 700; font-size: .95em }
.formula-body { padding: 10px 14px; background: var(--color-workbook-soft); color: var(--color-ink) }

.sheet-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 22px; padding-top: 10px;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 35%, transparent);
  font-size: .85em; color: var(--color-ink-soft);
}
@media (max-width: 640px) {
  .blz4-bar { position: static }
  .sheet-table th, .sheet-table td { padding: 6px 8px; font-size: 15px }
}
</style>
