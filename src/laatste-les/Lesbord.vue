<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { PhTarget, PhCornersOut, PhSquaresFour, PhArrowRight, PhArrowLeft, PhSlidersHorizontal } from '@phosphor-icons/vue'
import { enterBrowserFullscreen, exitBrowserFullscreen } from '../composables/useBrowserFullscreen.js'
import MathText from '../guided/MathText.vue'
import KaartIcoon from './KaartIcoon.vue'
import VoorkennisSchets from './VoorkennisSchets.vue'
import ExitSchets from './ExitSchets.vue'
import Blz4Werkblad from './Blz4Werkblad.vue'
import Blz5Werkblad from './Blz5Werkblad.vue'
import Blz6Werkblad from './Blz6Werkblad.vue'
import { defaultNames, entryQuestions, exitQuestions, goals, phases, screens } from './inhoud.js'

const THINK_SECONDS = 40
const ventielPreview = String.raw`Verandert de hoeveelheid gas \(n\) (zoals bij het open ventiel), dan geldt \(\frac{p_1 V_1}{T_1} = \frac{p_2 V_2}{T_2}\) niet meer. In de volgende stap beschrijf je elke toestand apart met \(pV = nRT\).`
const order = phases.flatMap(p => p.items), icons = {entry: 'voorspelling', charles: 'zuiger', b1: 'penblad', b2: 'rekenmachine', exit: 'ticket', slot: 'controle'}
const tileText = { entry: ['Wat weet je nog?', 'Digitaal'], charles: ['Bekijk de vrije zuiger', 'Digitaal · blz. 4'], b1: ['Streep door wat gelijk blijft', 'Bundel · blz. 5'], b2: ['Bereken de einddruk', 'Bundel · blz. 6'], exit: ['Beantwoord het exitticket', 'Digitaal'], slot: ['Terug naar de doelen', 'Bundel · blz. 4–6'] }
const stage = ref('home'), phase = computed(() => phases.find(p => p.items.includes(stage.value)))
const isEntry = computed(() => stage.value === 'entry')
const entryQ = computed(() => entryQuestions[q.value])
const isExit = computed(() => stage.value === 'exit')
const exitQ = computed(() => exitQuestions[q.value])
const questionCount = computed(() => isEntry.value ? entryQuestions.length : isExit.value ? exitQuestions.length : 0)
const q = ref(0), revealed = ref(false), speaker = ref(''), demo = ref(false)
const goalDialog = ref(null), prepDialog = ref(null), heading = ref(null)
const list = ref(defaultNames.join('\n')), names = ref([...defaultNames]), unused = ref([...defaultNames])
const secondsLeft = ref(THINK_SECONDS), timerRunning = ref(false)
let timerId = null
const workbon = new URLSearchParams(location.search).get('print') === 'werkbon'
const full = ref(false), focusView = ref(false)
function stopTimer(){ if(timerId){ clearInterval(timerId); timerId = null } timerRunning.value = false }
function resetTimer(){ stopTimer(); secondsLeft.value = THINK_SECONDS }
function formatTime(s){ const m = Math.floor(s / 60), r = s % 60; return `${m}:${String(r).padStart(2, '0')}` }
function drawName(){
  if(!names.value.length) return ''
  if(!unused.value.length) unused.value = [...names.value]
  const [n] = unused.value.splice(Math.floor(Math.random() * unused.value.length), 1)
  return n
}
function pickSpeaker(){ const n = drawName(); speaker.value = n || 'Kies zelf een aanwezige leerling.' }
function toggleTimer(){
  if(timerRunning.value){ stopTimer(); return }
  if(secondsLeft.value <= 0){ secondsLeft.value = THINK_SECONDS; speaker.value = '' }
  timerRunning.value = true
  timerId = setInterval(() => {
    if(secondsLeft.value > 1){ secondsLeft.value -= 1; return }
    secondsLeft.value = 0
    stopTimer()
    pickSpeaker()
  }, 1000)
}
function pickNow(){ stopTimer(); secondsLeft.value = 0; pickSpeaker() }
function go(s) { stage.value = s; q.value=0; clearQuestion(); demo.value=false; nextTick(() => { heading.value?.focus(); window.scrollTo(0,0) }) }
function clearQuestion(){ revealed.value=false; speaker.value=''; resetTimer() }
function changeQ(i){ q.value=i; clearQuestion(); nextTick(()=>heading.value?.focus()) }
function next(){ const n=order[order.indexOf(stage.value)+1]; go(n || 'home') }
function prev(){ go(order[order.indexOf(stage.value)-1] || 'home') }
function saveNames(){ const clean=[...new Set(list.value.split(/[,;\n]/).map(n=>n.trim()).filter(Boolean))]; names.value=clean;unused.value=[...clean];prepDialog.value.close() }
function hear(){ if(speaker.value) return; const n = drawName(); speaker.value = n ? `Aan het woord: ${n}` : 'Nodig zelf een aanwezige leerling uit.' }
function syncFull(){full.value=!!document.fullscreenElement}
async function toggleFull(){ if(full.value){await exitBrowserFullscreen();focusView.value=false}else if(focusView.value){focusView.value=false}else {await enterBrowserFullscreen();focusView.value=!document.fullscreenElement} }
function esc(e){if(e.key==='Escape')focusView.value=false}
onMounted(()=>{document.addEventListener('fullscreenchange',syncFull);window.addEventListener('keydown',esc)})
onUnmounted(()=>{stopTimer();document.removeEventListener('fullscreenchange',syncFull);window.removeEventListener('keydown',esc)})
function printBon(){window.print()}
</script>
<template>
<main v-if="workbon" class="ll-bonnen"><button class="btn btn-primary" @click="printBon">Druk de werkbonnen af</button><article v-for="i in 2" :key="i"><span class="badge badge-paper">WERKBON · KWALITEITSCONTROLE</span><h1>Geef je deze berekening vrij?</h1><p>Begintoestand: 100 kPa, 12 L en 300 K. Eindtoestand: 8 L en 360 K. De cilinder bleef afgesloten.</p><blockquote>‘Ik noteer 150 kPa. Het volume werd kleiner, dus ik heb Boyle gebruikt.’</blockquote><p>Vrijgeven / Terugsturen (omcirkel)</p><p>Onder welke voorwaarde zou de redenering van je collega kloppen? Controleer die voorwaarde aan de hand van de gegevens.</p><div class="lines"></div><p>Mijn advies aan de collega: …</p></article></main>
<main v-else class="ll-board" :class="{'ll-focus':focusView}">
<header class="toolbar"><button class="btn btn-ghost" aria-label="ABC-overzicht" @click="go('home')"><PhSquaresFour/><span>ABC<span class="overview-extra">-overzicht</span></span></button><span class="identity">6ELTE / 6IICT · Gaswetten</span><button class="btn btn-ghost" @click="goalDialog.showModal()"><PhTarget/> Doelen</button><button class="btn btn-ghost icon" title="Voorbereiding vóór projectie" aria-label="Voorbereiding" @click="prepDialog.showModal()"><PhSlidersHorizontal/></button><button class="btn btn-ghost icon" title="Schermvullend aan of uit" aria-label="Schermvullend" @click="toggleFull"><PhCornersOut/></button></header>
<section v-if="stage==='home'" class="surface agenda">
  <h1 tabindex="-1" ref="heading">Wat gebeurt er met de druk in een afgesloten cilinder?</h1>
  <div class="phases">
    <section v-for="p in phases" :key="p.id" class="phase">
      <div class="phasehead">
        <h2><span class="phase-letter">{{p.id}}</span><span class="phase-title">{{p.title}}</span></h2>
        <span class="phase-time">{{p.time}}</span>
      </div>
      <button v-for="id in p.items" :key="id" :class="['tile', `tile-${screens[id][2]}`]" @click="go(id)">
        <KaartIcoon class="tile-symbol" :name="icons[id]"/>
        <span class="tile-copy">
          <strong>{{tileText[id][0]}}</strong>
          <span class="tile-foot">{{tileText[id][1]}}</span>
        </span>
      </button>
    </section>
  </div>
  <footer class="agenda-foot">
    <div class="agenda-legend" aria-label="Betekenis van de kleuren">
      <span><i class="swatch swatch-digital" aria-hidden="true"></i>Digitaal</span>
      <span><i class="swatch swatch-paper" aria-hidden="true"></i>Bundel (papier)</span>
    </div>
    <span class="agenda-school">GO! Atheneum Willebroek</span>
  </footer>
