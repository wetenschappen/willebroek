<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import MathText from '../guided/MathText.vue'
import KaartIcoon from './KaartIcoon.vue'
import ZuigerStand from './ZuigerStand.vue'

const WORK_SECONDS = 15 * 60
const TOTAL_STEPS = 7

const mode = ref('werk') // 'werk' | 'nakijk'
const step = ref(0)
const sheetRef = ref(null)

const secondsLeft = ref(WORK_SECONDS)
const timerRunning = ref(false)
let timerId = null

const step4Blank = String.raw`\(\dfrac{p_1 V_1}{T_1}=\dfrac{p_2 V_2}{T_2}\qquad\Longrightarrow\qquad p_2=\dfrac{p_1 V_1}{T_1}\times\dfrac{\cdots\cdots}{\cdots\cdots}\)`
const step4Done = String.raw`\(\dfrac{p_1 V_1}{T_1}=\dfrac{p_2 V_2}{T_2}\qquad\Longrightarrow\qquad p_2=\dfrac{p_1 V_1}{T_1}\times\dfrac{\textcolor{#237a4b}{T_2}}{\textcolor{#237a4b}{V_2}}\)`

const step5Blank = String.raw`\(p_2=\dfrac{\cdots\cdots\times\cdots\cdots}{\cdots\cdots\cdots}\times\dfrac{\cdots\cdots}{\cdots\cdots}=\cdots\cdots\times\cdots\cdots=\cdots\cdots\ \mathrm{kPa}\)`
const step5Done = String.raw`\(p_2=\dfrac{\textcolor{#237a4b}{100}\times\textcolor{#237a4b}{12}}{\textcolor{#237a4b}{300}}\times\dfrac{\textcolor{#237a4b}{360}}{\textcolor{#237a4b}{8}}=\textcolor{#237a4b}{4}\times\textcolor{#237a4b}{45}=\textcolor{#237a4b}{180}\ \mathrm{kPa}\)`

const step7Blank = String.raw`\(\text{Vóór: }\dfrac{100\times 12}{300}=\cdots\cdots\qquad\qquad\text{Na: }\dfrac{\cdots\cdots\times 8}{360}=\cdots\cdots\)`
const step7Done = String.raw`\(\text{Vóór: }\dfrac{100\times 12}{300}=\textcolor{#237a4b}{4}\qquad\qquad\text{Na: }\dfrac{\textcolor{#237a4b}{180}\times 8}{360}=\textcolor{#237a4b}{4}\)`