</section>
<section v-else class="surface" :key="stage">
  <div :class="['location', `location-${screens[stage][2]}`]"><b>{{phase.id}}</b> {{phase.title}} <span>{{questionCount ? `${screens[stage][0]} · ${q+1}/${questionCount}` : tileText[stage][1]}}</span></div>
<template v-if="isEntry">
  <h1 ref="heading" tabindex="-1">{{entryQ.title}}</h1>
  <div class="recall-card">
    <div class="recall-text">
      <p class="recall-prompt">{{entryQ.prompt}}</p>
      <p class="recall-cue">{{entryQ.cue}}</p>
    </div>
    <figure class="recall-sketch"><VoorkennisSchets :kind="entryQ.kind"/></figure>
  </div>
  <div :class="['think-bar', { 'is-running': timerRunning }]">
    <div class="think-timer">
      <div class="think-clock">
        <span class="think-digits" :aria-label="`Resterende denktijd ${secondsLeft} seconden`">{{formatTime(secondsLeft)}}</span>
        <span class="think-status">{{timerRunning ? 'Denktijd loopt' : secondsLeft === 0 ? 'Denktijd voorbij' : 'Denktijd (40 s)'}}</span>
      </div>
      <div class="think-rail" aria-hidden="true"><div class="think-fill" :style="{width:`${(secondsLeft/THINK_SECONDS)*100}%`}"></div></div>
      <div class="think-controls">
        <button class="btn btn-primary" @click="toggleTimer">{{timerRunning ? 'Pauzeer' : secondsLeft === 0 ? 'Opnieuw (40 s)' : secondsLeft < THINK_SECONDS ? 'Hervat' : 'Start denktijd'}}</button>
        <button v-if="timerRunning || secondsLeft < THINK_SECONDS" class="btn btn-ghost" @click="resetTimer">Reset</button>
      </div>
    </div>
    <div class="think-speaker" aria-live="polite">
      <template v-if="speaker">
        <span class="think-kicker">Aan het woord</span>
        <strong class="think-name">{{speaker}}</strong>
        <button class="btn btn-ghost" @click="pickNow">Andere naam</button>
      </template>
      <template v-else>
        <p class="think-wait">Eerst denkt iedereen zelf na. Zodra de timer op 0:00 staat, verschijnt hier een willekeurige naam.</p>
        <button class="btn btn-ghost" @click="pickNow">Kies nu een naam</button>
      </template>
    </div>
  </div>
  <div class="actions">
    <button class="btn btn-ghost" @click="revealed=!revealed">{{revealed ? 'Verberg richtantwoord' : 'Toon richtantwoord'}}</button>
  </div>
  <div v-if="revealed" class="duo recall-answer">
    <article class="card card-digital"><h2>Macroscopisch</h2><p>{{entryQ.macro}}</p></article>
    <article class="card card-digital"><h2>Microscopisch</h2><p>{{entryQ.micro}}</p></article>
  </div>
</template>
<template v-else-if="isExit">
  <h1 ref="heading" tabindex="-1">{{exitQ.title}}</h1>
  <div class="recall-card">
    <div class="recall-text">
      <p class="recall-prompt">{{exitQ.prompt}}</p>
      <p class="recall-cue">Eerst zelf denken. Steek op mijn teken {{exitQ.options.length === 2 ? '1 of 2' : '1, 2 of 3'}} vingers op.</p>
    </div>
    <figure class="recall-sketch"><ExitSchets :kind="exitQ.kind"/></figure>
  </div>
  <ol class="choices">
    <li v-for="(opt,i) in exitQ.options" :key="opt" :class="{ 'choice-correct': revealed && i === exitQ.correct }">
      <b>{{i+1}}</b>
      <span>{{opt}}</span>
      <span v-if="revealed && i === exitQ.correct" class="choice-mark">Juist</span>
    </li>
  </ol>
  <div class="actions">
    <button class="btn btn-primary" @click="revealed=!revealed">{{revealed ? 'Verberg antwoord' : 'Toon antwoord'}}</button>
    <button class="btn btn-ghost" @click="pickSpeaker">{{speaker ? 'Andere naam' : 'Kies leerling'}}</button>
    <span v-if="speaker" class="speaker-pill" aria-live="polite">Aan het woord: <strong>{{speaker}}</strong></span>
  </div>
  <div v-if="revealed" class="feedback feedback-answer" aria-live="polite"><MathText :text="exitQ.explanation"/></div>