function formatTime(s) {
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${String(m).padStart(2, '0')}:${String(r).padStart(2, '0')}`
}

function stopTimer() {
  if (timerId !== null) { clearInterval(timerId); timerId = null }
  timerRunning.value = false
}

function startTimer() {
  if (secondsLeft.value <= 0) secondsLeft.value = WORK_SECONDS
  stopTimer()
  timerRunning.value = true
  timerId = setInterval(() => {
    if (secondsLeft.value > 1) {
      secondsLeft.value -= 1
    } else {
      secondsLeft.value = 0
      stopTimer()
    }
  }, 1000)
}

function toggleTimer() {
  if (timerRunning.value) stopTimer()
  else startTimer()
}

function resetTimer() {
  stopTimer()
  secondsLeft.value = WORK_SECONDS
}

function stepNext() { if (step.value < TOTAL_STEPS) step.value += 1 }
function stepPrev() { if (step.value > 0) step.value -= 1 }
function jumpTo(n) { step.value = step.value === n ? n - 1 : n }
function resetSteps() { step.value = 0 }
function showAll() { step.value = TOTAL_STEPS }

function onKeydown(e) {
  if (mode.value !== 'nakijk') return
  if (document.querySelector('dialog[open]')) return
  const tag = document.activeElement?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
  if (e.key === 'ArrowRight') { e.preventDefault(); stepNext() }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); stepPrev() }
}

watch(step, async (n) => {
  if (mode.value !== 'nakijk' || !n) return
  await nextTick()
  const el = sheetRef.value?.querySelector(`[data-step="${n}"]`)
  el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  stopTimer()
})
</script>

<template>
  <div class="blz6-wrap">
    <div class="blz6-bar">
      <div class="blz6-tabs" role="group" aria-label="Werkstand en nakijkstand bladzijde 6">
        <button
          class="btn"
          :class="mode === 'werk' ? 'btn-primary' : 'btn-ghost'"
          type="button"
          :aria-pressed="mode === 'werk'"
          @click="mode = 'werk'"
        >
          1. Werkbord
        </button>
        <button
          class="btn"
          :class="mode === 'nakijk' ? 'btn-primary' : 'btn-ghost'"
          type="button"
          :aria-pressed="mode === 'nakijk'"
          @click="mode = 'nakijk'"
        >
          2. Nakijken blz. 6
        </button>
      </div>

      <div v-if="mode === 'nakijk'" class="blz6-stepper" aria-label="Invulstappen bladzijde 6">
        <button class="btn btn-ghost" type="button" :disabled="step === 0" @click="stepPrev">← Vorige</button>
        <span class="blz6-count" aria-live="polite">Stap {{ step }} / {{ TOTAL_STEPS }}</span>
        <button class="btn btn-ghost" type="button" :disabled="step === TOTAL_STEPS" @click="stepNext">Volgende →</button>
        <button v-if="step > 0" class="btn btn-ghost" type="button" @click="resetSteps">Wis</button>
        <button v-else class="btn btn-ghost" type="button" @click="showAll">Alles</button>
      </div>
      <span v-else class="blz6-mode-note">Vouw de antwoordstrook weg. Open ze pas na stap 7.</span>

      <span v-if="mode === 'nakijk'" class="blz6-hint">
        Pijltjestoetsen ← / → vullen blz. 6 punt per punt in (stap 1 t/m 7)
      </span>
    </div>

    <!-- Stand 1: Rustig werkbord zonder uitkomsten -->
    <template v-if="mode === 'werk'">
      <section class="work-states" aria-label="Toestand vóór en na de verandering">
        <figure class="state-card">
          <ZuigerStand :na="false" />
          <figcaption>
            <span class="state-tag">1 · Vóór</span>
            <p class="state-main">12 L · 300 K</p>
            <p class="state-sub">Druk: 100 kPa</p>
          </figcaption>
        </figure>
        <span class="state-arrow" aria-hidden="true">→</span>
        <figure class="state-card state-card-after">
          <ZuigerStand :na="true" />
          <figcaption>
            <span class="state-tag">2 · Na</span>
            <p class="state-main">8 L · 360 K</p>
            <p class="state-sub">Druk: <strong>? kPa</strong></p>
          </figcaption>
        </figure>
      </section>

      <section class="work-timer" :class="{ 'is-running': timerRunning }" aria-label="Werktimer zelfstandig werk">
        <div class="timer-top">
          <div class="timer-readout">
            <span class="timer-digits" :aria-label="`Resterende werktijd ${formatTime(secondsLeft)}`">{{ formatTime(secondsLeft) }}</span>
            <span class="timer-status">
              {{ timerRunning ? 'Zelfstandig werken loopt' : secondsLeft === 0 ? 'Werktijd voorbij. We kijken na.' : 'Zelfstandig werken op blz. 6 (15 min)' }}
            </span>
          </div>
          <div class="timer-controls">
            <button class="btn btn-primary" type="button" @click="toggleTimer">
              {{ timerRunning ? 'Pauzeer' : secondsLeft === 0 ? 'Opnieuw (15 min)' : secondsLeft < WORK_SECONDS ? 'Hervat' : 'Start werktijd' }}
            </button>
            <button v-if="timerRunning || secondsLeft < WORK_SECONDS" class="btn btn-ghost" type="button" @click="resetTimer">
              Reset
            </button>
          </div>
        </div>
        <div class="timer-rail" aria-hidden="true">
          <div class="timer-fill" :style="{ width: `${(secondsLeft / WORK_SECONDS) * 100}%` }"></div>
        </div>
      </section>

      <section class="work-guides" aria-label="Werkafspraken en vervolgtaak">
        <article class="guide-card guide-paper">
          <h2><KaartIcoon name="rekenmachine" /> Vast bij stap 4 of 5?</h2>
          <p>
            Volg eerst de <strong>4 B’s</strong>: Brein → Bundel → Buur → Leerkracht. Bedek de kolom ‘na’ en reken met
            de drie waarden van ‘vóór’ eerst alleen de linkerbreuk uit.
          </p>
        </article>
        <article class="guide-card guide-plus">
          <h2><KaartIcoon name="controle" /> Klaar met blz. 6?</h2>
          <p>
            Heb je je einddruk gecontroleerd? Neem vooraan de werkbon <strong>Controleer de einddruk</strong>.
            Je kijkt een berekening na en bepaalt hoeveel je het gas maximaal mag opwarmen.
          </p>
        </article>
      </section>
    </template>

    <!-- Stand 2: Exacte bordkopie van Bundel 6 · blz. 6 -->
    <article v-else ref="sheetRef" class="sheet" aria-label="Werkblad bladzijde 6: welke druk heeft het gas na de verandering?">
      <h2 class="sheet-h2"><span>6</span> Welke druk heeft het gas na de verandering?</h2>

      <p class="sheet-p">
        Een afgesloten cilinder bevat ideaal gas bij <strong>100 kPa</strong>, <strong>12 L</strong> en
        <strong>300 K</strong>. Het gas wordt samengedrukt tot <strong>8 L</strong> en opgewarmd tot
        <strong>360 K</strong>. Je zoekt de absolute einddruk.
      </p>

      <!-- Punt 1 -->
      <section
        class="step-block"
        :class="{ filled: step >= 1, current: step === 1 }"
        data-step="1"
        role="button"
        tabindex="0"
        @click="jumpTo(1)"
        @keydown.enter.prevent="jumpTo(1)"
      >
        <h3 class="fase-h3"><span>1</span> Voorspel <small>Omcirkel je keuzes.</small></h3>
        <p class="sheet-p">
          Het volume wordt
          <span class="choice-word" :class="{ circled: step >= 1 }">kleiner</span> / groter, de temperatuur wordt lager /
          <span class="choice-word" :class="{ circled: step >= 1 }">hoger</span>.<br />
          Ik verwacht een lagere /
          <span class="choice-word" :class="{ circled: step >= 1 }">hogere</span> druk.
        </p>
      </section>

      <!-- Punt 2 -->
      <section
        class="step-block"
        :class="{ filled: step >= 2, current: step === 2 }"
        data-step="2"
        role="button"
        tabindex="0"
        @click="jumpTo(2)"
        @keydown.enter.prevent="jumpTo(2)"
      >
        <h3 class="fase-h3"><span>2</span> Gegeven en gevraagd <small>Vul de tabel in.</small></h3>
        <div class="table-scroll">
          <table class="sheet-table">
            <thead>
              <tr>
                <th>Grootheid</th>
                <th>Vóór (1)</th>
                <th>Na (2)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Absolute druk</td>
                <td><em>p</em><sub>1</sub> = <span class="blank-inline"><span v-if="step >= 2" class="ans">100</span><span v-else class="cell-dots">…………</span></span> kPa</td>
                <td><em>p</em><sub>2</sub> = <strong>?</strong> kPa</td>
              </tr>
              <tr>
                <td>Volume</td>
                <td><em>V</em><sub>1</sub> = <span class="blank-inline"><span v-if="step >= 2" class="ans">12</span><span v-else class="cell-dots">…………</span></span> L</td>
                <td><em>V</em><sub>2</sub> = <span class="blank-inline"><span v-if="step >= 2" class="ans">8</span><span v-else class="cell-dots">…………</span></span> L</td>
              </tr>
              <tr>
                <td>Temperatuur</td>
                <td><em>T</em><sub>1</sub> = <span class="blank-inline"><span v-if="step >= 2" class="ans">300</span><span v-else class="cell-dots">…………</span></span> K</td>
                <td><em>T</em><sub>2</sub> = <span class="blank-inline"><span v-if="step >= 2" class="ans">360</span><span v-else class="cell-dots">…………</span></span> K</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="sheet-p">
          Gevraagd: de absolute druk <em>na</em> de verandering. Symbool:
          <span class="blank-sym"><span v-if="step >= 2" class="ans"><em>p</em><sub>2</sub></span><span v-else class="cell-dots">………</span></span>.
        </p>
      </section>

      <!-- Punt 3 -->
      <section
        class="step-block"
        :class="{ filled: step >= 3, current: step === 3 }"
        data-step="3"
        role="button"
        tabindex="0"
        @click="jumpTo(3)"
        @keydown.enter.prevent="jumpTo(3)"
      >
        <h3 class="fase-h3"><span>3</span> Kies wat je kunt doorstrepen</h3>
        <p class="sheet-p check-row">
          <span>Welke grootheid blijft gelijk?</span>
          <span class="chk-list">
            <span><span class="chk-box" aria-hidden="true"></span> druk</span>
            <span><span class="chk-box" aria-hidden="true"></span> volume</span>
            <span><span class="chk-box" aria-hidden="true"></span> temperatuur</span>
            <span :class="{ ans: step >= 3 }">
              <span class="chk-box" :class="{ checked: step >= 3 }" aria-hidden="true">{{ step >= 3 ? '×' : '' }}</span>
              geen
            </span>
          </span>
        </p>
      </section>

      <!-- Punt 4 -->
      <section
        class="step-block"
        :class="{ filled: step >= 4, current: step === 4 }"
        data-step="4"
        role="button"
        tabindex="0"
        @click="jumpTo(4)"
        @keydown.enter.prevent="jumpTo(4)"
      >
        <h3 class="fase-h3"><span class="fase-num">4</span> <span>Oplossing: zet <em>p</em><sub>2</sub> alleen</span></h3>
        <p class="sheet-p">Vermenigvuldig beide kanten met <em>T</em><sub>2</sub> en deel door <em>V</em><sub>2</sub>. Vul de letters aan.</p>
        <div class="eq-line"><MathText :text="step >= 4 ? step4Done : step4Blank" /></div>
      </section>

      <!-- Punt 5 -->
      <section
        class="step-block"
        :class="{ filled: step >= 5, current: step === 5 }"
        data-step="5"
        role="button"
        tabindex="0"
        @click="jumpTo(5)"
        @keydown.enter.prevent="jumpTo(5)"
      >
        <h3 class="fase-h3"><span>5</span> Reken uit <small>Neem de getallen over uit de tabel.</small></h3>
        <div class="eq-line"><MathText :text="step >= 5 ? step5Done : step5Blank" /></div>
      </section>

      <!-- Punt 6 -->
      <section
        class="step-block"
        :class="{ filled: step >= 6, current: step === 6 }"
        data-step="6"
        role="button"
        tabindex="0"
        @click="jumpTo(6)"
        @keydown.enter.prevent="jumpTo(6)"
      >
        <h3 class="fase-h3"><span>6</span> Antwoordzin</h3>
        <p class="sheet-p">
          De absolute druk na het samendrukken en opwarmen is
          <span class="blank-wide"><span v-if="step >= 6" class="ans">180 kPa</span><span v-else class="cell-dots">……………………</span></span>
          (met eenheid).
        </p>
      </section>

      <!-- Punt 7 -->
      <section
        class="step-block"
        :class="{ filled: step >= 7, current: step === 7 }"
        data-step="7"
        role="button"
        tabindex="0"
        @click="jumpTo(7)"
        @keydown.enter.prevent="jumpTo(7)"
      >
        <h3 class="fase-h3"><span>7</span> Controleer <small>Vul je einddruk in en vergelijk.</small></h3>
        <div class="eq-line"><MathText :text="step >= 7 ? step7Done : step7Blank" /></div>
        <p class="sheet-p check-final">
          <span>Zelfde uitkomst? <span class="choice-word" :class="{ circled: step >= 7 }">ja</span> / nee</span>
          <span>Past je druk bij je voorspelling? <span class="choice-word" :class="{ circled: step >= 7 }">ja</span> / nee</span>
        </p>
      </section>

      <footer class="sheet-foot">
        <span>Bundel 6 · Gasproeven</span>
        <span>6</span>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.blz6-wrap { display: grid; gap: 18px; min-width: 0 }
.blz6-wrap > * { min-width: 0 }
.table-scroll { max-width: 100%; overflow-x: auto }

.blz6-bar {
  position: sticky; top: var(--ll-toolbar-height, 0px); z-index: 5;
  display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px 16px;
  padding: 12px 16px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-workbook);
}
.blz6-tabs, .blz6-stepper { display: flex; flex-wrap: wrap; align-items: center; gap: 8px }
.blz6-count {
  min-width: 6.2em; text-align: center;
  font-size: max(15px, .72em); font-weight: 600; font-variant-numeric: tabular-nums;
  color: var(--color-workbook);
}
.blz6-mode-note, .blz6-hint { font-size: max(14px, .65em); color: var(--color-ink-soft) }
.blz6-hint { flex-basis: 100% }
.blz6-bar .btn, .work-timer .btn { border-radius: 0; min-height: 40px; padding: 6px 14px; font-size: 16px; box-shadow: none }
.blz6-bar .btn-ghost, .work-timer .btn-ghost { background: var(--color-panel); color: var(--color-ink); border: 1px solid var(--color-line) }
.blz6-bar .btn:disabled { opacity: .45; cursor: not-allowed }

/* Stand 1: Werkbord */
.work-states {
  display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 16px; align-items: center;
}
.state-card {
  display: flex; align-items: center; gap: 22px; margin: 0;
  padding: 20px 24px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-digital);
}
.state-card-after { border-left-color: var(--color-workbook) }
.state-card :deep(svg) { width: 88px; height: 94px; flex-shrink: 0; color: var(--color-ink) }
.state-card figcaption { display: grid; gap: 4px }
.state-tag { font-size: max(15px, .75em); font-weight: 650; color: var(--color-ink-soft) }
.state-main { margin: 0; font-size: clamp(22px, 1.8vw, 28px); font-weight: 650; line-height: 1.2; color: var(--color-ink) }
.state-sub { margin: 0; font-size: clamp(17px, 1.15vw, 21px); color: var(--color-ink-soft) }
.state-sub strong { color: var(--color-workbook) }
.state-arrow { font-size: 1.8em; font-weight: 600; color: var(--color-ink-soft) }

.work-timer {
  display: grid; gap: 12px; padding: 16px 20px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-workbook);
}
.timer-top { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 12px 18px }
.timer-readout { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px 18px }
.timer-digits {
  font-size: clamp(32px, 2.8vw, 44px); font-weight: 700; line-height: 1;
  font-variant-numeric: tabular-nums; color: var(--color-ink);
}
.timer-status { font-size: clamp(16px, 1.05vw, 19px); color: var(--color-ink-soft) }
.timer-controls { display: flex; flex-wrap: wrap; gap: 8px }
.timer-rail { height: 6px; background: var(--color-paper); border: 1px solid color-mix(in srgb, var(--color-line) 35%, transparent); overflow: hidden }
.timer-fill { height: 100%; background: var(--color-workbook) }
.work-timer.is-running .timer-fill { transition: width .95s linear }

.work-guides { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px }
.guide-card {
  display: grid; align-content: start; gap: 10px;
  padding: 20px 22px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  border-left: 5px solid var(--color-workbook);
}
.guide-plus { border-left-color: var(--color-digital) }
.guide-card h2 {
  display: flex; align-items: center; gap: 12px; margin: 0;
  font-size: clamp(18px, 1.25vw, 22px); font-weight: 650; color: var(--color-ink);
}
.guide-card h2 :deep(svg) { width: 1.35em; height: 1.35em; flex-shrink: 0; color: var(--color-workbook) }
.guide-plus h2 :deep(svg) { color: var(--color-digital) }
.guide-card p { margin: 0; font-size: clamp(16px, 1.05vw, 19px); line-height: 1.48; color: var(--color-ink-soft) }
.guide-card p strong { color: var(--color-ink) }

/* Stand 2: Exacte bordkopie blz. 6 */
.sheet {
  max-width: 960px; width: 100%; margin: 0 auto;
  padding: clamp(22px, 3vw, 40px) clamp(20px, 3.6vw, 48px) 22px;
  background: var(--color-panel);
  border: 1px solid color-mix(in srgb, var(--color-line) 65%, transparent);
  color: var(--color-ink);
  font-size: clamp(16px, 1.05vw, 19px); line-height: 1.5;
}
.sheet-h2 { display: flex; align-items: baseline; gap: 14px; margin: 0 0 14px; font-size: 1.22em; font-weight: 700; color: var(--color-ink) }
.sheet-p { margin: 8px 0 }
.fase-h3 { display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px; margin: 0 0 8px; font-size: 1.04em; font-weight: 700; color: var(--color-ink) }
.fase-h3 > span:first-child { color: var(--color-workbook); font-weight: 700 }
.fase-h3 small { font-size: .95em; font-weight: 400; color: var(--color-ink-soft) }

.step-block {
  margin: 14px -12px; padding: 10px 12px;
  cursor: pointer; border: 1px solid transparent;
  scroll-margin-top: calc(120px + var(--ll-toolbar-height, 0px));
  transition: background-color 140ms ease;
}
.step-block:hover { background: color-mix(in srgb, var(--color-paper) 75%, var(--color-panel)) }
.step-block.filled { background: color-mix(in srgb, var(--color-workbook-soft) 42%, var(--color-panel)) }
.step-block.current {
  background: color-mix(in srgb, var(--color-workbook-soft) 72%, var(--color-panel));
  outline: 2px solid var(--color-workbook);
  outline-offset: -2px;
}

.choice-word { display: inline-block; padding: 0 4px }
.choice-word.circled {
  color: var(--color-workbook); font-weight: 700;
  border: 2px solid var(--color-workbook); border-radius: 999px;
  padding: 0 8px; background: var(--color-panel);
}

.sheet-table { width: 100%; border-collapse: collapse; margin: 8px 0 10px }
.sheet-table th {
  padding: 9px 12px; background: var(--color-panel-muted);
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 55%, transparent);
  font-weight: 700; text-align: left;
}
.sheet-table td {
  padding: 10px 12px;
  border-bottom: 1px solid color-mix(in srgb, var(--color-line) 42%, transparent);
  white-space: nowrap;
}
.blank-inline { display: inline-block; min-width: 3.4em; text-align: center }
.blank-sym { display: inline-block; min-width: 2.1em; text-align: center }
.blank-wide { display: inline-block; min-width: 6.2em; text-align: center }
.cell-dots { color: color-mix(in srgb, var(--color-line) 70%, transparent); letter-spacing: .04em }
.ans { color: var(--color-workbook); font-weight: 700 }

.check-row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px 18px }
.chk-list { display: flex; flex-wrap: wrap; gap: 10px 18px }
.chk-list > span { display: inline-flex; align-items: center; gap: 7px }
.chk-box {
  display: inline-grid; place-items: center; width: 1.05em; height: 1.05em;
  border: 1.5px solid var(--color-ink); font-size: .92em; line-height: 1; font-weight: 700;
}
.chk-box.checked { border-color: var(--color-workbook); color: var(--color-workbook); background: var(--color-panel) }

.eq-line {
  display: flex; justify-content: center; max-width: 100%;
  margin: 10px 0 6px; padding: 6px 0;
  font-size: 1.08em; overflow-x: auto; overflow-y: hidden;
}
.check-final { display: flex; flex-wrap: wrap; gap: 10px 28px; margin-top: 12px }

.sheet-foot {
  display: flex; justify-content: space-between; align-items: center;
  margin-top: 22px; padding-top: 10px;
  border-top: 1px solid color-mix(in srgb, var(--color-line) 35%, transparent);
  font-size: .85em; color: var(--color-ink-soft);
}

@media (max-width: 820px) {
  .work-states, .work-guides { grid-template-columns: 1fr }
  .state-arrow { justify-self: center; transform: rotate(90deg) }
}
@media (max-width: 640px) {
  .blz6-bar { position: static }
  .step-block { margin: 12px -6px; padding: 8px 6px }
  .sheet-table th, .sheet-table td { padding: 8px 6px; font-size: 15px }
}
</style>