</template>
<template v-else-if="stage==='charles'">
  <h1 ref="heading" tabindex="-1">Bekijk de vrije zuiger en vul blz. 4 in</h1>
  <Blz4Werkblad/>
</template>
<template v-else-if="stage==='b1'">
  <h1 ref="heading" tabindex="-1">Streep door wat gelijk blijft</h1>
  <Blz5Werkblad/>
</template>
<template v-else-if="stage==='b2'">
  <h1 ref="heading" tabindex="-1">Bereken de einddruk op blz. 6</h1>
  <Blz6Werkblad/>
</template>
<template v-else>
  <h1 ref="heading" tabindex="-1">Terug naar onze drie doelen</h1>
  <p class="lead">Kijk naar je eigen bundel (blz. 4, 5 en 6) en duid met je duim aan waar je nu staat.</p>
  <ol class="goal-grid">
    <li v-for="([title, page, text], i) in goals" :key="title" class="goal-card">
      <div class="goal-head">
        <span class="goal-num">{{i+1}}</span>
        <div>
          <h2>{{title}}</h2>
          <span class="goal-page">{{page}}</span>
        </div>
      </div>
      <p>{{text}}</p>
    </li>
  </ol>
  <div class="thumb-strip" aria-label="Betekenis van de duimcheck">
    <span><strong>Duim omhoog:</strong> lukt zelfstandig</span>
    <span><strong>Duim opzij:</strong> lukt met voorbeeld</span>
    <span><strong>Duim omlaag:</strong> nog extra oefenen</span>
  </div>
  <div class="actions">
    <button class="btn btn-ghost" @click="demo=!demo">{{demo ? 'Verberg vooruitblik' : 'Vooruitblik: open ventiel'}}</button>
  </div>
  <div v-if="demo" class="feedback"><MathText :text="ventielPreview"/></div>
</template>
<nav class="stepnav" aria-label="Lesbediening"><button class="btn btn-ghost" @click="questionCount && q>0 ? changeQ(q-1) : prev()"><PhArrowLeft/> Terug</button><button class="btn btn-primary" @click="questionCount && q<questionCount-1 ? changeQ(q+1) : next()">{{questionCount&&q<questionCount-1?'Volgende vraag':stage==='slot'?'Naar overzicht':screens[order[order.indexOf(stage)+1]][0]}} <PhArrowRight/></button></nav></section>
<dialog ref="goalDialog"><div class="dialoghead"><h2>Onze leerdoelen</h2><button class="btn btn-ghost" @click="goalDialog.close()">Sluit doelen</button></div><ol class="goalrows"><li v-for="([title, page, text], i) in goals" :key="title"><b>{{i+1}} · {{title}} ({{page}})</b><p>{{text}}</p></li></ol></dialog>
<dialog ref="prepDialog"><div class="dialoghead"><h2>Vóór de les</h2><button class="btn btn-ghost" @click="prepDialog.close()">Sluiten</button></div><p>Leg de bundels en losse werkbonnen klaar. Open deze voorbereiding vóór de projectie.</p><a class="btn btn-ghost" href="?print=werkbon" target="_blank" rel="noopener">Print twee werkbonnen op A4</a><label for="ll-names">Aanwezige voornamen (naamkiezer)</label><p>Standaard staan hier 10 voorbeeldnamen (permanent aan te passen in <code>inhoud.js</code>, of tijdelijk hier). Eén naam per regel of gescheiden door komma’s.</p><textarea id="ll-names" rows="5" v-model="list" autocomplete="off"></textarea><button class="btn btn-primary" @click="saveNames">Gebruik deze lijst</button></dialog>
</main></template>
<style scoped src="./bord.css"></style>
